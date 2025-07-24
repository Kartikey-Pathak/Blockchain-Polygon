const nodemailer = require("nodemailer");
require('dotenv').config();


async function logmsg(toEmail,user) {
    // configure transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // your Gmail address
            pass: process.env.EMAIL_PASS, // your Gmail app password
        },
    });

    // email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Successful login to your account',
        text: `Hello ${user},

We noticed that you successfully logged in to your account.

If this was you, you can safely ignore this message.

If you didn't attempt to log in, please reset your password immediately and contact support.

Sincerely,
Developer ~ Kartikey Pathak. 

`,
    };
    await transporter.sendMail(mailOptions);
}
module.exports = logmsg;