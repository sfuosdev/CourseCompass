// pages/api/searchCourses.js
import dbConnect from '../../../app/utils/dbConnect';
import Course from '../../../models/Course';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const { searchTerm } = req.query;

    // Use regular expressions to search for courses by department, course code, or name
    const courses = await Course.find({
      $or: [
        { courseCode: { $regex: searchTerm, $options: 'i' } }, // Search by course code
        { name: { $regex: searchTerm, $options: 'i' } }, // Search by name
        { dept: { $regex: searchTerm, $options: 'i' } }, // Search by department
      ],
    });

    // Respond with the matched courses
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('Failed to search courses:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
