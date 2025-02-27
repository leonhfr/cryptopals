/*
Convert hex to base64

The string:

`49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d`

Should produce:

`SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t`

So go ahead and make that happen. You'll need to use this code for the rest of the exercises.
*/

package set1

import "github.com/leonhfr/cryptopals/bytes"

func Challenge1(input string) string {
	return bytes.BytesToBase64(bytes.HexToBytes(input))
}
