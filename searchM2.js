import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');

const regex = /className:"min-h-screen flex bg-slate-50/g;
const match = regex.exec(data);
if (match) {
  const code = data.substring(Math.max(0, match.index - 5000), match.index + 500);
  if (code.includes('M2')) {
    console.log('M2 used near layout!');
  }
}
