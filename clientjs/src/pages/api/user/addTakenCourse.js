import User from '../../../models/User';
import Course from '../../../models/Course';
import dbConnect from '../../../app/utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    // Format the courseCode to remove spaces
    const { userId, courseCode, semester, year } = req.body;
    const formattedCourseCode = courseCode.replace(/\s+/g, '');

    console.log("userId:", userId, "courseCode:", formattedCourseCode, "semester:", semester, "year:", year);

    try {
        // Use the formatted courseCode for querying
        const course = await Course.findOne({ courseCode: formattedCourseCode });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const completedCourse = {
            course: course._id,
            semesterCompleted: semester,
            yearCompleted: year,
        };

        await User.findByIdAndUpdate(userId, { $addToSet: { completedCourses: completedCourse } });

        res.status(200).json({ message: 'Taken course added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
