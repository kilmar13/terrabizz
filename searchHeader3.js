import fs from 'fs';
const data = fs.readFileSync('bundle.js', 'utf8');

const regex = /"header"/ig;
let match;
while ((match = regex.exec(data)) !== null) {
  const substr = data.substring(Math.max(0, match.index - 200), match.index + 1500);
  if (substr.includes('className') || substr.includes('justify-between')) {
    console.log(substr);
    console.log('---');
  }
}
