// Import dependencies
import User from '../../../models/User';
import dbConnect from '../../../app/utils/dbConnect';

// Define the handler for the POST request
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    await dbConnect();

    // Extracting userId and courseId from the request body
    const { userId, courseId } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { favoriteCourses: courseId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Favorite course removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
