"use client";

import React from "react";


const CourseInfo = (info) => {
  return (
    <div>
      {`Course Info: `}
      <div>{`Name: ${info.name}`}</div>
      <div>{`Term: ${info.term}`}</div>
      <div>{`Title: ${info.title}`}</div>
      <div>{`Section: ${info.section}`}</div>
      <div>{`Class Number: ${info.classNumber}`}</div>
      <div>{`Pre-requisites: ${info.prerequisites}`}</div>
      <div>{`Co-requisites: ${info.corequisites}`}</div>
      <div>{`Notes: ${info.notes}`}</div>
    </div>
  );
};

export default CourseInfo;
