const nodemailer = require('nodemailer');
require('dotenv').config();

async function logmsg(toEmail, user) {
  // create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other email service
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS  // your email password or app password if 2FA is enabled
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Successful Login Notification',
    text: `Hello ${user},

We noticed that you successfully logged in to your account.

If this was you, you can safely ignore this message.

If you didn't attempt to log in, please reset your password immediately and contact support.

Sincerely,
Developer ~ Kartikey Pathak.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Login notification email sent:', info.response);
  } catch (err) {
    console.error('❌ Error sending login email:', err);
  }
}

module.exports = logmsg;
