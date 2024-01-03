//TODO fix get offering by courseCode, include instructor and schedule

import dbConnect from '../../../app/utils/dbConnect';
import Course from '../../../models/Course';
import Offering from '../../../models/Offering';
import Instructor from '../../../models/Instructor';
import Schedule from '../../../models/Schedule';

export default async function handler(req, res) {
   
    console.log("getCourse.js");
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();
        const { courseCode } = req.query;
        console.log("courseCode: " + courseCode);
      
        // Find the course by courseCode
        const course = await Course.findOne({ courseCode: courseCode }).lean();
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find offerings associated with the course
        const offerings = await Offering.find({ course: course._id }).populate({
            path: 'instructor',
            model: Instructor,
        }).populate({
            path: 'schedule',
            model: Schedule,
        }).lean();

        // Attach the offerings to the course
        course.offerings = offerings;

        res.status(200).json({ course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
