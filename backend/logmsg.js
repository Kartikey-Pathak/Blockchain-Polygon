const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendLoginNotificationEmail(toEmail, user) {
  const msg = {
    to: toEmail,
    from: process.env.SENDGRID_VERIFIED_EMAIL, // ✅ must match verified sender
    subject: 'Successful Login Notification',
    text: `Hello ${user},

We noticed that you successfully logged in to your account.

If this was you, you can safely ignore this message.

If you didn't attempt to log in, please reset your password immediately and contact support.

Sincerely,
Developer ~ Kartikey Pathak.`
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Login notification email sent successfully to', toEmail);
  } catch (err) {
    console.error('❌ Error sending login notification email:', err);
    if (err.response) {
      console.error(err.response.body); // shows SendGrid error details
    }
  }
}

module.exports = sendLoginNotificationEmail;
