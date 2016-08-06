/* jshint esnext: true */

import React, { Component } from 'react';
import './App.css';

import CouncilsStats from './councils-stats/CouncilsStats.es6.react.js';

class App extends Component {
  render() {
    return (
      <app>
        <div className="header">
          <h2>New Zealand Dog Control Statistics</h2>
        </div>
        <CouncilsStats />
      </app>
    );

  }
}

export default App;
