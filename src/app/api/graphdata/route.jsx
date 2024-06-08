import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Budget from "@/models/budget";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    const result = await Budget.aggregate([
      {
        $match: {
          owner: session?.user.email,
        },
      },
      {
        $unwind: {
          path: "$budget",
        },
      },
      {
        $unwind: {
          path: "$budget.entries",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$budget.date",
            },
            month: {
              $month: "$budget.date",
            },
          },
          totalAmount: {
            $sum: "$budget.entries.amount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    return Response.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal server error" });
  }
}
