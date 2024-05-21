'use client'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      className="border-black border text-black rounded-lg md:rounded-xl px-2 py-2 md:px-8 md:py-2"
    >
      <span className="hidden md:block">Logout</span>
      <FontAwesomeIcon className="md:hidden block" icon={faRightFromBracket}/>
    </button>
  );
}
