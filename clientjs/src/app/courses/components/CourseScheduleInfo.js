import React from "react";

const CourseScheduleInfo = (courseSchedule) => {
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
