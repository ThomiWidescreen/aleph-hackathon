import { MiniKit } from "@worldcoin/minikit-js";
import { contractAddress, ABI } from "@/blockchain/ContractFactory";

export const useCreateContract = () => {
  const createEscrow = async ({
    worker,
    overview,
    name,
    insuranceAmount,
    totalAmount,
    token,
    vault,
    deadline = Math.floor(Date.now() / 1000) + 30 * 60, // 30 min default
  }: {
    worker: string;
    overview: string;
    name: string;
    insuranceAmount: string;
    totalAmount: string;
    token: string;
    vault: string;
    deadline?: number;
  }) => {
    if (!MiniKit.isInstalled()) {
      return {
        success: false,
        error: "World App (MiniKit) is not installed.",
      };
    }

    try {
      const nonce = Date.now().toString();

      const permit = {
        permitted: {
          token,
          amount: totalAmount,
        },
        nonce,
        deadline: deadline.toString(),
      };

      const permitArgs = [[token, totalAmount], nonce, deadline.toString()];

      const transferDetails = {
        to: contractAddress,
        requestedAmount: totalAmount,
      };

      const transferArgs = [
        transferDetails.to,
        transferDetails.requestedAmount,
      ];

      const escrowParams = [
        worker,
        deadline,
        overview,
        name,
        insuranceAmount,
        totalAmount,
        token,
        vault,
      ];

      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: contractAddress,
            abi: ABI,
            functionName: "createEscrowWithPermit2",
            args: [
              escrowParams,
              permitArgs,
              transferArgs,
              "PERMIT2_SIGNATURE_PLACEHOLDER_0",
            ],
          },
        ],
        permit2: [
          {
            ...permit,
            spender: contractAddress,
          },
        ],
      });

      if (!finalPayload || finalPayload.status !== "success") {
        return {
          success: false,
          error: "Transaction failed or was rejected.",
        };
      }

      return {
        success: true,
        data: finalPayload,
      };
    } catch (err: any) {
      console.error("🚨 Error creating escrow:", err);
      return {
        success: false,
        error: err?.message || "An unknown error occurred.",
      };
    }
  };

  return { createEscrow };
};
