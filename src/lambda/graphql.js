const { ApolloServer, gql } = require('apollo-server-lambda');
const Chatkit = require('@pusher/chatkit-server');
const axios = require('axios');

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY
});

const roomTypeDefs = `
  type RoomData {
    type: String!
    faIcon: String!
  }

  type Room {
    id: Int!
    name: String!
    custom_data: RoomData!
  }
`;

const messageTypeDefs = `
  type Message {
    id: Int!
    user_id: String!
    text: String!
    url: String!
    type: String!
  }

  input MessagePartsInput {
    type: String!
    content: String!
  }

  input MessageInput {
    userId: String!
    roomId: Int!
    parts: [MessagePartsInput!]!
  }
`;

const spotifyTypeDefs = `
  type TrackSpotify {
    name: String
    album: AlbumSpotify
    type: String
    error: String
  }

  type ImagesSpotify {
    url: String
  }

  type AlbumSpotify {
    name: String
    images: [ImagesSpotify]
    type: String
    error: String
  }

  type PlaylistSpotify {
    name: String
    type: String
    error: String
  }
`;

const typeDefs = gql`
  ${roomTypeDefs}
  ${messageTypeDefs}
  ${spotifyTypeDefs}

  type Query {
    rooms: [Room!]!
    messages(roomId: Int!): [Message!]!
    trackSpotify(id: String!): TrackSpotify!
    albumSpotify(id: String!): AlbumSpotify!
    playlistSpotify(id: String!): PlaylistSpotify!
  }

  type Mutation {
    addMessage(input: MessageInput!): Int!
  }
`;

const resolvers = {
  Query: {
    rooms: async () => {
      try {
        return await chatkit.getRooms({});
      } catch (error) {
        throw error;
      }
    },
    messages: async (_, args) => {
      try {
        const { roomId } = args;
        const messages = await chatkit.fetchMultipartMessages({
          roomId,
          direction: 'newer'
        });

        return messages.reduce((newMessages, message) => {
          const { id, user_id } = message;
          const { text, url, type } = JSON.parse(message.parts[0].content);
          const newMessage = {
            id,
            user_id,
            text,
            url,
            type
          };
          newMessages.push(newMessage);
          return newMessages;
        }, []);
      } catch (error) {
        throw error;
      }
    },
    trackSpotify: async (_, args, context) => {
      try {
        const { id } = args;
        const { spotifyAccessToken } = context;
        if (spotifyAccessToken) {
          const accessToken = spotifyAccessToken.split('=')[1];
          const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          return data;
        }

        return { error: 'Not logged in Spotify' };
      } catch (error) {
        throw error;
      }
    },
    albumSpotify: async (_, args, context) => {
      try {
        const { id } = args;
        const { spotifyAccessToken } = context;
        if (spotifyAccessToken) {
          const accessToken = spotifyAccessToken.split('=')[1];
          const { data } = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          return data;
        }

        return { error: 'Not logged in Spotify' };
      } catch (error) {
        throw error;
      }
    },
    playlistSpotify: async (_, args, context) => {
      try {
        const { id } = args;
        const { spotifyAccessToken } = context;
        if (spotifyAccessToken) {
          const accessToken = spotifyAccessToken.split('=')[1];
          const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          return data;
        }

        return { error: 'Not logged in Spotify' };
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    addMessage: async (_, args) => {
      try {
        const { userId, roomId, parts } = args.input;
        const { message_id } = await chatkit.sendMultipartMessage({
          userId,
          roomId,
          parts
        });
        return message_id;
      } catch (error) {
        throw error;
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event }) => ({
    spotifyAccessToken: event.headers.cookie
  })
});

exports.handler = server.createHandler();
