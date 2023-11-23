
async function fetchFile(fileName) {
  const response = await fetch(`https://ihatov08.github.io/kimetsu_api/api/${fileName}.json`);
  const data = await response.json();
  return data
}

// init
function init() {
  // 初期表示
  displayCharacters();

  // ラジオボタンにイベントリスナをセット
  const radioBtn = document.getElementById('radioBtn');
  radioBtn.addEventListener('change', ()=> {
    const fileName = radioBtn.category.value;
    displayCharacters(fileName);
  })
}

async function displayCharacters(fileName = 'all') {
  console.log(fileName);
  const data = await fetchFile(fileName);
  console.log(data);
}

init();