"use client";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import SortMenu from "../components/SortMenu";
import { ScrollToTopButton } from "@/components/LandingPage";
import { depts } from "../page";
import { motion } from "framer-motion";

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
    rating: 0,
    usefulness: 0,
  });
  const [department, setDepartment] = useState("");
  const handleSort = (sortType) => {
    const sortedCourses = [...courses].sort((a, b) => {
      if (sortType === "code") {
        const numberA = parseInt(a.courseCode.match(/\d+/)[0], 10);
        const numberB = parseInt(b.courseCode.match(/\d+/)[0], 10);

        // Sort based on numeric values
        return numberA - numberB;
      } else if (sortType === "title") {
        return a.title.localeCompare(b.title);
      }
    });
    setCourses(sortedCourses);
  };

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
      <a href="/courses">
        <h1 className="underline underline-offset-4 text-3xl m-y-5 text-[#4570E6]">
          {department}
        </h1>
      </a>
      <div className="mt-5 flex flex-col md:flex-row md:items-start">
        {/* Courses Section */}
        <div className="md:w-3/4 order-2 md:order-1 mt-5 md:mt-0">
          <div className="flex flex-wrap gap-4">
            {/* {courses.map((course) => {
              const codeNumber = parseInt(
                course.courseCode.match(/\d+/)[0],
                10
              );

              if (
                (!filterOptions.lowerDivision &&
                  !filterOptions.upperDivision &&
                  !filterOptions.graduateLevel &&
                  !filterOptions.noprereqs &&
                  !filterOptions.prereqs) ||
                (filterOptions.lowerDivision && codeNumber < 300) ||
                (filterOptions.upperDivision &&
                  codeNumber >= 300 &&
                  codeNumber < 500) ||
                (filterOptions.graduateLevel && codeNumber >= 500) ||
                (filterOptions.prereqs && course.prerequisites) ||
                (filterOptions.noprereqs && !course.prerequisites)
              ) {
                return (
                  <Card
                    course={course}
                    params={params}
                    key={course.title + course.value + Math.random()}
                  />
                );
              }
            })} */}
            {courses
              .filter((course) => {
                const codeNumber = parseInt(
                  course.courseCode.match(/\d+/)[0],
                  10
                );

                const noFiltersApplied =
                  !filterOptions.lowerDivision &&
                  !filterOptions.upperDivision &&
                  !filterOptions.graduateLevel &&
                  !filterOptions.noprereqs &&
                  !filterOptions.prereqs &&
                  filterOptions.rating == 0 &&
                  filterOptions.usefulness == 0;

                return (
                  noFiltersApplied ||
                  (filterOptions.lowerDivision && codeNumber < 300) ||
                  (filterOptions.upperDivision &&
                    codeNumber >= 300 &&
                    codeNumber < 500) ||
                  (filterOptions.graduateLevel && codeNumber >= 500) ||
                  (filterOptions.prereqs && course.prerequisites) ||
                  (filterOptions.noprereqs && !course.prerequisites) ||
                  (filterOptions.rating != 0 &&
                    Math.random() * 100 > filterOptions.rating) ||
                  (filterOptions.usefulness != 0 &&
                    Math.random() * 100 > filterOptions.usefulness)
                );
              })
              .map((course, idx) => (
                <Card
                  course={course}
                  params={params}
                  key={course.title + course.value + idx}
                />
              ))}
          </div>
        </div>
        {/* Filter Section */}
        <div className="md:w-1/4 order-1 md:order-2 md:pr-10">
          <SortMenu
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            handleSort={handleSort}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
