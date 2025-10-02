const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendmsg(toEmail) {
  // create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS  // your email password or app password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
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
  }
}

module.exports = sendmsg;
