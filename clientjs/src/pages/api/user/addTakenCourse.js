import User from '../../../models/User';
import Course from '../../../models/Course';
import dbConnect from '../../../app/utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    const { userId, courseCode, semester, year } = req.body;
    // Convert courseCode to lowercase and remove spaces if present
    const formattedCourseCode = courseCode.toLowerCase().replace(/\s+/g, '');

    console.log("userId:", userId, "Formatted courseCode:", formattedCourseCode, "semester:", semester, "year:", year);

    try {
        // Ensure the query uses the lowercase formatted courseCode
        const course = await Course.findOne({ courseCode: formattedCourseCode });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Fetch the user to check existing completedCourses
        const user = await User.findById(userId).populate('completedCourses.course');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the course is already in the user's completedCourses
        const courseAlreadyTaken = user.completedCourses.some(completedCourse => {
            return completedCourse.course._id.equals(course._id);
        });

        if (courseAlreadyTaken) {
            // If the course is already taken, return a message indicating so
            return res.status(409).json({ message: 'Course already taken' });
        }

        // If the course hasn't been taken, add it to the user's completedCourses
        const completedCourse = {
            course: course._id,
            semesterCompleted: semester,
            yearCompleted: year,
        };

        await User.findByIdAndUpdate(userId, { $addToSet: { completedCourses: completedCourse } });

        res.status(200).json({ message: 'Taken course added successfully' });
    } catch (error) {
        console.error("Error in addTakenCourse:", error);
        res.status(500).json({ error: error.message });
    }
};
