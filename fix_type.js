const fs = require('fs');
let content = fs.readFileSync('src/app/editor/page.tsx', 'utf8');

// The type issue is because NextAuth Session interface doesn't have accessToken and login by default. We can use "as any" safely here since we defined it in the callback.
content = content.replace('!session?.accessToken', '!(session as any)?.accessToken');
content = content.replace('!session?.user?.login', '!(session as any)?.user?.login');
content = content.replace('const token = session.accessToken as string;', 'const token = (session as any).accessToken as string;');
content = content.replace('const login = session.user.login as string;', 'const login = (session as any).user.login as string;');
content = content.replace(/\{session\?\.user\?\.login\}/g, '{(session as any)?.user?.login}');

fs.writeFileSync('src/app/editor/page.tsx', content);
