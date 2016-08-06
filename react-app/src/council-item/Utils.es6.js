/* jshint esnext: true */

var FN = {};

FN.percentage = function(value, total) {
  if(!total || total === 0) { return 0; }
  if(!value || value === 0) { return 0; }
  return ((value / total) * 100);
};

export default FN;
