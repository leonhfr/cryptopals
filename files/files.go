package files

import (
	"bufio"
	"os"
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
