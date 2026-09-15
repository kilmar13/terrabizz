const fs = require('fs');
const path = require('path');

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.includes('Modal.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // ensure max-h-[85vh] instead of 100vh-2rem
  const regex = /max-h-\[calc\(100vh-2rem\)\] my-auto/g;
  if (regex.test(content)) {
    content = content.replace(regex, 'max-h-[85vh] my-auto');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
