"use client";

import React from 'react';

type BtnProps = {
  text: string;
  onClick?: () => void;
}

const Btn: React.FC<BtnProps> = ({ text, onClick }) => {
  return (
    <button 
      className="px-4 py-2 bg-black text-white rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Btn;