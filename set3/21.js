module.exports = () => {
  console.log('Implement the MT19937 Mersenne Twister RNG\n');
  const mt19937 = Math.mt19937();
  console.log('Some numbers generated with MT19937 and default seed 5489:');
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
}
