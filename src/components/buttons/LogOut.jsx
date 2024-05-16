'use client'
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      onClick={() => signOut()}
      className="border-black text-black rounded-xl px-6 py-2"
    >
      Logout
    </button>
  );
}
