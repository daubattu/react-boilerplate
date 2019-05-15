import React from 'react';
import logo from '@images/logo.svg';

export default () => (
  <div className="app">
    <div className="app-header">
      <h1>Wellcome to React</h1><br />
      <img id="logo" src={logo} alt="Logo" />
    </div>
    <div className="app-intro">
      <p>Running on <b>{ process.env.NODE_ENV }</b> mode.</p><br />
    </div>
  </div>
);
