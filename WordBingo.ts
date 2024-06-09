import { workerData } from "worker_threads";

process.stdin.resume();
process.stdin.setEncoding("utf8");

const readline = require("readline");

// "readline"インターフェースを設定
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 標準入力に入力された行を格納する配列
const inputLines: string[] = [];
// 処理中の行番号を示す変数
let currentLine: number = 0;

// 標準入力に入力を行うたびに"inputLines"配列に追加する
rl.on("line", (line: string) => {
  inputLines.push(line);
}).on("close", () => {
  // すべての入力が完了後に"bingo_result"関数を実行する
  bingo_result();
});

// 現在の行の情報を返し、"currentLine"をインクリメントする
const readLine = (): string => {
  return inputLines[currentLine++];
};

// ビンゴが成立している場合は"yes"を、成立していない場合は"no"を返す関数
const bingo_result = (): void => {
  // ビンゴカードのサイズ"S"を読み取る
  const S: number = parseInt(readLine().trim());
  // ビンゴカード(2次元配列)
  const bingoCard: string[][] = [];

  // ビンゴカードの各行を読み取り、2次元配列として格納する
  for (let i: number = 0; i < S; i++) {
    bingoCard.push(readLine().trim().split(" "));
  }

  // 選ばれた単語の数"N"を読み取る
  const N: number = parseInt(readLine().trim());
  // 選ばれた単語を格納する
  const selectedWords: Set<string> = new Set();

  // 選ばれた単語をセットに追加する
  for (let i: number = 0; i < N; i++) {
    selectedWords.add(readLine().trim());
  }

  // ビンゴカードの各マスがマークされているかどうかを格納する配列
  const marked: boolean[][] = Array.from({ length: S }, () =>
    Array(S).fill(false)
  );

  // ビンゴカードの単語が選ばれていれば、そのマスをマークする
  for (let i: number = 0; i < S; i++) {
    for (let j: number = 0; j < S; j++) {
      if (selectedWords.has(bingoCard[i][j])) {
        marked[i][j] = true;
      }
    }
  }

  // ビンゴが成立しているかどうかをチェックする関数
  const checkBingo = () => {
    // 行(横の列)のチェック
    for (let i: number = 0; i < S; i++) {
      if (marked[i].every((square: boolean) => square)) {
        return true;
      }
    }

    // 列(縦の列)のチェック
    for (let j: number = 0; j < S; j++) {
      if (marked.every((row: boolean[]) => row[j])) {
        return true;
      }
    }

    // 主対角線のチェック
    if (marked.every((row: boolean[], i: number) => row[i])) {
      return true;
    }

    // 反対対角線のチェック
    if (marked.every((row: boolean[], i: number) => row[S - 1 - i])) {
      return true;
    }

    return false;
  };

  // ビンゴが成立しているかどうかを判定し、結果(yes or no)を出力する
  console.log(checkBingo() ? "yes" : "no");
};
