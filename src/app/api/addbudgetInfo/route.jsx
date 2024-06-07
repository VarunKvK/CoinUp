import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Budget from "@/models/budget";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ message: "No user session found" }), { status: 401 });
    }

    // Parse the request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return new Response(JSON.stringify({ message: "Invalid JSON input" }), { status: 400 });
    }

    const { id, budgetDetails } = body;
    if (!id || !Array.isArray(budgetDetails)) {
      return new Response(JSON.stringify({ message: "Invalid input data" }), { status: 400 });
    }

    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI);

    // Update the budget entries
    for (const budget of budgetDetails) {
      await Budget.findOneAndUpdate(
        {
          owner: session.user.email,
          "budget._id": id,
        },
        {
          $push: {
            "budget.$.entries": {
              title: budget.name,
              amount: budget.cost,
            },
          },
        },
        { new: true }
      );
    }
    return new Response(JSON.stringify({ success: true}), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ message: "No user session found" }), { status: 401 });
    }

    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI);

    // Calculate the total budget amount
    const result = await Budget.aggregate([
      { $match: { owner: session.user.email } },
      { $unwind: "$budget" },
      { $unwind: "$budget.entries" },
      {
        $group: {
          _id: "$budget._id",
          totalAmount: { $sum: "$budget.entries.amount" },
        },
      },
      {
        $project: {
          _id: 0,
          budgetId: "$_id",
          totalAmount: 1,
        },
      },
    ]);

    return new Response(JSON.stringify({ success: true, totalAmount: result }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}