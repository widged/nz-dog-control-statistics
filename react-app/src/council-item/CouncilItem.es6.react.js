/* jshint esnext: true */

import './council-item.css';

import React, { Component } from 'react';
import OwnerSummary from './OwnerSummary.es6.react.js';
import DogSummary from './DogSummary.es6.react.js';
import ThreatSummary from './ThreatSummary.es6.react.js';
import IncidentSummary from './IncidentSummary.es6.react.js';
import BoxH from '../base/BoxH.es6.react.js';
import Spacer from '../base/Spacer.es6.react.js';
import ThreateningBreeds from '../threatening-breeds/ThreateningBreeds.es6.react.js';


class CouncilItem extends Component {
  render() {
    const {council,yearData} = this.props;
    const {/*year, */totalDogs, dogGroups, threateningBreeds, threatSummary, owners, justice, acc} = yearData || {};
    let {injuries, paid_this_yr, paid_any_yr} = acc || {};
    let {prosecutions, destruction} = justice || {};
    return (
      <council-item>
        <h1>{council}</h1>
        <div>
          <BoxH>
            <OwnerSummary owners={owners}  total={totalDogs} />
            <DogSummary groups={dogGroups}  total={totalDogs} />
          </BoxH>
          <BoxH>
            <ThreatSummary dangerous={threatSummary.dangerous} menacing={threatSummary.menacing} total={totalDogs} />
            <Spacer width="8" />
            <ThreateningBreeds data={threateningBreeds} total={totalDogs} />
          </BoxH>
          <IncidentSummary injuries={injuries} prosecutions={prosecutions} destructions={destruction} paid_this_yr={paid_this_yr} paid_any_yr={paid_any_yr} totalDogs={totalDogs} />
        </div>
      </council-item>
    );
  }
}

export default CouncilItem;
