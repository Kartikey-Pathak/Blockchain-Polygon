const nodemailer = require("nodemailer");
require('dotenv').config();


async function sendOtpEmail(toEmail, otp) {
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
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };
    await transporter.sendMail(mailOptions);
}
module.exports = sendOtpEmail;