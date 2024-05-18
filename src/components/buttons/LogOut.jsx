'use client'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router=useRouter()
  async function handleLogout(){
    await signOut()
    router.push("/")
  }
  return (
    <button
      onClick={handleLogout}
      className="border-black border text-black rounded-xl px-8 py-2"
    >
      Logout
    </button>
  );
}
