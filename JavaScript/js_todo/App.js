const formInputElement = document.getElementById("js-form-input");
const todoListElement = document.getElementById("js-todo-list");
const submitBtn = document.getElementById("submitBtn");
const allTaskCountElement = document.getElementById("js-count-all");


// 保存ボタン押下時の処理
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(formInputElement.value);

  // li要素の作成
  const itemElement = document.createElement("li");
  const itemTitle = document.createTextNode(formInputElement.value);

  // input要素（チェックボックス）の作成
  const inputElement = document.createElement("input");
  inputElement.className = "checkbox";
  inputElement.type = "checkbox";

  // 編集ボタンの作成
  const editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.innerHTML = "編集";

  // 削除ボタンの作成
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.innerHTML = "削除";

  // li要素にinput -> title -> buttonの順で追加
  itemElement.appendChild(inputElement);
  itemElement.appendChild(itemTitle);
  itemElement.appendChild(editBtn);
  itemElement.appendChild(deleteBtn);

  // listにitemを追加
  todoListElement.appendChild(itemElement);

  // item数の更新
  updateItemNum();

  // 入力欄初期化
  formInputElement.value = "";
});

// この時点では編集ボタンが存在しないのでイベントリスナを追加できない。
// const editBtn = document.querySelector("editBtn");
// editBtn.addEventListener('click', () => {
//   console.log("edit button");
// });

// todoListが更新された時の処理
function updateItemNum() {
  const itemLength = todoListElement.childElementCount;
  // console.log("item数=", itemLength);
  allTaskCountElement.innerHTML = `全てのタスク: ${itemLength}`;
};






