// api/reviews/removeReview.js
import dbConnect from '../../../app/utils/dbConnect';
import User from '../../../models/User';
import Review from '../../../models/Review';

export default async function handler(req, res) {
    await dbConnect();

    const { userId, reviewId } = req.body;

    try {
        // Check if the review exists
        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        // Remove the review from the User's courseReviews array
        await User.updateOne(
            { _id: userId },
            { $pull: { courseReviews: { _id: reviewId } } }
        );

        // Remove the review document
        await Review.findByIdAndDelete(reviewId);

        res.status(200).json({ message: 'Review removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
