require('dotenv').config();
const Chatkit = require('@pusher/chatkit-server');

exports.handler = (event, context) => {
  const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SECRET_KEY
  });

  return chatkit.getRooms({})
    .then(rooms => ({
      statusCode: 200,
      body: JSON.stringify(rooms)
    }))
    .catch(error => ({
      statusCode: 200,
      body: JSON.stringify(error)
    }));
};
