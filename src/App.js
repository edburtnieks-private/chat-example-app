import React, { useState, useEffect } from 'react';
import { fetchRooms, fetchMessages, sendMessage } from './api';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';

const App = () => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeRoom, setActiveRoom] = useState('');
  const [message, setMessage] = useState({
    text: '',
    url: '',
    type: 'track'
  });

  useEffect(() => {
    const setFetchedRooms = async () => {
      setRooms(await fetchRooms());
    };
    setFetchedRooms();
  }, []);

  const handleEnterRoom = async roomId => {
    setActiveRoom(roomId);
    setMessages(await fetchMessages(roomId));
  };

  const handleSendMessage = async e => {
    e.preventDefault();

    const id = await sendMessage(activeRoom, message);
    const newMessage = {
      id: id.toString(),
      sender: 'Ed',
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
        <SendMessageForm
          onSubmit={handleSendMessage}
          onChange={handleMessageChange}
          value={message.text}
        />
        <RoomList
          activeRoom={activeRoom}
          rooms={rooms}
          onRoomClick={handleEnterRoom}
        />
      </section>
    </React.Fragment>
  );
};

export default App;
