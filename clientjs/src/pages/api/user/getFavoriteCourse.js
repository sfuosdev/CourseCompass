import User from '../../../models/User';
import Course from '../../../models/Course';
import dbConnect from '../../../app/utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    const { userId, courseId } = req.query;

    try {
       
        // Ensure the user exists
        const user = await User.findById(userId).populate('favoriteCourses');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Find the favorite course by ID
        const favoriteCourse = user.favoriteCourses.find(course => course._id.toString() === courseId);
        if (!favoriteCourse) return res.status(404).json({ message: 'Favorite course not found' });

        res.status(200).json(favoriteCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
