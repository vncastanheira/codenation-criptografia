const https = require('https')
const sha1 = require('js-sha1')
const fs = require('fs')
const request = require('request')
const url = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=56b38829c35932d8c39c8b212288a0a43752ccc9'

let regex = new RegExp('^[A-Za-z]+$')

function main () {
  fs.readFile('./answer.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let jsonData = JSON.parse(data)
      console.log(jsonData)
      let decifrado = ''
      for (let index = 0; index < jsonData.cifrado.length; index++) {
        let element = jsonData.cifrado[index]
        if (regex.exec(element)) {
          let charCode = jsonData.cifrado.charCodeAt(index)
          decifrado += julius(charCode, jsonData.numero_casas)
        } else {
          decifrado += element
        }
      }

      jsonData.decifrado = decifrado
      jsonData.resumo_criptografico = sha1(decifrado)
      console.log(jsonData)
      request.post(url, jsonData, (err, httpResponse, body) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Code: ' + httpResponse.statusCode + ' - ' + httpResponse.statusMessage + '\n')
          console.log(body)
        }
      })
      // sendData(jsonData, url)
    }
  })
}

main()

// function sendData (jsonData, ulr) {
//   console.log('Sending data...')
//   let data = JSON.stringify(jsonData)

//   const options = {
//     hostname: 'api.codenation.dev',
//     port: 443,
//     path: '/v1/challenge/dev-ps/generate-data?token=56b38829c35932d8c39c8b212288a0a43752ccc9',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Content-Length': data.length
//     }
//   }
//   let req = https.request(options, res => {
//     res.on('data', (d) => {
//       process.stdout.write(d)
//     })
//   })

//   req.on('error', (error) => {
//     console.error(error)
//   })

//   req.write(data)
//   req.end(() => {
//     console.log('Done!')
//   })
// }

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
