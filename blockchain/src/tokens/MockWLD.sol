// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockWLD is ERC20 {
    constructor() ERC20("Mock Worldcoin", "WLD") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 18; // WLD usa 18 decimales
    }
}
