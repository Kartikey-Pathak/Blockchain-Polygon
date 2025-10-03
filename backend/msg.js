const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// set API key from env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendAccountCreationEmail(toEmail) {
  const msg = {
    to: toEmail,
    from: process.env.SENDGRID_VERIFIED_EMAIL, // ✅ must be a verified sender in SendGrid
    subject: 'Account Created Successfully',
    text: `This email confirms that your account with PolyDash has been successfully created.

We are delighted to welcome you to our community. You can now access all the features and resources available on our platform.

To get started, please visit https://polydash-beryl.vercel.app/.

If you have any questions or need assistance, please don't hesitate to contact us at kartikeypathak08@gmail.com.

We look forward to your engagement with PolyDash.

Sincerely,
Developer ~ Kartikey Pathak.`,
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Registration email sent successfully to', toEmail);
  } catch (err) {
    console.error('❌ Error sending registration email:', err);
    if (err.response) {
      console.error(err.response.body); // shows SendGrid error details
    }
  }
}

module.exports = sendAccountCreationEmail;
