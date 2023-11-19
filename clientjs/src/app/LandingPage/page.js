import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome, here is the outline link:</h1>
      <Link href="/pages/CoursesPage">
        Go to Course Outline
      </Link>
    </div>
  );
}
