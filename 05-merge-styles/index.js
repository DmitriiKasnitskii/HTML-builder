const fs = require('fs');
const path = require('path');

function mergeStyles(from, to) {
  const stylesFolderPath = from ? from : path.join(__dirname, 'styles');
  fs.readdir(stylesFolderPath, (err, stylesFiles) => {
    if (err) {
      console.error(err);
      return;
    }

    const validExtensions = ['.css'];
    const styleFileNames = stylesFiles.filter(file => {
      const extension = path.extname(file);
      return validExtensions.includes(extension);
    });

    const readStyleFile = (fileName, callback) => {
      const filePath = path.join(stylesFolderPath, fileName);
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        callback(data);
      });
    };

    const stylesArray = [];
    let readFileCount = 0;

    styleFileNames.forEach(fileName => {
      readStyleFile(fileName, data => {
        stylesArray.push(data);
        readFileCount++;
        if (readFileCount === styleFileNames.length) {
          const bundleFilePath = to ? to : path.join(__dirname, 'project-dist', 'bundle.css');
          fs.writeFile(bundleFilePath, stylesArray.join('\n'), err => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Bundle created successfully.');
          });
        }
      });
    });
  });
}



mergeStyles();

module.exports.mergeStyles = mergeStyles;