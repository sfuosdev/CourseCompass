"use client";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import SortMenu from "../components/SortMenu";
import { ScrollToTopButton } from "@/components/LandingPage";
import { faculties } from "@/utils/faculties";
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

const findFacultyAndSchool = (dept) => {
  for (const faculty of faculties) {
    if (faculty.schools) {
      const foundDepartment = faculty.schools.find((school) =>
        school.departments.includes(dept.toUpperCase())
      );
      if (foundDepartment) {
        let schoolName = foundDepartment.name.trim();
        if (schoolName.includes(",")) {
          schoolName =
            schoolName.split(",")[1].trim() +
            " " +
            schoolName.split(",")[0].trim();
        }
        return { faculty: faculty.name, school: schoolName };
      }
    }
  }
  return { faculty: "", school: "" };
};

const CoursesPage = ({ params }) => {
  const [courses, setCourses] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    lowerDivision: false,
    upperDivision: false,
    graduateLevel: false,
    rating: 0,
    usefulness: 0,
  });
  const { faculty, school } = findFacultyAndSchool(params.dept);
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
  }, [params.dept]);

  return (
    <div className="m-[30px]">
      <ScrollToTopButton />
      {/* <h2 className="text-xl">Faculty of Applied Science</h2> */}
      {/* <a href="/courses"> */}
      {/* <h1 className="underline underline-offset-4 text-3xl m-y-5 text-[#4570E6]">
          {department}
        </h1> */}
      {/* </a> */}
      <h2 className="text-xl border-l-4 border-b border-gray-500 px-3 w-[30rem]">
        {faculty}
      </h2>
      <h1 className=" text-3xl m-y-5 font-bold">{school}</h1>
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
