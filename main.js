import { encrypt, decrypt } from "./utils/encrypt.js"

const input = document.getElementById("inputMain")
const result = document.getElementById("result")

const encryptBtn = document.getElementById("encryptBtn")
const decryptBtn = document.getElementById("decryptBtn")

const copyBtn = document.getElementById("copyBtn")

const inputSaved = localStorage.getItem("inputSaved")
const resultSaved = localStorage.getItem("resultSaved")

const resultContentDefault = `
<img src="public/defaultResultImg.svg" alt="default result" class="resultImgDefault" />
<h2>Ningún mensaje fue encontrado</h2>
<p>Ingresa el texto que desees encriptar o desencriptar.</p>
`

const updateCopyBtn = () => {
  copyBtn.style.display = input.value ? "block" : "none"
}

const setResult = text => {
  result.innerHTML = text
    ? `<h2 class="resultText">${text}</h2>`
    : resultContentDefault

  text
    ? localStorage.setItem("resultSaved", text)
    : localStorage.removeItem("resultSaved")
  
  updateCopyBtn()
}

const updateInput = () => {
  input.value
    ? localStorage.setItem("inputSaved", input.value)
    : localStorage.removeItem("inputSaved")
}

if (inputSaved) input.value = inputSaved
if (!resultSaved) copyBtn.style.display = "none" 
setResult(resultSaved) 

const encryptSubmit = () => {
  setResult(encrypt(input.value))
}

const decryptSubmit = () => {
  setResult(decrypt(input.value))
}
const copyText = () => {
  const result = localStorage.getItem("resultSaved")

  navigator.clipboard.writeText(result)
}

encryptBtn.onclick = encryptSubmit
decryptBtn.onclick = decryptSubmit
copyBtn.onclick = copyText
input.oninput = updateInput