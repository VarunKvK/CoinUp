"use client";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Submit from "../buttons/Submit";

export function BudgetForm({setBudgets,budgets}) {
  const [title, setTitle] = useState("");

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
      window.location.reload();
    }
    setTitle("");
  }
  return (
    <div className="rounded-lg border border-black mb-4 p-4">
      <h2 className="text-lg mb-2">Add new budget</h2>
      <form
        action={handleBudgetTitle}
        className="flex items-center justify-between gap-8"
      >
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          name="budgetTitle"
          value={title}
          placeholder="Create budget title"
          className="p-1 border-b border-black w-full outline-none relative"
        />
        <Submit className="flex gap-1 items-center p-2 px-4" process={'Creating'}>
          <span>Create</span>
          <FontAwesomeIcon icon={faCheck} />
        </Submit>
      </form>
    </div>
  );
}
