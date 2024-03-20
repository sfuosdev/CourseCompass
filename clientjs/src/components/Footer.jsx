import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative flex flex-col justify-start item-center bottom-0 h-[5rem] pl-8 pb-4">
      <div className="flex flex-col">
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="#">Contact Us</Link>
      </div>
      <p>Copyright CourseCompass© 2023</p>
    </footer>
  );
};

export default Footer;
