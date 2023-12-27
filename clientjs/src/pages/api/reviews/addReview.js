// api/reviews/addReview.js
import dbConnect from '../../../app/utils/dbConnect';
import Review from '../../../models/Review';
import Course from '../../../models/Course';
import User from '../../../models/User';

export default async function handler(req, res) {
    await dbConnect();

    const { userId, courseCode, usefulnessRating, difficultyRating, comment } = req.body;

    try {
        // Check if the course exists
        const course = await Course.findOne({ courseCode });
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Create a new review
        const newReview = new Review({
            reviewer: userId,
            course: course._id,
            usefulnessRating,
            difficultyRating,
            comment
        });

        // Save the review
        await newReview.save();

        res.status(200).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
