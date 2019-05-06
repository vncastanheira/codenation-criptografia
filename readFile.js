let fs = require('fs')

let regex = new RegExp('^[A-Za-z]+$')

fs.readFile('./answer.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    let result = JSON.parse(data)
    console.log(result)
    let decifrado = ''
    for (let index = 0; index < result.cifrado.length; index++) {
      let element = result.cifrado[index]
      if (regex.exec(element)) {
        let charCode = result.cifrado.charCodeAt(index)
        decifrado += julius(charCode, result.numero_casas)
      } else {
        decifrado += element
      }
    }

    console.log('Cifrado: ' + result.cifrado)
    console.log('Decifrado: ' + decifrado)
  }
})

function julius (charCode, shift) {
  let finalCode = charCode - shift
  let result = ''
  if (finalCode < 'a'.charCodeAt(0)) {
    let aCode = 'a'.charCodeAt(0) // a: 97
    let diff = aCode - finalCode
    let newCode = ('z'.charCodeAt(0) + 1) - diff
    result = String.fromCharCode(newCode)
  } else {
    result = String.fromCharCode(finalCode)
  }

  return result
}
