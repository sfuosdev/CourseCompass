// utils/email.js

import nodemailer from 'nodemailer';

export async function sendEmail({ name, email, subject, message }) {
    const transporter = nodemailer.createTransport({
        // Set up your email transporter (e.g., SMTP details)
        // Refer to nodemailer documentation: https://nodemailer.com/
    });

    const mailOptions = {
        from: email,
        to: 'joaoishida@gmail.com',
        subject,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    return transporter.sendMail(mailOptions);
}
