'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginNav(){
    const path=usePathname()
    return(
        <>
        {path && path !== "/login" && (
            <nav className="text-sm flex gap-12 items-center bg-black text-white rounded-xl px-6 py-2">
              <Link href="/login">Login</Link>
            </nav>
          )}
        </>
    )
}