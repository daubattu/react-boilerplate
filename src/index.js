import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>
    Hello world!
    { process.env.NODE_ENV }
  </h1>,
  document.getElementById('root'),
);
