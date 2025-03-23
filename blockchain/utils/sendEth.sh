#!/bin/bash

# Usage: ./send.sh 0xTargetAddressHere

# Check if target address is passed
if [ -z "$1" ]; then
  echo "❌ Error: No target address provided."
  echo "✅ Usage: ./send.sh 0xTargetAddressHere"
  exit 1
fi

TARGET_ADDRESS=$1

cast send $TARGET_ADDRESS \
  --value 0.01ether \
  --rpc-url https://worldchain-sepolia.g.alchemy.com/v2/ktQPF96BnO3cERs6sDS8P_5ubkgPM8an \
  --private-key <PRIVATE_KEY> \
  --chain 4801
