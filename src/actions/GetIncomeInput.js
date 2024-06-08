"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import Profile from "@/models/profile";
import mongoose from "mongoose";

export default async function IncomeData(formData) {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("No user session found");
  }

  const profile = await Profile.findOne({ owner: session.user.email });

  if (!profile) {
    throw new Error("Profile not found");
  }

  const currentIncome = profile?.moneydata[0]?.income || 0;
  const currentExpenditure = profile?.moneydata[0]?.expenditure || 0;
  const income =
    formData.get("income") !== null
      ? parseFloat(formData.get("income"))
      : currentIncome;
  const expenditure =
    formData.get("expenditure") !== null
      ? parseFloat(formData.get("expenditure"))
      : currentExpenditure;
  const balance = income - expenditure;

  const updateData = {
    "moneydata.0.income": income,
    "moneydata.0.expenditure": expenditure,
    "moneydata.0.balance": balance,
  };

  if(updateData){
    await Profile.updateOne(
      { owner: session?.user.email},
      {
        $set: updateData,
      }
    );
    return true;
  }else{
    return false;
  }
}
