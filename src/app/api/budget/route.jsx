import Budget from "@/models/budget";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req, res) {
  const body = await req.json();
  const { title } = body;
  const session = await getServerSession(authOptions);
  try {
      await mongoose.connect(process.env.MONGODB_URI);
      const result = await Budget.findOne({ owner: session?.user.email });

    if (!result) {
      await Budget.create({
        owner: session?.user.email,
        budget: {
          title: title,
          entries: [],
        },
      });
    } else {
      await Budget.findOneAndUpdate(
        { owner: session?.user.email },
        {
          $push: {
            budget: {
              title: title,
              entries: [],
            },
          },
        },
        { new: true, upsert: true }
      );
    }

    return Response.json(true);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}


export async function GET(req,res) {
    const session = await getServerSession(authOptions);
  
    if (!session?.user?.email) {
      return Response.json({ message: 'Unauthorized' });
    }
  
    try {
      const budgets = await Budget.find({ owner: session?.user.email });
      return Response.json({ message: 'Task updated successfully', budgets });
    } catch (err) {
      console.log(err);
      return Response.json({ message: 'Internal server error' });
    }
  }