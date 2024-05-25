"use client";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function BudgetsPage() {
  const [title, setTitle] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading]=useState(true)

  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await fetch("/api/budget");
      const data = await response.json();
      const newBudget = data.budgets;
      setBudgets(newBudget);
      setLoading(false)
    };

    fetchBudgets();
  }, []);
  async function handleBudgetTitle() {
    const response = await fetch("api/budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });
    const result = await response.json();
    if (result) {
      setBudgets([...budgets, result]);
      toast.success("Budget created");
    }
    setTitle("");
  }
  return (
    <div className="p-6">
      {!loading && 
      <div className="">
      <h1 className="text-xl font-medium mb-4">Your Budgets</h1>
      <form
        action={handleBudgetTitle}
        className="rounded-lg border border-black p-4 flex items-center justify-between"
      >
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          name="budgetTitle"
          value={title}
          placeholder="Create budget title"
          className="p-1 border-b border-black w-full outline-none relative"
        />
        <button
          type="submit"
          className="bg-black text-white flex items-center relative gap-1 ml-16 p-2 px-4 rounded-lg"
        >
          <span>Create</span>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </form>

        {budgets && budgets.length > 0 ? (
          budgets.map((budget, index) => (
            <ResponsiveMasonry
              key={index}
              columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}
            >
              <Masonry columnsCount={3} gutter="2rem">
                {budget.budget && budget.budget.length > 0 ? (
                  budget.budget.map((b) => (
                    <div key={b._id} className="">
                      <div className="">{b.title}</div>
                    </div>
                  ))
                ) : (
                  <div>No entries available</div>
                )}
              </Masonry>
            </ResponsiveMasonry>
          ))
        ) : (
          <div>No budgets available</div>
        )}
        </div>
    } 
    {loading && (
        <div className="w-full md:text-4xl text-lg font-semibold flex justify-center items-center h-full">
          Loading...
        </div>
      )}
      </div>
);
}
