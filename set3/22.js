const crypto = require('crypto');
const cliProgress = require('cli-progress');

module.exports = () => {
  console.log('Crack an MT19937 seed\n');

  randomWait(40, 1000);

  const seed = Math.floor(Date.now() / 1000);
  const mt19937 = Math.mt19937(seed);
  console.log(`Seeding MT19937 with seed ${seed}`);

  randomWait(40, 1000);

  console.log(mt19937());
  console.log(mt19937());
  console.log(mt19937());
  console.log(mt19937());
  console.log(mt19937());
  console.log(mt19937());
  console.log(mt19937());
  console.log(mt19937());
  console.log(mt19937());
  console.log(mt19937());

};

async function randomWait (min, max) {

  const time = min + Math.floor(Math.random() * (max - min));
  console.log(`Waiting for ${time} seconds...`);

  const bar = new cliProgress.Bar({
    barsize: 60
  }, cliProgress.Presets.shades_classic);

  bar.start(time, 0);
  for (let i = time; i > 0; i--) {
    await sleep(1000);
    bar.increment(1);
  }
  bar.stop();
}

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
