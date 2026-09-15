const fs = require('fs');
const path = require('path');

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.includes('Modal.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // There are some variations of the close button.
  // Instead of matching exact strings, I will try to use regex.
  // Match a button with onClose containing an X icon.
  const regex = /<button[^>]*onClick=\{onClose\}[^>]*>[\s\S]*?<X\s+size=\{[0-9]+\}\s*(?:strokeWidth=\{[^\}]+\})?\s*\/>[\s\S]*?<\/button>/g;

  if (regex.test(content)) {
    content = content.replace(regex, `<button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

