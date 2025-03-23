import { createPublicClient, http, Chain } from 'viem'
import { MiniKit } from '@worldcoin/minikit-js'
import { ABI } from '../WorkContract'

const WORLDCHAIN: Chain = {
  id: 480,
  name: 'World Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://worldchain-mainnet.g.alchemy.com/public'],
    },
  },
}

const publicClient = createPublicClient({
  chain: WORLDCHAIN,
  transport: http(),
})

export const useAcceptContract = () => {
  const acceptEscrow = async ({
    contractAddress,
    amount,
    token,
  }: {
    contractAddress: `0x${string}`
    amount: string
    token: `0x${string}`
  }) => {
    if (!MiniKit.isInstalled()) return

    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 60
      const nonce = Date.now().toString()

      const permit = {
        permitted: {
          token,
          amount,
        },
        nonce,
        deadline: deadline.toString(),
      }

      const permitArgs = [
        [token, amount],
        nonce,
        deadline.toString(),
      ]

      const transferArgs = [contractAddress, amount]

      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: contractAddress,
            abi: ABI,
            functionName: 'acceptWithPermit2',
            args: [permitArgs, transferArgs, 'PERMIT2_SIGNATURE_PLACEHOLDER_0'],
          },
        ],
        permit2: [
          {
            ...permit,
            spender: contractAddress,
          },
        ],
      })

      if (finalPayload.status === 'error') {
        throw new Error( 'Transaction failed')
      }

      return finalPayload
    } catch (error) {
      console.error('Error accepting contract:', error)
      throw error
    }
  }

  return { acceptEscrow }
}
