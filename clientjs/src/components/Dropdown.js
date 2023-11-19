import React from "react";

const Dropdown = ({ values, options, setOptions, type }) => {
  const handleChange = (e) => {
    if (type === "Year")
      setOptions({ ...options, year: e.target.value, lastChanged: type });
    else if (type === "Term")
      setOptions({ ...options, term: e.target.value, lastChanged: type });
    else if (type === "Department")
      setOptions({ ...options, department: e.target.value, lastChanged: type });
    else if (type === "Course Number")
      setOptions({
        ...options,
        courseNumber: e.target.value,
        lastChanged: type,
      });
    else if (type === "Section")
      setOptions({ ...options, section: e.target.value, lastChanged: type });
  };
  return (
    <select onChange={(e) => handleChange(e)}>
      {values?.map((value, idx) => (
        <option key={`${value}_${idx}`}>{value}</option>
      ))}
    </select>
  );
};

export default Dropdown;
