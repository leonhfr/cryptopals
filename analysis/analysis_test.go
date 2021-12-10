package analysis

import (
	"testing"
)

func TestHammingDistance(t *testing.T) {
	buffer1 := []byte("this is a test")
	buffer2 := []byte("wokka wokka!!!")
	expected := 37

	distance := HammingDistance(buffer1, buffer2)

	if expected != distance {
		t.Errorf("Expected: %d Got: %d", expected, distance)
	}
}
