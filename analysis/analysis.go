package analysis

var frequencies = []float64{
	8.176, 1.492, 2.782, 4.253, 12.702, 2.228, 2.015, 6.094, 6.966, 0.153, 0.772, 4.025, 2.406,
	6.749, 7.507, 1.929, 0.095, 5.987, 6.327, 9.056, 2.758, 0.978, 2.360, 0.150, 1.974, 0.074}

// ScoreText scores a string according to a dictionary of English characters frequency.
// The higher the score the likelier the string is to be in English.
func ScoreText(text []byte) float64 {
	var score float64
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
