/* jshint esnext: true */

var FN = {};

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}


function last(list) {
  if(!list || !list.length) {return;}
  return list[list.length - 1];
}

function ratios(sum) {
  return function(d) {
      if(sum === 0) { return 0; }
      if(!d) { return 0; }
      return Math.round((d / sum) * 10000) / 10000;
  };
}


FN.describeArc = function(x, y, radius, startAngle, endAngle){

  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  var start = polarToCartesian(x, y, radius, endAngle);
  var end   = polarToCartesian(x, y, radius, startAngle);

  return [
      "M", start.x, start.y,
      "A", radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join(" ");
};

FN.describeBar = function(x, y, x1, x2){
    return [ "M", (x+x1), y, "H", (x+x2) ].join(" ");
};


function accumulator(acc, d) {
  let start = (last(acc) || 0);
  let end = start + d;
  acc.push(end);
  return acc;
}

function segmentize(list) {
  return function({merged, start}, end, i) {
    if(i === 0) { start = 0; }
    merged.push([[start, end], list[i]]);
    return {merged, start: end};
  };
}

// [[[0,0.434],{"k":"pure","v":23}],[[0.434,1],{"k":"cross","v":30}]]
// [[0,0.75],{"k":"pure","v":3},[0.75,0.75],{"k":"cross","v":1}]
FN.segments = function(list, fnValue) {
  if(typeof fnValue !== "function") { fnValue = function(d) { return d; }; }
  let accum = list.map(fnValue).reduce(accumulator, []);
  return accum.map(ratios(last(accum))).reduce(segmentize(list), {merged: [], start: 0}).merged;
};

export default FN;
