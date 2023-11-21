import React from "react";

const SortMenu = ({ filterOptions, setFilterOptions }) => {
  return (
    <div className="flex flex-col">
      <div className="rounded-3xl flex flex-row text-white bg-[#4E4E4E] p-[5px]">
        <span className="inline-block">Sort by:</span>
        <select className="bg-[#4E4E4E] select-none focus:outline-none">
          <option>Offer Dates</option>
        </select>
      </div>
      <div className="text-[10px] pt-[10px]">
        <div className="flex flex-row pl-[5px] gap-[10px]">
          <input type="checkbox" />
          <span>Prerequisites</span>
        </div>
        <div className="flex flex-row pl-[5px] gap-[10px]">
          <input type="checkbox" />
          <span>No-Prerequisites</span>
        </div>
        <div className="flex flex-row pl-[5px] gap-[10px]">
          <input
            type="checkbox"
            onChange={(e) => {
              setFilterOptions({
                ...filterOptions,
                lowerDivision: !filterOptions.lowerDivision,
              });
            }}
          />
          <span>Lower Division Courses</span>
        </div>
        <div className="flex flex-row pl-[5px] gap-[10px]">
          <input
            type="checkbox"
            onChange={(e) => {
              setFilterOptions({
                ...filterOptions,
                upperDivision: !filterOptions.upperDivision,
              });
            }}
          />
          <span>Upper Division Courses</span>
        </div>
      </div>
    </div>
  );
};

export default SortMenu;
