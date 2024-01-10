import dbConnect from '../../../app/utils/dbConnect';
import Course from '../../../models/Course';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();
        const { query } = req.query;

        // Adjust the search logic as per your requirements.
        // This example uses a simple regex search on the course name.
        // You might want to extend it to other fields or use more complex queries.
        const courses = await Course.find({
            $or: [
                { name: new RegExp(query, 'i') }, // Case-insensitive regex search for course name
                { courseCode: new RegExp(query, 'i') } // Case-insensitive regex search for course code
                // You can add more fields to search in here
            ]
        }).lean();

        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
