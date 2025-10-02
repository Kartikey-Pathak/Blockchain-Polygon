const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendOtpEmail(toEmail, otp) {
  // create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another email provider
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS  // your email password or app password
    }
  });

  const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
  const formattedTime = expiryTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Your OTP Code',
    text: `To authenticate, please use the following One Time Password (OTP):

${otp}

This OTP will be valid for 15 minutes till ${formattedTime}.

Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this email.

Thanks,
PolyDash Team ~ Developer Kartikey Pathak.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent:', info.response);
  } catch (err) {
    console.error('❌ Error sending OTP email:', err);
  }
}

module.exports = sendOtpEmail;
