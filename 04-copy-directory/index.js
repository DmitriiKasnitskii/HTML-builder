const fs = require('fs');
const path = require('path');

async function copyDirectory(from, to) {
  const copyFolder = to ? to : path.join(__dirname, 'files-copy');
  const filesFolder = from ? from : path.join(__dirname, 'files');

  await fs.mkdir(copyFolder, { recursive: false }, () => {
  });

  await fs.readdir(copyFolder, (err, files) => {
    for (const file of files) {
      fs.unlink(path.join(copyFolder, file), (err) => {
        if (err) throw err;
      });
    }
  });

  await fs.readdir(filesFolder, (err, files) => {
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
}

copyDirectory();

module.exports.copyDirectory = copyDirectory;