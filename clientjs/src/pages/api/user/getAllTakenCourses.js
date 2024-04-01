import User from '../../../models/User';
import dbConnect from '../../../app/utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();
    
    // Assuming the user's ID is passed as a query parameter
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID must be provided' });
    }

    try {
        const user = await User.findById(userId).populate({
            path: 'completedCourses.course',
            select: 'courseCode title name credits -_id' // Adjust according to the information you want to return
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the completed courses and prepare the response
        const completedCourses = user.completedCourses.map(({ course, semesterCompleted, yearCompleted }) => ({
            courseCode: course.courseCode,
            title: course.title,
            name: course.name,
            credits: course.credits,
            semesterCompleted,
            yearCompleted
        }));

        res.status(200).json({ completedCourses });
    } catch (error) {
        console.error("Error fetching taken courses:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
