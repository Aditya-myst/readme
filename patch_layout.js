const fs = require('fs');
let content = fs.readFileSync('src/app/layout.tsx', 'utf8');

content = content.replace(
  'import "./globals.css";',
  'import "./globals.css";\nimport { AuthProvider } from "@/components/AuthProvider";'
);

content = content.replace(
  '<body className="min-h-full flex flex-col font-sans bg-[#0a0a0c] text-white tracking-tight">{children}</body>',
  '<body className="min-h-full flex flex-col font-sans bg-[#0a0a0c] text-white tracking-tight">\n        <AuthProvider>\n          {children}\n        </AuthProvider>\n      </body>'
);

fs.writeFileSync('src/app/layout.tsx', content);
