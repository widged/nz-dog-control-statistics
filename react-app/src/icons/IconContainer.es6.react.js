/* jshint esnext: true */

import './icon-container.css';


import React, { Component } from 'react';
import Icon from './Icon.es6.react.js';

class IconContainer extends Component {

  render() {
    const {icon, children, className} = this.props;
    return (
      <icon-container class={className}>
        <div className="icon"><Icon icon={icon}/></div>
        <div className="box">{children}</div>
      </icon-container>
    );
  }
}

export default IconContainer;
