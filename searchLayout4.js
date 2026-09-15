import fs from 'fs';
const data = fs.readFileSync('bundle.js', 'utf8');

const regex = /className:"sticky top-0 h-screen",children:([^}]+)}/g;
let match;
while ((match = regex.exec(data)) !== null) {
  console.log('Sidebar children var:', match[1]);
}
