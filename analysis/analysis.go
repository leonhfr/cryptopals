package analysis

var frequencies = []float64{
	8.176, 1.492, 2.782, 4.253, 12.702, 2.228, 2.015, 6.094, 6.966, 0.153, 0.772, 4.025, 2.406,
	6.749, 7.507, 1.929, 0.095, 5.987, 6.327, 9.056, 2.758, 0.978, 2.360, 0.150, 1.974, 0.074}

// ScoreText scores a string according to a dictionary of English characters frequency.
// The higher the score the likelier the string is to be in English.
func ScoreText(text []byte) (score float64) {
	spaceFreq := 5.0

	for _, character := range text {
		if 'A' <= character && character <= 'Z' {
			score += frequencies[int(character)-'A']
		}

		if 'a' <= character && character <= 'z' {
			score += frequencies[int(character)-'a']
		}

		if character == ' ' {
			score += spaceFreq
		}
	}

	return score / float64(len(text))
}

// HammingDistance computs the number of different bits between two buffers
func HammingDistance(buffer1, buffer2 []byte) (distance int) {
	for i, b := range buffer1 {
		distance += countBits(buffer2[i] ^ b)
	}
	return
}

func countBits(b byte) (bits int) {
	for ; b > 0; b >>= 1 {
		bits += int(b & 1)
	}
	return
}

// BlockDistance computes the hamming distance of size sized blocks in a buffer
// Distances are normalized and averaged
func BlockDistance(buffer []byte, size int) (distance float64) {
	// Abort if there are fewer than four blocks to compare
	if len(buffer) < 4*size {
		return -1
	}
	iterations := len(buffer)/size - 1
	for i := 0; i < iterations; i++ {
		a := buffer[i*size : (i+1)*size]
		b := buffer[(i+1)*size : (i+2)*size]
		distance += float64(HammingDistance(a, b))
	}
	return distance / float64(size*iterations)
}
