/* jshint esnext: true */

import React from 'react';

function Stringify({data}) {
  return (
    <div>{JSON.stringify(data)}</div>
  );
}

export default Stringify;
