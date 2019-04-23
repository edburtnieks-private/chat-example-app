import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Room = ({ room, activeRoom, onClick }) => {
  const active = activeRoom === room.id ? 'chat__button--active' : '';

  return (
    <li className="chat__room">
      <button
        type="button"
        className={`chat__button chat__button--large ${active}`}
        onClick={() => onClick(room.id)}
      >
        <div className="chat__icon-wrapper">
          <FontAwesomeIcon icon={room.custom_data.faIcon} size="lg" color="#0e4749" />
        </div>
        <span className="chat__button-text">{room.name}</span>
      </button>
    </li>
  );
};

Room.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    custom_data: PropTypes.shape({
      faIcon: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  activeRoom: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

Room.defaultProps = {
  activeRoom: null
};

export default Room;
