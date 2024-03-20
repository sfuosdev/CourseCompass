"use client";

import React, { useEffect, useState } from "react";
import Card from "../courses/components/Card";

async function getData(userQuery) {
  const response = await fetch(`/api/search/aiSearch?searchTerm=${userQuery}`);
  const data = await response.json();
  return data;
}

const Page = () => {
  const [userQuery, setUserQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  function handleChange(e) {
    setUserQuery(e.target.value);
  }

  async function handleSearch() {
    console.log(userQuery);
    const data = await getData(userQuery);
    setSearchResult(data.results);
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <input
          placeholder="Type something..."
          className="relative p-[1rem] w-[70vw] md:w-[50vw] lg:w-[50vw] h-[2.7rem] mb-[0.5rem] rounded-full mt-[0.6rem] ml-[1rem] md:ml-[0rem] border border-black 
          bg-white text-black"
          onChange={(e) => handleChange(e)}
        />
        <button
          className="w-[10vw] md:w-[10vw] lg:w-[10vw] h-[2.7rem] mb-[0.5rem] rounded-full border border-black bg-primary-blue text-black"
          onClick={async () => {
            await handleSearch();
          }}
        >
          Search
        </button>
      </div>
      {searchResult.map(
        (course, idx) =>
          idx < 5 ? (
            <div className="mb-[5px]">
              {course.courseCode} - {course.title}
            </div>
          ) : (
            <></>
          )
        // <div className="mb-[5px]">
        //   {course.courseCode} - {course.title}
        // </div>
      )}
    </div>
  );
};

export default Page;
