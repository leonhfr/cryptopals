/*
Break repeating-key XOR

There's a file here. It's been base64'd after being encrypted with repeating-key XOR. Decrypt it.

Here's how:

 1. Let KEYSIZE be the guessed length of the key; try values from 2 to (say) 40.
Write a function to compute the edit distance/Hamming distance between two strings. The Hamming distance is just the number of differing bits. The distance between:
this is a test
and
wokka wokka!!!
is 37. Make sure your code agrees before you proceed.
 2. For each KEYSIZE, take the first KEYSIZE worth of bytes, and the second KEYSIZE worth of bytes, and find the edit distance between them. Normalize this result by dividing by KEYSIZE.
 3. The KEYSIZE with the smallest normalized edit distance is probably the key. You could proceed perhaps with the smallest 2-3 KEYSIZE values. Or take 4 KEYSIZE blocks instead of 2 and average the distances.
 4. Now that you probably know the KEYSIZE: break the ciphertext into blocks of KEYSIZE length.
 5. Now transpose the blocks: make a block that is the first byte of every block, and a block that is the second byte of every block, and so on.
 6. Solve each block as if it was single-character XOR. You already have code to do this.
 7. For each block, the single-byte XOR key that produces the best looking histogram is the repeating-key XOR key byte for that block. Put them together and you have the key.
*/

package set1

import (
	"github.com/leonhfr/cryptopals/bytes"
	"github.com/leonhfr/cryptopals/xor"
)

const minKeySize = 2
const maxKeySize = 40

func Challenge6(ciphertext []byte) (plaintext, key string) {
	keySize := xor.GuessKeySize(ciphertext, minKeySize, maxKeySize)
	chunks := bytes.SplitBytes(ciphertext, keySize)
	transposed := bytes.TransposeBytes(chunks)
	k := make([]byte, keySize)
	for i, group := range transposed {
		transposed[i], k[i%keySize] = xor.CrackSingleByteXOR(group)
	}
	pt := bytes.TransposeBytes(transposed)
	return string(pt), string(k)
}
