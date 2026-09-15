import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const index = data.indexOf('BUSINESS CALCULATOR');
if (index === -1) {
  console.log('Not found');
} else {
  console.log(data.substring(Math.max(0, index - 1000), index + 2500));
}
