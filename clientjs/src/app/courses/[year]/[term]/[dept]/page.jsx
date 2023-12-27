// CoursesPage.js
"use client";
import React, { useState, useEffect } from "react";

import Card from "../../../components/Card";
import axios from "axios";
import SortMenu from "../../../components/SortMenu";

export const fetchCourses = async (params) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/courses`;
  console.log(params);

  if (!params.year || !params.term || !params.dept) return;

  return await axios
    .post(url, { year: params.year, term: params.term, dept: params.dept })
    .then((res) => {
      return res.data;
    });
};

const Page = ({ params }) => {
  const [courses, setCourses] = useState([]);

  const [filterOptions, setFilterOptions] = useState({
    lowerDivision: false,
    upperDivision: false,
    graduateLevel: false,
  });

  useEffect(() => {
    fetchCourses(params).then((res) => {
      if (res) setCourses(res.courses);
    });
  }, []);

  return (
    <div className="m-[30px]">
      <h2 className="text-xl ">Faculty of Applied Science</h2>
      <h1 className="underline underline-offset-4 text-3xl m-y-5 text-[#4570E6]">
        School of Computer Science
      </h1>
      <div className="flex flex-row mt-[50px] gap-[20px]">
        <div className="grid grid-cols-4 gap-x-[20%] gap-y-[40px] pr-[10%] w-[80%]">
          {courses.map((course) => {
            if (
              (!filterOptions.lowerDivision &&
                !filterOptions.upperDivision &&
                !filterOptions.graduateLevel) ||
              (filterOptions.lowerDivision && Number(course.value[0]) < 3) ||
              (filterOptions.upperDivision && Number(course.value[0]) > 2) ||
              (filterOptions.graduateLevel && Number(course.value[0]) > 4)
            ) {
              return (
                <Card
                  course={course}
                  params={params}
                  key={course.title + course.value}
                />
              );
            }
          })}
        </div>
        <div className="flex flex-col">
          <SortMenu
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
