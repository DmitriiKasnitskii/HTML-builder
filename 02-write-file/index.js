const fs = require('fs');
const readline = require('readline');
const path = require('node:path');

const fileName = path.join(__dirname, '/output.txt')
const fileStream = fs.createWriteStream(fileName);
let isMessageDisplayed = false;

console.log('Welcome! Enter text or type "exit" to stop the process.');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Goodbye! Process stopped.');
    isMessageDisplayed = true;
    rl.close();
  } else {
    fileStream.write(input + "\n");
  }
});

rl.on('close', () => {
  if (!isMessageDisplayed) {
    console.log('Goodbye! Process stopped.');
  }
  fileStream.end();
});

