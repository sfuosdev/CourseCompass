import React from "react";
import Link from "next/link";

const Card = ({ course, params }) => {
  return (
    <Link
      className=" border border-gray-300 shadow-lg flex flex-col round rounded-2xl w-[260px] h-[300px] bg-[#F3F4FA] pl-[18px] pr-[18px] pt-[25px] hover:bg-[#AAC2FD] hover:shadow-lg focus-within:bg-[#AAC2FD]"
      href={`/courses/${params.dept}/${course.courseCode}`}
    >
      <div className="text-[30px]">{`${params.dept.toUpperCase()} ${course.value
        }`}</div>
      <div className="inline-block text-[15px] h-[40%]">{`${course.title}`}</div>
      <div className="flex justify-between inline-block text-[15px] font-bold">
        <span>Next Offering:</span>
        <span>Spring 2024</span>
      </div>
      <hr className="h-px my-[5px] bg-black"></hr>
      <div className="flex justify-between inline-block text-[15px] h-[25%]">
        <span>Professor:</span>
        <div className="flex flex-col text-right">
          {course.offerings.length == 0 ? (
            <span>TBD</span>
          ) : (
            course.offerings.map((offerings) => {
              return (
                <span key={offerings.instructor}>{offerings.instructor}</span>
              );
            })
          )}
        </div>
      </div>
      {/* <Link
        href={`/courses/${params.year}/${params.term}/${params.dept}/${course.value}`}
        className="underline underline-offset-4 text-[10px] text-[#4570E6] text-right pb-[5px] hover:text-[#F7C750]"
      >
        View complete course page
      </Link> */}
    </Link>
  );
};

export default Card;
