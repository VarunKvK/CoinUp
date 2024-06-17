"use client";

import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";
import Submit from "../buttons/Submit";
import toast from "react-hot-toast";
import SubmitNotifier from "../toasterComponents/SubmitNotifier";
import ErrorNotifier from "../toasterComponents/ErrorNotifier";
import IncomeData from "../../actions/GetIncomeInput";

export default function EditableInput({ id, name, placeholder, defaultvalue }) {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);

  function handleFocus() {
    setFocus(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
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

  async function handleSubmit() {
    const formData = new FormData();
    formData.set(name, inputRef.current.value);
    const result = await IncomeData(formData);
    if (result) {
      toast.custom((t) => {
        return (
          <SubmitNotifier
            t={t}
            message={`${
              inputRef.current.name.charAt(0).toUpperCase() +
              inputRef.current.name.slice(1)
            } updated successfully`}
            functionText={"Close"}
          />
        );
      });
    } else {
      toast.custom((t) => {
        return (
          <ErrorNotifier
            t={t}
            message={`${
              inputRef.current.name.charAt(0).toUpperCase() +
              inputRef.current.name.slice(1)
            } updated unsuccessfully`}
            functionText={"Close"}
          />
        );
      });
    }
  }

  return (
    <form
      action={handleSubmit}
      className="max-w-4xl flex items-center w-full justify-between"
    >
      <div className="flex items-center gap-1">
        <span className="text-2xl">₹</span>
        <input
          id={id}
          type="text"
          name={name}
          defaultValue={defaultvalue}
          className="text-2xl font-medium lg:font-regular lg:text-3xl underline text-black outline-none lg:w-[10rem] w-[8rem]"
          placeholder={placeholder}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {focus ? (
        <Submit process={'Saving..'} className="bg-black text-white lg:px-2 rounded-lg">
          <FontAwesomeIcon icon={faCheck} />
        </Submit>
      ) : (
        <button
          onClick={handleFocus}
          type="button"
          className="flex items-center gap-1 border border-black px-2 py-1 text-black rounded-lg"
        >
          <FontAwesomeIcon icon={faPencil} />
          <span className="hidden xl:block">Edit</span>
        </button>
      )}
    </form>
  );
}
