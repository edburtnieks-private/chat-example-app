import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

const MessageList = ({ messages }) => (
  <div className="chat__messages">
    {messages.map(message => <Message key={message.id} message={message} />)}
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.objectOf).isRequired
};

export default MessageList;
