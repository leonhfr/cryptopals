/*
Fixed XOR

Write a function that takes two equal-length buffers and produces their XOR combination.

If your function works properly, then when you feed it the string:

1c0111001f010100061a024b53535009181c

... after hex decoding, and when XOR'd against:

686974207468652062756c6c277320657965

... should produce:

746865206b696420646f6e277420706c6179
*/

package set1

import (
	"github.com/leonhfr/cryptopals/bytes"
	"github.com/leonhfr/cryptopals/xor"
)

func Challenge2(h1, h2 string) (string, error) {
	hex1 := bytes.HexToBytes(h1)
	hex2 := bytes.HexToBytes(h2)
	x, err := xor.FixedXOR(hex1, hex2)
	if err != nil {
		return "", err
	}
	return bytes.BytesToHex(x), nil
}
