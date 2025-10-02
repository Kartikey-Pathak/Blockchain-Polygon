const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// set API key once from env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function logmsg(toEmail, user) {
    const msg = {
        to: toEmail,
        from: process.env.EMAIL_USER, // must be the verified sender in SendGrid
        subject: 'Successful login to your account',
        text: `Hello ${user},

We noticed that you successfully logged in to your account.

If this was you, you can safely ignore this message.

If you didn't attempt to log in, please reset your password immediately and contact support.

Sincerely,
Developer ~ Kartikey Pathak.
        `,
    };

    try {
        await sgMail.send(msg);
        console.log(' Login notification email sent');
    } catch (error) {
        console.error('Error sending login email:', error.response?.body || error.message);
    }
}

module.exports = logmsg;
