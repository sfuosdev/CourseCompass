"use client";

import React from "react";

import InstructorInfo, { Instructor } from "./InstructorInfo";
import CourseScheduleInfo, { CourseSchedule } from "./CourseScheduleInfo";
import CourseInfo, { Info } from "./CourseInfo";

export type Outline = {
  info?: Info | undefined;
  instructor?: Instructor[] | undefined;
  courseSchedule?: CourseSchedule[] | undefined;
} | null;

export type OutlineSelections = {
  year: string | null;
  term: string | null;
  department: string | null;
  courseNumber: string | null;
  section: string | null;
  lastChanged: string | null;
};

const CourseOutline = (outline: Outline) => {
  return (
    <div>
      <div>
        {outline?.instructor?.map((instructor: Instructor, index: number) => (
          <InstructorInfo {...instructor} key={index + 10} />
        ))}
      </div>
      <div>
        {outline?.courseSchedule?.map(
          (courseSchedule: CourseSchedule, index: number) => (
            <CourseScheduleInfo {...courseSchedule} key={index + 50} />
          )
        )}
      </div>
      <div>{outline?.info ? <CourseInfo {...outline.info} /> : <></>}</div>
    </div>
  );
};

export default CourseOutline;
