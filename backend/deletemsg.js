const sgMail = require('@sendgrid/mail');

// set API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function deletemsg(toEmail) {
  const msg = {
    to: toEmail,
    from: process.env.EMAIL_USER, // must be your verified sender in SendGrid
    subject: 'Your Account Deleted Successfully',
    text: `Hello,

We wanted to let you know that your PolyDash account has been successfully deleted as per your request.

Thank you for using PolyDash. We're sorry to see you go! 
If this was a mistake or you have any questions, feel free to contact ${process.env.EMAIL_USER}

Best regards,
The PolyDash ~ Developer Kartikey Pathak.
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(' Email sent successfully');
  } catch (error) {
    console.error('Email failed:', error.response?.body || error.message);
  }
}

module.exports = deletemsg;
