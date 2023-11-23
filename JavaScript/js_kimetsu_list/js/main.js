import { NoDataError } from './error.js';

// プロフィール表示部分
const profilesArea = document.getElementById('profiles');
// エラーメッセージ表示部分
const messageArea = document.getElementById('message-area');
const message = document.getElementById('message');
// ローディング表示部分
const loadingArea = document.querySelector('.loading-area');
// URL
const baseURL = "https://ihatov08.github.io";
const APIURL = baseURL + "/kimetsu_api/api/"

/**
 * 初期実行用関数
 */
function init() {
  // 初期化
  clearProfilesArea();
  // エラーメッセージ非表示
  hiddenMessage();
  // デフォルトで全キャラクター表示
  displayCharacters();

  // ラジオボタンにイベントリスナをセット
  const radioBtn = document.getElementById('radioBtn');
  radioBtn.addEventListener('change', ()=> {
    const fileName = radioBtn.category.value;
    displayCharacters(fileName);
  })
}

/**
 * ProfilesAreaにキャラクターを表示する関数
 * @param {string} fileName
 */
async function displayCharacters(fileName) {
  try {
    // 初期化
    clearProfilesArea();
    // ローディング表示ON
    displayLoading();
    const data = await fetchFile(fileName);
    createHTMLElement(data);
    // ローディング表示OFF
    hiddenLoading();
  } catch(e) {
    let errorMessage = "不具合が発生しています。。管理者に問い合わせてください。";
    if (e.name === "NoDataError") {
      errorMessage = "データがありません。。別のカテゴリを選んでね！";
    }
    displayMessage(errorMessage)
  } 
}

/**
 * ローディング表示
 */
function displayLoading() {
  loadingArea.classList.remove('hide');
} 

/**
 * ローディング非表示
 */
function hiddenLoading() {
  // 処理中表示確認用：fetchが一瞬なのであえて遅らせる
  setTimeout(() => {
    loadingArea.classList.add('hide')}
    , "800");
}

/**
 * fetchを実行してデータを取得する関数
 * @param {string} [fileName='all'] 
 * @returns {Object} Promise
 */
async function fetchFile(fileName = 'all') {
  const response = await fetch(`${APIURL}${fileName}.json`);
  if (response.ok) {
    const data = await response.json();
    // const data = []; // データがない場合の確認用
    if (!data.length) {
      throw new NoDataError('no data found');
    }
    return data
  }
}

/**
 * fetchしたデータを元にHTML要素を作る関数
 * @param {object} data 
 */
function createHTMLElement(data) {
  data.forEach(person => {
    const sectionElement = document.createElement("section");
    const nameElement = document.createElement("p");
    nameElement.innerHTML = person.name;
    const categoryElement = document.createElement("p");
    categoryElement.innerHTML = person.category;
    const imageElement = document.createElement("img");
    imageElement.src = baseURL + person.image;
    imageElement.alt = "キャラクターの画像";
    sectionElement.appendChild(nameElement);
    sectionElement.appendChild(categoryElement);
    sectionElement.appendChild(imageElement);
    profilesArea.appendChild(sectionElement);
  });
}

/**
 * ProfileAreaをクリアする関数
 */
function clearProfilesArea() {
  while (profilesArea.firstChild) {
    profilesArea.removeChild(profilesArea.firstChild);
  }
}

/**
 * エラーメッセージを画面に表示する関数
 * @param {string} errorMessage 
 */
function displayMessage(errorMessage) {
  messageArea.style.display = "block";
  message.innerText = errorMessage;
}

/**
 * エラーメッセージ表示を画面から非表示にする関数
 */
function hiddenMessage() {
  messageArea.style.display = "none";
  message.innerText = "";
}

init();