import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const regex = /NO MATCHING([^<]{0,200})/ig;
let match;
while ((match = regex.exec(data))) {
  console.log('found:', match[0]);
}
