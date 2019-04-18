import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchRooms = async () => {
  const { data } = await axios.get(`${API_URL}/chatkit/rooms`);
  return data;
};

export const fetchMessages = async roomId => {
  const { data } = await axios.get(`${API_URL}/chatkit/messages/${roomId}`);
  return data;
};

export const sendMessage = async (roomId, content) => {
  const messageId = await axios.post(`${API_URL}/chatkit/messages/send/${roomId}`, {
    userId: 'Ed',
    roomId,
    parts: [{
      type: 'application/json',
      content: JSON.stringify(content)
    }]
  });
  return messageId;
};
