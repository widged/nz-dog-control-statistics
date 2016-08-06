/* jshint esnext: true */

import './label-in-donut.css';

import React, { Component } from 'react';
import MicroChart from './MicroChart.es6.js';

function renderArc([[start, end], kv]) {
  let w = 50; let sw = 8;
  let r = (w/2)-(sw/2)
  let off = (w/2);
  if(start === 0 && end === 1) { start = 0.00001; }
  return (<path key={kv.k} className={kv.k} d={MicroChart.describeArc(off, off, r, start * 360, end * 360)}></path>)
}

class LabelInDonut extends Component {

  render() {
    const {donut, className, children} = this.props;
    let segments = MicroChart.segments(donut, function({v}) {return v;})
    return (
      <label-in-donut class={className}>
        <div className="label">{children}</div>
        <div className="donut">
          <svg>
            {segments.map(renderArc)}
          </svg>
        </div>
      </label-in-donut>
    );
  }
}

export default LabelInDonut;
