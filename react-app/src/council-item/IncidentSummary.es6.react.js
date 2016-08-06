/* jshint esnext: true */

import React, { Component } from 'react';
import BoxH from '../base/BoxH.es6.react.js';
import BoxV from '../base/BoxV.es6.react.js';
import IconContainer from '../icons/IconContainer.es6.react.js';
import NumberOverBar from '../micro-charts/NumberOverBar.es6.react.js';


class IncidentSummary extends Component {
  render() {
    let {injuries,prosecutions, destructions, paid_this_yr, paid_any_yr/*, totalDogs*/} = this.props;
    paid_this_yr = parseFloat(paid_this_yr);
    paid_any_yr = parseFloat(paid_any_yr);
    let totalPaid = paid_this_yr+paid_any_yr;
    return (
      <incident-summary>
        <BoxH>
        <IconContainer icon="injuries"><BoxV><div>{injuries}</div><div> </div></BoxV></IconContainer>
        <IconContainer icon="prosecution" className={prosecutions ? undefined : "no-data"}><BoxV><div>{prosecutions}</div><div> </div></BoxV></IconContainer>
        <IconContainer icon="dog-destruction" className={destructions ? undefined : "no-data"}><BoxV><div>{destructions}</div><div> </div></BoxV></IconContainer>
        <IconContainer icon="paid-this-year" className="paid">
          <NumberOverBar donut={[{k: "this_year", v: paid_this_yr},{k: "any_year", v: paid_any_yr}]}>
            <div className="label dog-total">{totalPaid}</div>
          </NumberOverBar>
        </IconContainer>


      </BoxH>
      </incident-summary>
    );
  }
}

export default IncidentSummary;
