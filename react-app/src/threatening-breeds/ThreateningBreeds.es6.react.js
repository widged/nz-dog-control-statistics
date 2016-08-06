/* jshint esnext: true */

import './dog-threat-level.css';

import React, { Component } from 'react';
import DogControlData from '../councils-stats/DogControlData.js'

class DogThreatLevel extends Component {
  render() {
    let {breed, breedId, menacing, dangerous} = this.props;
    return (
      <dog-threat-level key={breed}>
        <img src={`etc/pure-breeds-svg/${breedId}.svg`} alt={breed}></img>
        <div className="levels">
          {dangerous > 0 ? <div className="dangerous">{dangerous}</div> : null}
          {menacing > 0 ? <div className="menacing">{menacing}</div> : null}
        </div>
        <div className="name">{breed}</div>
      </dog-threat-level>
    );
  }
}

class ThreateningBreeds extends Component {
  constructor(props) {
    super(props);
    this.bound = {renderDog: this.renderDog.bind(this)}
  }

  renderDog(d) {
    let {breed, breedId, menacing, dangerous} = d;
    if(menacing <= 0 && dangerous <= 0) { return null; }
    return (
      <DogThreatLevel key={breed} breed={breed} breedId={breedId} menacing={menacing} dangerous={dangerous} />
    );
  }
  render() {
    // console.log(JSON.stringify(this.props.data))
    let {sortOnProperty} = DogControlData;
    let {data} = this.props;
    let {renderDog} = this.bound;
    let topMost = (data || []).sort(sortOnProperty("menacing")).sort(sortOnProperty("dangerous"))
    return (
      <breed-risk>
        {topMost.slice(0,5).map(renderDog)}
      </breed-risk>
    );
  }
}

export default ThreateningBreeds;
