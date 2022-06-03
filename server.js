require('dotenv').config()
const express = require('express');
const querystring = require('querystring');
const cors = require('cors');
const lyricsFinder = require('lyrics-finder');
const axios = require('axios');
const path = require('path');
const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'client', 'build')));

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.client_id;
const CLIENT_SECRET = process.env.client_secret;
const REDIRECT_URI = process.env.redirect_uri;

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server running on port ${PORT}`)
});

app.get('/login', (req, res) => {
  const code = req.query.code;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    }
  }).then(data => res.json({
    accessToken: data.data.access_token,
    refreshToken: data.data.refresh_token,
    expiresIn: data.data.expires_in
  })).catch(() => res.sendStatus(400))
});

app.get('/refresh', (req, res) => {
  const refreshToken = req.query.refresh_token
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }),
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    }
  })
  .then(data => res.json({
    accessToken: data.data.access_token,
    expiresIn: data.data.expires_in
  }))
  .catch(err => console.log(err))
})

app.get('/lyrics', async (req, res) => {
  const lyrics = await lyricsFinder(req.query.artist, req.query.title) || "No Lyrics Found!";
  res.json({ lyrics })
})
