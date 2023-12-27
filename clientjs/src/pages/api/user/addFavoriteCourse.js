// api/user/addFavoriteCourse.js
import User from '../../../models/User';
import Course from '../../../models/Course';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    const { userId, courseCode } = req.body;

    try {
        const course = await Course.findOne({ courseCode });
        if (!course) return res.status(404).json({ message: 'Course not found' });

        await User.findByIdAndUpdate(userId, { $addToSet: { favoriteCourses: course._id } });
        res.status(200).json({ message: 'Favorite course added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
