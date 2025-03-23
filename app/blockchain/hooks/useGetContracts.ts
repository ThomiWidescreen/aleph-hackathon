import { erc20Abi, createPublicClient, http, Chain, getContract } from 'viem'
import { useEffect, useState } from 'react'
import { contractAddress as factoryAddress } from '@/blockchain/ContractFactory'
import { ABI as factoryAbi } from '@/blockchain/ContractFactory'
import { ABI as escrowAbi } from '@/blockchain/WorkContract'

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

export function useFetchContracts(
  userAddress?: `0x${string}` | null,
  role: 'payer' | 'worker' = 'payer'
) {
  const [contracts, setContracts] = useState<any[]>([])

  useEffect(() => {
    if (!userAddress) return

    const fetchContracts = async () => {
      try {
        const contract = getContract({
          address: factoryAddress,
          abi: factoryAbi,
          client: publicClient
        })

        const userContracts: `0x${string}`[] = await publicClient.readContract({
          address: factoryAddress,
          abi: factoryAbi,
          functionName: 'getContractsOf',
          args: [userAddress]
        }) as `0x${string}`[] 

        const parsed = await Promise.all(userContracts.map(async (address) => {
          const data = await Promise.all([
            publicClient.readContract({ address, abi: escrowAbi, functionName: 'name' }),
            publicClient.readContract({ address, abi: escrowAbi, functionName: 'overview' }),
            publicClient.readContract({ address, abi: escrowAbi, functionName: 'deadline' }),
            publicClient.readContract({ address, abi: escrowAbi, functionName: 'insuranceAmount' }),
            publicClient.readContract({ address, abi: escrowAbi, functionName: 'totalAmount' }),
            publicClient.readContract({ address, abi: escrowAbi, functionName: 'paymentToken' }),
            publicClient.readContract({ address, abi: escrowAbi, functionName: 'vault' }),
            publicClient.readContract({ address, abi: escrowAbi, functionName: 'payer' }),
            publicClient.readContract({ address, abi: escrowAbi, functionName: 'worker' }),
            publicClient.readContract({ address, abi: escrowAbi, functionName: 'status' })
          ])

          return {
            contract: address,
            name: data[0] as string,
            overview: data[1] as string,
            deadline: Number(data[2]),
            insuranceAmount: Number(data[3]) / 1e18,
            totalAmount: Number(data[4]) / 1e18,
            token: data[5] as string,
            vault: data[6] as string,
            payer: data[7] as string,
            worker: data[8] as string,
            status: Number(data[9])
          }
        }))

        setContracts(parsed)
      } catch (err) {
        console.error('Error fetching contracts:', err)
      }
    }

    fetchContracts()
  }, [userAddress, role])

  return contracts
}

export function useFetchContract(contractAddress: `0x${string}` | null) {
  const [contractData, setContractData] = useState<any | null>(null)

  useEffect(() => {
    if (!contractAddress) return

    const fetch = async () => {
      try {
        const data = await Promise.all([
          publicClient.readContract({ address: contractAddress, abi: escrowAbi, functionName: 'name' }),
          publicClient.readContract({ address: contractAddress, abi: escrowAbi, functionName: 'overview' }),
          publicClient.readContract({ address: contractAddress, abi: escrowAbi, functionName: 'deadline' }),
          publicClient.readContract({ address: contractAddress, abi: escrowAbi, functionName: 'insuranceAmount' }),
          publicClient.readContract({ address: contractAddress, abi: escrowAbi, functionName: 'totalAmount' }),
          publicClient.readContract({ address: contractAddress, abi: escrowAbi, functionName: 'paymentToken' }),
          publicClient.readContract({ address: contractAddress, abi: escrowAbi, functionName: 'vault' }),
          publicClient.readContract({ address: contractAddress, abi: escrowAbi, functionName: 'payer' }),
          publicClient.readContract({ address: contractAddress, abi: escrowAbi, functionName: 'worker' }),
          publicClient.readContract({ address: contractAddress, abi: escrowAbi, functionName: 'status' })
        ])

        setContractData({
          contract: contractAddress,
          name: data[0] as string,
          overview: data[1] as string,
          deadline: Number(data[2]),
          insuranceAmount: Number(data[3]) / 1e18,
          totalAmount: Number(data[4]) / 1e18,
          token: data[5] as string,
          vault: data[6] as string,
          payer: data[7] as string,
          worker: data[8] as string,
          status: Number(data[9])
        })
      } catch (err) {
        console.error('Error fetching contract:', err)
      }
    }

    fetch()
  }, [contractAddress])

  return contractData
}
