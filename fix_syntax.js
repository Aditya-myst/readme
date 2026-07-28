const fs = require('fs');
let content = fs.readFileSync('src/app/editor/page.tsx', 'utf8');

const startOfDup = content.lastIndexOf('function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {');

if (startOfDup !== -1 && startOfDup > 5000) {
    content = content.substring(0, startOfDup);
}

fs.writeFileSync('src/app/editor/page.tsx', content);
