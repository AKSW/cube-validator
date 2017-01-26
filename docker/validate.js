const CubeValidator = require('cube-validator.js');
const assert = require('assert')
const fs = require('fs');

assert(process.argv[2] !== undefined, 'No file path!')

const config = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const validator = new CubeValidator.default(config)
validator.validate().then(function(results) {
  fs.writeFile('results.json', JSON.stringify(results, null, 4));
  console.log(JSON.stringify(results, null, 4));
})
