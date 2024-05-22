"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import Profile from "@/models/profile";
import mongoose from "mongoose";

export default async function IncomeData(formData) {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const income = formData.get("income");
  const expenditure = formData.get("expenditure");

  if (!session?.user?.email) {
    throw new Error("No user session found");
  }

  const profile = await Profile.findOne({ owner: session.user.email });

  if (!profile) {
    throw new Error("Profile not found");
  }
  const updateData = {};

  if (income) {
    updateData["moneydata.income"] = income;
  }

  if (expenditure) {
    updateData["moneydata.expenditure"]= expenditure;
  }

  if (Object.keys(updateData).length > 0) {
    await Profile.updateOne(
      { owner: session?.user.email },
      {
        $set: updateData,
      }
    );
    return true;
  }
}
