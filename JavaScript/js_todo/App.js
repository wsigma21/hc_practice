const formInputElement = document.getElementById("js-form-input");
const todoListElement = document.getElementById("js-todo-list");
const submitBtn = document.getElementById("submitBtn");
const allTaskCountElement = document.getElementById("js-count-all");
let itemId = 1;
let isEditing = false;

// 保存ボタン押下時の処理
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(formInputElement.value);

  // li要素の作成
  const itemElement = document.createElement("li");
  itemElement.id = `item${itemId}`

  // input要素（チェックボックス）の作成
  const inputElement = document.createElement("input");
  inputElement.id = `checkbox${itemId}`;
  inputElement.className = "checkbox";
  inputElement.type = "checkbox";

  // ラベル要素の作成
  const labelElement = document.createElement("label");
  labelElement.className = "itemTitle";
  labelElement.innerHTML = formInputElement.value;
  labelElement.setAttribute ('for', `checkbox${itemId}`);

  // 編集ボタンの作成
  const editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.innerHTML = "編集";

  // 編集・保存ボタン押下時の処理
  editBtn.addEventListener('click', (event) => {
    const parentElement = event.target.parentNode;
    console.log("parentElement=", parentElement);
    if (!isEditing) { // 未編集状態
      // console.log("編集中：", isEditing);
      const labelElement = parentElement.querySelector('label');
      const inputElement = document.createElement('input');
      inputElement.className = "editItemTitle"
      inputElement.value = labelElement.textContent;
      // labelとinputを入れ替える
      event.target.parentNode.replaceChild(inputElement, labelElement);
    } else {
      // console.log("編集中：", isEditing);
      const labelElement = document.createElement("label");
      const inputElement = event.target.previousElementSibling;
      labelElement.innerHTML = inputElement.value;
      event.target.parentNode.replaceChild(labelElement, inputElement);
      // console.log("保存後の値？:", inputElement);
    }
    // ボタン名を変更する
    event.target.innerHTML = isEditing ? "編集" : "保存";
    isEditing = !isEditing;
  });

  // 削除ボタンの作成
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.innerHTML = "削除";

  // li要素にinput -> label -> title -> buttonの順で追加
  itemElement.appendChild(inputElement);
  itemElement.appendChild(labelElement);
  // itemElement.appendChild(itemTitle);
  itemElement.appendChild(editBtn);
  itemElement.appendChild(deleteBtn);

  // listにitemを追加
  todoListElement.appendChild(itemElement);

  // item数の更新
  updateItemNum();

  // 入力欄初期化
  formInputElement.value = "";

  itemId++;
});

// todoListが更新された時の処理
function updateItemNum() {
  const itemLength = todoListElement.childElementCount;
  allTaskCountElement.innerHTML = `全てのタスク: ${itemLength}`;
};






