// pages/api/login.js
import dbConnect from '../../../app/utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Check if user exists
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                return res.status(400).json({ success: false, error: 'Invalid credentials' });
            }

            // Check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, error: 'Invalid credentials' });
            }

            // User is authenticated, send back user data (excluding password)
            user.password = undefined;
            res.status(200).json({ success: true, data: user });

        } catch (error) {
            res.status(500).json({ success: false, error: 'Server error' });
        }
    } else {
        // If not POST request, return 405 - Method Not Allowed
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}
