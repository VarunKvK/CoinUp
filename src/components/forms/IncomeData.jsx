import DataInput from "../formItems/DataInput";
import EditableInput from "../formItems/InputIncome";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/models/profile";

export default async function IncomeDataForm() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const incomeData = await Profile.findOne({ owner: session?.user.email });
  const balance =
    incomeData?.moneydata[0]?.income - incomeData?.moneydata[0]?.expenditure;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      <DataInput className=" col-span-2 md:col-span-1">
        <label htmlFor="income" className="font-medium md:text-xl">
          Income
        </label>
        <EditableInput
          id="income"
          name="income"
          placeholder="₹20,00,000"
          defaultvalue={incomeData?.moneydata[0]?.income}
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
          defaultvalue={incomeData?.moneydata[0]?.expenditure}
        />
      </DataInput>
      <DataInput>
        <label className="font-medium md:text-xl">Balance</label>
        <div className="flex items-center gap-1">
          <span className="text-2xl">₹</span>
          <p className="text-2xl md:text-3xl">{balance}</p>
        </div>
      </DataInput>
    </div>
  );
}
