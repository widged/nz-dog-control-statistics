/* jshint esnext: true */

import React from 'react';

function Spacer({width, height}) {
  var opts = {};
  if(width) { opts.width   = width + "px"; }
  if(height) { opts.height = height + "px"; }
  return (
    <div style={opts}></div>
  );
}

export default Spacer;
