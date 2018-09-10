'use strict';

const fs   = require('fs');
const path = require('path');

const utils  = require('./utils/data.js');
const crypto = require('./utils/crypto.js');

let files;
const data = {};
try {
  files = fs.readdirSync(path.join(__dirname, 'data'));
} catch (err) {
  throw new Error('Data directory does not exit:', err );
}
files.forEach(file => {
  const fileId = file.replace('.txt', '');
  const fileData = fs.readFileSync(path.join(__dirname, 'data', file));

  data[fileId] = fileData;
})

const id = Number(process.argv[2]) || 1;
if (typeof id !== 'number' ||
    !Number.isInteger(id) ||
    id < 1 ||
    id > 64) {
  throw new Error('Challenge is out of bound.');
}

const set      = Math.ceil(id / 8);
const setDir   = `set${set}`;
const fileName = `${id  }.js`;

let challenges;
try {
  challenges = fs.readdirSync(path.join(__dirname, setDir));
} catch (err) {
  throw new Error('Set directory does not exit:', err );
}

const challengeExists = challenges.find(file => file === fileName);
if (!challengeExists) {
  throw new Error('Challenge has not been completed yet / file does not exist.')
}

console.log(`***  Challenge ${id}  ***`);
const challenge = path.join(__dirname, setDir, fileName)

require(challenge)(data);
