"use client"

import { MiniKit } from "@worldcoin/minikit-js"

export const getUserAddress = async (): Promise<`0x${string}` | null> => {
  // Ya está conectado
  if (MiniKit.user?.walletAddress) {
    return MiniKit.user.walletAddress as `0x${string}` | null
  }
  console.log({user: MiniKit.user})

  // Obtener nonce del backend
  const res = await fetch("/api/nonce")
  const { nonce } = await res.json()

  const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
    nonce,
    requestId: '0',
    expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    notBefore: new Date(Date.now() - 60 * 1000),
    statement: "Sign to connect your wallet to the MiniApp"
  })

  if (finalPayload?.status === 'error') {
    return null
  }

  return MiniKit.user?.walletAddress as `0x${string}` 
}
