let cnWord = "一"
let charCode = cnWord.charCodeAt(0)
let res = String.fromCharCode(charCode)

19968, 40869
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let randomCNCode = getRandomInt(19968, 40869)
let randomCNChar = String.fromCharCode(randomCNCode)
console.log(randomCNChar)
