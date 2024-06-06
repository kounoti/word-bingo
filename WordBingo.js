process.stdin.resume();
process.stdin.setEncoding("utf8");

const readline = require("readline");

// Setup readline interface for standard input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputLines = [];
let currentLine = 0;

// Read input from standard input
rl.on("line", (line) => {
  inputLines.push(line);
}).on("close", () => {
  bingo_result();
});

function readLine() {
  return inputLines[currentLine++];
}

function bingo_result() {
  // ビンゴカードのサイズ S を読み取る
  const S = parseInt(readLine().trim());
  const bingoCard = [];

  for (let i = 0; i < S; i++) {
    bingoCard.push(readLine().trim().split(" "));
  }

  const N = parseInt(readLine().trim());
  const selectedWords = new Set();

  for (let i = 0; i < N; i++) {
    selectedWords.add(readLine().trim());
  }

  const marked = Array.from({ length: S }, () => Array(S).fill(false));

  // Mark the cells if the word is selected
  for (let i = 0; i < S; i++) {
    for (let j = 0; j < S; j++) {
      if (selectedWords.has(bingoCard[i][j])) {
        marked[i][j] = true;
      }
    }
  }

  const checkBingo = () => {
    // Check rows
    for (let i = 0; i < S; i++) {
      if (marked[i].every((cell) => cell)) {
        return true;
      }
    }

    // Check columns
    for (let j = 0; j < S; j++) {
      let columnComplete = true;
      for (let i = 0; i < S; i++) {
        if (!marked[i][j]) {
          columnComplete = false;
          break;
        }
      }
      if (columnComplete) {
        return true;
      }
    }

    // Check main diagonal
    let mainDiagonalComplete = true;
    for (let i = 0; i < S; i++) {
      if (!marked[i][i]) {
        mainDiagonalComplete = false;
        break;
      }
    }
    if (mainDiagonalComplete) {
      return true;
    }

    // Check anti-diagonal
    let antiDiagonalComplete = true;
    for (let i = 0; i < S; i++) {
      if (!marked[i][S - 1 - i]) {
        antiDiagonalComplete = false;
        break;
      }
    }
    if (antiDiagonalComplete) {
      return true;
    }

    return false;
  };

  console.log(checkBingo() ? "yes" : "no");
}
