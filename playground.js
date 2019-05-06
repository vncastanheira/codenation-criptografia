/* console.log('z: ', 'z'.charCodeAt(0))
console.log('a: ', 'a'.charCodeAt(0))
console.log('121: ', String.fromCharCode(121))
console.log('120: ', String.fromCharCode(120))
 */

const https = require('https')
const url = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=56b38829c35932d8c39c8b212288a0a43752ccc9'

https.get(url, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    data = JSON.parse(data)
    console.log(data)
  })
})
