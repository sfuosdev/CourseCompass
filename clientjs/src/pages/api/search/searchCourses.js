import dbConnect from '../../../app/utils/dbConnect';
import Course from '../../../models/Course';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const { searchTerm } = req.query;

    // handle spaces for search
    const combinedSearchTerm = searchTerm.replace(/\s/g, '');

    const regexPatterns = [
      new RegExp(combinedSearchTerm, 'i'), 
      new RegExp(searchTerm, 'i'),
    ];

    const courses = await Course.find({
      $or: [
        { courseCode: { $in: regexPatterns } },
        { title: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('Failed to search courses:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
