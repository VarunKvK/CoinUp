import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "@/components/buttons/LogOut";
import ToDoForm from "@/components/forms/ToDoForm";
import UsernameForm from "@/components/forms/UsernameForm";
import CurrentDate from "@/components/homeNavigations/datetime";
import Profile from "@/models/profile";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import Todo from "@/models/todo";
import toast from "react-hot-toast";
import CheckBox from "@/components/buttons/CheckBox";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataInput from "@/components/formItems/DataInput";
import UsernameComponent from "@/components/formItems/UsernameComponent";
import TipsComponent from "@/components/formItems/TipsComponent";
import TodoComponent from "@/components/formItems/TodoComponent";

export default async function Dashboard() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const profile = await Profile.findOne({ owner: session?.user.email });
  const username = profile?.uri;
  const tasks = await Todo.findOne({ owner: session?.user?.email });

  return (
    <main>
      <div className="max-w-8xl p-6 h-[88vh]">
        <div className="grid md:grid-cols-4 gap-8 w-full h-full">
          <div className="grid grid-rows-6 gap-8 col-span-3 h-full">
            <UsernameComponent username={username} />
            <div className="grid grid-rows-2 md:grid-rows-3 gap-4 md:gap-8 row-span-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                <DataInput className={" col-span-2 md:col-span-1"}>
                  <h1 className="font-medium md:text-xl">Income</h1>
                  <input
                    type="text"
                    className="text-2xl font-medium underline text-gray-500 outline-none w-[10rem]"
                    placeholder="₹20,00,000"
                  />
                </DataInput>
                <DataInput>
                  <h1 className="font-medium md:text-xl">Expenditure</h1>
                  <input
                    type="text"
                    className="text-2xl font-medium underline text-gray-500 outline-none w-[10rem]"
                    placeholder="₹2000"
                  />
                </DataInput>
                <DataInput>
                  <h1 className="font-medium md:text-xl">Balance</h1>
                  <p className="text-2xl font-medium">₹0</p>
                </DataInput>
              </div>
              <div className="grid grid-rows-2 md:grid-cols-2 gap-4 md:gap-8 row-span-2">
                <div className="bg-gray-400"></div>
                <div className="bg-gray-400"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-4 h-full">
            <TodoComponent tasks={tasks}/>
            <TipsComponent/>
          </div>
        </div>
      </div>
    </main>
  );
}
