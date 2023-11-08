// カスタムデータ属性で編集中フラグを管理していたバージョン
// classで管理する方法に変更したため、こちらは不使用

const formInputElement = document.getElementById("js-form-input");
const todoListElement = document.getElementById("js-todo-list");
const submitBtn = document.getElementById("submitBtn");
const allTaskCountElement = document.getElementById("js-count-all");
const completedTaskCountElement = document.getElementById("js-count-completed");
const uncompletedTaskCountElement = document.getElementById("js-count-uncompleted");
let itemId = 1;

// 保存ボタン押下時の処理
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(formInputElement.value);

  // li要素の作成
  const itemElement = document.createElement("li");
  itemElement.setAttribute('data-isediting', 'false');
  itemElement.id = `item${itemId}`

  // li要素のcheckboxに対してイベントリスナーを設定
  itemElement.addEventListener('click', (event) => {
    if (event.target.type === 'checkbox') {
        // console.log("checkbox addEventListener");
        updateItemNum();
    }
  });

  // input要素（チェックボックス）の作成
  const checkboxElement = document.createElement("input");
  checkboxElement.id = `checkbox${itemId}`;
  checkboxElement.className = "checkbox";
  checkboxElement.type = "checkbox";
  // checkboxElement.setAttribute('data-isEditing', false);
  // checkboxElement.dataset.isediting = 'false';

  // ラベル要素の作成
  const labelElement = document.createElement("label");
  labelElement.innerHTML = formInputElement.value;
  // labelElement.className = "itemTitle";
  labelElement.setAttribute('for', `checkbox${itemId}`);

  // 編集ボタンの作成
  const editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.innerHTML = "編集";

  console.log("submit処理")

  // 編集・保存ボタン押下時の処理
  editBtn.addEventListener('click', (event) => {
    const parentElement = event.target.parentNode;
    let isEditing = parentElement.dataset.isediting;
    // parentElement.id;
    console.log("parentElement=", parentElement);
    console.log("parentElement.id=", parentElement.id);
    if (isEditing === 'false') { // 未編集 -> 編集中へ
      // console.log("編集中：", isEditing);
      console.log("未編集 -> 編集中へ");
      const labelElement = parentElement.querySelector('label');
      const inputElement = document.createElement('input');
      // const inputElementIdNum = labelElement.id.replace(/[^0-9]/g, '');
      // console.log()
      // inputElement.id = `checkbox${inputElementIdNum}`;
      // inputElement.className = "editItemTitle";
      inputElement.value = labelElement.textContent;
      // labelとinputを入れ替える
      event.target.parentNode.replaceChild(inputElement, labelElement);
      parentElement.dataset.isediting = 'true';
      console.log("parentElement.dataset.isediting =", parentElement.dataset.isediting );
    } else { // 編集中 -> 未編集へ
      // console.log("編集中：", isEditing);
      console.log("編集中 -> 未編集へ");

      const inputElement = event.target.previousElementSibling;
      const idNum = parentElement.id.replace(/[^0-9]/g, '');
      const labelElement = document.createElement("label");
      console.log("idNum=", idNum);
      labelElement.setAttribute('for', `checkbox${idNum}`);
      labelElement.innerHTML = inputElement.value;
      // labelとinputを入れ替える
      event.target.parentNode.replaceChild(labelElement, inputElement);
      // console.log("保存後の値？:", inputElement);
      parentElement.dataset.isediting = 'false';
      console.log("parentElement.dataset.isediting =", parentElement.dataset.isediting );
    }
    // ボタン名を変更する
    event.target.innerHTML = isEditing ? "編集" : "保存";

    // 状態の更新
    // parentElement.dataset.isediting = !isEditing;
  });

  // 削除ボタンの作成
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.innerHTML = "削除";

  // li要素にinput -> label -> title -> buttonの順で追加
  itemElement.appendChild(checkboxElement);
  itemElement.appendChild(labelElement);
  // itemElement.appendChild(itemTitle);
  itemElement.appendChild(editBtn);
  itemElement.appendChild(deleteBtn);

  // listにitemを追加
  todoListElement.appendChild(itemElement);

  // タスク数の更新
  updateItemNum();

  // 入力欄初期化
  formInputElement.value = "";

  itemId++;
});

// タスク数を更新する処理
function updateItemNum() {
  // 全てのチェックボックスの要素
  const checkboxElements = document.querySelectorAll('.checkbox');
  // 全てのタスクの数
  const allTasksCount = checkboxElements.length;
  allTaskCountElement.innerHTML = `全てのタスク: ${allTasksCount}`;
  
  // 完了済みのタスク
  let completedCount = 0;
  checkboxElements.forEach((checkbox) => {
    if (checkbox.checked) {
      completedCount++;
    }
  });
  // console.log("completedCount=", completedCount);
  completedTaskCountElement.innerHTML = `完了済み: ${completedCount}`;

  // 未完了のタスク
  const uncompletedCount = allTasksCount - completedCount;
  uncompletedTaskCountElement.innerHTML = `未完了: ${uncompletedCount}`;
};