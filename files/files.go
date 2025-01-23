package files

import (
	"bufio"
	"os"

	"github.com/leonhfr/cryptopals/bytes"
)

// ReadFileLines reads a file and return the lines in a []string
func ReadFileLines(filename string) (lines []string, err error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines, nil
}

// ReadFileBase64 reads a file in base64
func ReadFileBase64(filename string) (b []byte, err error) {
	lines, err := ReadFileLines(filename)
	if err != nil {
		return nil, err
	}
	for _, l := range lines {
		b = append(b, bytes.Base64ToBytes(l)...)
	}
	return
}
