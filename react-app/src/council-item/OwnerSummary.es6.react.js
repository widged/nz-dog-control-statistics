/* jshint esnext: true */

import React, { Component } from 'react';
import IconContainer from '../icons/IconContainer.es6.react.js';

class OwnerSummary extends Component {
  render() {
    let {owners/*, totalDogs*/} = this.props;
    let {registered,disqualified, probationary, infringements} = owners || {};

    return (
      <owner-summary class={registered ? undefined : "no-data"}>
          <IconContainer icon="owner-profile">
              <div>{registered}</div>
              <div className="subtypes">
                <span className="disqualified">{disqualified}</span>
                <span className="probationary">{probationary}</span>
                <span className="infringements">{infringements}</span>
              </div>
          </IconContainer>
      </owner-summary>
    );
  }
}

export default OwnerSummary;
