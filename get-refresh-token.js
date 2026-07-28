const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Try to load dotenv
try {
  require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });
} catch (e) {
  console.log("dotenv not found, ensure variables are in your environment or install dotenv.");
}

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/api/storage/oauth/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("ERROR: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in .env.local");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent' // Forces consent screen to ensure refresh token is returned
});

console.log('====================================================');
console.log('Authorize this app by visiting this url:');
console.log(authUrl);
console.log('====================================================\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', (code) => {
  rl.close();
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    
    console.log('\n✅ Successfully retrieved tokens!\n');
    if (token.refresh_token) {
      console.log('Add the following line to your .env.local file:');
      console.log(`GOOGLE_REFRESH_TOKEN="${token.refresh_token}"`);
    } else {
      console.log('⚠️ No refresh token was returned. Make sure you are forcing the consent screen (prompt: consent).');
    }
  });
});
