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
        "disabled:bg-gray-600 disabled:text-gray-200 text-white ml-2 bg-black px-4 py-2 rounded-lg" +
        className
      }
    >
      {pending && <span>Saving</span>}
      {!pending && children}
    </button>
  );
}
