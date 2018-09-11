module.exports = (data) => {
  console.log('Detect AES in ECB mode\n');

  const length = 16;

  data = data
    .split('\n')
    .map(line => line.hexDecode());

  data.forEach((line, i) => {
    const duplicate = line.hasDuplicateBlocks(length);

    if (duplicate.dup) {
      console.log('Found duplicate block in line', i);
      console.log('Line:  ', line.hexEncode());
      console.log('Block: ', duplicate.block.hexEncode());
    }
  });
}
