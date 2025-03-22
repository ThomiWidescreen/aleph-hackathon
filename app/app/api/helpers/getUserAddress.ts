"use client"; // Required for Next.js

import { MiniKit } from "@worldcoin/minikit-js";

export const getUserAddress = () => {

    const address = MiniKit.user?.walletAddress
    if (!address) {
        return "0x0c892815f0B058E69987920A23FBb33c834289cf"
    }

    return address
}

