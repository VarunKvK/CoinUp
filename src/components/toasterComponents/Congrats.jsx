import React from 'react';
import toast from 'react-hot-toast';

const CongratsNotifier = ({ message,emoji }) => {
  return (

    <div
      className='p-2 border border-green-400 rounded-lg bg-green-200 text-green-400 flex items-center'
    >
    <span>{emoji}</span>
      <span>{message}</span>
    </div>
  );
};

export default CongratsNotifier;
