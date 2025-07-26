const nodemailer = require("nodemailer");
require('dotenv').config();


async function deletemsg(toEmail) {
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
        subject: 'Your Account Deleted Successfully',
        text: `Hello,

We wanted to let you know that your PolyDash account has been successfully deleted as per your request.

Thank you for using PolyDash. We're sorry to see you go! 
If this was a mistake or you have any questions, feel free to contact kartikeypathak08@gmail.com

Best regards,
The PolyDash ~ Developer Kartikey Pathak.
`,
    };
    await transporter.sendMail(mailOptions);
}
module.exports = deletemsg;