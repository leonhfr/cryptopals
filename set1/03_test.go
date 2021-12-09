package set1

import (
	"testing"
)

func TestChallenge3(t *testing.T) {
	ciphertext := "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
	expected := "X"
	plaintext, key := Challenge3(ciphertext)

	if key != expected {
		t.Fail()
	}

	t.Log("Decrypted text:", plaintext)
	t.Log("Key           :", key)
}
