const fs = require('fs');
let content = fs.readFileSync('src/app/editor/page.tsx', 'utf8');
console.log(content.substring(0, 1000));
