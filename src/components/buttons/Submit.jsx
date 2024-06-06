import { useFormStatus } from "react-dom";

export default function Submit({children, className= " ",process }) {
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
        "disabled:bg-gray-600 disabled:text-gray-200 text-white bg-black px-2 py-1 rounded-lg " +
        className
      }
    >
      {pending && <span>{process}</span>}
      {!pending && children}
    </button>
  );
}
