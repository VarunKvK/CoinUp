"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Budget from "@/models/budget";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function POST(req) {
  const body = await req.json();
  const { id } = body;
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const response = await Budget.findOneAndUpdate(
    { owner: session?.user.email },
    { $pull: { budget: { _id: id } } }
  );

  return Response.json(response);
}
