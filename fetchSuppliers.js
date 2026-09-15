import fs from 'fs';
import https from 'https';

https.get('https://ugubiz.com/suppliers', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('suppliers.html', data);
    console.log('done');
  });
});
