/* jshint esnext: true */

import React, { Component } from 'react';
import LabelInDonut from '../micro-charts/LabelInDonut.es6.react.js';
import Utils from './Utils.es6.js';

let {percentage} = Utils;

class ThreatSummary extends Component {
  render() {
    let {dangerous, menacing, total} = this.props;
    let dangerousClass = (!dangerous.all || dangerous.all === 0) ? "dangerous no-data" : "dangerous ";
    let menacingClass = (!menacing.all || menacing.all === 0) ? "menacing no-data" : "menacing";
    return (
      <threat-summary>
          <LabelInDonut className={dangerousClass} donut={[{k: "pure", v: dangerous.pure},{k: "cross", v: dangerous.cross}]}>
            <div className="label">
              <div className="percentage">{percentage(dangerous.all, total).toFixed(1)}</div>
              <div className="details">{dangerous.cross} / {dangerous.pure}</div>
            </div>
          </LabelInDonut>
          <LabelInDonut className={menacingClass} donut={[{k: "pure", v: menacing.pure},{k: "cross", v: menacing.cross}]}>
            <div className="label">
              <div className="percentage">{percentage(menacing.all, total).toFixed(1)}</div>
              <div className="details">{menacing.cross} / {menacing.pure}</div>
            </div>
          </LabelInDonut>
      </threat-summary>
    );
  }
}

export default ThreatSummary;
