import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Todo from "@/models/todo";
import { getServerSession } from "next-auth";

export default async function Segregation() {
  const server = await getServerSession(authOptions);
  if (!server?.user.email) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const todo = await Todo.findOne({ owner: server?.user?.email });

  if(!todo){
    res.status(404).json({ message: "No tasks found" });
    return;
  }

  const groupTasks=todo.task.reduce((acc, task) =>{
    const date=task.date.toISOString().split('T')[0]
    if(!acc[date]) acc[date] =[]
    acc[date].push(task)
    return acc
  },{})

  res.json(groupTasks)
}
