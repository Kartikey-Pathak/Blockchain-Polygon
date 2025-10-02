const nodemailer = require('nodemailer');
require('dotenv').config();

async function deletemsg(toEmail) {
  // create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another email service
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASS  // your email password or app password if 2FA
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Your PolyDash Account Deleted',
    text: `Hello,

We wanted to let you know that your PolyDash account has been successfully deleted as per your request.

Thank you for using PolyDash. We're sorry to see you go!
If this was a mistake or you have any questions, feel free to contact your developer.

Best regards,
The PolyDash ~ Developer Kartikey Pathak.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.response);
  } catch (err) {
    console.error('❌ Email failed:', err);
  }
}

module.exports = deletemsg;
