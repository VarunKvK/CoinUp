import Todo from '@/models/todo';
import mongoose from 'mongoose';

export async function POST(req) {
    try{const body = await req.json()
    const {index,completed}=body

    await mongoose.connect(process.env.MONGODB_URI)
    const result=await Todo.findOneAndUpdate({'task._id':index},{
        $set: {'task.$.completed':completed}},
        {new: true})
    if(!result){
        return Response.json({message:"Task was not updated successfully"}, { status: 404 })
    }
    return Response.json({ message: 'Task updated successfully', result });}catch(err){
        console.log(err)
        return Response.json({message:"Internal server error"}, { status: 500 })
    }
}
