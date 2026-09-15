import fs from 'fs';

const data = fs.readFileSync('bundle.js', 'utf8');
const regex = /className:"hidden lg:block w-64 flex-shrink-0",children:d\.jsx\("div",{className:"sticky top-0 h-screen",children:([a-zA-Z0-9_]+)}/g;

let match = regex.exec(data);
if (match) {
  const sidebarCompVar = match[1];
  const compIndex = data.indexOf(`const ${sidebarCompVar}=`);
  if (compIndex !== -1) {
    console.log('Sidebar component found:', data.substring(compIndex, compIndex + 2000));
  } else {
    const backupPos = data.lastIndexOf(`const ${sidebarCompVar}=`, match.index);
    if (backupPos !== -1) {
      console.log('Sidebar component found (backup):', data.substring(backupPos, backupPos + 2000));
    }
  }
}
