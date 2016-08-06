#!/usr/bin/env node

var download = require('../lib/download.js')

// Territorial authorities' Dog Control Statistics (XLSX) (XLSX, 1.80MB)
download("http://www.localcouncils.govt.nz/lgip.nsf/Files/Excel/$file/Dog%20control%20statistics.xlsx");
// Dog Control Statistics (CSV) (CSV, 4.59MB).
download("http://www.localcouncils.govt.nz/lgip.nsf/Files/Excel/$file/Dog_control_statistics.csv");
