const fs = require('fs');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const stylesFiles = fs.readdirSync(stylesFolderPath);

const validExtensions = ['.css'];
const styleFileNames = stylesFiles.filter(file => {
  const extension = path.extname(file);
  const isFile = fs.statSync(path.join(stylesFolderPath, file)).isFile();
  return isFile && validExtensions.includes(extension);
});

const readStyleFile = (fileName) => {
  const filePath = path.join(stylesFolderPath, fileName);
  return fs.readFileSync(filePath, 'utf-8');
};

const stylesArray = styleFileNames.map(fileName => readStyleFile(fileName));

const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
fs.writeFileSync(bundleFilePath, stylesArray.join('\n'));

console.log('Bundle created successfully.');

