/* jshint esnext: true */

import './councils-stats.css';

import React, { Component } from 'react';
import ItemList from '../item-list/ItemList.es6.react.js';
import DogControlData from './DogControlData.js'
import CouncilItem from '../council-item/CouncilItem.es6.react.js';

class ValuePicker extends Component {
  render () {
    let {children} = this.props;
    let dispatch = this.props.change;
    if(typeof dispatch !== "function") { dispatch = function() {}; }
    return (
      <value-picker onClick={(e) => {
          dispatch(e.target.innerText);
          Array.from(e.target.parentNode.querySelectorAll('.active')).forEach((d) => { d.className = undefined; });
          e.target.className = "active"
        }}>
        {children}
    </value-picker>
  );
  }
}

function numericSort(valueFn) { return function(a,b) { return valueFn(b) - valueFn(a); } }
function ratio(n, t) {
  n = n || 0; t = t  || 0;
  let r = t > 0 ? (n / t) : 0;
  return r;
}

var sortFunctions = {};
sortFunctions["a-z"]  = function(a,b) { if(a.council < b.council) {return -1}; if(a.council > b.council) {return 1}; return 0; }
sortFunctions["#dogs"] = numericSort((d) => {return d.yearData && d.yearData.totalDogs; })
sortFunctions["#owners"] = numericSort((d) => {return d.yearData && d.yearData.owners && d.yearData.owners.registered; })
sortFunctions["#dangerous"] = numericSort((d) => {return d.yearData && d.yearData.threatSummary && d.yearData.threatSummary.dangerous && d.yearData.threatSummary.dangerous.all; })
sortFunctions["#menacing"] = numericSort((d) => {return d.yearData && d.yearData.threatSummary && d.yearData.threatSummary.menacing && d.yearData.threatSummary.menacing.all; })
sortFunctions["#injuries"] = numericSort((d) => {return d.yearData && d.yearData.acc && d.yearData.acc.injuries; })
sortFunctions["#paid"] = numericSort((d) => {return d.yearData && d.yearData.acc && d.yearData.acc.paid_this_yr; })

sortFunctions["#owners/dogs"]    = numericSort((d) => {return ratio(d.yearData && d.yearData.owners && d.yearData.owners.registered, d.yearData && d.yearData.totalDogs) })
sortFunctions["#dangerous/dogs"] = numericSort((d) => {return ratio(d.yearData && d.yearData.threatSummary && d.yearData.threatSummary.dangerous && d.yearData.threatSummary.dangerous.all, d.yearData && d.yearData.totalDogs) })
sortFunctions["#menacing/dogs"]  = numericSort((d) => {return ratio(d.yearData && d.yearData.threatSummary && d.yearData.threatSummary.menacing && d.yearData.threatSummary.menacing.all, d.yearData && d.yearData.totalDogs) })
sortFunctions["#injuries/dogs"]  = numericSort((d) => {return ratio(d.yearData && d.yearData.acc && d.yearData.acc.injuries, d.yearData && d.yearData.totalDogs) })
sortFunctions["#paid/dogs"]  = numericSort((d) => {return ratio(d.yearData && d.yearData.acc && d.yearData.acc.paid_this_yr, d.yearData && d.yearData.totalDogs) })


class CouncilsStats extends Component {
  constructor(props) {
    super(props);
    let {loadData} = DogControlData;
    this.state = {
      councils: loadData().filter(DogControlData.notNewZealand),
      activeYear: "2015",
      sortOption: "a-z"
    };
    this.bound = {
      renderItem : this.renderItem.bind(this),
      onYearChange: this.onYearChange.bind(this),
      onSortChange: this.onSortChange.bind(this)
    };
  }

  onYearChange(value) {
    this.setState({activeYear: value})
  }

  onSortChange(value) {
    this.setState({sortOption: value})
  }


  renderItem(d,i) {
    let {council, yearData} = d;
    return <CouncilItem council={council} yearData={yearData}/>;
  }

  render() {
    let {councils} = this.state;
    let {renderItem, onYearChange, onSortChange} = this.bound;
    let {activeYear, sortOption} = this.state;
    const {councilItemData} = DogControlData;
    const sortFn = sortFunctions[sortOption];
    councils = councils.map((d) => {
        let {council, years} = councilItemData(d);
        const yearData = years.filter((d) => {return d.year === activeYear; })[0];
        // console.log(yearData)
        return {council, yearData};
      })
      .sort(sortFn)

    return (
      <council-stats>
        <div className="controls">
          YEAR <ValuePicker change={onYearChange}>
            <div>2011</div><div>2012</div><div>2013</div><div>2014</div><div>2015</div><div>2016</div>
          </ValuePicker>
          SORT <ValuePicker change={onSortChange}>
            <div>a-z</div>

            <div>#dogs</div>
            <div>#owners</div>
            <div>#dangerous</div>
            <div>#menacing</div>
            <div>#injuries</div>
            <div>#paid</div>

            <div>#owners/dogs</div>
            <div>#dangerous/dogs</div>
            <div>#menacing/dogs</div>
            <div>#paid/dogs</div>

          </ValuePicker>
          </div>
        <ItemList items={councils} itemRenderer={renderItem} />
      </council-stats>
    );
  }
}

export default CouncilsStats;
