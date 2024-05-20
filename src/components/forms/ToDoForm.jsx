'use client'
import TodoList from "@/actions/ToDoList";
import toast from "react-hot-toast";

export default async function ToDoForm() {

  async function handleSubmit(formData) {
    await TodoList(formData);
    toast.success("Task Created")
  }
  return (
      <form action={handleSubmit} className="grid grid-row-2 gap-4 mt-4 w-full">
        <input
          type="text"
          name="task"
          placeholder="Get a Ps5..."
          className="p-2 border-b border-black outline-none"
        />
        <button
          type="submit"
          className="bg-black rounded-lg  text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </form>
  );
}
