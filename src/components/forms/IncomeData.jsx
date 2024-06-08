import DataInput from "../formItems/DataInput";
import EditableInput from "../formItems/InputIncome";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/models/profile";


export default async function IncomeDataForm() {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const session = await getServerSession(authOptions);
  const incomeData = await Profile.findOne({ owner: session?.user.email });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <DataInput className="col-span-2 lg:col-span-1">
        <label htmlFor="income" className="text-gray-500 font-medium lg:text-xl">
          Income
        </label>
        <EditableInput
          id="income"
          name="income"
          placeholder="20,00,000"
          defaultvalue={incomeData?.moneydata[0]?.income}
        />
      </DataInput>
      <DataInput>
        <label htmlFor="expenditure" className="text-gray-500 font-medium lg:text-xl">
          Expenditure
        </label>
        <EditableInput
          id="expenditure"
          name="expenditure"
          placeholder="2000"
          defaultvalue={incomeData?.moneydata[0]?.expenditure}
        />
      </DataInput>
      <DataInput>
        <label className="font-medium lg:text-xl text-gray-500">Balance</label>
        <div className="flex items-center gap-1 font-medium lg:font-regular">
          <span className="text-2xl">₹</span>
          <p className="text-2xl lg:text-3xl">{incomeData?.moneydata[0]?.balance || 0}</p>
        </div>
      </DataInput>
    </div>
  );
}
