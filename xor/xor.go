package xor

import "errors"

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
