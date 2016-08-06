/* jshint esnext: true */

var FN = {};

const NON_BREED  = ["_ALL-DOGS_","_ALL-PURE_","_ALL-CROSS_","_Unidentified_"];
const DOG_GROUPS = {"_ALL-DOGS_": "all", "_ALL-PURE_": "pure", "_ALL-CROSS_": "cross"};
const NUMERIC    = 'total,female,male,desexed,chipped,menacing,dangerous'.split(',');

function rowAsObject(values, fields) {
  return values.reduce((acc,d,i) => {
    var key = fields[i];
    if(key === undefined) { console.log('[KEY]', d, values); }
    acc[fields[i]] = d;
    return acc;
  }, {});
}

function kv(obj) {
  if(!obj || typeof obj !== "object") { return []; }
  return [obj.key, obj.values];
}


function pickProperties(object, keys) {
  if(!keys) { console.log('[ERROR] No keys provided'); }
  return keys.reduce((acc,k) => {
    acc[k] = object[k];
    return acc;
  }, {});
}

FN.loadData = function() {
  let Nester = require('../../lib/array-nester-es6/src/Nester.es6.js');
  var tsv = require ('../../etc/data/dog-control.tsv');
  const sep = "\t";
  var lines = tsv.split('\n');
  var header = lines.shift();
  var fields = header.split(sep);

  let CategoryKeys = {
    OWN: 'probationary,disqualified,registered,infringements'.split(','),
    JST: 'prosecutions,destruction'.split(','),
    ACC: 'injuries,paid_any_yr,paid_this_yr'.split(','),
    default: 'Breed,total,female,male,desexed,chipped,menacing,dangerous'.split(','),
  };

let nester = new Nester()
      .key({label: (d) => { return d.Council; }, sort: undefined})
      .key({label: (d) => { return d.Year; }, sort: undefined})
      .key({label: (d) => { return d.Category; }, sort: undefined})
      .rollup(function(leaves, i) {
        return leaves.map((d) => {
          let o = pickProperties(d, CategoryKeys[d.Category] || CategoryKeys.default);
          for (var p in o) {
            if(NUMERIC.indexOf(p) !== -1 && typeof o[p] === "string") {
              o[p] = parseFloat(o[p]);
            }
          }
          return o;
        });
      });

  return nester.nest(lines.map((d) => rowAsObject(d.split(sep), fields)));
};

FN.notNewZealand = function(d) {
  return d.key !== "New Zealand";
};

FN.sortBreeds = function(list, key) {
  return list
    .sort((a,b) => { return b[key] - a[key]; })
    .reduce((acc,d) => {
      // acc.push(d);
      if(d.Breed.indexOf("_") !== 0 && d[key] > 0) { acc.push(d); }
      return acc;
    }, []);
};


function breedRisk(list) {
  if(!list) { return; }
  return list
    .reduce((acc,d) => {
      // acc.push(d);
      let {Breed, menacing, dangerous} = d;
      let breedId = Breed.toLowerCase().replace(/[^a-z]/g,'-');
      if(NON_BREED.indexOf(Breed) === -1 && (menacing > 0 || dangerous > 0)) { acc.push({breed: Breed, breedId: breedId, menacing, dangerous}); }
      return acc;
    }, []);
}


function dogGroups(list, key) {
   if(!list) { return; }
  return list
    .reduce((acc,d) => {
      // acc.push(d);
      let gp = DOG_GROUPS[d.Breed];
      if(gp) { acc[gp] = d; }
      return acc;
    }, {});
}

function singleLine(data) {
  if(!Array.isArray(data)) { return; }
  if(data.length > 1) { console.log('[UHOH]', data); }
  return data[0];
}

function extendObject(o1, o2) {
   for (var i in o2) { o1[i] = o2[i]; }
   return o1;
}

function gpProperty(gp, prop) {
  let out = {};
  for (var k in gp) {
    out[k] = gp[k][prop];
  }
  return out;

}


function yearData(d) {
  const [year, categories] = kv(d);
  const cats = categories.reduce((acc, d) => {
    let [key, values] = kv(d);
    acc[key] = values;
    return acc;
  }, {});
  const gps = extendObject({all: {}, pure: {}, cross: {}}, dogGroups(cats.DOG));
  const {all} = gps;
  return {
    year: year,
    totalDogs: all.total,
    dogGroups: gps,
    threatSummary: {dangerous: gpProperty(gps, "dangerous"), menacing: gpProperty(gps, "menacing")},
    threateningBreeds: breedRisk(cats.DOG),
    owners: singleLine(cats.OWN),
    justice: singleLine(cats.JST),
    acc: singleLine(cats.ACC)
  };
}

FN.councilItemData = function(data) {
  const [council, years] = kv(data);
  return {council, years: years.map(yearData)};
};

FN.sortOnProperty = function(key) {
  return function(a,b) { return b[key] - a[key]; };
};

module.exports = FN;
