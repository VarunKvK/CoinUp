import React from 'react';
import toast from 'react-hot-toast';

const SubmitNotifier = ({ t,message,functionText }) => {
  return (

    <div
      className='p-2 border border-green-400 rounded-lg bg-green-200 text-green-400 flex items-center'
    >
      <span>{message}</span>
      <button
        className='p-2 ml-2 bg-green-400 rounded-lg text-white cursor-pointer'
        onClick={() => toast.dismiss(t.id)}
      >
        {functionText}
      </button>
    </div>
  );
};

export default SubmitNotifier;
