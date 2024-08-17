"use client";

import React from 'react';

type BtnProps = {
  text: string;
}

const Btn: React.FC<BtnProps> = ({ text }) => {
  return (
    <button className="px-4 py-2 bg-black text-white rounded">
      {text}
    </button>
  );
};

export default Btn;