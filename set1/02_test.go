package set1

import (
	"fmt"
	"testing"
)

func TestChallenge2(t *testing.T) {
	var tests = []struct{ h1, h2, expected string }{
		{
			h1:       "1c0111001f010100061a024b53535009181c",
			h2:       "686974207468652062756c6c277320657965",
			expected: "746865206b696420646f6e277420706c6179",
		},
	}

	for i, tt := range tests {
		testname := fmt.Sprintf("Test %d:", i)
		t.Run(testname, func(t *testing.T) {
			result, err := Challenge2(tt.h1, tt.h2)
			if err != nil {
				t.Errorf("Error: %v", err)
			}
			if result != tt.expected {
				t.Errorf("Expected: %v Got: %v", result, tt.expected)
			}
		})
	}
}
