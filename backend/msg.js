const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendmsg(toEmail) {
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

  const mailOptions = {
    from: `"PolyDash Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Account Created Successfully',
    text: `This email confirms that your account with PolyDash has been successfully created.

We are delighted to welcome you to our community. You can now access all the features and resources available on our platform.

To get started, please visit https://polydash-beryl.vercel.app/.

If you have any questions or need assistance, please don't hesitate to contact us at kartikeypathak08@gmail.com.

We look forward to your engagement with PolyDash.

Sincerely,
Developer ~ Kartikey Pathak.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Registration email sent:', info.response);
  } catch (err) {
    console.error('❌ Error sending registration email:', err);
    // Optional: throw error for backend handling
    throw new Error('Failed to send registration email');
  }
}

module.exports = sendmsg;
