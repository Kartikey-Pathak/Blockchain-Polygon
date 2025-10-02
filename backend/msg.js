const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// set API key globally from env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendmsg(toEmail) {
    const msg = {
        to: toEmail,
        from: process.env.EMAIL_USER, // must be a verified sender in SendGrid
        subject: 'User Registered Successfully',
        text: `This email confirms that your account with PolyDash has been successfully created.

We are delighted to welcome you to our community. You can now access all the features and resources available on our platform.

To get started, please visit https://polydash-beryl.vercel.app/.

If you have any questions or need assistance, please don't hesitate to contact us at kartikeypathak08@gmail.com.

We look forward to your engagement with PolyDash.

Sincerely,
Developer ~ Kartikey Pathak.
        `,
    };

    try {
        await sgMail.send(msg);
        console.log(' Registration email sent');
    } catch (error) {
        console.error('Error sending registration email:', error.response?.body || error.message);
    }
}

module.exports = sendmsg;
