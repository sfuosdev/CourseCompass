import dbConnect from '../../../app/utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
     
    await dbConnect();
   
    console.log(req.body);
    if (req.method === 'POST') {
        try {
            // Extract user data from request body
            const { username, email, password, majors, minors, courseReviews, completedCourses, favoriteCourses } = req.body;

            // Create a new user
            const user = new User({
                username,
                email,
                password,
                majors,
                minors,
                courseReviews,
                completedCourses,
                favoriteCourses,
            });

            // Save the user to the database
            await user.save();

            // Send back a response
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    } else {
        // Handle any other HTTP methods
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}
