# Message Encoding/Decoding Challenge

This project implements a message encoding and decoding system that uses a key array to shuffle characters in blocks.

## How It Works

### The Key Array

The key array determines how characters are shuffled within each block. For example, with key `[2, 0, 3, 1]`:

- Character at position 0 goes to position 2
- Character at position 1 goes to position 0
- Character at position 2 goes to position 3
- Character at position 3 goes to position 1

### Block Size

- The block size is determined by the length of the key array
- For key `[2, 0, 3, 1]`, block size is 4
- Messages are processed in blocks of this size

## Examples

### Example 1: Encoding "misteris"

Message: "misteris"
Key: [2, 0, 3, 1]

1. Split into blocks of 4:

   - Block 1: "mist"
   - Block 2: "eris"

2. Encode first block "mist":

   ```
   Position 0 ('m') → Position 2
   Position 1 ('i') → Position 0
   Position 2 ('s') → Position 3
   Position 3 ('t') → Position 1
   Result: "itms"
   ```

3. Encode second block "eris":

   ```
   Position 0 ('e') → Position 2
   Position 1 ('r') → Position 0
   Position 2 ('i') → Position 3
   Position 3 ('s') → Position 1
   Result: "resi"
   ```

4. Final encoded result: "itmsresi"

### Example 2: Decoding "rtsiemsi"

Encoded message: "rtsiemsi"
Key: [2, 0, 3, 1]

1. Split into blocks of 4:

   - Block 1: "rtsi"
   - Block 2: "emsi"

2. Decode first block "rtsi":

   ```
   Position 0 gets character from position 1: 'm'
   Position 1 gets character from position 3: 'i'
   Position 2 gets character from position 0: 's'
   Position 3 gets character from position 2: 't'
   Result: "mist"
   ```

3. Decode second block "emsi":

   ```
   Position 0 gets character from position 1: 'e'
   Position 1 gets character from position 3: 'r'
   Position 2 gets character from position 0: 'i'
   Position 3 gets character from position 2: 's'
   Result: "eris"
   ```

4. Final decoded result: "misteris"

## Implementation Details

### Encoding Process

```javascript
function encodeMessage(message, key) {
  const blockSize = key.length;
  let encoded = "";

  for (let i = 0; i < message.length; i += blockSize) {
    const block = message.slice(i, i + blockSize);
    let encodedBlock = new Array(blockSize);

    // Shuffle using key
    for (let j = 0; j < blockSize; j++) {
      encodedBlock[key[j]] = block[j];
    }

    encoded += encodedBlock.join("");
  }

  return encoded;
}
```

### Decoding Process

```javascript
function decodeMessage(message, key) {
  const blockSize = key.length;
  let decoded = "";

  for (let i = 0; i < message.length; i += blockSize) {
    const block = message.slice(i, i + blockSize);
    let decodedBlock = new Array(blockSize);

    // Reverse the shuffle
    for (let j = 0; j < blockSize; j++) {
      const originalPos = key.indexOf(j);
      decodedBlock[j] = block[originalPos];
    }

    decoded += decodedBlock.join("");
  }

  return decoded;
}
```

## Key Points

1. The key array determines the shuffle pattern
2. Messages are processed in blocks of size equal to key length
3. Encoding puts characters in new positions based on key
4. Decoding retrieves characters from original positions based on key
5. The process is reversible - encoding then decoding returns the original message
