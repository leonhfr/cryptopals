package bytes

import (
	"encoding/base64"
	"encoding/hex"
)

// Base64ToBytes converts a hex string to []byte
func Base64ToBytes(b string) []byte {
	bytes, err := base64.StdEncoding.DecodeString(b)
	if err != nil {
		panic(err)
	}
	return bytes
}

// HexToBytes converts a hex string to []byte
func HexToBytes(h string) []byte {
	bytes, err := hex.DecodeString(h)
	if err != nil {
		panic(err)
	}
	return bytes
}

// BytesToBase64 converts []byte to a base64 string
func BytesToBase64(bytes []byte) string {
	return base64.StdEncoding.EncodeToString(bytes)
}

// BytesToHex converts a []byte to a hex string
func BytesToHex(bytes []byte) string {
	return hex.EncodeToString(bytes)
}

// SplitBytes splits a byte slice into chunks of a certain length
func SplitBytes(buffer []byte, length int) (chunks [][]byte) {
	for i := 0; i < len(buffer); i += length {
		if i+length >= len(buffer) {
			chunks = append(chunks, buffer[i:])
		} else {
			chunks = append(chunks, buffer[i:i+length])
		}
	}
	return
}

// TransposeBytes AA,BB,CC -> ABC,ABC
func TransposeBytes(buffers [][]byte) [][]byte {
	result := make([][]byte, len(buffers[0]))
	for _, buffer := range buffers {
		for i, b := range buffer {
			result[i] = append(result[i], b)
		}
	}
	return result
}
