import fetch from 'node-fetch';
import mongoose from 'mongoose';
import Course from '../../../models/Course';
import dbConnect from '../../../app/utils/dbConnect';

export default async function handler(req, res) {
  try {
    await dbConnect();
    const year = '2022';
    const term = 'fall';

    const departmentsUrl = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}`;
    const departmentsResponse = await fetch(departmentsUrl);
    const departments = await departmentsResponse.json();

    for (const department of departments) {
      const courseListUrl = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${department.value}`;
      const courseListResponse = await fetch(courseListUrl);
      const courseList = await courseListResponse.json();

      for (const course of courseList) {
        const sectionUrl = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${department.value}/${course.value}`;
        const sectionResponse = await fetch(sectionUrl);
        const sections = await sectionResponse.json();

        if (sections.length > 0) {
          const firstSection = sections[0];
          const sectionDetailsUrl = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${department.value}/${course.value}/${firstSection.value}`;
          const detailResponse = await fetch(sectionDetailsUrl);
          const detail = await detailResponse.json();

          const combinedCourseCode = `${department.value}${course.value}`;
          const existingCourse = await Course.findOne({ courseCode: combinedCourseCode });
          if (!existingCourse) {
            const newCourse = new Course({
              courseCode: combinedCourseCode,
              name: course.text,
              credits: detail?.info?.units || 0,
              prerequisites: detail?.info?.prerequisites || '',
              corequisites: detail?.info?.corequisites || '',
              courseDetails: detail?.info?.description || '',
              designation: detail?.info?.designation || '',
              dept: department.value
            });

            await newCourse.save();
          }
        }
      }
    }

    res.status(200).json({ success: true, message: 'Courses imported successfully from SFU API' });
  } catch (error) {
    console.error('Failed to import courses', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
