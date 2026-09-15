import fs from 'fs';
const data = fs.readFileSync('bundle.js', 'utf8');

const regex = /header/ig;
let match;
while ((match = regex.exec(data)) !== null) {
  const substr = data.substring(match.index, match.index + 20);
  if (substr.includes('header className')) {
    console.log(data.substring(Math.max(0, match.index - 500), match.index + 1500));
    break;
  }
}
