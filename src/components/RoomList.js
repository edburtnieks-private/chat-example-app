import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RoomList = ({ activeRoom, rooms, onRoomClick }) => (
  <ul className="chat__rooms">
    {rooms.map(room => {
      const active = activeRoom === room.id ? 'chat__button--active' : '';

      return (
        <li key={room.id} className="chat__room">
          <button
            type="button"
            className={`chat__button chat__button--large ${active}`}
            onClick={() => onRoomClick(room.id)}
          >
            <div className="chat__icon-wrapper">
              <FontAwesomeIcon icon={room.custom_data.faIcon} size="lg" color="#0e4749" />
            </div>
            <span className="chat__button-text">{room.name}</span>
          </button>
        </li>
      );
    })}
  </ul>
);

RoomList.propTypes = {
  activeRoom: PropTypes.string.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  onRoomClick: PropTypes.func.isRequired
};

export default RoomList;
