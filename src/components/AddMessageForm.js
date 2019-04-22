import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddMessageForm = ({ onSubmit, onChange, value }) => (
  <form onSubmit={e => onSubmit(e)} className="chat__message-form">
    <label className="chat__message-label" htmlFor="message">
      <span className="chat__label-text">Message</span>
      <input
        onChange={onChange}
        value={value}
        type="text"
        id="message"
        className="chat__message-input"
      />
    </label>
    <button type="submit" className="chat__button chat__button--small">
      <span className="chat__button-text">Send</span>
      <FontAwesomeIcon icon="angle-right" size="lg" color="#0e4749" />
    </button>
  </form>
);

AddMessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default AddMessageForm;
