import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const index = data.indexOf('inventory-search-input');
if (index !== -1) {
  console.log(data.substring(Math.max(0, index - 500), index + 5000));
}
