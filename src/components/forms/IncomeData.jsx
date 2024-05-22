"use client";
import { useRef, useState } from "react";
import DataInput from "../formItems/DataInput";
import EditableInput from "../formItems/InputIncome";


export default function IncomeData() {

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      <DataInput className="col-span-2 md:col-span-1">
        <label htmlFor="income" className="font-medium md:text-xl">
          Income
        </label>
        <EditableInput
          id="income"
          name="income"
          placeholder="₹20,00,000"
        />
      </DataInput>
      <DataInput>
        <label htmlFor="expenditure" className="font-medium md:text-xl">
          Expenditure
        </label>
        <EditableInput
          id="expenditure"
          name="expenditure"
          placeholder="₹2000"
        />
      </DataInput>
      <DataInput>
        <label className="font-medium md:text-xl">Balance</label>
        <p className="text-2xl font-medium">₹0</p>
      </DataInput>
    </div>
  );
}
