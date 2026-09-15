import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const index = data.indexOf('<header');
const navIndex = data.indexOf('<nav');
const asideIndex = data.indexOf('<aside');

console.log('header found:', index !== -1 ? data.substring(Math.max(0, index - 500), index + 500) : 'no header');
console.log('nav found:', navIndex !== -1 ? data.substring(Math.max(0, navIndex - 200), navIndex + 200) : 'no nav');
console.log('aside found:', asideIndex !== -1 ? data.substring(Math.max(0, asideIndex - 200), asideIndex + 200) : 'no aside');
