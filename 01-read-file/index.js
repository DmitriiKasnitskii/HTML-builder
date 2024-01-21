const fs = require('node:fs');

const readableStream = fs.createReadStream('./01-read-file/text.txt', 'utf8');

readableStream.on('error', function (error) {
  console.log(`error: ${error.message}`);
})

readableStream.on('data', (chunk) => {
  console.log(chunk);
})