import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./buttons/LogOut";
import LoginNav from "./LoginNavigation";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white p-6">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <div className="">
          <Link href={"/"} className="font-medium text-md">
            CoinUp
          </Link>
        </div>
        {session?.user?.email ? (
          <nav className="text-sm flex gap-12 items-center">
            <Link href={"/transaction"}>Transactions</Link>
            <Link href={"/budget"}>Budgets</Link>
            <Link href={"/goal"}>Goals</Link>
            <Link
              className="bg-black text-white rounded-xl px-6 py-2"
              href={"/dashboard"}
            >
              Dasboard
            </Link>
            <Logout/>
          </nav>
        ) : (
          <LoginNav/>
        )}
      </div>
    </header>
  );
}
