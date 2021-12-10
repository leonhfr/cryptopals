package xor

import (
	"bytes"
	"errors"

	"github.com/leonhfr/cryptopals/analysis"
)

// FixedXOR takes two []byte and returns a XORed []byte
func FixedXOR(buffer1, buffer2 []byte) ([]byte, error) {
	if len(buffer1) != len(buffer2) {
		return []byte{}, errors.New("input buffer lengths not equal")
	}

	result := make([]byte, len(buffer1))

	for i := range buffer1 {
		result[i] = buffer1[i] ^ buffer2[i]
	}

	return result, nil
}

// SingleByteXOR xor a []byte agains a byte
func SingleByteXOR(buffer []byte, key rune) []byte {
	return bytes.Map(func(r rune) rune {
		return r ^ key
	}, buffer)
}

// CrackSingleByteXOR tests a ciphertext against all 256 bytes and returns the likeliest plaintext with the key
func CrackSingleByteXOR(ciphertext []byte) (plaintext []byte, key byte) {
	var highestScore float64

	for i := 0; i < 256; i++ {
		x := SingleByteXOR(ciphertext, rune(i))
		score := analysis.ScoreText(x)

		if score > highestScore {
			plaintext, key, highestScore = x, byte(i), score
		}

	}

	return plaintext, key
}

// DetectSingleByteXOR takes an array of []byte and cracks them
func DetectSingleByteXOR(ciphertexts [][]byte) (plaintext []byte, key byte) {
	var highestScore float64

	for _, ciphertext := range ciphertexts {
		t, k := CrackSingleByteXOR(ciphertext)
		score := analysis.ScoreText(t)

		if score > highestScore {
			highestScore, plaintext, key = score, t, k
		}

	}

	return plaintext, key
}
