import React, { useState, useEffect } from 'react';
import { fetchRooms, fetchMessages, addMessage } from './api/index';
import MessageList from './components/MessageList';
import AddMessageForm from './components/AddMessageForm';
import RoomList from './components/RoomList';

const App = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState({
    text: '',
    url: '',
    type: 'track'
  });

  useEffect(() => {
    setCurrentUser('Ed');

    const setFetchedRooms = async () => {
      setRooms(await fetchRooms());
    };
    setFetchedRooms();
  }, []);

  const handleRoomClick = async roomId => {
    setActiveRoom(roomId);
    setMessages(await fetchMessages(roomId));
  };

  const handleAddMessage = async e => {
    e.preventDefault();

    const id = await addMessage(currentUser, activeRoom, message);
    const newMessage = {
      id,
      user_id: currentUser,
      text: message.text,
      url: message.url,
      type: message.type
    };

    setMessages([...messages, newMessage]);
    setMessage({
      text: '',
      url: '',
      type: ''
    });
  };

  const handleMessageChange = e => setMessage({
    ...message,
    text: e.target.value
  });

  return (
    <React.Fragment>
      <section className="app__message-content" />

      <section className="app__chat">
        <MessageList messages={messages} />
        <AddMessageForm
          onSubmit={handleAddMessage}
          onChange={handleMessageChange}
          value={message.text}
        />
        <RoomList
          rooms={rooms}
          activeRoom={activeRoom}
          onRoomClick={handleRoomClick}
        />
      </section>
    </React.Fragment>
  );
};

export default App;
