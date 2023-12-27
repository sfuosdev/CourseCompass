import { NextResponse } from "next/server";
import { getCourses, getSections, getOutlines } from "./getCoursesInfo";
// import { fs } from "fs";
import fs, { writeFileSync, readFileSync } from "fs";
// import CourseInfo from "@/app/courses/components/CourseInfo";

export async function POST(req, res) {
  //   console.log(await (await getCourses("2024", "spring", "cmpt")).json());

  // const { query } = req;

  // console.log(req);

  // const { url } = req;
  const { year, term, dept } = await req.json();
  // console.log(data);
  // console.log(url.indexOf("?"));

  // const year = getQueryVariable(url, "year");
  // const term = getQueryVariable(url, "term");
  // const dept = getQueryVariable(url, "dept");

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

      course.offerings = [];
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
            // console.log(instructor.name);
            const idx = course.offerings.findIndex((offering) => {
              console.log(offering.instructor);
              console.log(instructor.name);
              return offering.instructor == instructor.name;
            });
            // console.log(course.offerings);
            console.log(`idx: ${idx}`);
            if (idx != -1) {
              course.offerings[idx].sections.push(section.text);
              course.offerings[idx].courseSchedule.push(
                outlineRes.courseSchedule
              );
            } else
              course.offerings.push({
                instructor: instructor.name,
                sections: [section.text],
                courseSchedule: [outlineRes.courseSchedule],
              });
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

      course.offerings = course.offerings.filter(
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
