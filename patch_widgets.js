const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/lib/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'helpers.ts' && f !== 'index.ts');

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if renderWidgets is actually used in the template string
  if (!content.includes('${renderWidgets(data)}')) {
    // If not, we want to add it at the very bottom, right before the closing backtick
    // The render function ends with `.trim()` or just `\``
    
    // We will find the last backtick of the template literal and insert it.
    // Easiest way: replace `.trim()` with `\n${renderWidgets(data)}\`.trim()`
    if (content.includes('`.trim()')) {
       content = content.replace('`.trim()', `\n\${renderWidgets(data)}\n\`.trim()`);
       fs.writeFileSync(filePath, content);
       console.log(`Added renderWidgets to ${f}`);
    } else {
       console.log(`Could not auto-add to ${f}, please check manually.`);
    }
  } else {
    console.log(`Already has renderWidgets: ${f}`);
  }
});
