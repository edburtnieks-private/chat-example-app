import ApolloClient from 'apollo-boost';
import {
  roomsQuery,
  messagesQuery,
  trackSpotifyQuery,
  albumSpotifyQuery,
  playlistSpotifyQuery
} from './queries';
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

export const fetchTrackSpotify = async (id) => {
  const { data } = await client.query({
    query: trackSpotifyQuery,
    variables: {
      id
    }
  });
  return data.trackSpotify;
};

export const fetchAlbumSpotify = async (id) => {
  const { data } = await client.query({
    query: albumSpotifyQuery,
    variables: {
      id
    }
  });
  return data.albumSpotify;
};

export const fetchPlaylistSpotify = async (id) => {
  const { data } = await client.query({
    query: playlistSpotifyQuery,
    variables: {
      id
    }
  });
  return data.playlistSpotify;
};
