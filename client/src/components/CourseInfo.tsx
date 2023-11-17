"use client";

import React from "react";

export type Info = {
  name: string;
  term: string;
  title: string;
  section: string;
  classNumber: string;
  prerequisites: string;
  corequisites: string;
  degreeLevel: string;
  deliveryMethod: string;
  departmentalUgradNotes: string;
  dept: string;
  description: string;
  designation: string;
  notes: string;
  number: string;
  outlinePath: string;
  registrarNotes: string;
  requiredReadingNotes: string;
  specialTopic: string;
  type: string;
};

const CourseInfo = (info: Info) => {
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
