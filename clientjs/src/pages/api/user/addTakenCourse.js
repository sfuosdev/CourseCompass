// api/user/addTakenCourse.js
import User from '../../../models/User';
import Course from '../../../models/Course';
import dbConnect from '../../../app/utils/dbConnect'

export default async function handler(req, res) {
    await dbConnect();

    const { userId, courseCode, grade, semester, year } = req.body;

    try {
        const course = await Course.findOne({ courseCode });
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const completedCourse = { course: course._id, grade, semester, year };
        await User.findByIdAndUpdate(userId, { $push: { completedCourses: completedCourse } });
        res.status(200).json({ message: 'Taken course added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
