const querystring = require('querystring');

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 301,
    headers: {
      Location: `https://accounts.spotify.com/authorize?${querystring.stringify({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        response_type: process.env.SPOTIFY_RESPONSE_TYPE,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI
      })}`
    },
    body: ''
  });
};
