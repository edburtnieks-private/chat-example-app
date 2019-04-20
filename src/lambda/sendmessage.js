const Chatkit = require('@pusher/chatkit-server');

exports.handler = (event, context) => {
  const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SECRET_KEY
  });

  const { userId, roomId, parts } = JSON.parse(event.body);

  return chatkit.sendMultipartMessage({
    userId,
    roomId,
    parts
  })
    .then(messageId => ({
      statusCode: 200,
      body: JSON.stringify(messageId)
    }))
    .catch(error => ({
      statusCode: 200,
      body: JSON.stringify(error)
    }));
};
