// pages/api/submitForm.js

import { sendEmail } from './email';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        try {
            // Generate subject dynamically
            const subject = `${name} - Course Compass Contact`;

            // Use a function (e.g., sendEmail) to send an email
            await sendEmail({ name, email, subject, message });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error sending email' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
