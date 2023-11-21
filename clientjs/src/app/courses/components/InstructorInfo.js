"use client";

import React from "react";


const InstructorInfo = (instructor) => {
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
