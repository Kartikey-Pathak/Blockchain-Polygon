const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendDeleteAccountEmail(toEmail) {
  const msg = {
    to: toEmail,
    from: process.env.SENDGRID_VERIFIED_EMAIL, // ✅ must be verified sender
    subject: 'Your PolyDash Account Deleted',
    text: `Hello,

We wanted to let you know that your PolyDash account has been successfully deleted as per your request.

Thank you for using PolyDash. We're sorry to see you go!
If this was a mistake or you have any questions, feel free to contact your developer.

Best regards,  
The PolyDash ~ Developer Kartikey Pathak.`
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Account deletion email sent successfully to', toEmail);
  } catch (err) {
    console.error('❌ Error sending account deletion email:', err);
    if (err.response) {
      console.error(err.response.body); // detailed SendGrid error
    }
  }
}

module.exports = sendDeleteAccountEmail;
