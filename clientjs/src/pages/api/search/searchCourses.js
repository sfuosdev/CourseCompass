import dbConnect from '../../../app/utils/dbConnect';
import Course from '../../../models/Course';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const { searchTerm, searchMode } = req.query;

    // handle spaces for search
    const combinedSearchTerm = searchTerm.replace(/\s/g, '');

    let query = {};
    if (searchMode === 'code') {
      // Search by course code
      query = { courseCode: { $in: [new RegExp(combinedSearchTerm, 'i'), new RegExp(searchTerm, 'i')] } };
    } else if (searchMode === 'title') {
      // Search by course title
      query = { title: { $regex: searchTerm, $options: 'i' } };
    } else if (searchMode === 'professor') {
      // Search by professor name
      query = { professor: { $regex: searchTerm, $options: 'i' } };
    }

    const courses = await Course.find(query);

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('Failed to search courses:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
