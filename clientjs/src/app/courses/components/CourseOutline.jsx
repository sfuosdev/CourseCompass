"use client";

import React from "react";

import InstructorInfo from "./InstructorInfo";
import CourseScheduleInfo from "./CourseScheduleInfo";
import CourseInfo from "./CourseInfo";


const CourseOutline = (outline) => {
  return (
    <div>
      <div>
        {outline?.instructor?.map((instructor, index) => (
          <InstructorInfo {...instructor} key={index + 10} />
        ))}
      </div>
      <div>
        {outline?.courseSchedule?.map(
          (courseSchedule, index) => (
            <CourseScheduleInfo {...courseSchedule} key={index + 50} />
          )
        )}
      </div>
      <div>{outline?.info ? <CourseInfo {...outline.info} /> : <></>}</div>
    </div>
  );
};

export default CourseOutline;
