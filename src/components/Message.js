import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => (
  <div className="chat__message">
    <div className="chat__message-inner">
      <p className="chat__message-username">{message.sender}</p>
      <p className="chat__message-text">{message.text}</p>
      <p className="chat__message-type">{message.type}</p>
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Message;
