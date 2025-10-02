require('dotenv').config();
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Replace this with the code from your URL
const authCode = "4/0AVGzR1AI6KrELNuTim4sqmuCZ9_egW4Iq3pDtuv1C6sARgR7sURQWvpDTiEuXuKzZ5_EUg";

async function getRefreshToken() {
  try {
    const { tokens } = await oAuth2Client.getToken(authCode);
    console.log('✅ Tokens received:');
    console.log(tokens);
    // tokens.refresh_token is the one you need to save in .env
  } catch (err) {
    console.error('❌ Error getting tokens:', err);
  }
}

getRefreshToken();
