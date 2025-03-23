#!/bin/bash

  TOKEN_ADDRESS=$1     # ERC20 contract address
  RECIPIENT=$2         # Wallet address to receive tokens
  AMOUNT=$3            # Raw amount (not human-readable, e.g., 1000000 for 1 USDC if 6 decimals)

  if [ -z "$TOKEN_ADDRESS" ] || [ -z "$RECIPIENT" ] || [ -z "$AMOUNT" ]; then
    echo "❌ Usage: mint_token <TOKEN_ADDRESS> <RECIPIENT_ADDRESS> <RAW_AMOUNT>"
    return 1
  fi

  cast send $TOKEN_ADDRESS \
    "mint(address,uint256)" \
    $RECIPIENT $AMOUNT \
    --rpc-url https://worldchain-sepolia.g.alchemy.com/v2/ktQPF96BnO3cERs6sDS8P_5ubkgPM8an \
    --private-key <PRIVATE_KEY> \
    --chain 4801

