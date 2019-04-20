const Chatkit = require('@pusher/chatkit-server');

exports.handler = (event, context) => {
  const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SECRET_KEY
  });
  const { roomId } = event.queryStringParameters;

  const changeMessageStructure = (message) => {
    const { id, user_id } = message;
    const { text, url, type } = JSON.parse(message.parts[0].content);
    return {
      id: id.toString(),
      sender: user_id,
      text,
      url,
      type
    };
  };

  const parseMessages = (messages) => (
    messages.reduce((parsedMessages, message) => {
      parsedMessages.push(changeMessageStructure(message));
      return parsedMessages;
    }, [])
  );

  return chatkit.fetchMultipartMessages({
    roomId,
    direction: 'newer'
  })
    .then(messages => ({
      statusCode: 200,
      body: JSON.stringify(parseMessages(messages))
    }))
    .catch(error => ({
      statusCode: 200,
      body: JSON.stringify(error)
    }));
};
