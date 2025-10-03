const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendOtpEmail(toEmail, otp) {
  const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 min from now
  const formattedTime = expiryTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const msg = {
    to: toEmail,
    from: {
      email: process.env.SENDGRID_VERIFIED_EMAIL,
      name: 'PolyDash Team'
    },
    subject: 'Your OTP Code',
    text: `To authenticate, please use the following One Time Password (OTP):

${otp}

This OTP will be valid for 15 minutes till ${formattedTime}.

Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this email.

Thanks,
PolyDash Team ~ Developer Kartikey Pathak.`
  };

  try {
    await sgMail.send(msg);
    console.log('✅ OTP email sent successfully to', toEmail);
  } catch (err) {
    console.error('❌ Error sending OTP email:', err);
    if (err.response) {
      console.error(err.response.body);
    }
  }
}

module.exports = sendOtpEmail;
