import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "@/components/buttons/LogOut";
import UsernameForm from "@/components/forms/UsernameForm";
import CurrentDate from "@/components/homeNavigations/datetime";
import Profile from "@/models/profile";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const profile = await Profile.findOne({ owner: session?.user.email });
  const username = profile?.uri;

  return (
    <div className="max-w-6xl p-6">
      <div className="">
        <CurrentDate/>
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
  );
}
