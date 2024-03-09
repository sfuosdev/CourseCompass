"use client";
import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import axios from "axios";
import SortMenu from "../../../components/SortMenu";
import { ScrollToTopButton } from "@/components/LandingPage";
import { faculties } from "@/utils/faculties";

export const fetchCourses = async (params) => {
  const url = `http://localhost:3000/api/courses`;
  //const url = `https://course-compass-vcos.vercel.app/api/courses`;

  if (!params.year || !params.term || !params.dept) return;

  return await axios
    .post(url, { year: params.year, term: params.term, dept: params.dept })
    .then((res) => {
      return res.data;
    });
};

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
  });

  const { faculty, school } = findFacultyAndSchool(params.dept);

  useEffect(() => {
    fetchCourses(params).then((res) => {
      if (res) setCourses(res.courses);
    });
  }, [params.dept]);

  return (
    <div className="m-[30px]">
      <ScrollToTopButton />
      <h2 className="text-xl border-l-4 border-b border-gray-500 px-3 w-[30rem]">{faculty}</h2>
      <h1 className=" text-3xl m-y-5 font-bold">
        {school}
      </h1>
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