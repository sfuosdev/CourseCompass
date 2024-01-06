import dbConnect from '../../../app/utils/dbConnect';
import Review from '../../../models/Review';
import Course from '../../../models/Course';
import User from '../../../models/User';

export default async function handler(req, res) {
    console.log("addReview.js");
    await dbConnect();

    const { userId, courseCode, usefulnessRating, difficultyRating, comment } = req.body;
    console.log("userId: " + userId);
    console.log("courseCode: " + courseCode);
    console.log("usefulnessRating: " + usefulnessRating);
    console.log("difficultyRating: " + difficultyRating);
    console.log("comment: " + comment);
    
    try {
        const course = await Course.findOne({courseCode});
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newReview = new Review({
            reviewer: user._id,
            course: course._id,
            usefulnessRating,
            difficultyRating,
            comment
        });

        await newReview.save();
        res.status(200).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
