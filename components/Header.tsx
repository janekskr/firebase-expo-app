import Link from "next/link";
import React from "react";

import { IoPlanetOutline } from "react-icons/io5";

export default function Header() {
  return (
    <div className="flex w-full items-center justify-between p-4 px-20">
      <Link href="/">
        <IoPlanetOutline size={60} color="white" />
      </Link>

      <ul className="flex gap-10 text-xl font-semibold">
      <li className="rounded-[20px] border-2 border-white py-3 px-5 cursor-pointer hover:scale-105 transition">Login</li>  
      <li className="rounded-[20px] border-2 border-white py-3 px-5 cursor-pointer hover:scale-105 transition">Register</li>  
      </ul>
    </div>
  );
}
