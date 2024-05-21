"use client";

import { useState } from "react";
import ProfileSettings from "@/actions/ProfileSettings";
import toast from "react-hot-toast";
import Submit from "../buttons/Submit";
import SubmitNotifier from "../toasterComponents/SubmitNotifier";
import ErrorNotifier from "../toasterComponents/ErrorNotifier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";

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
      <div className={focus ? "grid md:-mt-5 " : "relative grid items-center"}>  
        {focus ? (
          <label htmlfor="username" className="text-gray-200 md:text-sm text-xs hidden md:block">
            Change username
          </label>
        ) : null}
        <button type="button" onClick={handleFocus} className={focus ? "hidden" :"md:hover:bg-gray-200 absolute md:-top-7  md:right-0 -right-6 p-2 rounded-full md:bg-gray-100 flex gap-1 items-center justify-center"}>
          <span className="text-gray-500 text-xs md:block hidden">Edit Username</span>
          <FontAwesomeIcon icon={faPencil} className="md:hover:text-gray-600 md:text-gray-500 text-black"/>
        </button>
        <input
          name="username"
          id="username"
          placeholder="Username"
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          defaultValue={username}
          className="text-2xl md:text-4xl text-black w-[12rem] md:w-[18rem] outline-none p-1 underline"
        />
      </div>
      {focus && (
        <Submit>
          <FontAwesomeIcon icon={faCheck} className="text-white md:hidden block"/>
          <span className="hidden md:block">Save</span>
        </Submit>
      )}
    </form>
  );
}
