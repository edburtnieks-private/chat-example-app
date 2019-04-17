import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import './styles/main.scss';

if (process.env.NODE_ENV !== 'production') {
  const axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(<App />, document.getElementById('root'));
