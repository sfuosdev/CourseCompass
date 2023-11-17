import React from "react";

export type CourseSchedule = {
  days: string;
  startDate: string;
  endDate: string;
  isExam: boolean;
  sectionCode: string;
};

const CourseScheduleInfo = (courseSchedule: CourseSchedule) => {
  return (
    <div>
      {`Course Schedule: `}
      <div>{`Days: ${courseSchedule.days}`}</div>
      <div>{`Start Date: ${courseSchedule.startDate}`}</div>
      <div>{`End Date: ${courseSchedule.endDate}`}</div>
      <div>{`Has exam: ${courseSchedule.isExam ? "Yes." : "No."}`}</div>
      <div>{`Section Code: ${courseSchedule.sectionCode}`}</div>
    </div>
  );
};

export default CourseScheduleInfo;
