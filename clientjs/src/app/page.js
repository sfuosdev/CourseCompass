// Landing
"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      <Link href="/Courses">courses</Link>
    </main>
  );
}
