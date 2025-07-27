const nodemailer = require("nodemailer");
require('dotenv').config();


async function sendmsg(toEmail) {
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
        subject: 'User Registered Successfully',
        text: `This email confirms that your account with PolyDash has been successfully created.

We are delighted to welcome you to our community. You can now access all the features and resources available on our platform.

To get started, please visit https://polydash-beryl.vercel.app/.

If you have any questions or need assistance, please don't hesitate to contact us at kartikeypathak08@gmail.com.

We look forward to your engagement with PolyDash.

Sincerely,
Developer ~ Kartikey Pathak. 

`,
    };
    await transporter.sendMail(mailOptions);
}
module.exports = sendmsg;