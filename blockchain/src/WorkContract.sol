// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC4626.sol";

contract WorkContract {
    enum Status {
        Pending,
        Accepted,
        Declined,
        Completed,
        Failed,
        Dispute
    }

    address public payer;
    address public worker;

    IERC20 public paymentToken;
    IERC4626 public vault;

    uint256 public totalAmount;
    uint256 public insuranceAmount;
    uint256 public deadline;
    string public overview;
    string public name;
    uint256 public stakeStart;

    Status public status;

    constructor(
        address _payer,
        address _worker,
        uint256 _deadline,
        string memory _overview,
        string memory _name,
        uint256 _insuranceAmount,
        uint256 _totalAmount,
        address _token,
        address _vault
    ) {
        payer = _payer;
        worker = _worker;
        deadline = _deadline;
        overview = _overview;
        name = _name;

        insuranceAmount = _insuranceAmount;
        totalAmount = _totalAmount;
        paymentToken = IERC20(_token);
        vault = IERC4626(_vault);

        status = Status.Pending;
        // Los fondos del payer ya están en el contrato
    }

    function acceptContract() external {
        require(msg.sender == worker, "Only worker can accept");
        require(status == Status.Pending, "Invalid status");

        // Worker transfiere su seguro
        require(
            paymentToken.transferFrom(worker, address(this), insuranceAmount),
            "Insurance transfer failed"
        );

        // Aprobar al vault y depositar todo
        uint256 fullAmount = totalAmount + insuranceAmount;
        paymentToken.approve(address(vault), fullAmount);
        vault.deposit(fullAmount, address(this));

        stakeStart = block.timestamp;
        status = Status.Accepted;
    }

    function declineContract() external {
        require(msg.sender == worker, "Only worker can decline");
        require(status == Status.Pending, "Invalid status");

        paymentToken.transfer(payer, totalAmount + insuranceAmount);
        status = Status.Declined;
    }

    function markAsCompleted() external {
        require(msg.sender == payer, "Only payer can complete");
        require(status == Status.Accepted, "Contract not accepted");
        require(block.timestamp <= deadline, "Deadline passed");

        uint256 shares = vault.balanceOf(address(this));
        vault.withdraw(shares, worker, address(this));
        status = Status.Completed;
    }

    function triggerInsurance() external {
        require(msg.sender == payer, "Only payer can trigger");
        require(status == Status.Accepted, "Contract not accepted");
        require(block.timestamp > deadline, "Deadline not yet passed");

        uint256 shares = vault.balanceOf(address(this));
        vault.withdraw(shares, payer, address(this));
        status = Status.Failed;
    }

    function getBalanceInShares() external view returns (uint256) {
        return vault.balanceOf(address(this));
    }
}
