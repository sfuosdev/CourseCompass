// pages/api/course/getCourse.js
import dbConnect from '../../../utils/dbConnect';
import Course from '../../../models/Course';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();
        const { courseCode } = req.query;

        const course = await Course.findOne({ courseCode: courseCode });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
