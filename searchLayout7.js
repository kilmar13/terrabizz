import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');

const ownerAccess = data.indexOf('Owner Access');
if (ownerAccess !== -1) {
  console.log('ownerAccess found:', data.substring(Math.max(0, ownerAccess - 400), ownerAccess + 400));
}
