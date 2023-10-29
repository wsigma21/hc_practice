// 引数を受け取る
// 第一、第二引数にはnodeコマンドと実行されたスクリプトのファイルパスが入るので取り除く
const args = process.argv.slice(2);
// console.log(args);

// メイン処理部分
try {
  const month = setMonth(args);
  printCalendar(month);
} catch(error) {
  console.log(error.message);
}

// 引数をチェックする関数
function checkArgs(args) {
  const option = args[0];
  // 数字部分を文字列から数字に変換する
  const inputedMonth = Number(args[1]);

  // 第一引数があるのに"-m"じゃない
  if (option !== "-m") {
    throw new Error("オプションとして「-m」を指定してください");
  }

  // 第一引数は"-m"だけど第二引数が不適切
  const monthList = [...Array(12)].map((_, i) => i + 1);
  const isMonth = monthList.includes(inputedMonth);
  if (isNaN(inputedMonth)) {
    throw new Error("第二引数に、表示したい月を数字で入力してください");
  } else if (!isMonth) {
    throw new Error(`第二引数に入力された ${inputedMonth} は月として不適切です。1 ~ 12 を入力してください`);
  }
  return inputedMonth;
}

// 対象となる月をセットする関数
function setMonth(args) {
  // 引数のエラー処理
  if (args.length === 0) {
    // 引数がなければ今月を出す
    const now = new Date();
    const thisMonth = now.getMonth() + 1
    return thisMonth;
  } 

  // 引数があればチェックしてから出力対象月とする
  const targetMonth = checkArgs(args);
  return targetMonth;
}

function printCalendar(month) {
  // ヘッダ出力
  const now = new Date();
  const year = now.getFullYear();
  process.stdout.write(`      ${month}月 ${year}     \n`);
  process.stdout.write("日 月 火 水 木 金 土\n");

  // 月の開始日の曜日を取得
  const firstDayObj = new Date(year, month-1);
  const firstDayWeek = firstDayObj.getDay();

  // 月の最終日の日付を取得
  const lastDayObj = new Date(year, month, 0);
  const lastDay = lastDayObj.getDate();

  // 月の開始日までの余白を出力
  const week = '   '.repeat(firstDayWeek);
  process.stdout.write(week);

  // 1ヶ月の日数の配列を作成
  const dayList = [...Array(lastDay)].fill().map((_, i) => i + 1);

  // 曜日を管理する変数
  wday = firstDayWeek;

  // 日付の出力
  dayList.forEach(day => {
    const zerofillDay = String(day).padStart(2, ' ');
    process.stdout.write(zerofillDay + ' ');
    wday += 1
    // 土曜日なら改行
    if (wday % 7 === 0) {
      process.stdout.write("\n");
    }
  });
  // 最終日が土曜日以外なら改行
  if (wday % 7 !== 0) {
    process.stdout.write("\n");
  }
}

