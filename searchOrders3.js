import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const regex = /BILLING HISTORY/i;
const match = regex.exec(data);
if (match) {
  console.log('found:', data.substring(Math.max(0, match.index - 3000), match.index + 5000));
} else {
  console.log('not found');
}
