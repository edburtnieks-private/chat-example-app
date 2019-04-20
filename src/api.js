import axios from 'axios';

const API_URL = '/.netlify/functions';

export const fetchRooms = async () => {
  const { data } = await axios.get(`${API_URL}/rooms`);
  return data;
};

export const fetchMessages = async roomId => {
  const { data } = await axios.get(`${API_URL}/messages?roomId=${roomId}`);
  return data;
};

export const sendMessage = async (roomId, content) => {
  const messageId = await axios.post(`${API_URL}/sendmessage`, {
    userId: 'Ed',
    roomId,
    parts: [{
      type: 'application/json',
      content: JSON.stringify(content)
    }]
  });
  return messageId;
};
