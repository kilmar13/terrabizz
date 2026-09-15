import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const index = data.indexOf('"header"');
const asideIndex = data.indexOf('"aside"');
const navIndex = data.indexOf('"nav"');

console.log('header found:', index !== -1 ? data.substring(Math.max(0, index - 300), index + 300) : 'no header');
console.log('aside found:', asideIndex !== -1 ? data.substring(Math.max(0, asideIndex - 300), asideIndex + 300) : 'no aside');
