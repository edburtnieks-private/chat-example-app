import ApolloClient from 'apollo-boost';
import { roomsQuery, messagesQuery } from './queries';
import { addMessageMutation } from './mutations';

const API_URL = '/.netlify/functions/graphql';
const client = new ApolloClient({
  uri: API_URL
});

export const fetchRooms = async () => {
  const { data } = await client.query({
    query: roomsQuery
  });
  return data.rooms;
};

export const fetchMessages = async roomId => {
  const { data } = await client.query({
    query: messagesQuery,
    variables: {
      roomId
    }
  });
  return data.messages;
};

export const addMessage = async (userId, roomId, content) => {
  const { data } = await client.mutate({
    mutation: addMessageMutation,
    variables: {
      input: {
        userId,
        roomId,
        parts: [{
          type: 'application/json',
          content: JSON.stringify(content)
        }]
      }
    }
  });
  return data.addMessage;
};
