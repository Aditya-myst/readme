const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/lib/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'helpers.ts' && f !== 'index.ts');

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  // If it already uses showTypingHeader, skip it
  if (content.includes('data.showTypingHeader')) {
    return;
  }

  // We want to add the typing header at the very top of the render output if the user toggled it.
  // The render function usually returns a backtick template literal.
  // Let's find the `render: (data: ProfileState) => \`` and insert the typing header logic.
  // Sometimes it's `render: (data: ProfileState) => { ... return \``

  // Regex to find the start of the returned template literal
  const regex = /(render:\s*\([^)]*\)\s*(?:=>\s*\{[^]*?return\s*)?=>?\s*`)([\s\S]*?)`/m;
  
  const match = content.match(regex);
  if (match) {
    const replacement = `\${data.showTypingHeader ? \`\\n<div align="center">\\n  <img src="https://readme-typing-svg.demolab.com/?lines=\${encodeURIComponent(\`Hi, I'm \${data.name} 👋\`)};\${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\\n</div>\\n\` : ''}`;
    
    // Instead of replacing the first line entirely, we just inject our replacement right after the opening backtick
    content = content.replace(/(render:\s*\([^)]*\)\s*(?:=>\s*(?:\{[^}]*?return\s*)?)?`)/, `$1\n${replacement}`);
    fs.writeFileSync(filePath, content);
    console.log(`Patched ${f}`);
  } else {
    console.log(`Failed to patch ${f} (could not find template start)`);
  }
});
