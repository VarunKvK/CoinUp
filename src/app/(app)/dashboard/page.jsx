import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/models/profile";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import Todo from "@/models/todo";
import UsernameComponent from "@/components/formItems/UsernameComponent";
import TipsComponent from "@/components/formItems/TipsComponent";
import TodoComponent from "@/components/formItems/TodoComponent";
import IncomeDataForm from "@/components/forms/IncomeData";
import GraphVisuals from "@/components/GraphVisuals";
import Link from "next/link";


export default async function Dashboard() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const profile = await Profile.findOne({ owner: session?.user.email });
  const username = profile?.uri;
  const tasks = await Todo.findOne({ owner: session?.user?.email });

  return (
    <main>
      <div className="w-full mx-auto p-6 lg:overflow-hidden">
        <div className="grid lg:grid-cols-4 gap-6 w-full h-full">
          <div className="grid grid-rows-5 lg:grid-rows-6 col-span-3 h-screen">
            <UsernameComponent username={username} />
            <div className="grid grid-rows-2 lg:grid-rows-3 gap-8 lg:gap-6 row-span-5 ">
              <IncomeDataForm />
              <div className="grid gap-2 row-span-2 border border-black rounded-lg px-4 pt-4">
                <h2 className="text-gray-500 font-medium lg:text-xl mb-2">
                  Monthly Budget Expenses
                </h2>
                <GraphVisuals/>
              </div>
            <div className="hidden lg:flex w-full gap-4">
              <Link href="/" className="bg-black text-white p-4 rounded-lg w-full">Home</Link>
              <Link href="/" className="border border-black text-black p-4 rounded-lg w-full">Transaction</Link>
              <Link href="/budgets" className="border border-black text-black p-4 rounded-lg w-full">Create Budget</Link>
              <Link href="/goals" className="bg-black text-white p-4 rounded-lg w-full">Goals</Link>
            </div>
            </div>
          </div>
          <div className="grid grid-rows-2 lg:grid-rows-5 gap-4 col-span-3 lg:col-span-1 w-full h-screen">
            <TodoComponent tasks={tasks.task} />
            <TipsComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
