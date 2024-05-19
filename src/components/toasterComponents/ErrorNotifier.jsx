import React from 'react';
import toast from "react-hot-toast";

const ErrorNotifier=((t,message,functionText)=>{
    return(
        <div
      className='p-2 border border-red-400 rounded-lg bg-red-200 text-red-400 flex items-center'
    >
      <span>{message}</span>
      <button
        className='p-2 ml-2 bg-red-400 rounded-lg text-white cursor-pointer'
        onClick={() => toast.dismiss(t.id)}
      >
        {functionText}
      </button>
    </div>
    )
})

export default ErrorNotifier;