import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <PayBlock />
      <Link href="/profile-video-maker?id=67de37e6c29a6f8135c04c45">Profile</Link>
    </main>
  );
}
