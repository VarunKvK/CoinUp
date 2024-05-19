"use client";

import { useState } from "react";
import ProfileSettings from "@/actions/ProfileSettings";
import toast from "react-hot-toast";
import Submit from "../buttons/Submit";
import SubmitNotifier from "../toasterComponents/SubmitNotifier";
import ErrorNotifier from "../toasterComponents/ErrorNotifier";

export default function UsernameForm({ username }) {
  const [focus, setFocus] = useState(false);
  const [taken, settaken] = useState(false);
  function handleFocus() {
    setFocus(true);
  }
  function handleBlur() {
    setTimeout(() => {
      if (
        !document.activeElement ||
        document.activeElement.tagName !== "BUTTON"
      ) {
        setFocus(false);
      }
    }, 0);
  }

  async function handleUsername(formData) {
    const result = await ProfileSettings(formData);
    settaken(result === false);
    if (result) {
      toast.custom((t) => {
        return <SubmitNotifier t={t} message={"Username updated successfully"} functionText={"Close"}/>;
      });
    }else{
      toast.custom((t) => {
        return < ErrorNotifier t={t} message={"Username already exists!"} functionText={"Close"}/>;
      });
    }
  }
  return (
    <form action={handleUsername} className="flex items-center">
      <div className={focus ? "grid -mt-5 " : "grid"}>  
      {/* <div className="grid mt-5">   */}
        {focus ? (
          <label htmlfor="username" className="text-gray-200 text-sm">
            Change username
          </label>
        ) : null}
        <input
          name="username"
          id="username"
          placeholder="Username"
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          defaultValue={username}
          className="text-4xl text-black w-[18rem] outline-none p-1 underline"
        />
        {/* <label htmlfor="username" className="text-gray-200 text-sm">
            Change username
          </label> */}
      </div>
      {focus && (
        <Submit>
          <span>Save</span>
        </Submit>
      )}
    </form>
  );
}
