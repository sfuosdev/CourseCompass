const url = `http://www.sfu.ca/bin/wcm/course-outlines`;
import axios from "axios";
import { NextResponse } from "next/server";

export async function getCourses(year, term, department) {
  const res = await axios.get(`${url}?${year}/${term}/${department}`);
  //   console.log(res);
  return res.data;
}

export async function getSections(year, term, department, course) {
  const res = await axios.get(`${url}?${year}/${term}/${department}/${course}`);
  //   console.log(res);
  return res.data;
}

export async function getOutlines(year, term, department, course, section) {
  const res = await axios.get(
    `${url}?${year}/${term}/${department}/${course}/${section}`
  );
  //   console.log(res);
  return res.data;
}
