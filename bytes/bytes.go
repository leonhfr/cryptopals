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
