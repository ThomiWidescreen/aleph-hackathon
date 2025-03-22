"use client";

import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
} from "@worldcoin/minikit-js";

import { createUser } from "@actions/users/createUser";
import UploadVideo from "../UploadVideo";
import { createVideo } from "@actions/file/createVideo";
import { getVideoDetail } from "@/app/api/actions/file/getVideoDetail";
import { getVideos, getVideosByAuthor } from "@/app/api/actions/file/getVideosByAuthor";
import { create } from "node:domain";
import { getUsersByName } from "@/app/api/actions/users/getUsersByName";
import { getVideosByQuery } from "@/app/api/actions/file/getVideosByQuery";

const sendPayment = async () => {
  try {
    const res = await fetch(`/api/initiate-payment`, {
      method: "POST",
    });

    const { id } = await res.json();

    console.log(id);

    const payload: PayCommandInput = {
      reference: id,
      to: "0x0c892815f0B058E69987920A23FBb33c834289cf", // Test address
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(0.5, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(0.1, Tokens.USDCE).toString(),
        },
      ],
      description: "Watch this is a test",
    };
    if (MiniKit.isInstalled()) {
      return await MiniKit.commandsAsync.pay(payload);
    }
    return null;
  } catch (error: unknown) {
    console.log("Error sending payment", error);
    return null;
  }
};

const handlePay = async () => {
  if (!MiniKit.isInstalled()) {
    console.error("MiniKit is not installed");
    return;
  }
  const sendPaymentResponse = await sendPayment();
  const response = sendPaymentResponse?.finalPayload;
  if (!response) {
    return;
  }

  if (response.status == "success") {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/confirm-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: response }),
    });
    const payment = await res.json();
    if (payment.success) {
      // Congrats your payment was successful!
      console.log("SUCCESS!");
    } else {
      // Payment failed
      console.log("FAILED!");
    }
  }
};

export const PayBlock = () => {
  return (
    <>
      <p>Prueba Hardcodeada</p>
      <UploadVideo />
      <button className="bg-blue-500 p-4" onClick={async() => {
           const video = await getVideoDetail("67de48732a632bbc5cc9191a")
           console.log(video)
           }}>
        Get VideoDetail
      </button>
      <button className="bg-blue-500 p-4" onClick={async() => {
           const videos = await getVideosByAuthor("0x0c892815f0B058E69987920A23FBb33c834289cf")
           console.log(videos)
           }}>
        Get Videos por author
      </button>
      <button className="bg-blue-500 p-4" onClick={async() => {
           const user = await createUser({
             address: "0x0c892815f0B058E69987920A23FBb33c834289cf",
             name: "el pepe",
             description: "description",
             photo: "photo"
          })
           console.log(user)
           }}>
        Create User
      </button>
      <button className="bg-blue-500 p-4" onClick={async() => {
           const users = await getUsersByName({ name: "pepe" })
           console.log(users)
           }}>
        Get Users By Name
      </button>
      <button className="bg-blue-500 p-4" onClick={async() => {
           const videos = await getVideosByQuery({ query: "aasd" })
           console.log(videos)
           }}>
        Get Video By Query
      </button>
      <button className="bg-blue-500 p-4" onClick={async() => {
        await createVideo({
          title: "title",
          description: "description",
          authorAddress: "0x0c892815f0B058E69987920A23FBb33c834289cf",
          videoData: 'http://res.cloudinary.com/dc2xcjktb/video/upload/v1742614885/fjkdcxtt0vbdgioa2r22.mp4'
        })
      }}>
        Create Video
      </button>
    </>
  );
};
