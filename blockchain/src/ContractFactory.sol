// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./WorkContract.sol";
import "@openzeppelin/contracts/interfaces/IERC4626.sol";
import "@uniswap/permit2/interfaces/ISignatureTransfer.sol";

contract ContractFactory {
    address[] public allEscrows;
    mapping(address => address[]) public escrowsByPayer;
    mapping(address => address[]) public escrowsByWorker;

    address public permit2;

    event EscrowCreated(
        address indexed contractAddress,
        address indexed payer,
        address indexed worker
    );

    constructor(address _permit2) {
        permit2 = _permit2;
    }

    struct EscrowParams {
        address worker;
        uint256 deadline;
        string overview;
        string name;
        uint256 insuranceAmount;
        uint256 totalAmount;
        address token;
        address vault;
    }

    function createEscrowWithPermit2(
        EscrowParams calldata params,
        ISignatureTransfer.PermitTransferFrom calldata permit,
        ISignatureTransfer.SignatureTransferDetails calldata transferDetails,
        bytes calldata signature
    ) external returns (address) {
        require(IERC4626(params.vault).asset() == params.token, "Vault/token mismatch");

        // 🪄 Transfer totalAmount from msg.sender using Permit2
        ISignatureTransfer(permit2).permitTransferFrom(permit, transferDetails, msg.sender, signature);

        // 🧱 Prepare config struct
        WorkContract.Config memory config = WorkContract.Config({
            payer: msg.sender,
            worker: params.worker,
            deadline: params.deadline,
            overview: params.overview,
            name: params.name,
            insuranceAmount: params.insuranceAmount,
            totalAmount: params.totalAmount,
            token: params.token,
            vault: params.vault,
            permit2: permit2
        });

        // 🧱 Deploy WorkContract with config
        WorkContract escrow = new WorkContract(config);

        address escrowAddr = address(escrow);

        // 📤 Send the tokens to the escrow contract
        IERC20(params.token).transfer(escrowAddr, params.totalAmount);

        allEscrows.push(escrowAddr);
        escrowsByPayer[msg.sender].push(escrowAddr);
        escrowsByWorker[params.worker].push(escrowAddr);

        emit EscrowCreated(escrowAddr, msg.sender, params.worker);
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
