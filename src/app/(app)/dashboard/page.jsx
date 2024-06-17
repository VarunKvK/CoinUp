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
import Budget from "@/models/budget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";

export default async function Dashboard() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const profile = await Profile.findOne({ owner: session?.user.email });
  const username = profile?.uri;
  const tasks = await Todo.findOne({ owner: session?.user?.email });
  const budget = await Budget.findOne({ owner: session?.user.email });

  return (
    <main>
      <div className="w-full mx-auto p-6 lg:overflow-hidden">
        <div className="grid lg:grid-cols-4 gap-6 w-full h-full">
          <div className="grid grid-rows-5 lg:grid-rows-6 col-span-3 h-screen">
            <UsernameComponent username={username} />
            <div className="grid grid-rows-2 lg:grid-rows-3 gap-8 lg:gap-6 row-span-5 ">
              <IncomeDataForm />
              <div className="grid gap-2 row-span-2 border border-black rounded-lg px-4 md:pt-4 pt-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-gray-500 font-medium lg:text-xl mb-2">
                    Monthly Budget Expenses
                  </h2>
                  {budget.budget?.length == 0 && (
                    <div className="flex gap-2 items-center">
                      <span className="md:text-gray-200 text-gray-300  font-medium flex gap-1 items-center text-sm md:text-md">No graphs<FontAwesomeIcon icon={faArrowRight}/></span>
                      <Link
                        href={"/budgets"}
                        className="px-4 py-2 rounded-lg text-white bg-black text-md "
                      >
                        <span className="md:hidden block">
                          <FontAwesomeIcon icon={faPlus}/>
                        </span>
                        <span className="hidden md:block">Create Budget</span>
                      </Link>
                    </div>
                  )}
                </div>
                <GraphVisuals />
              </div>
            </div>
          </div>
          <div className="grid grid-rows-3 lg:grid-rows-5 gap-4 col-span-3 lg:col-span-1 w-full h-screen">
            <TodoComponent tasks={tasks.task} />
            <TipsComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
