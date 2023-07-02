const madge = require('madge');

madge('./src/index.ts').then(res => console.log(res.circularGraph()));