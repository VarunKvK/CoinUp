"use client";
import CheckBox from "@/components/buttons/CheckBox";
import ToDoForm from "@/components/forms/ToDoForm";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function GoalPage() {
  const [groupData, setGroupData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTask = async () => {
      const result = await fetch("/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!result.ok) {
        throw new Error("Task failed to fetch");
      }
      const data = await result.json();
      setGroupData(data);
      setLoading(false);
    };
    fetchTask();
  }, []);
  return (
    <div className="max-w-8xl mx-auto p-6">
      {!loading && (
        <>
          <div className="mb-4 p-4 border border-black rounded-lg">
            <h2 className="text-lg ">Add new task</h2>
            <ToDoForm />
          </div>
          <div className="text-xl mb-2 mt-6 font-medium">Your Goals</div>
        </>
      )}
      {loading && (
        <div className="w-full md:text-4xl text-lg font-semibold flex justify-center items-center h-full">
          Loading...
        </div>
      )}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1280: 4 }}
      >
        <Masonry columnsCount={3} gutter="2rem">
          {!loading &&
            (Object.keys(groupData).length > 0 ? (
              Object.keys(groupData).map((date) => (
                <div key={date} className="p-8 border border-black rounded-lg">
                  <h1 className="text-3xl text-gray-500 font-medium">{date}</h1>
                  <div className="mt-4">
                    <ul className="max-h-48 overflow-y-auto rounded scrollbar-goal-thin">
                      {groupData[date].map((data) => (
                        <div
                          key={data._id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <CheckBox
                              checked={data.completed}
                              index={data._id}
                            />
                            <li>{data.title}</li>
                          </div>
                          {data.completed === true && (
                            <span className="text-gray-300 font-medium md:text-xs">
                              Completed
                            </span>
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center text-gray-300">No goals created...</div>
            ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
