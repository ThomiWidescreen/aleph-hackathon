// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/ContractFactory.sol";
import "../src/tokens/MockUSDC.sol";
import "../src/tokens/MockWLD.sol";
import "../src/vault/StakingVault.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        uint256 chainId = block.chainid;
        IERC20 usdc;
        IERC20 wld;
        IERC4626 usdcVault;
        IERC4626 wldVault;

        // Optional: test users to receive tokens
        address testUser1 = 0x7679A10dcD2132bFc7b006109A6F190c8934b4C0;
        address testUser2 = 0xebB3A759CCCE5eeAdEF783512403A7D5Be51f2ca;

        address permit2Address;

        if (chainId == 4801) {
            // 🌐 World Chain Sepolia — testnet

            // Deploy and mint MockUSDC
            MockUSDC mockUSDC = new MockUSDC();
            mockUSDC.mint(msg.sender, 1_000_000e6);
            mockUSDC.mint(testUser1, 500_000e6);
            mockUSDC.mint(testUser2, 500_000e6);
            usdc = mockUSDC;

            // Deploy and mint MockWLD
            MockWLD mockWLD = new MockWLD();
            mockWLD.mint(msg.sender, 1_000_000 ether);
            mockWLD.mint(testUser1, 500_000 ether);
            mockWLD.mint(testUser2, 500_000 ether);
            wld = mockWLD;

            // Permit2 address on World Chain Sepolia (same as Sepolia generally)
            permit2Address = 0x000000000022D473030F116dDEE9F6B43aC78BA3;
        } else {
            // 🌍 World Chain Mainnet — usar contratos reales
            usdc = IERC20(0x79A02482A880bCE3F13e09Da970dC34db4CD24d1); // real USDC
            wld = IERC20(0x2cFc85d8E48F8EAB294be644d9E25C3030863003);   // real WLD

            // Permit2 address on mainnet
            permit2Address = 0x000000000022D473030F116dDEE9F6B43aC78BA3;
        }

        // Deploy vaults in both testnet and mainnet
        usdcVault = new StakingVault(usdc);
        wldVault = new StakingVault(wld);

        // Deploy the factory with Permit2 support
        ContractFactory factory = new ContractFactory(permit2Address);
        console.log("ContractFactory deployed at:", address(factory));

        console.log("--- Tokens ---");
        console.log("USDC Token:", address(usdc));
        console.log("WLD  Token:", address(wld));

        console.log("--- Vaults ---");
        console.log("USDC Vault:", address(usdcVault));
        console.log("WLD  Vault:", address(wldVault));

        vm.stopBroadcast();
    }
}
