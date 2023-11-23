const messageArea = document.getElementById('message-area');
const message = document.getElementById('message');

async function fetchFile(fileName) {
  const response = await fetch(`https://ihatov08.github.io/kimetsu_api/api/${fileName}.json`);
  console.log("response=", response);
  if (response.ok) {
    const data = await response.json();
    // const data = [];
    if (!data.length) {
      throw new NoDataError('no data found');
    }
    return data
  }
}

class NoDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoDataError";
  }
}

// init
function init() {
  // 初期表示
  hiddenMessage();
  displayCharacters();

  // ラジオボタンにイベントリスナをセット
  const radioBtn = document.getElementById('radioBtn');
  radioBtn.addEventListener('change', ()=> {
    const fileName = radioBtn.category.value;
    displayCharacters(fileName);
  })
}

async function displayCharacters(fileName = 'all') {
  try {
    console.log(fileName);
    const data = await fetchFile(fileName);
    console.log(data);
  } catch(e) {
    if (e.name === "NoDataError") {
      const errorMessage = "データがありません。。別のキャラクターを選んでね！";
      displayMessage(errorMessage)
    }
  } 
}

function displayMessage(errorMessage) {
  messageArea.style.display = "block";
  message.innerText = errorMessage;
}

function hiddenMessage() {
  console.log("メッセージエリア非表示");
  messageArea.style.display = "none";
  message.innerText = "";
}

init();