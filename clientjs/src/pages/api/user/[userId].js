import dbConnect from '../../../app/utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await dbConnect();
  
    // Extracting the userId from the query parameters
    const {
      query: { userId },
    } = req;
  
    if (req.method === 'GET') {
      try {
        // Replace with your actual database fetching logic
        const user = await User.findById(userId).exec();
        
        if (user) {
          res.status(200).json({ success: true, data: user });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving user data', error: error.message });
      }
    } else {
      // If the request method is not GET, return a 405 Method Not Allowed
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }
  }