import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');

const regex = /inventory & stock/i;
const match = regex.exec(data);
if (match) {
  console.log('found:', data.substring(Math.max(0, match.index - 500), match.index + 500));
} else {
  console.log('not found');
}
