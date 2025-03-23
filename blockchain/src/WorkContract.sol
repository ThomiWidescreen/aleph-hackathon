// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC4626.sol";
import "@uniswap/permit2/interfaces/ISignatureTransfer.sol";

contract WorkContract {
    enum Status {
        Pending,
        Accepted,
        Declined,
        Completed,
        Failed,
        Dispute
    }

    struct Config {
        address payer;
        address worker;
        uint256 deadline;
        string overview;
        string name;
        uint256 insuranceAmount;
        uint256 totalAmount;
        address token;
        address vault;
        address permit2;
    }

    address public payer;
    address public worker;

    IERC20 public paymentToken;
    IERC4626 public vault;
    ISignatureTransfer public permit2;

    uint256 public totalAmount;
    uint256 public insuranceAmount;
    uint256 public deadline;
    string public overview;
    string public name;
    uint256 public stakeStart;

    Status public status;

    constructor(Config memory config) {
        payer = config.payer;
        worker = config.worker;
        deadline = config.deadline;
        overview = config.overview;
        name = config.name;

        insuranceAmount = config.insuranceAmount;
        totalAmount = config.totalAmount;
        paymentToken = IERC20(config.token);
        vault = IERC4626(config.vault);
        permit2 = ISignatureTransfer(config.permit2);

        status = Status.Pending;
    }

    function acceptWithPermit2(
        ISignatureTransfer.PermitTransferFrom calldata permit,
        ISignatureTransfer.SignatureTransferDetails calldata transferDetails,
        bytes calldata signature
    ) external {
        require(msg.sender == worker, "Only worker can accept");
        require(status == Status.Pending, "Invalid status");

        // Transfer insuranceAmount from worker using Permit2
        permit2.permitTransferFrom(permit, transferDetails, msg.sender, signature);

        // Approve vault and deposit all funds
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
