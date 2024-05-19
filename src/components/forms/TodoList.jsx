import React from "react";

export default function ToDoForm() {
  const tasks = [
    "Task 1",
    "Task 2",
    "Task 3",
    "Task 4",
    "Task 5",
    "Task 6",
    "Task 7",
    "Task 8",
    "Task 9",
    "Task 10",
  ];

  return (
    <div className="">
      <h1 className="text-2xl mb-4">
        Weekly <span className="italic font-medium">Goals</span>
      </h1>
      <div className="max-h-40 overflow-y-auto p-2 rounded scrollbar-thin">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="p-2 border-b border-gray-200 last:border-b-0"
          >
            {task}
          </div>
        ))}
      </div>
      <form className="grid grid-row-2 gap-2 mt-2 w-full">
        <input type="text" placeholder="Get a Ps5..." />
        <button
          type="submit"
          className="bg-black rounded-lg  text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </form>
    </div>
  );
}
