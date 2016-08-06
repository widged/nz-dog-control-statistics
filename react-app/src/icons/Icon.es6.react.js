/* jshint esnext: true */

import React, { Component } from 'react';

const url = '../../etc/icons.svg'

class Icon extends Component {

  render() {
    let {icon} = this.props;
    return (
      <svg viewBox='0 0 16 16' className={`icon icon-${icon}`}>
        <use xlinkHref={`${url}#icon-${icon}`} />
      </svg>
    );
  };

}
export default Icon;


/*
<!-- `<use>` shape defined ON THIS PAGE somewhere else -->
<svg viewBox="0 0 100 100">
   <use xlink:href="#icon-1"></use>
</svg>

<!-- `<use>` shape defined in an EXTERNAL RESOURCE -->
<svg viewBox="0 0 100 100">
   <use xlink:href="defs.svg#icon-1"></use>
</svg>
*/
