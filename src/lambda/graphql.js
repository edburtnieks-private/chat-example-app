const { ApolloServer, gql } = require('apollo-server-lambda');
const Chatkit = require('@pusher/chatkit-server');

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY
});

const typeDefs = gql`
  type RoomData {
    type: String!
    faIcon: String!
  }

  type Room {
    id: Int!
    name: String!
    custom_data: RoomData!
  }

  type Message {
    id: Int!
    user_id: String!
    text: String!
    url: String!
    type: String!
  }

  type Query {
    rooms: [Room!]!
    messages(roomId: Int!): [Message!]!
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
  resolvers
});

exports.handler = server.createHandler();
