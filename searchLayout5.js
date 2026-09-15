import fs from 'fs';
const data = fs.readFileSync('bundle.js', 'utf8');

const index = data.indexOf('min-h-screen flex bg-slate-50 font-sans text-slate-900');
console.log(data.substring(Math.max(0, index - 2000), index + 500));
