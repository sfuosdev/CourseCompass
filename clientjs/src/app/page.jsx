// Landing
"use client";
import Navbar from "@/components/NavBar";
import LandingPage from "@/components/LandingPage";
import Link from "next/link";
import ProfilePage from "@/pages/profile";
export default function Home() {
  return (
    <main style={{ overflowY: 'hidden', overflowX: 'hidden' }}>
      {/* <h1>Welcome</h1>
    <Link href="/CoursesPage">courses</Link> */}
      <Navbar showSearchBar={false}/>
      <LandingPage />
      
    </main>
  );
}
