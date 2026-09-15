import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const index = data.toLowerCase().indexOf('track all business sales');
if (index !== -1) {
  console.log(data.substring(Math.max(0, index - 2000), index + 5000));
}
