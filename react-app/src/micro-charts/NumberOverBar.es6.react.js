/* jshint esnext: true */

import './number-over-bar.css';

import React, { Component } from 'react';
import MicroChart from './MicroChart.es6.js';

function renderBar([[start, end], kv]) {
  let w = 50; // let sw = 8;
  return (<path key={kv.k} className={kv.k} d={MicroChart.describeBar(0, 16, start * w, end * w )}></path>)
}

class NumberOverBar extends Component {

  render() {
    const {donut, className, children} = this.props;
    let segments = MicroChart.segments(donut, function({v}) {return v;})

    return (
      <number-over-bar class={className}>
        <div className="label">{children}</div>
        <div className="bar">
          <svg height="20">
            {segments.map(renderBar)}
          </svg>
        </div>
      </number-over-bar>
    );
  }
}

export default NumberOverBar;
