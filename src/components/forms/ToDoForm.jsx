'use client'
import TodoList from "@/actions/ToDoList";
import toast from "react-hot-toast";
import ErrorNotifier from "../toasterComponents/ErrorNotifier";

export default function ToDoForm() {

  async function handleSubmit(formData) {
    const task = formData.get("task");

    if (!task) {
      toast.custom((t) => {
        return <ErrorNotifier t={t} message={"Task cannot be empty!"} functionText={"Close"}/>;
      });
      return
    }
    await TodoList(formData);
    toast.success("Task Created! Refresh the page ")
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
