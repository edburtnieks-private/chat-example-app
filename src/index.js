import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMusic, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import App from './App';
import 'normalize.css';
import './styles/main.scss';

library.add(faMusic, faAngleRight);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(<App />, document.getElementById('app'));
