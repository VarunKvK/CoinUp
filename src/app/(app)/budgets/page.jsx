"use client";

import { BudgetForm } from "@/components/forms/BudgetForms";
import { BudgetModal } from "@/components/modals/budgetModal";
import {
  faAdd,
  faCheck,
  faClock,
  faClose,
  faDumpster,
  faGhost,
  faHippo,
  faIndianRupeeSign,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [totalSummation, setSummation] = useState([]);
  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await fetch("/api/budget");
      const data = await response.json();
      const newBudget = data.budgets;
      setBudgets(newBudget);
      setLoading(false);
    };

    fetchBudgets();

    const fetchSummation = async () => {
      const result = await fetch("/api/addbudgetInfo");
      const data = await result.json();
      const { totalAmount } = data;
      setSummation(totalAmount);
    };
    fetchSummation();
  }, []);

  function getSummationId(id) {
    const budgetTotal = totalSummation.find((total) => total.budgetId === id);
    return budgetTotal ? budgetTotal.totalAmount : 0;
  }
  async function removeBudget(budgetid) {
    const response = await fetch("/api/deleteBudget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: budgetid,
      }),
    });
    if (!response.ok) {
      throw new Error("Task failed to fetch");
    }
    await response.json();
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) => ({
        ...budget,
        budget: budget.budget.filter((b) => b._id !== budgetid),
      }))
    );
    setLoading(false);
    toast.success("Budget Deleted Successfully");
  }
  return (
    <div className="p-6">
      {!loading && (
        <div className="">
          <BudgetForm setBudgets={setBudgets} budgets={budgets} />
          <h1 className="text-xl font-medium mb-4">Your Budgets</h1>
          {/* //?Modal For Adding Budgets */}
          <div className="flex flex-col justify-center items-center w-full">
            <input id="modalCheck" className="hidden" type="checkbox" />
            <label
              htmlFor="modalCheck"
              className="backdrop fixed inset-0 bg-black/90 z-10 justify-center items-center hidden"
            ></label>
            <div className="modal hidden fixed z-20 p-6 md:p-0">
              <BudgetModal budgets={id} />
            </div>
          </div>
          {/* //?Modal For Adding Budgets */}
          {budgets && budgets.length > 0 ? (
            budgets.map((budget, index) => (
              <ResponsiveMasonry
                key={index}
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1280: 4 }}
              >
                <Masonry columnsCount={3} gutter="1.5rem">
                  {budget.budget &&
                    budget.budget.map((b) => (
                      <div className="flex flex-col" key={b._id}>
                        <div className="bg-black text-white p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span>{b.title}</span>
                            <div className="flex items-center gap-2">
                              <label
                                onClick={() => setId(b._id)}
                                htmlFor="modalCheck"
                                className="cursor-pointer bg-white text-black p-2 px-4 rounded-lg gap-1 flex items-center"
                              >
                                <span className="hidden md:block">Add</span>
                                <FontAwesomeIcon icon={faAdd} />
                              </label>
                              <button
                                onClick={() => removeBudget(b._id)}
                                className="transition-all md:hover:bg-white md:hover:text-black cursor-pointer border border-white md:border-white/40 text-white md:text-white/40 py-2 px-4 rounded-lg gap-1 flex items-center"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        </div>
                        {b?.entries && b?.entries.length > 0 && (
                          <div className="bg-black text-white p-4 rounded-lg flex flex-col">
                            <div className="flex items-center w-full justify-between px-2.5">
                              <p className="font-semibold text-white/50">
                                Name
                              </p>
                              <p className="font-semibold text-white/50">
                                Amount
                              </p>
                            </div>
                            <div className="border border-white overflow-y-auto max-h-30 rounded-lg p-2.5 mt-2 flex flex-col gap-2">
                              {b.entries.map((details, index) => (
                                <div
                                  key={index}
                                  className="flex items-center w-full justify-between"
                                >
                                  <p className="capitalize flex items-center gap-1">
                                    <FontAwesomeIcon
                                      icon={faGhost}
                                      className="text-white/70"
                                    />
                                    <span>{details.title}</span>
                                  </p>
                                  <p className="flex items-center gap-1">
                                    <FontAwesomeIcon
                                      icon={faIndianRupeeSign}
                                      className="text-white/70"
                                    />
                                    <span>{details.amount}</span>
                                  </p>
                                </div>
                              ))}
                              <div className="flex items-center justify-between border-t border-white/40 mt-2 px-1 py-2">
                                <span className="font-semibold text-white/70">
                                  Total
                                </span>
                                <span className="font-semibold flex items-center gap-1">
                                  <FontAwesomeIcon
                                    className="text-white/70"
                                    icon={faIndianRupeeSign}
                                  />
                                  {getSummationId(b._id)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-white/20 mt-2 pt-2">
                              <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faClock} />
                                <span className="">Created</span>
                              </div>
                              <span>{b.date.split("T")[0]}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </Masonry>
              </ResponsiveMasonry>
            ))
          ) : (
            <div>No budgets available</div>
          )}
        </div>
      )}
      {loading && (
        <div className="w-full md:text-4xl text-lg font-semibold flex justify-center items-center h-full">
          Loading...
        </div>
      )}
    </div>
  );
}
