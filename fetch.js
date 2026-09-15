import fs from 'fs';
import https from 'https';

https.get('https://ugubiz.com/assets/index-MguF50se.js', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('bundle.js', data);
    console.log('done');
  });
});
