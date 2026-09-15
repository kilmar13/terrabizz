const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

function rebrand(file) {
  if (file.includes('node_modules') || file.includes('dist') || file.includes('.git') || file.includes('rebrand.cjs')) return;
  const ext = path.extname(file);
  if (!['.tsx', '.ts', '.html', '.json'].includes(ext)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let updated = content.replace(/Ugubiz/g, 'Terrabiz').replace(/ugubiz/g, 'terrabiz').replace(/UGUBIZ/g, 'TERRABIZ');
  
  if (content !== updated) {
    fs.writeFileSync(file, updated);
    console.log('Updated ' + file);
  }
}

walk('./', rebrand);
