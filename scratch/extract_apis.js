const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const apiRoutes = [];
walkDir('src/app/api', (filePath) => {
  if (filePath.endsWith('route.js') || filePath.endsWith('route.ts')) {
    apiRoutes.push(filePath);
  }
});

const serverActions = [];
walkDir('src', (filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.ts') || filePath.endsWith('.jsx')) {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('"use server"') || content.includes("'use server'")) {
      serverActions.push(filePath);
    }
  }
});

console.log("API Routes:");
console.log(apiRoutes.join('\n'));
console.log("\nServer Actions Files:");
console.log(serverActions.join('\n'));
