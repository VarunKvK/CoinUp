'use server'
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import Profile from "@/models/profile";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function ProfileSettings(formData){
    const username=formData.get('username');
    console.log(username);
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        const existingUsername=await Profile.findOne({uri:username})
        if(existingUsername){
            return false;
        }else{
            const session= await getServerSession(authOptions);
            await Profile.updateOne({owner:session?.user.email},{uri:username}) 
            return true;
        }
    }catch(err){
        console.log(`Error in ProfileSettings.jsx ${err}`)
        throw(err)
    }

}