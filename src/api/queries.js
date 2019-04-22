// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export const roomsQuery = gql`
  query Rooms {
    rooms {
      id
      name
      custom_data {
        faIcon
      }
    }
  }
`;

export const messagesQuery = gql`
  query Messages($roomId: Int!) {
    messages(roomId: $roomId) {
      id
      user_id
      text
      url
      type
    }
  }
`;
