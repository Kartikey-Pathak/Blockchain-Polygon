const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendOtpEmail(toEmail, otp) {
  // Create a transporter with explicit Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",   // Gmail SMTP server
    port: 587,                // TLS port
    secure: false,            // false = use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,  // your Gmail address
      pass: process.env.EMAIL_PASS,  // App Password from Google
    },
  });

  // Format OTP expiry time
  const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const formattedTime = expiryTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const mailOptions = {
    from: `"PolyDash Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your OTP Code',
    text: `To authenticate, please use the following One Time Password (OTP):

${otp}

This OTP will be valid for 15 minutes until ${formattedTime}.

Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this email.

Thanks,
PolyDash Team ~ Developer Kartikey Pathak.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent:', info.response);
  } catch (err) {
    console.error('❌ Error sending OTP email:', err);
    // Optional: throw error so your backend can handle it
    throw new Error('Failed to send OTP email');
  }
}

module.exports = sendOtpEmail;
