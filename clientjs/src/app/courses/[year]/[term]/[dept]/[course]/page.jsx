"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfessorCard from "@/components/ProfessorCard";
import Review from "@/components/ReviewList";
import { ScrollToTopButton } from "@/components/LandingPage";

function ratingSystem(review, user) {
  // console.log(review.map(rating => user.rating.find(({ ID }) => ID === rating.ID)))
  return review.map((rating) => user.rating.find(({ ID }) => ID === rating.ID));
}

const userAccount = {
  // Other things
  name: "TBA",
  rating: [
    {
      ID: "123",
      like: true,
      dislike: false,
    },
    {
      ID: "124",
      like: false,
      dislike: true,
    },
    {
      ID: "125",
      like: false,
      dislike: false,
    },
  ],
};

async function fetchCourse(params) {
  const url = `http://localhost:3000/api/courseOutline`;

  if (!params.year || !params.term || !params.dept) return;

  return await axios
    .post(url, {
      year: params.year,
      term: params.term,
      dept: params.dept,
      course: params.course,
    })
    .then((res) => {
      return res.data;
    });
}

const reviewComment = [
  {
    // date: "16/01/2023",
    ID: "123",
    likes: 1000,
    dislikes: 500,
    name: "Anonymous",
    day: "16",
    month: "01",
    year: "2023",
    dept: "cmpt",
    value: "225",
    professor: "John Edgar",
    image: "/profile-picture.jpg",
    comment:
      "A very long review about the course being displayed. Could be a bad review of the course or a good review of the course this is just filler text. Subjected to the change when fully implemented.",
    clarity: "4",
    engagement: "4",
  },
  {
    // date: "16/01/2023",
    ID: "124",
    likes: 50,
    dislikes: 100,
    name: "Gary",
    day: "20",
    month: "05",
    year: "2023",
    dept: "cmpt",
    value: "225",
    professor: "John Edgar",
    image: "/profile-picture.jpg",
    comment:
      "A very long review about the course being displayed. Could be a bad review of the course or a good review of the course this is just filler text. Subjected to the change when fully implemented.",
    clarity: "4",
    engagement: "4",
  },
];

const Page = ({ params }) => {
  const [course, setCourse] = useState({ value: "" });
  const userRatingsMapped = ratingSystem(reviewComment, userAccount);
  useEffect(() => {
    fetchCourse(params).then((res) => {
      if (res) setCourse(res[0]);
    });
  }, []);

  console.log(course);

  return (
<<<<<<< HEAD
    <div className="m-[50px] flex flex-col">
      <div className="flex flex-row">
        <div className="w-[70%] pr-[50px]">
          <h2 className="text-xl">
            {params.dept.toUpperCase()}
            {course.value}
          </h2>
          <h1 className="text-3xl text-[#4570E6] underline underline-offset-4">
            {course.title}
          </h1>
          <p className="text-base mt-[30px] text-justify">
            {course.description}
          </p>
          <p className="text-xl mt-[30px]">
            Offerings:{" "}
            {params.term[0].toUpperCase() + params.term.slice(1).toLowerCase()}{" "}
            {params.year}
          </p>
        </div>
        <div className="w-[30%] mt-[50px]">
          <h1>CONSIDERATIONS</h1>
          <h2>Pre-requisites:</h2>
          <p>{course.prerequisites}</p>
        </div>
      </div>
      <div className="mt-[10px] flex flex-row">
        {course.value != "" ? <ProfessorCard course={course} /> : <></>}
      </div>
      <div className="mt-[10px] flex flex-col">
        <div className="Reviews">
          <Review review={reviewComment[0]} user={userRatingsMapped} />
          <Review review={reviewComment[1]} user={userRatingsMapped} />
=======
    <div className="ml-[40px] m-[50px] flex flex-col lg:flex-row">
      <ScrollToTopButton />
      <div className="lg:w-[70%] pr-[50px]">
        <h2 className="text-xl">
          {params.dept.toUpperCase()}
          {course.value}
        </h2>
        <h1 className="text-3xl text-[#4570E6] underline underline-offset-4">
          {course.title}
        </h1>
        <p className="text-base mt-[30px] text-justify">{course.description}</p>
        <p className="text-xl mt-[30px]">
          Next Offering: {params.term} {params.year}
        </p>
      </div>
      <div className="lg:w-[30%] mt-[50px] lg:mt-0">
        <h1 className="text-xl lg:text-2xl">CONSIDERATIONS</h1>
        <div className="lg:flex lg:flex-col">
          <h2 className="text-base lg:text-xl">Pre-requisites:</h2>
          <p className="text-sm lg:text-base">{course.prerequisites}</p>
>>>>>>> main
        </div>
      </div>
    </div>
  );
};

export default Page;
