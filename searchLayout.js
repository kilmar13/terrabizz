import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const index = data.indexOf('Dashboard"');
if (index !== -1) {
  console.log('Dashboard layout 1 found:', data.substring(Math.max(0, index - 500), index + 500));
}
const posIndex = data.indexOf('POS Terminal"');
if (posIndex !== -1) {
  console.log('POS Terminal layout found:', data.substring(Math.max(0, posIndex - 500), posIndex + 500));
}
