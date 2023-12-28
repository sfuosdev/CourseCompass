"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollToTopButton } from "@/components/LandingPage";

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

const Page = ({ params }) => {
  const [course, setCourse] = useState({ value: "" });

  useEffect(() => {
    fetchCourse(params).then((res) => {
      if (res) setCourse(res[0]);
    });
  }, []);

  return (
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
        </div>
      </div>
    </div>
  );
};

export default Page;
