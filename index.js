'use strict';

const fs   = require('fs');
const path = require('path');

const id        = getId();
const data      = getData(id);
const set       = Math.ceil(id / 8);
const setDir    = `set${set}`;
const fileName  = `${id}.js`;
const challenge = getChallenge(setDir, fileName);

// Run the challenge file

const blocks = require('./utils/blocks.js');
const crypto = require('./utils/crypto.js');
const encode = require('./utils/encode.js');
const pad    = require('./utils/pad.js');
const utils  = require('./utils/utils.js');
const xor    = require('./utils/xor.js');

console.log(`***  Challenge ${id}  ***`);
require(challenge)(data);

// Helper functions

function getId () {
  const id = Number(process.argv[2]) || 1;
  if (typeof id !== 'number' ||
  !Number.isInteger(id) ||
  id < 1 ||
  id > 64) {
    throw new Error('Challenge is out of bound.');
  }
  return id;
}

function getData (id) {
  let files;
  let data = {};
  try {
    files = fs.readdirSync(path.join(__dirname, 'data'));
  } catch (err) {
    throw new Error('Data directory does not exit:', err );
  }
  files.forEach(file => {
    const fileId = Number(file.replace('.txt', ''));
    if (fileId === id) {
      data = fs.readFileSync(path.join(__dirname, 'data', file)).toString();
      if (!data) {
        throw new Error('Couldn\'t read the data file.');
      }
    }
  });
  return data;
}

function getChallenge (setDir, fileName) {
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
  const challenge = path.join(__dirname, setDir, fileName);
  return challenge;
}
