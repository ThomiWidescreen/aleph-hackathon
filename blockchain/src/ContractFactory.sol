// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./WorkContract.sol";
import "@openzeppelin/contracts/interfaces/IERC4626.sol";

contract ContractFactory {
    address[] public allEscrows;
    mapping(address => address[]) public escrowsByPayer;
    mapping(address => address[]) public escrowsByWorker;

    event EscrowCreated(
        address indexed contractAddress,
        address indexed payer,
        address indexed worker
    );
    function createEscrow(
        address worker,
        uint256 deadline,
        string calldata overview,
        string calldata name,
        uint256 insuranceAmount,
        uint256 totalAmount,
        address token,
        address vault
    ) external returns (address) {
        require(IERC4626(vault).asset() == token, "Vault/token mismatch");

        // 🛑 Transfer tokens to the factory
        require(
            IERC20(token).transferFrom(msg.sender, address(this), totalAmount),
            "Token transfer failed"
        );

        // 🧱 Deploy WorkContract
        WorkContract escrow = new WorkContract(
            msg.sender, // 👈 este es el payer real
            worker,
            deadline,
            overview,
            name,
            insuranceAmount,
            totalAmount,
            token,
            vault
        );

        address escrowAddr = address(escrow);

        // 📤 Send the tokens to the escrow contract
        IERC20(token).transfer(escrowAddr, totalAmount);

        allEscrows.push(escrowAddr);
        escrowsByPayer[msg.sender].push(escrowAddr);
        escrowsByWorker[worker].push(escrowAddr);

        emit EscrowCreated(escrowAddr, msg.sender, worker);
        return escrowAddr;
    }

    function getMyContracts() external view returns (address[] memory) {
        return escrowsByPayer[msg.sender];
    }

    function getContractsOf(
        address user
    ) external view returns (address[] memory) {
        return escrowsByWorker[user];
    }

    function getAllContracts() external view returns (address[] memory) {
        return allEscrows;
    }
}
