// archiveCourses.js

const fs = require('fs');
const cron = require('node-cron');

// Use dynamic import for node-fetch
import('node-fetch')
  .then((fetchModule) => {
    const fetch = fetchModule.default;

    const SFU_COURSE_API_URL = 'http://www.sfu.ca/bin/wcm/course-outlines'; // Replace with actual API URL

    // Function to fetch SFU course data and write it to a file
    async function fetchAndArchiveCourses() {
      try {
        // Fetch course data from SFU API
        const response = await fetch(SFU_COURSE_API_URL);
        const courses = await response.json();

        // Write courses data to a file (e.g., courses.json)
        fs.writeFileSync('courses.json', JSON.stringify(courses, null, 2));
        console.log('Courses archived successfully!');
      } catch (error) {
        console.error('Error archiving courses:', error);
      }
    }

    // Schedule the task to run every month (change the cron schedule as needed)
    cron.schedule('0 0 1 * *', fetchAndArchiveCourses); // Runs on the 1st day of every month at midnight (00:00)

    // Uncomment below line if you want to archive courses immediately on server start
    //fetchAndArchiveCourses();
  })
  .catch((error) => {
    console.error('Error importing node-fetch:', error);
  });
