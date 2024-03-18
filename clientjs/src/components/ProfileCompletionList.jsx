import React from "react";
import Link from "next/link";

const ProfileCompletionList = ({ setViewSelector }) => {
  function handleScheduleClick() {
    setViewSelector(1);
  }
  function handleImportCoursesClick() {
    setViewSelector(2);
  }
  function handleMajorInfoClick() {
    setViewSelector(3);
  }

  return (
    <div className="flex flex-col pt-3 pb-5 pl-1 pr-2 m-2 border shadow-md rounded-lg">
      <div className="py-3 font-medium text-[22px]">Complete your Profile</div>
      <hr></hr>
      <div className="flex flex-col text-[18px]">
        <div className="flex py-2">
          <div className="px-2">
            <span role="img" aria-label="calendar" className="w-6 h-6">
              📅
            </span>
          </div>
          <button onClick={handleScheduleClick} className="underline hover:text-primary-yellow">Upload your schedule</button>
        </div>
        <div className="flex py-2">
          <div className="px-2">
            <span role="img" aria-label="book" className="w-6 h-6">
              📚
            </span>
          </div>
          <button onClick={handleImportCoursesClick} className="underline hover:text-primary-yellow">
            Import your previous courses
          </button>
        </div>
        <div className="flex py-2">
          <div className="px-2">
            <span role="img" aria-label="star" className="w-6 h-6">
              ⭐
            </span>
          </div>
          <Link href="/reviews" className="underline hover:text-primary-yellow">Add a rating for a course</Link>
        </div>
        <div className="flex py-2">
          <div className="px-2">
            <span role="img" aria-label="man" className="w-6 h-6">
              👨‍🏫
            </span>
          </div>
          <div className="underline hover:text-primary-yellow">Add a rating for a professor</div>
        </div>
        <div className="flex py-2">
          <div className="px-2">
            <span role="img" aria-label="graduation-hat" className="w-6 h-6">
              🎓
            </span>
          </div>
          <button onClick={handleMajorInfoClick} className="underline hover:text-primary-yellow">Add major info</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionList;
