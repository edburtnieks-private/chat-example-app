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

export const trackSpotifyQuery = gql`
  query TrackSpotify($id: String!) {
    trackSpotify(id: $id) {
      name
      album {
        images {
          url
        }
      }
      type
      error
    }
  }
`;

export const albumSpotifyQuery = gql`
  query AlbumSpotify($id: String!) {
    albumSpotify(id: $id) {
      name
      type
      error
    }
  }
`;

export const playlistSpotifyQuery = gql`
  query PlaylistSpotify($id: String!) {
    playlistSpotify(id: $id) {
      name
      type
      error
    }
  }
`;
