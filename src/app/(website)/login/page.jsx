import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GithubLogin from "@/components/buttons/githubLoginButton";
import GoogleLogin from "@/components/buttons/googleLoginButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
    const session= await getServerSession(authOptions)
    if(session){
        redirect("/")
    }
  return (
    <main className="max-w-auto mx-auto flex justify-center items-center">
      <div className="mt-10">
        <div className="">
          <h1 className="text-4xl font-regular text-center">
            Lets improve!
          </h1>
        </div>
        <div className="mt-20">
          <form action="">
            <div className="grid mb-6">
              <label htmlFor="email" className="text-md">Email</label>
              <input type="email" name="emailinput" id="email" className="login_form_input border-b border-black py-2 mt-4" placeholder="joedoe@gmail.com"/>
            </div>
            <button className="w-full bg-black text-white rounded-xl px-10 py-2 mb-4">LogIn</button>
          </form>
          <p className="text-center text-gray-400 text-lg mb-4">Or</p>
          <div className="grid grid-cols-2 gap-4">
            <GoogleLogin/>
            <GithubLogin/>
          </div>
        </div>
      </div>
    </main>
  );
}
