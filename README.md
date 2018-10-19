# Cryptopals

Cryptopals is a collection of 64 exercises that demonstrate attacks on real world crypto. Exercises exploit weaknesses in real-world systems and modern cryptographic constructions.

These are my solutions to the challenges in JavaScript (Node.js). They are unlikely to be fully correct and in no way is it the best way to do these things.

## Getting started

You will need to have [Node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) and [nodemon](https://nodemon.io/) installed.

First, clone the repository and install the dependencies:
```
git clone https://github.com/leonhfr/cryptopals.git
cd cryptopals
npm install
```

Once done, you will be able to run any completed challenge with:
```
npm run challenge [challenge number]
```
This will run this particular challenge using nodemon so you may keep working on the solution and it will reload automatically.

If the challenge has data, it is stored in `/data` in text files with the challenge number as name. It is read and passed to each challenge automatically. Libraries are in `/utils` and are also passed to each challenge.

## Progress

#### Set 1 (complete)
1. Convert hex to base64
2. Fixed XOR
3. Single-byte XOR cipher
4. Detect single-byte XOR cipher
5. Implement repeating-key XOR
6. Break repeating-key XOR
7. AES in ECB mode
8. Detect AES in ECB mode

#### Set 2 (complete)
9. Implement
10. Implement CBC mode
11. An ECB/CBC detection oracle
12. Byte-at-a-time ECB decryption (simple)
13. ECB cut-and-paste
14. Byte-at-a-time ECB decryption (harder)
15. PKCS#7 padding validation
16. CBC bitflipping attacks

#### Set 3 (incomplete)
17. The CBC padding oracle
18. Implement CTR, the stream cipher mode
19. Break fixed-nonce CTR using substitutions
20. Break fixed-nonce CTR statistically
21. Implement the MT19937 Mersenne Twister RNG
22. Crack an MT19937 seed
23. Clone an MT19937 RNG from its output
24. Create the MT19937 stream cipher and break it

#### Set 4 (not attempted)
#### Set 5 (not attempted)
#### Set 6 (not attempted)
#### Set 7 (not attempted)
#### Set 8 (not attempted)
