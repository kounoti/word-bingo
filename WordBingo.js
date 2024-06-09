process.stdin.resume();
process.stdin.setEncoding("utf8");

const readline = require("readline");
// "readline"インターフェースを設定
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 標準入力に入力された行を格納する配列
const inputLines = [];
// 処理中の行番号を示す変数
let currentLine = 0;
// 標準入力に入力を行うたびに"inputLines"配列に追加する
rl.on("line", function (line) {
  inputLines.push(line);
}).on("close", function () {
  // すべての入力が完了後に"bingo_result"関数を実行する
  bingo_result();
});
// 現在の行の情報を返し、"currentLine"をインクリメントする
function readLine() {
  return inputLines[currentLine++];
}
function bingo_result() {
  // ビンゴカードのサイズ"S"を読み取る
  const S = parseInt(readLine().trim());
  const bingoCard = [];
  // ビンゴカードの各行を読み取り、2次元配列として格納する
  for (let i = 0; i < S; i++) {
    bingoCard.push(readLine().trim().split(" "));
  }
  // 選ばれた単語の数"N"を読み取る
  const N = parseInt(readLine().trim());
  // 選ばれた単語を格納するセット
  const selectedWords = new Set();
  // 選ばれた単語をセットに追加する
  for (let i = 0; i < N; i++) {
    selectedWords.add(readLine().trim());
  }
  // ビンゴカードの各セルがマークされているかどうかを格納する配列
  const marked = Array.from({ length: S }, function () {
    return Array(S).fill(false);
  });
  // ビンゴカードの単語が選ばれていれば、そのセルをマークする
  for (let i = 0; i < S; i++) {
    for (let j = 0; j < S; j++) {
      if (selectedWords.has(bingoCard[i][j])) {
        marked[i][j] = true;
      }
    }
  }

  // ビンゴが成立しているかどうかをチェックする関数
  const checkBingo = function () {
    // 行(横の列)のチェック
    for (let i = 0; i < S; i++) {
      if (
        marked[i].every(function (cell) {
          return cell;
        })
      ) {
        return true;
      }
    }
    // 列(縦の列)のチェック
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
    // 主対角線のチェック
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
    // 反対対角線のチェック
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
  // ビンゴが成立しているかどうかを判定し、結果を出力する
  console.log(checkBingo() ? "yes" : "no");
}
