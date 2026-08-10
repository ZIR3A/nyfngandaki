const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const apiRoutes = [];
walkDir('src/app/api', (filePath) => {
  if (filePath.endsWith('route.js') || filePath.endsWith('route.ts')) {
    const route = filePath.replace(/\\/g, '/').replace('src/app/api', '/api').replace('/route.js', '');
    apiRoutes.push(route);
  }
});

const serverActions = [];
walkDir('src', (filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.ts') || filePath.endsWith('.jsx')) {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('"use server"') || content.includes("'use server'")) {
      const functionNames = [...content.matchAll(/export\s+async\s+function\s+([a-zA-Z0-9_]+)/g)].map(m => m[1]);
      if (functionNames.length > 0) {
        serverActions.push({ file: filePath.replace(/\\/g, '/'), functions: functionNames });
      }
    }
  }
});

let markdown = `# API Inventory\n\n`;

markdown += `## Server Actions\n\n`;
markdown += `| File | Action | Auth Middleware | Role Required |\n`;
markdown += `|---|---|---|---|\n`;
for (const sa of serverActions) {
  for (const fn of sa.functions) {
    markdown += `| \`${sa.file}\` | \`${fn}\` | UNKNOWN | UNKNOWN |\n`;
  }
}

markdown += `\n## API Routes\n\n`;
markdown += `| Route | Methods | Auth Middleware | Role Required |\n`;
markdown += `|---|---|---|---|\n`;
for (const route of apiRoutes) {
    markdown += `| \`${route}\` | UNKNOWN | UNKNOWN | UNKNOWN |\n`;
}

fs.writeFileSync('scratch/inventory.md', markdown);
console.log('Inventory saved to scratch/inventory.md');
