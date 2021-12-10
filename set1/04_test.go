package set1

import (
	"testing"

	"github.com/leonhfr/cryptopals/files"
)

func TestChallenge4(t *testing.T) {
	lines, err := files.ReadFileLines("../data/04.txt")
	if err != nil {
		t.Log(err)
		t.Fail()
	}
	expectedKey := "5"

	plaintext, key := Challenge4(lines)

	if key != expectedKey {
		t.Fail()
	}

	t.Log("Decrypted text:", string(plaintext))
	t.Log("Key           :", string(key))
}
