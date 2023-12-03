import Link from "next/link";
import Image from "next/image";

const founders = [
  {
    name: "Sallin",
    links: "/",
    role: "Tech Lead",
    image: "/profile-picture.jpg",
  },
  {
    name: "Kiran",
    links: "/",
    role: "Designer",
    image: "/profile-picture.jpg",
  },
  {
    name: "Joao",
    links: "/",
    role: "Tech Lead",
    image: "/profile-picture.jpg",
  },
  {
    name: "Edison",
    links: "/",
    role: "Tech Lead",
    image: "/profile-picture.jpg",
  },
  {
    name: "Samuel",
    links: "/",
    role: "Tech Lead",
    image: "/profile-picture.jpg",
  },
];
let final;

export default function About() {
  return (
    <div className=" py-6 flex flex-col items-center">
      <div className="w-1/4 p-6">
        <p className="py-3 text-3xl font-bold">Welcome to Course Compass!</p>
        <p className="text-lg font-normal">
          Course Compass is currently a course planning website for SFU
          students. Our goal is to offer a comprehesive guide on academic
          planning in your degree.
        </p>
      </div>

      <p className=" text-2xl font-semibold">Course Compass Founders</p>
      {founders.map((profile) => (
        <Profile
          name={profile.name}
          role={profile.role}
          link={profile.links}
          image={profile.image}
          key={profile.name}
        />
      ))}
    </div>
  );
}

function Profile({ name, role, link, image }) {
  return (
    <div className={`p-12 grid grid-cols-2 place-items-center`}>
      <div className="px-0">
        <Image
          src={image}
          alt={"Picture of " + name}
          height={208}
          width={208}
          className="h-52 w-52 rounded-full"
        />
      </div>
      <div className="py-2 w-96">
        <p className="text-xl font-bold">{name}</p>
        <p className="py-2 text-lg font-medium">{role}</p>
        {/* Change the if multiple links to map function*/}
        <Link href={link} className="text-lg font-normal">
          Linkedin
        </Link>
        <p className="text-lg font-normal"></p>
      </div>
    </div>
  );
}
