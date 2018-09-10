'use strict';

const fs   = require('fs');
const path = require('path');

const utils  = require('./utils/data.js');
const crypto = require('./utils/crypto.js');

const challenge = Number(process.argv[2]) || 1;
if (typeof challenge !== 'number' ||
    !Number.isInteger(challenge) ||
    challenge < 1 ||
    challenge > 64) {
  throw new Error('Challenge is out of bound.');
}

const set      = Math.ceil(challenge / 8);
const setDir   = `set${set}`;
const fileName = `${challenge}.js`;

let files;
try {
  files = fs.readdirSync(path.join(__dirname, setDir));
} catch (err) {
  throw new Error('Set directory does not exit:', err );
}

const file = files.find(file => file === fileName);
if (!file) {
  throw new Error('Challenge has not been completed yet / file does not exist.')
}

console.log(`***  Challenge ${challenge}  ***`);
const challengePath = path.join(__dirname, setDir, fileName)
require(challengePath)();
