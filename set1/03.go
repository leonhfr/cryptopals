/*
Single-byte XOR cipher

The hex encoded string:

1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736
... has been XOR'd against a single character. Find the key, decrypt the message.

You can do this by hand. But don't: write code to do it for you.

How? Devise some method for "scoring" a piece of English plaintext.
Character frequency is a good metric. Evaluate each output and choose the one with the best score.
*/

package set1

import (
	"github.com/leonhfr/cryptopals/bytes"
	"github.com/leonhfr/cryptopals/xor"
)

func Challenge3(ciphertext string) (string, string) {
	c := bytes.HexToBytes(ciphertext)
	plaintext, key := xor.CrackSingleByteXOR(c)
	return string(plaintext), string(key)
}
