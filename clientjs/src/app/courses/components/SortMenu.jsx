"use client";

import Rating from "@/app/reviews/Rating/Rating";
import React, { useState } from "react";

const SortMenu = ({ filterOptions, setFilterOptions, handleSort }) => {
  const [sortMode, setSortMode] = useState("code");

  const changeRating = (rating) => {
    if (filterOptions.rating == 0) {
      setFilterOptions({ ...filterOptions, rating: rating });
    } else {
      setFilterOptions({ ...filterOptions, rating: 0 });
    }
  };

  // const handleSortChange = (e) => {
  //   if (e.target.value === "code") {
  //     courses.sort((a, b) => {
  //       if (a.courseCode < b.courseCode) {
  //         return -1;
  //       }
  //       if (a.courseCode > b.courseCode) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else if (e.target.value === "title") {
  //     courses.sort((a, b) => {
  //       if (a.title < b.title) {
  //         return -1;
  //       }
  //       if (a.title > b.titel) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   }
  // };
  return (
    <div className="flex flex-col fixed ml-[20px]">
      <div className="rounded-3xl flex flex-row text-white bg-[#4E4E4E] p-[5px]">
        <span className="inline-block pl-[1rem]">Sort by:</span>
        <select
          className="select-none focus:outline-none bg-transparent text-white"
          onChange={(e) => {
            handleSort(e.target.value);
          }}
        >
          <option value="code" className="bg-[#4E4E4E]">
            Course Code
          </option>
          <option value="title" className="bg-[#4E4E4E]">
            Course Title
          </option>
        </select>
      </div>
      <div className="text-[14px] pt-[10px]">
        <div className="flex flex-row pl-[5px] gap-[10px]">
          <input
            type="checkbox"
            onChange={(e) => {
              setFilterOptions({
                ...filterOptions,
                prereqs: !filterOptions.prereqs,
              });
            }}
          />
          <span>Prerequisites</span>
        </div>
        <div className="flex flex-row pl-[5px] gap-[10px]">
          <input
            type="checkbox"
            onChange={(e) => {
              setFilterOptions({
                ...filterOptions,
                noprereqs: !filterOptions.noprereqs,
              });
            }}
          />
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
        <div className="flex flex-row pl-[5px] gap-[10px]">
          <input
            type="checkbox"
            onChange={(e) => {
              setFilterOptions({
                ...filterOptions,
                graduateLevel: !filterOptions.graduateLevel,
              });
            }}
          />
          <span>Graduate Level Courses</span>
        </div>

        <div className="flex flex-row pl-[5px] gap-[10px]">
          <div
            onClick={(e) => {
              changeRating(80);
            }}
          >
            <Rating
              ratingInPercent={80}
              iconSize="m"
              showOutOf={true}
              enableUserInteraction={false}
            />
            <span>{" & up"}</span>
          </div>
        </div>
        <div className="flex flex-row pl-[5px] gap-[10px]">
          <div
            onClick={(e) => {
              changeRating(60);
            }}
          >
            <Rating
              ratingInPercent={60}
              iconSize="m"
              showOutOf={true}
              enableUserInteraction={false}
            />
            <span>{" & up"}</span>
          </div>
        </div>
        <div className="flex flex-row pl-[5px] gap-[10px]">
          <div
            onClick={(e) => {
              changeRating(40);
            }}
          >
            <Rating
              ratingInPercent={40}
              iconSize="m"
              showOutOf={true}
              enableUserInteraction={false}
            />
            <span>{" & up"}</span>
          </div>
        </div>
        <div className="flex flex-row pl-[5px] gap-[10px]">
          <div
            onClick={(e) => {
              changeRating(20);
            }}
          >
            <Rating
              ratingInPercent={20}
              iconSize="m"
              showOutOf={true}
              enableUserInteraction={false}
            />
            <span>{" & up"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortMenu;
