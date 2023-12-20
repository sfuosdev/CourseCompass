import { NextResponse } from "next/server";
import {
  getCourses,
  getSections,
  getOutlines,
} from "../courses/getCoursesInfo";
import fs, { writeFileSync, readFileSync } from "fs";

export async function POST(req, res) {
  const { year, term, dept, course } = await req.json();
  console.log(course);
  try {
    const coursesJson = readFileSync(
      `data/${year}/${term}/${dept}/courses.json`
    );
    const { courses } = JSON.parse(coursesJson);

    var courseOutline = courses.filter((courseOutline) => {
      return courseOutline.value == course;
    });

    return NextResponse.json(courseOutline);
  } catch {
    const courseArray = await getCourses(year, term, dept);
    // console.log(courseArray);
    let i = 0;
    for (let course of courseArray) {
      const sectionsArray = await getSections(year, term, dept, course.value);

      course.instructor = [];
      course.prerequisites = "";
      course.corequisites = "";

      course.sections = sectionsArray;

      for (let section of sectionsArray) {
        const outlineRes = await getOutlines(
          year,
          term,
          dept,
          course.value,
          section.value
        );
        // console.log(outlineRes);
        if (outlineRes.instructor) {
          for (let instructor of outlineRes.instructor) {
            course.instructor.push(instructor.name);
          }
        }
        if (outlineRes.info.prerequisites) {
          course.prerequisites = outlineRes.info.prerequisites;
        }
        if (outlineRes.info.corequisites) {
          course.corequisites = outlineRes.info.corequisites;
        }
        if (outlineRes.info.notes) {
          course.notes = outlineRes.info.notes;
        }
        if (outlineRes.info.description) {
          course.description = outlineRes.info.description;
        }
        if (outlineRes.info.deliveryMethod) {
          course.deliveryMethod = outlineRes.info.deliveryMethod;
        }
        if (outlineRes.courseSchedule) {
          course.courseSchedule = outlineRes.courseSchedule;
        }
      }

      course.instructor = course.instructor.filter(
        (value, index, array) => array.indexOf(value) === index
      );

      courseArray[i++] = course;
    }

    const coursesObj = {
      courses: courseArray,
    };

    const coursesString = JSON.stringify(coursesObj, null, 2);
    if (!fs.existsSync(`data/${year}`)) fs.mkdirSync(`data/${year}`);

    if (!fs.existsSync(`data/${year}/${term}`))
      fs.mkdirSync(`data/${year}/${term}`);

    if (!fs.existsSync(`data/${year}/${term}/${dept}`))
      fs.mkdirSync(`data/${year}/${term}/${dept}`);

    await writeFileSync(
      `data/${year}/${term}/${dept}/courses.json`,
      coursesString,
      "utf-8"
    );

    const { courses } = JSON.parse(coursesObj);

    var courseOutline = courses.filter((courseOutline) => {
      return courseOutline.value == course;
    });

    return NextResponse.json(courseOutline);
  }
}
