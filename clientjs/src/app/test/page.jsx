// pages/major.js
"use client";
import React, { useState } from 'react';
import computingScienceMajorData from '@/utils/major.json';

const MajorPage = () => {
  const [selectedCourses, setSelectedCourses] = useState({});

  const handleCheckboxChange = (course, isChecked) => {
    setSelectedCourses((prevSelectedCourses) => ({
      ...prevSelectedCourses,
      [course]: isChecked,
    }));
  };

  const calculateTotalCredits = (selectedCourses) => {
    const creditsPerCourse = computingScienceMajorData.computingScienceMajor.programRequirements.lowerDivision
      .filter((course) => {
        const [courseCode] = course.split(' - ');
        return selectedCourses[courseCode];
      })
      .map((course) => {
        const [, courseInfo] = course.split(' - ');
        return courseInfo ? parseInt(courseInfo.match(/\((\d+)\)/)[1], 10) : 0;
      })
      .reduce((total, credits) => total + credits, 0);

    return creditsPerCourse;
  };

  const isRequirementsMet = () => {
    // Implement your logic to check if the requirements are met based on selected courses.
    // You can use the selectedCourses state variable.

    // Example: Check if the total credits for lower division courses meet the requirement.
    const totalLowerDivisionCredits = calculateTotalCredits(selectedCourses);
    const lowerDivisionRequirement = 24; // Adjust this based on your actual requirement.
    const isLowerDivisionRequirementMet = totalLowerDivisionCredits >= lowerDivisionRequirement;

    return isLowerDivisionRequirementMet;
  };

  return (
    <div className="flex">
      {/* Courses Column */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Computing Science Major Requirements</h1>
        <h2 className="text-2xl font-bold mb-2">Lower Division Requirements</h2>
        <div className="grid grid-cols-3 gap-4">
          {computingScienceMajorData.computingScienceMajor.programRequirements.lowerDivision.map((course) => {
            const [courseCode, courseInfo] = course.split(' - ');

            return (
              <div key={course} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCourses[courseCode] || false}
                    onChange={(e) => handleCheckboxChange(courseCode, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">{courseCode}</span>
                  {courseInfo && (
                    <span className="text-xs ml-1">
                      ({courseInfo.match(/\((\d+)\)/) && courseInfo.match(/\((\d+)\)/)[1]} credits)
                    </span>
                  )}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total Credits and Requirements Status Column */}
      <div className="w-1/4 p-4">
        <div className="sticky top-[10rem]">
          <h2 className="text-2xl font-bold">Total Credits</h2>
          <p className="text-lg">{calculateTotalCredits(selectedCourses)} credits</p>

          <h2 className="text-2xl font-bold mt-4">Requirements Status</h2>
          <p className={`text-lg ${isRequirementsMet() ? 'text-green-500' : 'text-red-500'}`}>
            {isRequirementsMet() ? 'Requirements Met!' : 'Requirements Not Met'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MajorPage;
