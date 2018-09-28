const crypto = require('crypto');

module.exports = () => {
  console.log('ECB cut-and-paste\n');

  // BASIC FUNCTIONS

  const mocks = {
    str: 'foo=bar&baz=qux&zap=zazzle',
    obj: { foo: 'bar', baz: 'qux', zap: 'zazzle' },
    profile: 'email=foo@bar.com&uid=10&role=user'
  };
  const test1 = JSON.stringify(mocks.obj)
    === JSON.stringify(parseParameters(mocks.str));
  const test2 = mocks.profile === profileFor('foo@bar.com');
  const test3 = mocks.profile === profileFor('&foo@bar.com=');
  console.log('Basic functions: ' + ((test1 && test2 && test3) ? 'OK' : 'FAIL'));

  // DEFINE KEY AND CIPHER

  const key    = crypto.randomBytes(16);
  const cipher = function (input) {
    return input.encryptProfile(key);
  };

  // AES ENCRYPTION OF THE PROFILE

  const emailTest = 'foo@bar.com';
  const test      = Buffer
    .from(emailTest)
    .encryptProfile(key)
    .decryptProfile(key)
    .email === emailTest;
  console.log('Profile encryption: ' + (test ? 'OK' : 'FAIL'));

  // Using only the user input to profile_for() (as an oracle to generate
  // "valid" ciphertexts) and the ciphertexts themselves, make a role=admin
  // profile.

  // 1: find the block length

  const blockLength = cipher.findBlockLength();
  console.log('1: find the block length');
  console.log('   block length:', blockLength);

  // 2: confirm we're dealing with ECB encryption

  const mode = cipher.detectMode();
  console.log('2: confirm we\'re dealing with ECB encryption');
  console.log('   detected mode:', mode);

  // 3: get the left and right offsets

  const marker     = 'role=';
  const offsets    = profileFor.getOffsets(marker);
  console.log('3: get the left and right offsets');
  console.log(`   before: ${offsets.before} | after: ${offsets.after}`);

  // 4: get the role block

  const targetRole  = 'admin';
  const targetBlock = Math.ceil(offsets.before / blockLength);
  const roleBlock   = cipher.getRoleBlock(targetRole, blockLength, offsets);
  console.log('4: get the role block');
  // console.log('   role block:', roleBlock.hexEncode());

  // 5: create admin profile

  const targetEmail  = 'foo@bar.com';
  const ciphertext   = cipher.getCipherText(targetEmail, blockLength, offsets);
  const adminProfile = Buffer.concat([ciphertext.slice(0, ciphertext.length - blockLength),
    roleBlock.slice(blockLength * targetBlock, blockLength * (targetBlock + 1))]);

  console.log('5: create admin profile: ');
  console.log(adminProfile.decryptProfile(key));
};

Function.prototype.getRoleBlock = function (target, blockLength, offsets) {
  const role   = Buffer.from(target.asciiDecode().pad(blockLength));
  const before = Buffer.from([]).pad(blockLength - offsets.before);
  const after  = Buffer.from([]).pad(blockLength - offsets.after);
  const input  = Buffer.concat([before, role, after]);
  return this(input);
};

Function.prototype.getCipherText = function (email, blockLength, offsets) {
  const sum         = email.length + offsets.before + offsets.after;
  const padEmail    = blockLength - (sum % blockLength);
  const buffer      = Buffer.alloc(padEmail, 'A');
  const paddedEmail = Buffer.concat([buffer, Buffer.from(email)]);
  const cipherText  = this(paddedEmail);
  return cipherText;
};

Function.prototype.getOffsets = function (marker) {
  const tokens      = this('!').split('!');
  const roleIndex   = tokens[1].indexOf(marker);
  const rolePadding = tokens[1].slice(0, roleIndex + marker.length);
  return {
    before: tokens[0].length,
    after:  rolePadding.length
  };
};

const parseParameters = function (string) {
  const params = {};
  string.split('&').forEach(p => {
    const param = p.split('=');
    params[param[0]] = param[1];
  });
  return params;
};

const profileFor = function (email) {
  const params = {
    email: email.replace(/[&=]/g, ''),
    uid: 10,
    role: 'user'
  };
  let profile  = [];
  for (let [key, value] of Object.entries(params)) {
    profile.push(key + '=' + value);
  }
  return profile.join('&');
};

Buffer.prototype.encryptProfile = function (key) {
  return profileFor(this.asciiEncode())
    .asciiDecode()
    .pad()
    .ecbEncrypt(key);
};

Buffer.prototype.decryptProfile = function (key) {
  return parseParameters(this
    .ecbDecrypt(key)
    .stripPadding()
    .asciiEncode());
};
