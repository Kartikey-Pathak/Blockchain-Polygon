const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// set API key globally
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendOtpEmail(toEmail, otp) {
  const msg = {
    to: toEmail,
    from: process.env.EMAIL_USER, // must be verified sender in SendGrid
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await sgMail.send(msg);
    console.log(' OTP email sent');
  } catch (error) {
    console.error('Error sending OTP email:', error.response?.body || error.message);
  }
}

module.exports = sendOtpEmail;
