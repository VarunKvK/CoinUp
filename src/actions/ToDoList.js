"use server";

import mongoose from "mongoose";
import Todo from "@/models/todo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function TodoList(formData) {
  const task = formData.get("task");
  const tasks = {
    title: task,
    completed: false,
    date: new Date(),
  };
  try {
    const session = await getServerSession(authOptions);
    mongoose.connect(process.env.MONGODB_URI);

    let todo = await Todo.findOne({ owner: session?.user?.email });

    if (!todo) {
      await Todo.create({
        owner: session?.user?.email,
        task: [tasks],
      });
      const created="CREATED"
      return created
    } else {
      
      await Todo.findOneAndUpdate(
        { owner: session?.user?.email },
        {
          $push: {
            task: tasks,
          },
        },
        { new: true, upsert: true }
      );
      const updated="UPDATE"
      return updated
    }
  } catch (e) {
    console.log(e);
  }
}
