"use client";

import React from "react";

export type Instructor = {
  commonName: string;
  email: string;
  firstName: string;
  lastName: string;
  office: string;
  officeHours: string;
  phone: string;
  profileUrl: string;
  roleCode: string;
};

const InstructorInfo = (instructor: Instructor) => {
  return (
    <div>
      {`Instructor: `}
      <div>{`First Name: ${instructor.firstName}`}</div>
      <div>{`Last Name: ${instructor.lastName}`}</div>
      <div>{`Email: ${instructor.email}`}</div>
      <div>{`Office: ${instructor.office}`}</div>
      <div>{`Office Hours: ${instructor.officeHours}`}</div>
      <div>{`Phone: ${instructor.phone}`}</div>
      <div>{`Profile Url: ${instructor.profileUrl}`}</div>
      <div>{`Role Code: ${instructor.roleCode}`}</div>
    </div>
  );
};

export default InstructorInfo;
