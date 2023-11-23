
async function fetchFile(fileName) {
  const response = await fetch(`https://ihatov08.github.io/kimetsu_api/api/${fileName}`);
  console.log(response);
  const json = await response.json();
  console.log(json);
}

const fileName = 'kisatsutai.json';
fetchFile(fileName);