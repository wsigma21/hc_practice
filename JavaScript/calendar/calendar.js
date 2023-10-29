// 引数を受け取る
// 第一、第二引数にはnodeコマンドと実行されたスクリプトのファイルパスが入るので取り除く
const args = process.argv.slice(2);
console.log(args);
const option = args[0];
// 数字部分を文字列から数字に変換する
const target_month = Number(args[1]);

// TODO:関数化の検討
try {
  // 引数のエラー処理
  if (args.length !== 0) {
    // 第一引数があるのに"-m"じゃない
    // TODO: args.length !== 0が保証されるなら左の条件は不要
    if (args.length > 0 && option !== "-m") {
      throw new Error("オプションとして「-m」を指定してください");
    }
  
    // 第一引数が"-m"だけど第二引数が不適切
    const month_list = Array(12).fill().map((_, i) => i + 1);
    const is_month = month_list.includes(target_month);
    if (isNaN(target_month)) {
      throw new Error("第二引数に月を数字で入力してください");
    } else if (!is_month) {
      throw new Error(`${target_month} は月として不適切です。1 ~ 12 を入力してください`);
    }
  }
} catch(error) {
  console.log(error.message);
}

console.log("外側 target_month", target_month);

// TODO:現状だとエラーが出ても以下の処理も実行される。。month=13になったりする
// 引数がなければ今月を出す
const now = new Date();
const this_month = now.getMonth() + 1

const year = now.getFullYear();
const month = target_month || this_month;
console.log({month});

// ヘッダ出力
process.stdout.write(`      ${month}月 ${year}     \n`);
process.stdout.write("日 月 火 水 木 金 土\n");

// 月の開始日の曜日を取得
const first_day_obj = new Date(year, month-1);
const first_day_week = first_day_obj.getDay();

// 月の最終日の日付を取得
const last_day_obj = new Date(year, month, 0);
const last_day = last_day_obj.getDate();

// 月の開始日までの余白を出力
const week = '   '.repeat(first_day_week);
process.stdout.write(week);

// 1ヶ月の日数の配列を作成
const day_list = Array(last_day).fill().map((_, i) => i + 1);

// 曜日を管理する変数
wday = first_day_week

// 日付の出力
day_list.forEach(day => {
  const zerofill_day = String(day).padStart(2, ' ');
  process.stdout.write(zerofill_day + ' ');
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

