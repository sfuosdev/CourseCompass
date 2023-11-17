"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import { Outline } from "./CourseOutline";

type APIData = {
  value: string;
};

export type OutlineSelections = {
  year: string | null;
  term: string | null;
  department: string | null;
  courseNumber: string | null;
  section: string | null;
  lastChanged: string | null;
};

function getValues(apiResponse: any): string[] {
  return apiResponse.data.map(({ value }: APIData) => value);
}
async function fetchData(
  setProperty: (property: string[]) => void,
  year: string | null,
  term: string | null,
  department: string | null,
  courseNumber: string | null,
  section: string | null
) {
  var url: string = `http://www.sfu.ca/bin/wcm/course-outlines`;

  if (year && !term) {
    url += `?${year}`;
  } else if (year && !department) {
    url += `?${year}/${term}`;
  } else if (year && !courseNumber) {
    url += `?${year}/${term}/${department}`;
  } else if (year && !section) {
    url += `?${year}/${term}/${department}/${courseNumber}`;
  }

  const values = getValues(await axios.get(url));

  setProperty(values);

  return values;
}

interface SelectioMenuProps {
  outline: Outline | undefined;
  setOutline: (outline: Outline) => void | undefined;
}

const SelectionMenu = ({ outline, setOutline }: SelectioMenuProps) => {
  const [years, setYears] = useState<string[]>([]);
  const [terms, setTerms] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [courseNumbers, setCourseNumbers] = useState<string[]>([]);
  const [sections, setSections] = useState<string[]>([]);

  const [selectedOptions, setSelectedOptions] = useState<OutlineSelections>({
    year: null,
    term: null,
    department: null,
    courseNumber: null,
    section: null,
    lastChanged: null,
  });

  async function updateParameters(options: OutlineSelections) {
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
        const outlineData = response.data as Outline;
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
