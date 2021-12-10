/*
Detect single-character XOR
One of the 60-character strings in this file has been encrypted by single-character XOR.

Find it.

(Your code from #3 should help.)
*/
package set1

import (
	"github.com/leonhfr/cryptopals/encoding"
	"github.com/leonhfr/cryptopals/xor"
)

func Challenge4(lines []string) (string, string) {
	var ciphertexts [][]byte

	for _, line := range lines {
		ciphertexts = append(ciphertexts, encoding.HexToBytes(line))
	}

	plaintext, key := xor.DetectSingleByteXOR(ciphertexts)

	return string(plaintext), string(key)
}
