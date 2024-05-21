import { useFormStatus } from "react-dom";

export default function Submit({ children, className= " " }) {
  const { pending } = useFormStatus();
  function handleMouseDown(e) {
    e.preventDefault();
  }

  return (
    <button
      onMouseDown={handleMouseDown}
      disabled={pending}
      type="submit"
      className={
        "disabled:bg-gray-600 disabled:text-gray-200 text-white ml-1 md:ml-2 bg-black px-2 py-1 md:px-4 md:py-2 rounded-lg" +
        className
      }
    >
      {pending && <span>Saving</span>}
      {!pending && children}
    </button>
  );
}
