const axios = require('axios');

const BASE_URL = 'http://www.sfu.ca/bin/wcm/course-outlines';

// Function to fetch departments for a specific year and term
const fetchDepartments = async (year, term) => {
  const url = `${BASE_URL}?${year}/${term}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};

// Function to fetch course numbers and titles for a specific department, year, and term
const fetchCourseNumbers = async (year, term, department) => {
  const url = `${BASE_URL}?${year}/${term}/${department}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course numbers for ${department}:`, error);
    return [];
  }
};

// Function to fetch course outline details for a specific course
const fetchCourseOutline = async (year, term, department, courseNumber) => {
  const url = `${BASE_URL}?${year}/${term}/${department}/${courseNumber}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course outline for ${department} ${courseNumber}:`, error);
    return {};
  }
};

// Function to fetch all departments, courses, and titles for a range of years and terms
const fetchAllCourses = async () => {
  const currentYear = new Date().getFullYear();

  // Hash map to store courses with their respective titles
  const coursesMap = {};

  for (let year = 2020; year <= currentYear; year++) {
    const terms = ['spring', 'summer', 'fall'];

    for (const term of terms) {
      const departments = await fetchDepartments(year, term);

      for (const department of departments) {
        const courseNumbers = await fetchCourseNumbers(year, term, department.value);

        for (const course of courseNumbers) {
          const { value: courseNumber, title: courseTitle } = course;
          const courseDetails = await fetchCourseOutline(year, term, department.value, courseNumber);
          const courseName = `${department.text} ${courseNumber} ${courseTitle}`;

          // Check if the course already exists in the map to avoid duplicates
          if (!coursesMap[courseName]) {
            coursesMap[courseName] = courseDetails;
          }
        }
      }
    }
  }

  return coursesMap;
};

// Example usage:
fetchAllCourses()
  .then(result => {
    console.log('Courses Map:', result);
    console.log('Concluded');
  })
  .catch(error => {
    console.error('Error:', error);
  });
