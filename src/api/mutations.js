// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export const addMessageMutation = gql`
  mutation AddMesage($input: MessageInput!) {
    addMessage(input: $input)
  }
`;
