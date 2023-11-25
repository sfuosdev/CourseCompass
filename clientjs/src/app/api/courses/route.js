import { NextResponse } from "next/server";
import { getCourses, getSections, getOutlines } from "./getCoursesInfo";
// import { fs } from "fs";
import fs, { writeFileSync, readFileSync } from "fs";
// import CourseInfo from "@/app/courses/components/CourseInfo";

function getQueryVariable(url, variable) {
  const query = url.slice(url.indexOf("?") + 1, url.length);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // console.log(pair);
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  console.log("Query variable %s not found", variable);
}

export async function GET(req, res) {
  //   console.log(await (await getCourses("2024", "spring", "cmpt")).json());

  // const { query } = req;

  // console.log(req);

  const { url } = req;
  // console.log(url.indexOf("?"));

  const year = getQueryVariable(url, "year");
  const term = getQueryVariable(url, "term");
  const dept = getQueryVariable(url, "dept");

  try {
    const coursesJson = readFileSync(
      `data/${year}/${term}/${dept}/courses.json`
    );
    return NextResponse.json(JSON.parse(coursesJson));
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

      // console.log(course);
      // courseArray[index] = course;
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
    // console.log(coursesString);

    return NextResponse.json(coursesObj);
  }
}
