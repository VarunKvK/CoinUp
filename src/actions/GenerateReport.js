import jsPdf from "jspdf"
import html2canvas from "html2canvas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/models/profile";
import Todo from "@/models/todo";
import Budget from "@/models/budget";

const GenerateReport = async() => {
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSessionn(authOptions);
    const profile = await Profile.findOne({ owner: session?.user.email });
    const tasks = await Todo.findOne({ owner: session?.user?.email });
    const budget = await Budget.findOne({ owner: session?.user.email });
    console.log(profile?.uri)
}

export default GenerateReport