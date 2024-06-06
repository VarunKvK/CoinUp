"use client";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Submit from "../buttons/Submit";
import toast from "react-hot-toast";

export const BudgetModal = ({ budgets }) => {
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [budgetCost, setBudgetCost] = useState("");
  const [loading, setLoading] = useState(true);

  function handleBudgetName(e) {
    setBudgetName(e.target.value);
  }
  function handleBudgetCost(e) {
    setBudgetCost(e.target.value);
  }
  function addBudget() {
    const newBudget = {
      name: budgetName,
      cost: budgetCost,
    };
    setBudgetInfo([...budgetInfo, newBudget]);
    setBudgetName("");
    setBudgetCost("");
  }

  function removeBudgetInfo(name){
    setBudgetInfo(budgetInfo.filter((budget) => budget.name!== name))
  }

  async function handleSubmit(){
    const response=await fetch("/api/addbudgetInfo",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id:budgets,
        budgetDetails:budgetInfo
      })
    })
    setLoading(false)
  }
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center gap-4 justify-between pb-4 md:pb-6">
        <h1 className="text-lg md:text-xl md:font-medium text-black">
          Add your budgets
        </h1>
        <button
          onClick={addBudget}
          type="button"
          className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <span className="hidden md:block">Add</span>
          <FontAwesomeIcon icon={faAdd} />
        </button>
      </div>
      <form className="" action="">
        <div className="grid grid-cols-2 gap-16 pb-4 border-b-1 last:border-b-0">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-black">
              Name
            </label>
            <input
              name="budgetname"
              id="name"
              value={budgetName}
              onChange={(e) => handleBudgetName(e)}
              type="text"
              className="p-1 border-b border-black outline-none text-black"
              placeholder="Bread"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cost" className="text-black">
              Cost
            </label>
            <input
              name="budgetcost"
              id="cost"
              type="text"
              value={budgetCost}
              onChange={(e) => handleBudgetCost(e)}
              className="p-1 border-b border-black outline-none ring-black text-black"
              placeholder="₹56"
            />
          </div>
        </div>
        {budgetInfo.length > 0 && (
          <div className="p-4 grid overflow-y-auto max-h-30 gap-2 pb-4 border border-black rounded-lg">
            {budgetInfo?.map((info,index) => {
              return (
                <div key={index} className="flex items-center justify-between w-full border-b pb-2 last:border-b-0">
                  <p className="font-semibold capitalize">{info.name}</p>
                  <p className="font-medium">₹{info.cost}</p>
                  <FontAwesomeIcon className="cursor-pointer" icon={faTrash} onClick={()=>removeBudgetInfo(info.name)}/>
                </div>
              );
            })}
          </div>
        )}
        <button type="submit" onClick={handleSubmit} className="text-white bg-black px-2 py-1 rounded-lg  w-full p-2 mt-6 md:py-2 ">
          {loading ? <span>Create</span>:<span>Creating</span>}
        </button>
      </form>
    </div>
  );
};
