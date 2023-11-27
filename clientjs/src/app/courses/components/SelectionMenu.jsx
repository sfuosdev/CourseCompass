"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";

function getValues(apiResponse) {
  return apiResponse.data.map(({ value }) => value);
}
export async function fetchData(year, term, department, courseNumber, section) {
  var url = `http://www.sfu.ca/bin/wcm/course-outlines`;

  if (year && !term) {
    url += `?${year}`;
  } else if (year && !department) {
    url += `?${year}/${term}`;
  } else if (year && !courseNumber) {
    url += `?${year}/${term}/${department}`;
  } else if (year && !section) {
    url += `?${year}/${term}/${department}/${courseNumber}`;
  }

  const values = await axios.get(url);
  // console.log(values.data);
  // const values = getValues(res);

  // setProperty(values.data);

  return values.data;
}

const SelectionMenu = ({ outline, setOutline }) => {
  const [years, setYears] = useState([]);
  const [terms, setTerms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courseNumbers, setCourseNumbers] = useState([]);
  const [sections, setSections] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({
    year: null,
    term: null,
    department: null,
    courseNumber: null,
    section: null,
    lastChanged: null,
  });

  async function updateParameters(options) {
    setOutline(null);

    if (!options.year) {
      const yearValues = await fetchData(
        setYears,
        null,
        null,
        null,
        null,
        null
      );
      options.year = yearValues[yearValues.length - 1];
    }

    if (!options.term || options.lastChanged === "Year") {
      const termValues = await fetchData(
        setTerms,
        options.year,
        null,
        null,
        null,
        null
      );
      options.term = termValues[termValues.length - 1];
    }

    if (
      !options.department ||
      options.lastChanged === "Year" ||
      options.lastChanged === "Term"
    ) {
      const departmentsValues = await fetchData(
        setDepartments,
        options.year,
        options.term,
        null,
        null,
        null
      );

      options.department = departmentsValues[0];
    }

    if (
      !options.courseNumber ||
      options.lastChanged === "Year" ||
      options.lastChanged === "Term" ||
      options.lastChanged === "Department"
    ) {
      const courseNumberValues = await fetchData(
        setCourseNumbers,
        options.year,
        options.term,
        options.department,
        null,
        null
      );
      options.courseNumber = courseNumberValues[0];
    }

    if (
      !options.section ||
      options.lastChanged === "Year" ||
      options.lastChanged === "Term" ||
      options.lastChanged === "Department" ||
      options.lastChanged === "Course Number"
    ) {
      const sectionValues = await fetchData(
        setSections,
        options.year,
        options.term,
        options.department,
        options.courseNumber,
        null
      );
      options.section = sectionValues[0];
    }
  }

  const fetchOutline = async () => {
    await axios
      .get(
        `http://www.sfu.ca/bin/wcm/course-outlines?${selectedOptions.year}/${selectedOptions.term}/${selectedOptions.department}/${selectedOptions.courseNumber}/${selectedOptions.section}`
      )
      .then((response) => {
        const outlineData = response.data;
        setOutline(outlineData);
      });
  };

  useEffect(() => {
    updateParameters(selectedOptions);
  }, []);

  useEffect(() => {
    updateParameters(selectedOptions);
  }, [selectedOptions]);
  return (
    <div className="text-xl flex flex-row">
      <div>Year:</div>
      <Dropdown
        values={years}
        options={selectedOptions}
        setOptions={setSelectedOptions}
        type={"Year"}
      />
      <div>Term:</div>
      <Dropdown
        values={terms}
        options={selectedOptions}
        setOptions={setSelectedOptions}
        type={"Term"}
      />
      <div>Department:</div>
      <Dropdown
        values={departments}
        options={selectedOptions}
        setOptions={setSelectedOptions}
        type={"Department"}
      />
      <div>Course Number:</div>
      <Dropdown
        values={courseNumbers}
        options={selectedOptions}
        setOptions={setSelectedOptions}
        type={"Course Number"}
      />
      <div>Sections:</div>
      <Dropdown
        values={sections}
        options={selectedOptions}
        setOptions={setSelectedOptions}
        type={"Section"}
      />
      <button
        className="border rounded-md border-black bg-gray-200"
        onClick={fetchOutline}
      >
        Get outline
      </button>
    </div>
  );
};

export default SelectionMenu;
