import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const regex = /UPCOMING PAYMENTS|Due within/ig;
let match;
while ((match = regex.exec(data))) {
  console.log('found:', data.substring(Math.max(0, match.index - 500), match.index + 2000));
}
