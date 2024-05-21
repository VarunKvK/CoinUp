import Logout from "../buttons/LogOut";
import UsernameForm from "../forms/UsernameForm";
import CurrentDate from "../homeNavigations/datetime";

export default function UsernameComponent({username}){
    return(
        <div className="">
              <div className="">
                <CurrentDate />
              </div>
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center md:gap-2 gap-1">
                  <span className="text-2xl md:text-4xl flex text-gray-400">Hello</span>
                  <UsernameForm username={username} />
                </div>
                <div className="grid">
                  <Logout />
                </div>
              </div>
            </div>
    )
}