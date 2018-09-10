module.exports = (data) => {
  let search = {
    ciphertext: '',
    plaintext: '',
    key: '',
    score: -Infinity
  }

  data
    .split('\n')
    .forEach(ciphertext => {

    const sol       = ciphertext.hexDecode().singleCharacterXor();
    const plaintext = sol.plaintext.replace('\n', '');
    const key       = sol.key;
    const score     = plaintext.scoreText();

    if (score > search.score) search = { ciphertext, plaintext, key, score };
  });

  console.log('Ciphertext: ', search.ciphertext);
  console.log('Plaintext:  ', search.plaintext);
  console.log('Score:      ', search.score.toFixed(3));
  console.log('Key:        ', search.key);
}
