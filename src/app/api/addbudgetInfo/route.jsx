import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Budget from "@/models/budget";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("No user session found");
  }
  const body = await req.json();
  const { id, budgetDetails } = body;
  let result
  for (const budget of budgetDetails){
   result= await Budget.findOneAndUpdate(
        {
          owner: session.user.email,
          "budget._id": id,
        },
        {
          $push: {
            "budget.$.entries": {
              title: budget.name,
              amount:budget.cost,
            },
          },
        },
        { new: true }
      );
  } 
  return Response.json(true,result);
}
