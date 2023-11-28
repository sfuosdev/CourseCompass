import React from "react";

const Card = ({ course }) => {
  return (
    <div className="flex flex-col round rounded-2xl w-[260px] h-[300px] bg-[#F3F4FA] pl-[18px] pr-[18px] pt-[25px] hover:bg-[#AAC2FD]">
      <div className="text-[30px]">{`CMPT ${course.value}`}</div>
      <div className="inline-block text-[15px] h-[40%]">{`${course.title}`}</div>
      <div className="flex justify-between inline-block text-[15px] font-bold">
        <span>Next Offering:</span>
        <span>Spring 2024</span>
      </div>

      <hr class="h-px my-[5px] bg-black"></hr>
      <div className="flex justify-between inline-block text-[15px]">
        <span>Professor:</span>
        <div className="flex flex-col text-right">
          <span>John Edgar</span>
          <span>David Murphy</span>
        </div>
      </div>
      <a className="underline underline-offset-4 text-[10px] text-[#4570E6] text-right pt-[18px]">
        View complete course page
      </a>
    </div>
  );
};

export default Card;
