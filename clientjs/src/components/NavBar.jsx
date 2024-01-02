// components/Navbar.js
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import LoginSignupModal from './LoginSignupModal';

const Navbar = ({ showSearchBar }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    // Check if we are in the browser
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('user_id');
      setIsLoggedIn(!!userId); // Convert to boolean and set login state
    }
    
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleLoginSuccess = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_id'); // Clear login state from localStorage
    }
    setIsLoggedIn(false);
  };

  const handleOutsideClick = (e) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };
  return (
    <nav className="bg-primary-yellow flex items-center justify-between w-full h-[8rem] fixed top-0 z-10 space-x-[0.5rem] pr-[1rem] flex-base">
      {showSearchBar && 
      <div className="absolute justify-start font-bold items-left mt-[-3rem] p-[1.5rem] text-[4vw] md:relative md:inline md:mt-[1.125rem] xl:text-5xl">
        <Link href="/" className="flex flex-col text-xl sm:text-5xl ml-[0.5rem] mb-[0.5rem]"><div className="mb-[-0.5rem]">Course</div>
                                                          <div className="ml-[1.5rem]">Compass</div></Link>
      </div>}
      {!showSearchBar && 
      <div className="justify-start font-bold items-left mt-[-3rem] p-[1.5rem] relative inline mt-[1.125rem] text-[10vw] sm:text-5xl">
        <Link href="/" className="flex flex-col"><div className="mb-[-0.8rem]">Course</div>
                                                          <div className="pl-[1.5rem]">Compass</div></Link>
      </div>}
      {showSearchBar && <SearchBar page="other" />}

      <div className="flex inline-flex mt-[3.125rem] m-2 pr-[2rem] space-x-2">
        {isLoggedIn ? (
          <>
            <Link href="/profile"> {/* This should be the route to the user profile page */}
              <a> {/* Ensure the image is wrapped in an <a> tag for proper Link functionality */}
                <img
                  src="/profile-picture.jpg" // Replace with dynamic path if necessary
                  alt="Profile picture"
                  className="rounded-full w-[7vw] md:w-[4vw] lg:w-[3vw] h-auto min-h-[3rem] min-w-[3rem] border border-black cursor-pointer"
                />
              </a>
            </Link>
            <button onClick={toggleMenu} ref={buttonRef} className={`transition-transform ${showMenu ? "rotate-180" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="13" viewBox="0 0 23 13" fill="none" className="opacity-50 hover:opacity-100 cursor-pointer">
                <path d="M22.6094 2.22173L12.6094 12.2217C12.5166 12.3147 12.4063 12.3885 12.2849 12.4388C12.1635 12.4891 12.0333 12.515 11.9019 12.515C11.7705 12.515 11.6404 12.4891 11.519 12.4388C11.3976 12.3885 11.2873 12.3147 11.1944 12.2217L1.19442 2.22173C1.00678 2.03409 0.901367 1.77959 0.901367 1.51423C0.901367 1.24886 1.00678 0.994368 1.19442 0.806727C1.38206 0.619087 1.63656 0.513672 1.90192 0.513672C2.16729 0.513672 2.42178 0.619087 2.60942 0.806727L11.9019 10.1005L21.1944 0.806727C21.2873 0.713817 21.3976 0.640117 21.519 0.589834C21.6404 0.539552 21.7705 0.513672 21.9019 0.513672C22.0333 0.513672 22.1634 0.539552 22.2848 0.589834C22.4062 0.640117 22.5165 0.713817 22.6094 0.806727C22.7023 0.899638 22.776 1.00994 22.8263 1.13133C22.8766 1.25272 22.9025 1.38283 22.9025 1.51423C22.9025 1.64562 22.8766 1.77573 22.8263 1.89712C22.776 2.01852 22.7023 2.12882 22.6094 2.22173Z" fill="black"/>
              </svg>
            </button>
            {showMenu && (
              <div className="absolute top-full right-4 bg-primary-yellow border border-gray-300 shadow-md rounded-md mt-1 py-2">
                <Link href="/profile"><div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Profile</div></Link>
                <Link href="/reviews"><div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Leave a Review</div></Link>
                <Link href="/tuition-calculator"><div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Tuition Calculator</div></Link>
                <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </>
        ) : (
          <button onClick={() => setShowModal(true)} className="hover:border hover:border-black bg-primary-blue text-white mb-[1rem] px-4 py-2 rounded hover:bg-primary-yellow hover:text-black cursor-pointer">
            Login / Signup
          </button>
        )}
      </div>

      {showModal && <LoginSignupModal onClose={() => setShowModal(false)} onLoginSuccess={handleLoginSuccess} />}
    </nav>
  );
};

export default Navbar;
