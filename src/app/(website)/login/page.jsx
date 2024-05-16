import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInButtons from "@/components/buttons/SignInButton";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default async function Login() {
  const SignInOptions = [
    {
      id: 1,
      icon: faGoogle,
      urlVariable: "google",
      signinName: "Google",
    },
    // {
    //   id:2,
    //   icon: faGithub,
    //   urlVariable: "github",
    //   signinName:"Github"
    // },
  ];
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <main className="max-w-auto mx-auto flex justify-center items-center">
      <div className="mt-10">
        <div className="">
          <h1 className="text-4xl font-regular text-center">Lets improve!</h1>
          <p className="text-lg mt-2 text-gray-300 font-regular text-center">
            We control your expenses
          </p>
        </div>
        <div className="mt-20">
          <form action="">
            <div className="grid mb-6">
              <label htmlFor="email" className="text-md">
                Email
              </label>
              <input
                type="email"
                name="emailinput"
                id="email"
                className="login_form_input border-b border-black py-2 mt-4"
                placeholder="joedoe@gmail.com"
              />
            </div>
            <button className="w-full bg-black text-white rounded-xl px-10 py-4 mb-4">
              LogIn
            </button>
          </form>
          <p className="text-center text-gray-400 text-lg mb-4">Or</p>
          <div className="grid grid-cols-2 gap-4">
            {SignInOptions.map((option) => {
              return (
                <SignInButtons
                  key={option.id}
                  icon={option.icon}
                  urlVariable={option.urlVariable}
                  signinName={option.signinName}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
