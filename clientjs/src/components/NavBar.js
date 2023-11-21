// components/Navbar.js
"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    // nav top of page
    <nav className="flex justify-between items-center w-full h-32 fixed top-0 p-4 bg-primary-yellow">
      <div className="font-bold text-3xl items-left mt-[50px] p-3">
        <Link href="/">.Compass</Link>
      </div>
      <div className="flex items-left w-2/4 mt-[50px] p-3">
        <input
          type="text"
          placeholder="Search courses, professor, departments..."
          className="border border-black rounded-full focus:outline-none w-full h-10 p-2"
        />
      </div>
      <div className="mt-[50px] p-3">
        <Link href="#">Leave a review</Link>
      </div>
      <div className="border border-black mt-[50px] rounded-full">
        <Link href="#">
          <img
            src="/profile-picture.jpg"
            alt="Profile"
            className="rounded-full w-[60px] h-[60-px]"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
