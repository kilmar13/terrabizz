import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');

const index = data.indexOf('"Logo area"'); // I didn't see logo area in JS bundle, what about 'Ugubiz'
const ugubizIndex = data.indexOf('>Ugubiz<');
if (ugubizIndex !== -1) {
  console.log('ugubiz found:', data.substring(Math.max(0, ugubizIndex - 300), ugubizIndex + 300));
}

const inventoryStock = data.indexOf('INVENTORY & STOCK');
if (inventoryStock !== -1) {
  console.log('inventoryStock found:', data.substring(Math.max(0, inventoryStock - 300), inventoryStock + 300));
}
