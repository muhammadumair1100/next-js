"use client";
import React from "react";

interface Props {
  text: string;
}

export default function Button({ text }: Props) {
  return (
    <button
      className="bg-blue-300 mt-5 text-black font-bold px-5 py-1.5 rounded-md"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        alert(`${text} was clicked!`)
      }
    >
      {text}
    </button>
  );
}
