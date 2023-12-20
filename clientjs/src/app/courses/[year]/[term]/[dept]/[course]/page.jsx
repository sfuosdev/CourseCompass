"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

async function fetchCourse(params) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/courseOutline`;

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
    <div className="m-[50px] flex flex-row">
      <div className="w-[70%] pr-[50px]">
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
      <div className="w-[30%] mt-[50px]">
        <h1>CONSIDERATIONS</h1>
        <h2>Pre-requisites:</h2>
        <p>{course.prerequisites}</p>
      </div>
    </div>
  );
};

export default Page;
