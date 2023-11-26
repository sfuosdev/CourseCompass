// components/Navbar.js
"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-primary-yellow flex items-center justify-between w-full h-[8rem] fixed top-0 z-10 space-x-[0.5rem] pr-[1rem]">
      <div
        className="absolute justify-start font-bold items-left mt-[-3rem] p-[1.5rem] text-[4vw]
                      md:relative md:inline md:mt-[3.125rem]
                      xl:text-5xl  
      "
      >
        <Link href="/">.Compass</Link>
      </div>
      <div
        className="flex flex-row w-[50vw] mt-[3.125rem] p-[1rem]
      "
      >
        <input
          type="text"
          placeholder="Search courses, professor, departments..."
          className="border border-black rounded-full focus:outline-none w-[40rem] h-[2.5rem] p-[1rem]"
        />
        <svg
          className="relative hidden left-[-3rem] mt-[0.5rem]
                                lg:inline
        "
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            d="M19.125 19.125L13.375 13.375M1.875 8.58333C1.875 9.46428 2.04852 10.3366 
          2.38564 11.1505C2.72277 11.9644 3.2169 12.7039 3.83983 13.3268C4.46275 13.9498 5.20227 
          14.4439 6.01617 14.781C6.83006 15.1182 7.70238 15.2917 8.58333 15.2917C9.46428 15.2917 
          10.3366 15.1182 11.1505 14.781C11.9644 14.4439 12.7039 13.9498 13.3268 13.3268C13.9498 
          12.7039 14.4439 11.9644 14.781 11.1505C15.1182 10.3366 15.2917 9.46428 15.2917 8.58333C15.2917 
          7.70238 15.1182 6.83006 14.781 6.01617C14.4439 5.20227 13.9498 4.46275 13.3268 3.83983C12.7039 
          3.2169 11.9644 2.72277 11.1505 2.38564C10.3366 2.04852 9.46428 1.875 8.58333 1.875C7.70238 1.875 
          6.83006 2.04852 6.01617 2.38564C5.20227 2.72277 4.46275 3.2169 3.83983 3.83983C3.2169 4.46275 
          2.72277 5.20227 2.38564 6.01617C2.04852 6.83006 1.875 7.70238 1.875 8.58333Z"
            stroke="#ADADAD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="mt-[3.125rem] p-[1rem]">
        <Link href="">Leave a review</Link>
      </div>
      <div className="border border-black mt-[3.125rem] rounded-full m-2">
        <Link href="">
          <img
            src="/profile-picture.jpg"
            alt="Profile"
            className="rounded-full w-[10vw] md:w-[6vw] lg:w-[4vw] h-auto min-h-[4rem] min-w-[4rem]"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
