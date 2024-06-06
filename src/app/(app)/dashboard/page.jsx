import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/models/profile";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import Todo from "@/models/todo";
import UsernameComponent from "@/components/formItems/UsernameComponent";
import TipsComponent from "@/components/formItems/TipsComponent";
import TodoComponent from "@/components/formItems/TodoComponent";
import IncomeDataForm from "@/components/forms/IncomeData";

export default async function Dashboard() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const profile = await Profile.findOne({ owner: session?.user.email });
  const username = profile?.uri;
  const tasks = await Todo.findOne({ owner: session?.user?.email });

  return (
    <main>
      <div className="w-full mx-auto p-6 h-[88vh]">
        <div className="grid lg:grid-cols-4 gap-8 w-full h-full">
          <div className="grid grid-rows-6 gap-8 col-span-3 h-full">
            <UsernameComponent username={username} />
            <div className="grid grid-rows-2 lg:grid-rows-3 gap-4 lg:gap-8 row-span-5">
              <IncomeDataForm/>
              <div className="grid grid-rows-2 lg:grid-cols-2 gap-4 lg:gap-8 row-span-2">
                <div className="bg-gray-400"></div>
                <div className="bg-gray-400"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4 col-span-3 lg:col-span-1 w-full h-full">
            <TodoComponent tasks={tasks.task} />
            <TipsComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
