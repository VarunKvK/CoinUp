import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "@/components/buttons/LogOut";
import UsernameForm from "@/components/forms/UsernameForm";
import ToDoForm from "@/components/forms/ToDoList";
import CurrentDate from "@/components/homeNavigations/datetime";
import Profile from "@/models/profile";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const profile = await Profile.findOne({ owner: session?.user.email });
  const username = profile?.uri;

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
          <div className="p-4 row-span-2 border border-black rounded-xl">
            <ToDoForm/>
          </div>
          <div className="bg-gray-300">
            Hello
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
