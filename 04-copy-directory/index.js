const fs = require('fs');
const path = require('path');

const copyFolder = path.join(__dirname, 'files-copy');
if (!fs.existsSync(copyFolder)) {
  fs.mkdirSync(copyFolder);
}

const filesFolder = path.join(__dirname, 'files');
fs.readdir(filesFolder, (err, files) => {
  if (err) {
    console.error('Error reading files folder:', err);
    return;
  }

  files.forEach((file) => {
    const sourcePath = path.join(filesFolder, file);
    const destinationPath = path.join(copyFolder, file);

    const readStream = fs.createReadStream(sourcePath);

    const writeStream = fs.createWriteStream(destinationPath);

    readStream.pipe(writeStream);
  });

  console.log('Files copied successfully!');
});