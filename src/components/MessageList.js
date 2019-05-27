import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

const MessageList = ({ messages, onMessageClick }) => (
  <div className="chat__messages">
    {messages.map(message => (
      <Message
        key={message.id}
        message={message}
        onClick={onMessageClick}
      />
    ))}
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  onMessageClick: PropTypes.func.isRequired
};

export default MessageList;
