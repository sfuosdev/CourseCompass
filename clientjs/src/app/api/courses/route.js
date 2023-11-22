import { NextResponse } from "next/server";
import { getCourses, getSections, getOutlines } from "./getCoursesInfo";
// import { fs } from "fs";
const { writeFileSync, readFileSync } = require("fs");
// import CourseInfo from "@/app/courses/components/CourseInfo";

export async function GET() {
  //   console.log(await (await getCourses("2024", "spring", "cmpt")).json());

  const coursesJson = readFileSync("data/courses.json");
  return NextResponse.json(JSON.parse(coursesJson));
  //   const courseArray = await getCourses("2024", "spring", "cmpt");
  //   console.log(courseArray);
  //   let i = 0;
  //   for (let course of courseArray) {
  //     const sectionsArray = await getSections(
  //       "2024",
  //       "spring",
  //       "cmpt",
  //       course.value
  //     );

  //     course.instructor = [];

  //     for (let section of sectionsArray) {
  //       const outlineRes = await getOutlines(
  //         "2024",
  //         "spring",
  //         "cmpt",
  //         course.value,
  //         section.value
  //       );
  //       if (outlineRes.instructor) {
  //         for (let instructor of outlineRes.instructor) {
  //           course.instructor.push(instructor.name);
  //         }
  //       }
  //     }

  //     course.instructor = course.instructor.filter(
  //       (value, index, array) => array.indexOf(value) === index
  //     );

  //     console.log(course);
  //     // courseArray[index] = course;
  //     courseArray[i++] = course;
  //   }

  //   const coursesObj = {
  //     courses: courseArray,
  //   };

  //   const coursesString = JSON.stringify(coursesObj, null, 2);
  //   await writeFileSync("./courses.json", coursesString, "utf-8");
  //   console.log(coursesString);

  //   return NextResponse.json(coursesObj);
}
