Math.mt19937 = function (seed) {
  // 5489 is the constant seed used in reference C code
  seed = seed || 5489;
  // Coefficients for MT19937
  const w = 32;
  const n = 624;
  const m = 397;
  const r = 31;
  const a = 0x9908B0DF;
  const u = 11;
  const d = 0xffffffff;
  const s = 7;
  const b = 0x9D2C5680;
  const t = 15;
  const c = 0xEFC60000;
  const l = 18;
  const f = 1812433253; // 0x6c078965
  // Variables
  let MT = [];
  let index = n;
  const upperMask = 0x80000000; // 1 << r
  const lowerMask = 0x7fffffff; // ~upperMask
  // Initialize the generator from a seed
  MT.push(seed);
  for (let i = 1; i < n; i++) {
    MT.push((f * (MT[i-1] ^ (MT[i-1] >> (w - 2))) + i) & d);
  }

  function twist () {
    for (let i = 0; i < n; i++) {
      const x = (MT[i] & upperMask) + (MT[(i+1) % n] & lowerMask);
      MT[i]   = MT[(i+m) % n] ^ (x >> 1);
      if (x % 2 !== 0) MT[i] ^= a;
    }
    index = 0;
  }

  return () => {
    if (index >= n) twist();
    let y = MT[index++];
    y = y ^ ((y >> u) & d);
    y = y ^ ((y << s) & b);
    y = y ^ ((y << t) & c);
    y = y ^ (y >> l);
    return y & d;
  };
};
