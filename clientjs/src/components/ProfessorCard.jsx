// import Link from "next/link";
// import { useEffect, useState } from "react";

// import { useState } from "react";

const ProfessorCard = ({ course }) => {
  return (
    <div className={`flex flex-row gap-[20px]`}>
      {course?.offerings?.map((offering) => (
        <div
          className="flex flex-col round rounded-2xl w-[270px] h-[360px] bg-[#F3F4FA] pl-[18px] pr-[18px] pt-[25px] hover:bg-[#AAC2FD] hover:shadow-lg focus-within:bg-[#AAC2FD] overflow-y-auto"
          key={offering.instructor}
        >
          <div className="text-[30px] font-medium">{offering.instructor}</div>
          <div className="inline-block font-medium text-[15px] h-[5%] mb-[5px]">
            Class Schedule:
          </div>
          {offering.courseSchedule.map((sectionSchedule, idx) => (
            <div
              key={`${offering.name}-${offering.sections[idx]}`}
              className="flex flex-col mb-[10px]"
            >
              {offering.sections[idx]}:
              {sectionSchedule.map((dailySchedule, idx2) => (
                <div key={`${offering.name}-${offering.sections[idx]}-${idx2}`}>
                  {dailySchedule.days}: {dailySchedule.startTime}-
                  {dailySchedule.endTime}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default ProfessorCard;
