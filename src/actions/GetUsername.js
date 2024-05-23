'use server'

import Profile from "@/models/profile"
import mongoose from "mongoose"

export default async function SetUsername({session}){
    mongoose.connect(process.env.MONGODB_URI)
    await Profile.create({
        uri:session?.user.name,
        owner:session?.user.email
    })
}