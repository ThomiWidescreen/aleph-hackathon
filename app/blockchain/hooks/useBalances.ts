import { erc20Abi, createPublicClient, http, Chain } from 'viem'
import { useEffect, useState } from 'react'

const WORLDCHAIN_SEPOLIA: Chain = {
  id: 480,
  name: 'World Chain',
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ['https://worldchain-mainnet.g.alchemy.com/public']
    }
  }
}

const publicClient = createPublicClient({
  chain: WORLDCHAIN_SEPOLIA,
  transport: http()
})

export function useUserBalances(userAddress?: `0x${string}` | null) {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (!userAddress) return

    const fetchBalances = async () => {
      const wldRaw = await publicClient.readContract({
        address: '0x2cfc85d8e48f8eab294be644d9e25c3030863003', // Mock WLD
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [userAddress]
      })

      console.log({wldRaw})

      setBalance(Number(wldRaw) / 1e18)
    }

    fetchBalances()
  }, [userAddress])

  return balance
}
