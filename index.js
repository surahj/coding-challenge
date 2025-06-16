// Function to encode a message using a key array to shuffle letters
function encodeMessage(message, key) {
  const blockSize = key.length;
  let encoded = "";

  // Process message in blocks
  for (let i = 0; i < message.length; i += blockSize) {
    const block = message.slice(i, i + blockSize);
    let encodedBlock = new Array(blockSize);

    console.log("block", block);

    // Shuffle each block using the key
    // For key [2, 0, 3, 1]:
    // Position 0's character goes to position 2
    // Position 1's character goes to position 0
    // Position 2's character goes to position 3
    // Position 3's character goes to position 1
    for (let j = 0; j < blockSize; j++) {
      encodedBlock[key[j]] = block[j];
    }

    console.log("encodedBlock", encodedBlock);

    encoded += encodedBlock.join("");
  }

  return encoded;
}

// Function to decode a message using a key array that shows how letters were shuffled
// You're given an encoded message and a key array that shows how letters were shuffled in each block.

// Your job: Decode the message by reversing the shuffle.

// ✍🏽 Function to write:
// function decodeMessage(message, key) {
//   // your code here
// }

// 🧪 Examples:
// decodeMessage('rtsiemsi', [2, 0, 3, 1]) ➞ 'misteris'
// decodeMessage('cdabghfe', [2, 3, 0, 1]) ➞ 'abcdefgh'

// 📌 Rules:

// message is a lowercase string

// key is an array of integers (e.g. [2, 0, 3, 1])

// The message is split into blocks of key.length

// Reverse the permutation for each block to decode

// No external libraries

function decodeMessage(message, key) {
  const blockSize = key.length;
  let decoded = "";

  // Process message in blocks
  for (let i = 0; i < message.length; i += blockSize) {
    const block = message.slice(i, i + blockSize);
    let decodedBlock = new Array(blockSize);

    // Reverse the shuffle for each block
    // For key [2, 0, 3, 1]:
    // Position 0 gets character from position 1
    // Position 1 gets character from position 3
    // Position 2 gets character from position 0
    // Position 3 gets character from position 2
    for (let j = 0; j < blockSize; j++) {
      const originalPos = key.indexOf(j);
      decodedBlock[j] = block[originalPos];
    }

    decoded += decodedBlock.join("");
  }

  return decoded;
}

// Test cases
console.log("\n--- Encoding Tests ---");
console.log(
  "Encode 'sritseim' with key [2, 0, 3, 1]:",
  encodeMessage("sritseim", [2, 0, 3, 1])
); // Should give 'rtsiemsi'
console.log(
  "Encode 'abcdefgh' with key [2, 3, 0, 1]:",
  encodeMessage("abcdefgh", [2, 3, 0, 1])
); // Should give 'cdabghfe'

console.log("\n--- Decoding Tests ---");
console.log(
  "Decode 'rtsiemsi' with key [2, 0, 3, 1]:",
  decodeMessage("rtsiemsi", [2, 0, 3, 1])
);
console.log(
  "Decode 'cdabghfe' with key [2, 3, 0, 1]:",
  decodeMessage("cdabghfe", [2, 3, 0, 1])
);
