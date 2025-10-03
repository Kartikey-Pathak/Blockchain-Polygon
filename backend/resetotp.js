const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendResetOtpEmail(toEmail, otp) {
  const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const formattedTime = expiryTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const msg = {
    to: toEmail,
    from: process.env.SENDGRID_VERIFIED_EMAIL, // ✅ must match verified sender
    subject: 'OTP for Password Reset',
    text: `To reset your password, please use the following OTP:

${otp}

This OTP will be valid for 15 minutes till.

Do not share this OTP with anyone. If you didn't request this, ignore this email.

Thanks,
PolyDash Team ~ Developer Kartikey Pathak.`
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Reset OTP email sent successfully to', toEmail);
  } catch (err) {
    console.error('❌ Error sending reset OTP email:', err);
    if (err.response) {
      console.error(err.response.body); // detailed SendGrid error
    }
  }
}

module.exports = sendResetOtpEmail;
