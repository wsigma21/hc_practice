const formInputElement = document.getElementById("js-form-input");
const todoListElement = document.getElementById("js-todo-list");
const submitBtn = document.getElementById("submitBtn");
const allTaskCountElement = document.getElementById("js-count-all");
const completedTaskCountElement = document.getElementById("js-count-completed");
const uncompletedTaskCountElement = document.getElementById("js-count-uncompleted");
// アイテムごと（li要素ごと）に一意のidを振る
let itemId = 1;

// 保存ボタン押下時の処理
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(formInputElement.value);

  // li要素の作成
  const itemElement = document.createElement("li");
  itemElement.id = `item${itemId}`;

  // li要素のcheckboxに対してイベントリスナーを設定
  itemElement.addEventListener('click', (event) => {
    // チェックボックスのクリック時にタスク状況を更新
    if (event.target.type === 'checkbox') {
        updateTaskStatus();
    }
  });

  // input要素（チェックボックス）の作成
  const checkboxElement = document.createElement("input");
  checkboxElement.id = `checkbox${itemId}`;
  checkboxElement.className = "checkbox";
  checkboxElement.type = "checkbox";

  // ラベル要素の作成
  const labelElement = document.createElement("label");
  labelElement.innerHTML = formInputElement.value;
  labelElement.setAttribute('for', `checkbox${itemId}`);

  // 編集ボタンの作成
  const editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.innerHTML = "編集";

  // 編集・保存ボタン押下時の処理
  editBtn.addEventListener('click', (event) => {
    // li要素を取得
    const parentElement = event.target.parentNode;
    // 編集中かどうかを取得
    const isEditing = parentElement.classList.contains('editing');
    if (!isEditing) { // 未編集 -> 編集中へ
      const labelElement = parentElement.querySelector('label');
      const inputElement = document.createElement('input');
      inputElement.value = labelElement.textContent;
      // labelとinputを入れ替える
      event.target.parentNode.replaceChild(inputElement, labelElement);
      parentElement.classList.add('editing');
    } else { // 編集中 -> 未編集へ
      const inputElement = event.target.previousElementSibling;
      const idNum = parentElement.id.replace(/[^0-9]/g, '');
      const labelElement = document.createElement("label");
      labelElement.setAttribute('for', `checkbox${idNum}`);
      labelElement.innerHTML = inputElement.value;
      // labelとinputを入れ替える
      event.target.parentNode.replaceChild(labelElement, inputElement);
      parentElement.classList.remove('editing');
    }
    // ボタン名を変更する
    event.target.innerHTML = isEditing ? "編集" : "保存";
  });

  // 削除ボタンの作成
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.innerHTML = "削除";

  deleteBtn.addEventListener('click', (event) => {
    // 削除確認
    const isConfirmed = window.confirm("本当に削除してもよろしいですか？");
    if (!isConfirmed) {
      return
    }
    // 削除処理
    const parentElement = event.target.parentNode;
    todoListElement.removeChild(parentElement);

    // タスク状況の更新
    updateTaskStatus();
  });

  // li要素にcheckbox -> label -> title -> buttonの順で追加
  itemElement.appendChild(checkboxElement);
  itemElement.appendChild(labelElement);
  itemElement.appendChild(editBtn);
  itemElement.appendChild(deleteBtn);

  // listにitemを追加
  todoListElement.appendChild(itemElement);

  // タスク状況の更新
  updateTaskStatus();

  // 入力欄初期化
  formInputElement.value = "";

  itemId++;
});

// タスク状況を更新する関数
function updateTaskStatus() {
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
  completedTaskCountElement.innerHTML = `完了済み: ${completedCount}`;

  // 未完了のタスク
  const uncompletedCount = allTasksCount - completedCount;
  uncompletedTaskCountElement.innerHTML = `未完了: ${uncompletedCount}`;
};
