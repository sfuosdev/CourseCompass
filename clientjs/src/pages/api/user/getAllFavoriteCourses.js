import User from '../../../models/User';
import dbConnect from '../../../app/utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    const { userId } = req.query;

    try {
        console.log("Getting favorite courses for user with ID: ", userId);
        // Populate the favoriteCourses field to get course details
        const user = await User.findById(userId).populate('favoriteCourses');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user.favoriteCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
