import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const regex = /Invite New Staff/i;
const match = regex.exec(data);
if (match) {
  console.log(data.substring(Math.max(0, match.index - 5000), match.index + 5000));
}
