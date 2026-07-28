const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/lib/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'helpers.ts' && f !== 'index.ts');

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  // If it already uses typing-svg.demolab.com or herokuapp
  if (content.includes('readme-typing-svg')) {
    // If it DOESN'T have showTypingHeader logic, wrap it.
    if (!content.includes('data.showTypingHeader')) {
      // Find the img tag with typing-svg
      content = content.replace(/(<img[^>]*readme-typing-svg[^>]*>)/g, `\${data.showTypingHeader ? \`$1\` : \`<h1>\${data.name}</h1>\`}`);
      fs.writeFileSync(filePath, content);
      console.log(`Wrapped existing typing svg in ${f}`);
    } else {
      console.log(`Skipped ${f} (already has showTypingHeader)`);
    }
  } else {
    // Inject at the top
    const replacement = `\${data.showTypingHeader ? \`\\n<div align="center">\\n  <img src="https://readme-typing-svg.demolab.com/?lines=\${encodeURIComponent(\`Hi, I'm \${data.name} 👋\`)};\${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\\n</div>\\n\` : ''}`;
    
    if (content.includes('render: (data: ProfileState) => `')) {
       content = content.replace(/(render:\s*\([^)]*\)\s*=>\s*`)/, `$1\n${replacement}`);
       fs.writeFileSync(filePath, content);
       console.log(`Injected into ${f}`);
    } else if (content.includes('render: (data: ProfileState) => {') && content.includes('return `')) {
       content = content.replace(/(return\s*`)/, `$1\n${replacement}`);
       fs.writeFileSync(filePath, content);
       console.log(`Injected into ${f} (block render)`);
    } else {
       console.log(`Failed to patch ${f}`);
    }
  }
});
