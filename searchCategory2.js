import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const regex = /Taxonomy & Groups/i;
const match = regex.exec(data);
if (match) {
  console.log('found:', data.substring(Math.max(0, match.index), match.index + 4000));
} else {
  console.log('not found');
}
