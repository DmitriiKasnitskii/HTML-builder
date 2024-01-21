const fs = require('node:fs');
const path = require('node:path');

const readableStream = fs.createReadStream(path.join(__dirname, '/text.txt'), 'utf8');

readableStream.on('error', function (error) {
  console.log(`error: ${error.message}`);
})

readableStream.on('data', (chunk) => {
  console.log(chunk);
})