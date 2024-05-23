"use client";
import { useEffect } from "react";

export default function GoalPage() {
  useEffect(() => {
    const fetchTask = async () => {
      const result = await fetch("/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(await result.json());
    };
    fetchTask()
  },[]);
  return (
    <div className="p-6">
      <div className="grid grid-auto">
        {/* <TodoComponent tasks={todoTasks?.task}/> */}
      </div>
    </div>
  );
}
