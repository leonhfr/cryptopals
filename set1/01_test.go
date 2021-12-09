package set1

import (
	"fmt"
	"testing"
)

func TestChallenge1(t *testing.T) {
	var tests = []struct{ input, expected string }{
		{
			input:    "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d",
			expected: "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t",
		},
	}

	for i, tt := range tests {
		testname := fmt.Sprintf("Test %d:", i)
		t.Run(testname, func(t *testing.T) {
			result := Challenge1(tt.input)
			if result != tt.expected {
				t.Errorf("Expected: %v Got: %v", result, tt.expected)
			}
		})
	}
}
