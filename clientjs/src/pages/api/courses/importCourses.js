import fetch from 'node-fetch';
import mongoose from 'mongoose';
import Course from '../../../models/Course';
import dbConnect from '../../../app/utils/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      
      const year = '2022';
      const term = 'fall';
      const department = 'cmpt';
      
      const departmentUrl = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}`; // e.g., http://www.sfu.ca/bin/wcm/course-outlines?2022/fall/cmpt
      const departmentResponse = await fetch(departmentUrl);
      const departments = await departmentResponse.json();
      console.log(departments);

      const courseListUrl = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${department}`;
      const courseListResponse = await fetch(courseListUrl);
      const courseList = await courseListResponse.json();

      for (const course of courseList) {
        const sectionUrl = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${department}/${course.text}`;
        const sectionResponse = await fetch(sectionUrl);
        const sections = await sectionResponse.json();

        if (sections.length > 0) {
          const firstSection = sections[0];
          const sectionDetailsUrl = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${department}/${course.text}/${firstSection.value}`;
          const detailResponse = await fetch(sectionDetailsUrl);
          const detail = await detailResponse.json();

          const credits = detail?.info?.units;
          const prerequisites = detail?.info?.prerequisites;
          const corequisites = detail?.info?.corequisites;
          const courseDetails = detail?.info?.description;
          const designation = detail?.info?.designation;

          const combinedCourseCode = `${department}${course.text}`;
          const existingCourse = await Course.findOne({ courseCode: combinedCourseCode });
          if (!existingCourse) {
            const newCourse = new Course({
              courseCode: combinedCourseCode,
              name: course.title,
              credits: credits || 0,
              prerequisites: prerequisites || '',
              corequisites: corequisites || '',
              courseDetails: courseDetails || '',
              designation: designation || '',
              dept: department
            });

            await newCourse.save();
          }
        }
      }

      res.status(200).json({ success: true, message: 'CMPT courses imported successfully from SFU API' });
    } catch (error) {
      console.error('Failed to import CMPT courses', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
