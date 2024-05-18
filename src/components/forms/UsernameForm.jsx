"use client";

import { useState } from "react";
import ProfileSettings from "@/app/actions/ProfileSettings";
import toast from "react-hot-toast";

export default function UsernameForm({ username }) {
  const [focus, setFocus] = useState(false);
  const [taken, settaken] = useState(false)
  function handleFocus() {
    setFocus(true);
  }
  function handleBlur() {
    setTimeout(() => {
      if (!document.activeElement || document.activeElement.tagName !== "BUTTON") {
        setFocus(false);
      }
    }, 0);
  }
  function handleMouseDown(e) {
    e.preventDefault();
  }

  async function handleUsername(formData){
    const result= await ProfileSettings(formData)
    settaken(result===false)
    if(result){
        toast.success("Saved the username")
    }
  }
  return (
    <form action={handleUsername} className="flex items-center">
      <div className={focus ? "grid -mt-5 ":"grid"}>
        {
            focus ? (<label htmlfor="username" className="text-gray-200 text-sm">
            Change username
          </label>):null
        }
        <input
        name="username"
          id="username"
          placeholder="Username"
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          defaultValue={username}
          className="text-4xl text-black w-[18rem] outline-none border-b  border-black p-1"
        />
        {taken && (
            <span className="mt-2 text-red-400 text-sm p-2 rounded-lg border border-red-400 bg-red-200">The username is taken</span>
        )}
      </div>
      {focus && (
        <button onMouseDown={handleMouseDown} type="submit" className="text-white ml-2 bg-black px-4 py-2 rounded-lg">
          Save
        </button>
      )}
    </form>
  );
}
