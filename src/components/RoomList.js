import React from 'react';
import PropTypes from 'prop-types';
import Room from './Room';

const RoomList = ({ rooms, activeRoom, onRoomClick }) => (
  <ul className="chat__rooms">
    {rooms.map(room => (
      <Room
        key={room.id}
        room={room}
        activeRoom={activeRoom}
        onClick={onRoomClick}
      />
    ))}
  </ul>
);

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  activeRoom: PropTypes.number,
  onRoomClick: PropTypes.func.isRequired
};

RoomList.defaultProps = {
  activeRoom: null
};

export default RoomList;
