import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";

export default function EditableInput({ id, name, placeholder }) {
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

  return (
    <div className="flex items-center w-full justify-between">
      <input
        id={id}
        type="text"
        name={name}
        className="text-2xl font-medium underline text-gray-500 outline-none w-[10rem]"
        placeholder={placeholder}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {focus ? (
        <button type="submit" className="bg-black p-2 text-white rounded-lg">
          <FontAwesomeIcon icon={faCheck} />
        </button>
      ) : (
        <button
          onClick={handleFocus}
          type="button"
          className="bg-black p-2 text-white rounded-lg"
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
      )}
    </div>
  );
}
