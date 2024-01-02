import Link from "next/link";
import { useEffect, useState } from "react";

// Fix tailwind
{
  /* <div className={`grid grid-cols-2`}> 
<ProfessorCard courses={courses[0]} />
<ProfessorCard courses={courses[1]}/>
</div> */
}
const ProfessorCard = ({ course }) => {
  return (
    <div className={`flex flex-row gap-[20px]`}>
      {course?.offerings.map((offering) => (
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

          <div className="flex flex-col justify-between">
            <div className="">
              Clarity<span>S s s s s</span>
            </div>
            <div className="">
              Engagement<span>S s s s s</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProfessorCard;

{
  /* <div className="p-2 w-80 h-[360px] flex">
<div className="flex flex-col round rounded-2xl w-[270px] h-[360px] bg-[#F3F4FA] pl-[18px] pr-[18px] pt-[25px] hover:bg-[#AAC2FD] hover:shadow-lg focus-within:bg-[#AAC2FD]">
    <div className="text-[30px] font-medium">{courses[0].professor === 'TBA' ? "TBA" : courses[0].professor}</div>
    <div className="inline-block font-medium text-[15px] h-[40%]">Class Schedule:</div>
    <div className="flex justify-between inline-block text-[15px] font-bold">
        <span>Lecture Section: {courses[0].sections[0]}</span>
        <span>Dates</span>
        <span>{courses.sectionCode == 'LAB' ? 'Lab Section' : 'Tutorial Sections'}</span>
    </div>
    <hr className="h-px my-[5px] bg-black"></hr>
    <div className="flex justify-between inline-block text-[15px] h-[25%]">
        <span>Professor:</span>
        <div className="flex flex-col text-right">
            <span>Professor</span>
        </div>
    </div>
    <Link
        href={`/coursess/2024/spring/cmpt/225`}
        className="underline underline-offset-4 text-[10px] text-[#4570E6] text-right pb-[5px] hover:text-[#F7C750]"
    >
        View complete professor ratings
    </Link>
</div>
</div> */
}

// {
//     "text": "225",
//     "value": "225",
//     "title": "Data Structures and Programming",
//     "instructor": [
//       "Anne Lavergne",
//       "Toby Donaldson"
//     ],
//     "prerequisites": "(MACM 101 and (CMPT 125, CMPT 129 or CMPT 135)) or (ENSC 251 and ENSC 252), all with a minimum grade of C-.",
//     "corequisites": "",
//     "sections": [
//       {
//         "text": "D100",
//         "value": "d100",
//         "title": "Data Structures and Programming",
//         "classType": "e",
//         "sectionCode": "LEC",
//         "associatedClass": "1"
//       },
//       {
//         "text": "D101",
//         "value": "d101",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "1"
//       },
//       {
//         "text": "D102",
//         "value": "d102",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "1"
//       },
//       {
//         "text": "D103",
//         "value": "d103",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "1"
//       },
//       {
//         "text": "D104",
//         "value": "d104",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "1"
//       },
//       {
//         "text": "D105",
//         "value": "d105",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "1"
//       },
//       {
//         "text": "D106",
//         "value": "d106",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "1"
//       },
//       {
//         "text": "D107",
//         "value": "d107",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "1"
//       },
//       {
//         "text": "D108",
//         "value": "d108",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "1"
//       },
//       {
//         "text": "D200",
//         "value": "d200",
//         "title": "Data Structures and Programming",
//         "classType": "e",
//         "sectionCode": "LEC",
//         "associatedClass": "2"
//       },
//       {
//         "text": "D201",
//         "value": "d201",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "2"
//       },
//       {
//         "text": "D202",
//         "value": "d202",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "2"
//       },
//       {
//         "text": "D203",
//         "value": "d203",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "2"
//       },
//       {
//         "text": "D204",
//         "value": "d204",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "2"
//       },
//       {
//         "text": "D205",
//         "value": "d205",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "2"
//       },
//       {
//         "text": "D206",
//         "value": "d206",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "2"
//       },
//       {
//         "text": "D207",
//         "value": "d207",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "2"
//       },
//       {
//         "text": "D208",
//         "value": "d208",
//         "title": "Data Structures and Programming",
//         "classType": "n",
//         "sectionCode": "LAB",
//         "associatedClass": "2"
//       }
//     ],
//     "description": "Introduction to a variety of practical and important data structures and methods for implementation and for experimental and analytical evaluation. Topics include: stacks, queues and lists; search trees; hash tables and algorithms; efficient sorting; object-oriented programming; time and space efficiency analysis; and experimental evaluation. ",
//     "deliveryMethod": "In Person",
//     "coursesSchedule": [
//       {
//         "endDate": "Fri Oct 06 00:00:00 PDT 2023",
//         "campus": "Surrey",
//         "days": "Tu",
//         "sectionCode": "LAB",
//         "startTime": "11:30",
//         "isExam": false,
//         "endTime": "12:20",
//         "startDate": "Wed Sep 06 00:00:00 PDT 2023"
//       },
//       {
//         "endDate": "Tue Dec 05 00:00:00 PST 2023",
//         "campus": "Surrey",
//         "days": "Tu",
//         "sectionCode": "LAB",
//         "startTime": "11:30",
//         "isExam": false,
//         "endTime": "12:20",
//         "startDate": "Wed Oct 11 00:00:00 PDT 2023"
//       }
//     ]
//   }
