const request = require('request');

exports.handler = (event, context, callback) => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: process.env.SPOTIFY_GRANT_TYPE,
      code: event.queryStringParameters.code || null,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI
    },
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    callback(null, {
      statusCode: 301,
      headers: {
        Location: '/',
        'Set-Cookie': `spotifyAccessToken=${body.access_token};`
      },
      body: ''
    });
  });
};
