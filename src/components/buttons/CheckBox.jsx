"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import CongratsNotifier from "../toasterComponents/Congrats";

export default function CheckBox({checked,index}) {
  const [isChecked,setChecked]=useState(checked)
    async function handleChange(){
      setChecked(!isChecked)
      try{
        const response = await fetch("/api/updateTask",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            completed:!isChecked,
            index
          })
        })
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
      }catch(e){
        setChecked(checked);
        console.log(`Error in CheckBox.jsx ${e}`)
        throw(e)
      }

    }
  return (
    <input
      type="checkbox"
      className="mr-4  custom-checkbox"
      checked={isChecked}
      onChange={() => handleChange()}
    />
  );
}
