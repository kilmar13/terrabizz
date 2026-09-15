import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const index = data.toLowerCase().indexOf('active operators');
if (index !== -1) {
  console.log(data.substring(Math.max(0, index - 5000), index + 5000));
}
