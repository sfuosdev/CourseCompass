// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between item-center p-[1rem] bg-primary-yellow">
      <Link href="/">Home</Link>
      <a>Search</a>    
      <a>Profile</a>
    </nav>
  );
};

// NavBar {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0.5rem 1rem;
//   background-color: bg-primary-yellow;
// }
export default Navbar;
