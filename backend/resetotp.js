const nodemailer = require('nodemailer');
require('dotenv').config();

async function resetotp(toEmail, otp) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // app password if using Gmail 2FA
    },
  });

  const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const formattedTime = expiryTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'OTP for Password Reset',
    text: `To reset your password, please use the following OTP:

${otp}

This OTP will be valid for 15 minutes till ${formattedTime}.

Do not share this OTP with anyone. If you didn't request this, ignore this email.

Thanks,
PolyDash Team ~ Developer Kartikey Pathak.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Reset OTP email sent:', info.response);
  } catch (err) {
    console.error('❌ Error sending reset OTP email:', err);
  }
}

module.exports = resetotp;
