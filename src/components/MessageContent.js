import React from 'react';
import PropTypes from 'prop-types';

const MessageContent = ({ content }) => {
  if (content) {
    if (content.type === 'track') {
      return (
        <React.Fragment>
          <img src={content.album.images[1].url} alt={content.album.images[0].url} />
          <h2>{content.name}</h2>
        </React.Fragment>
      );
    }

    if (content.type === 'album') {
      return (
        <React.Fragment>
          <h2>{content.name}</h2>
        </React.Fragment>
      );
    }

    if (content.type === 'playlist') {
      return (
        <React.Fragment>
          <h2>{content.name}</h2>
        </React.Fragment>
      );
    }
  }

  return '';
};

MessageContent.propTypes = {
  content: PropTypes.objectOf.isRequired
};

export default MessageContent;
