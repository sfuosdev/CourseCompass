"use client";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import SortMenu from "../components/SortMenu";
import { ScrollToTopButton } from "@/components/LandingPage";
import { depts } from "../page";

async function fetchCourses(dept) {
  try {
    const response = await axios.get(`/api/courses/getCourseList?dept=${dept}`);
    return response.data; // Assuming the API returns a course object
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

function getDeptName(deptCode) {
  const result = depts.filter((dept) => {
    return dept.value == deptCode;
  });
  if (result) return result[0].name;
  else return;
}

const CoursesPage = ({ params }) => {
  const [courses, setCourses] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    lowerDivision: false,
    upperDivision: false,
    graduateLevel: false,
  });
  const [department, setDepartment] = useState("");

  useEffect(() => {
    fetchCourses(params.dept).then((res) => {
      if (res) setCourses(res.courses);
    });
    setDepartment(getDeptName(params.dept));
    console.log(params.dept);
  }, []);

  return (
    <div className="m-[30px]">
      <ScrollToTopButton />
      {/* <h2 className="text-xl">Faculty of Applied Science</h2> */}
      <a href="/departments">
        <h1 className="underline underline-offset-4 text-3xl m-y-5 text-[#4570E6]">
          {department}
        </h1>
      </a>
      <div className="mt-5 flex flex-col md:flex-row md:items-start">
        {/* Courses Section */}
        <div className="md:w-3/4 order-2 md:order-1 mt-5 md:mt-0">
          <div className="flex flex-wrap gap-4">
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
        </div>
        {/* Filter Section */}
        <div className="md:w-1/4 order-1 md:order-2 md:pr-10">
          <SortMenu
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
