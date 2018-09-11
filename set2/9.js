module.exports = () => {
  console.log('Implement PKCS#7 padding\n');

  const key = 'YELLOW SUBMARINE';

  console.log(`The key "${key}" padded to 20 bytes is:`);
  console.log(JSON.stringify(key.asciiDecode().pad(20)));
}
