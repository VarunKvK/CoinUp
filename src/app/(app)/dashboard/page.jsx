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
import CheckBok from "@/components/buttons/CheckBox";

export default async function Dashboard() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const profile = await Profile.findOne({ owner: session?.user.email });
  const username = profile?.uri;
  const tasks = await Todo.findOne({ owner: session?.user?.email });
  

  return (
    <main>
      <div className="max-w-8xl p-6 h-[88vh]">
        <div className="grid grid-cols-4 gap-8 w-full h-full">
          <div className="grid rows-3 col-span-3 h-full">
            <div className="">
              <div className="">
                <CurrentDate />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-4xl flex text-gray-400">Hello</span>
                  <UsernameForm username={username} />
                </div>
                <div className="grid">
                  <Logout />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-4 h-full">
            <div className="p-4 row-span-2  border border-black rounded-xl">
              <div className="p-2 ">
                <h1 className="text-2xl mb-4">
                  Weekly <span className="italic font-medium">Goals</span>
                </h1>
                <div className="max-h-48 overflow-y-auto rounded scrollbar-thin">
                  {tasks.task.map((t, index) => (
                    <div
                      key={index}
                      className="p-2 border-b border-gray-200 flex items-center last:border-b-0"
                    >
                      <CheckBok checked={t.completed} index={index}/>
                      {t.title}
                    </div>
                  ))}
                </div>
              </div>
              <ToDoForm />
            </div>
            <div className="bg-black p-6 rounded-lg">
              <h1 className="text-white text-2xl">Tips for you</h1>
              <div className="mt-2 grid grid-auto gap-4 max-h-[105px] overflow-y-auto rounded scrollbar-thin">
                <li className="list-none text-white text-sm p-2 border-b border-gray-200 last:border-b-0">To change the username, just click on you username.</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
