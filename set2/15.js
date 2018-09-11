module.exports = () => {
  console.log('PKCS#7 padding validation\n');

  const buf   = 'ICE ICE BABY'.asciiDecode();
  const test1 = Buffer.concat([buf, Buffer.alloc(4, 4)]).valPadding();
  const test2 = Buffer.concat([buf, Buffer.alloc(4, 5)]).valPadding();
  const test3 = Buffer.concat([buf, Buffer.from([1, 2, 3, 4])]).valPadding();

  console.log('Pass tests: ' + ((test1 && !test2 && !test3) ? 'OK' : 'FAIL'));
}
