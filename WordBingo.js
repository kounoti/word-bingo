process.stdin.resume();
process.stdin.setEncoding("utf8");
var readline = require("readline");
// "readline"インターフェースを設定
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// 標準入力に入力された行を格納する配列
var inputLines = [];
// 処理中の行番号を示す変数
var currentLine = 0;
// 標準入力に入力を行うたびに"inputLines"配列に追加する
rl.on("line", function (line) {
    inputLines.push(line);
}).on("close", function () {
    // すべての入力が完了後に"bingo_result"関数を実行する
    bingo_result();
});
// 現在の行の情報を返し、"currentLine"をインクリメントする
var readLine = function () {
    return inputLines[currentLine++];
};
var bingo_result = function () {
    // ビンゴカードのサイズ"S"を読み取る
    var S = parseInt(readLine().trim());
    // ビンゴカード(2次元配列)
    var bingoCard = [];
    // ビンゴカードの各行を読み取り、2次元配列として格納する
    for (var i = 0; i < S; i++) {
        bingoCard.push(readLine().trim().split(" "));
    }
    // 選ばれた単語の数"N"を読み取る
    var N = parseInt(readLine().trim());
    // 選ばれた単語を格納する
    var selectedWords = new Set();
    // 選ばれた単語をセットに追加する
    for (var i = 0; i < N; i++) {
        selectedWords.add(readLine().trim());
    }
    // ビンゴカードの各マスがマークされているかどうかを格納する配列
    var marked = Array.from({ length: S }, function () {
        return Array(S).fill(false);
    });
    // ビンゴカードの単語が選ばれていれば、そのマスをマークする
    for (var i = 0; i < S; i++) {
        for (var j = 0; j < S; j++) {
            if (selectedWords.has(bingoCard[i][j])) {
                marked[i][j] = true;
            }
        }
    }
    // ビンゴが成立しているかどうかをチェックする関数
    var checkBingo = function () {
        // 行(横の列)のチェック
        for (var i = 0; i < S; i++) {
            if (marked[i].every(function (square) { return square; })) {
                return true;
            }
        }
        var _loop_1 = function (j) {
            if (marked.every(function (row) { return row[j]; })) {
                return { value: true };
            }
        };
        // 列(縦の列)のチェック
        for (var j = 0; j < S; j++) {
            var state_1 = _loop_1(j);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        // 主対角線のチェック
        if (marked.every(function (row, i) { return row[i]; })) {
            return true;
        }
        // 反対対角線のチェック
        if (marked.every(function (row, i) { return row[S - 1 - i]; })) {
            return true;
        }
        return false;
    };
    // ビンゴが成立しているかどうかを判定し、結果(yes or no)を出力する
    console.log(checkBingo() ? "yes" : "no");
};
