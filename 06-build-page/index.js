const fs = require('fs');
const path = require('path');
const mergeStyles = require('../05-merge-styles').mergeStyles;
const copyDirectory = require('../04-copy-directory').copyDirectory;

const templateFilePath = path.join(__dirname, 'template.html');
const componentsFolderPath = path.join(__dirname, 'components');
const stylesFolderPath = path.join(__dirname, 'styles');
const assetsFolderPath = path.join(__dirname, 'assets');
const projectDistFolderPath = path.join(__dirname, 'project-dist');
const projectAssetsFolderPath = path.join(projectDistFolderPath, 'assets');

async function createProjectDist() {
  fs.exists(projectDistFolderPath, (exists) => {
    if (!exists) {
      fs.mkdir(projectDistFolderPath, (err) => {
        if (err) throw err;
      });
    }
  })

  fs.readFile(templateFilePath, 'utf-8', async (err, data) => {
    if (err) throw err;

    const tagNames = data.match(/{{([^{}]+)}}/g).map(tag => tag.replace(/[{}]+/g, ''));
    const indexHtmlFilePath = path.join(projectDistFolderPath, 'index.html');
    let modifiedTemplateContent = data;

    for (const tagName of tagNames) {
      const componentFile = path.join(componentsFolderPath, `${tagName}.html`);
      fs.readFile(componentFile, 'utf-8', (err, data) => {
        if (err) throw err;

        modifiedTemplateContent = modifiedTemplateContent.replace(new RegExp(`{{${tagName}}}`, 'g'), data);
        fs.writeFile(indexHtmlFilePath, modifiedTemplateContent, 'utf-8', (err) => { console.log(err) });
      });
    }

  });

  const styleCssFilePath = path.join(projectDistFolderPath, 'style.css');
  mergeStyles(stylesFolderPath, styleCssFilePath);

  fs.exists(projectAssetsFolderPath, (exists) => {
    if (!exists) {
      fs.mkdir(projectAssetsFolderPath, (err) => {
        if (err) throw err;

        fs.mkdir(path.join(projectAssetsFolderPath, 'fonts'), (err) => {
          if (err) throw err;

          copyDirectory(path.join(assetsFolderPath, 'fonts'), path.join(projectAssetsFolderPath, 'fonts'));
        })
        fs.mkdir(path.join(projectAssetsFolderPath, 'img'), (err) => {
          if (err) throw err;

          copyDirectory(path.join(assetsFolderPath, 'img'), path.join(projectAssetsFolderPath, 'img'));
        })
        fs.mkdir(path.join(projectAssetsFolderPath, 'svg'), (err) => {
          if (err) throw err;

          copyDirectory(path.join(assetsFolderPath, 'svg'), path.join(projectAssetsFolderPath, 'svg'));
        })
      });
    }
  })
}

createProjectDist()
  .then(() => console.log('Project-dist folder created successfully.'))
  .catch(error => console.error(`Error: ${error.message}`));

