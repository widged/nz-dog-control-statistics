/* jshint esnext: true */

import React, { Component } from 'react';
import BoxH from '../base/BoxH.es6.react.js';
import BoxV from '../base/BoxV.es6.react.js';
import IconContainer from '../icons/IconContainer.es6.react.js';
import NumberOverBar from '../micro-charts/NumberOverBar.es6.react.js';
import Utils from './Utils.es6.js';

let {percentage} = Utils;


class DogSummary extends Component {
  render() {
    let {groups /*, totalDogs*/} = this.props;
    let {all/*,pure,cross*/} = groups || {};
    all = all || {};
    let percDesexed = percentage(all.desexed, all.total).toFixed(0)
    let percChipped = percentage(all.chipped, all.total).toFixed(0)
    return (
      <dog-summary class={all.male ? undefined : "no-data"}>
        <BoxH>
          <IconContainer icon="dog-profile">
            <NumberOverBar donut={[{k: "male", v: all.male},{k: "female", v: all.female}]}>
              <div className="label dog-total">{all.total} </div>
            </NumberOverBar>
          </IconContainer>
          <IconContainer icon="dog-chipped"><BoxV><div>% {percChipped}</div><div>{all.chipped}</div></BoxV></IconContainer>
          <IconContainer icon="dog-desexed"><BoxV><div>% {percDesexed}</div><div>{all.desexed}</div></BoxV></IconContainer>
        </BoxH>
      </dog-summary>
    );
  }
}
/*
import Stringify from '../base/Stringify.es6.react.js';
<Stringify data={all} totalDogs={totalDogs} />
<Stringify data={pure} totalDogs={totalDogs} />
<Stringify data={cross} totalDogs={totalDogs} />
*/

export default DogSummary;
