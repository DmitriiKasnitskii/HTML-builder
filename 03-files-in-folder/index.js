const fs = require('fs');
const path = require('path');
const secretFolderPath = path.join(__dirname, '/secret-folder');

fs.readdir(secretFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(secretFolderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error retrieving file stats:', err);
        return;
      }

      if (stats.isFile()) {
        const fileSize = stats.size / 1024;
        console.log(`${file} - ${path.extname(file).slice(1)} - ${fileSize.toFixed(3)}kb`);
      }
    });
  });
});
