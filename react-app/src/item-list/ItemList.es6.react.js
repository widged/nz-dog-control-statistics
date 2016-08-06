/* jshint esnext: true */

import React, { Component } from 'react';

class ItemList extends Component {

  constructor(props) {
    super(props);
    this.bound = { renderItem : this.renderItem.bind(this) };
  }

  renderItem(d,i) {
    const {itemRenderer} = this.props;
    let rendered = (typeof itemRenderer === "function") ? itemRenderer(d,i) : "";
    return (<item key={"k" +i}>{rendered}</item>);
  }

  render() {
    const {items} = this.props;
    let {renderItem} = this.bound;
    return ( <list>{(items || []).map(renderItem)}</list> );
  }
}

export default ItemList;
