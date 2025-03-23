// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakingVault is ERC4626 {
    constructor(IERC20 _asset)
        ERC20("Staking Vault Token", "SVT")
        ERC4626(_asset)
    {}
}
