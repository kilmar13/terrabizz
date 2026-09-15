import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const regex = /owner access/i;
const match = regex.exec(data);
if (match) {
  console.log('header details:', data.substring(Math.max(0, match.index - 2000), match.index + 1500));
}
