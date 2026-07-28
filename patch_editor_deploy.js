const fs = require('fs');
let content = fs.readFileSync('src/app/editor/page.tsx', 'utf8');

// Imports
content = content.replace(
  'import { useProfileStore, ProfileState, TemplateType, BadgeStyleType } from "@/store/profileStore";',
  'import { useSession, signIn, signOut } from "next-auth/react";\nimport { useProfileStore, ProfileState, TemplateType, BadgeStyleType } from "@/store/profileStore";'
);
content = content.replace(
  /import \{\n  Star,\n  X,/,
  'import {\n  Github,\n  Rocket,\n  Star,\n  X,'
);

// State
content = content.replace(
  'const [showStarModal, setShowStarModal] = useState(false);',
  `const [showStarModal, setShowStarModal] = useState(false);
  const { data: session, status } = useSession();
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployStatus, setDeployStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [deployError, setDeployError] = useState('');`
);

// Handlers
const deployHandlers = `
  const handleDeployClick = () => {
    if (status === "unauthenticated") {
      signIn("github");
    } else {
      setShowDeployModal(true);
    }
  };

  const executeDeploy = async () => {
    if (!session?.accessToken || !session?.user?.login) return;
    setDeployStatus('deploying');
    
    try {
      const token = session.accessToken as string;
      const login = session.user.login as string;
      const markdown = currentTemplate.render(profileState);
      
      const headers = {
        Authorization: \`Bearer \${token}\`,
        Accept: 'application/vnd.github.v3+json',
      };
      
      // 1. Check if repo exists
      let repoExists = false;
      try {
        const repoRes = await fetch(\`https://api.github.com/repos/\${login}/\${login}\`, { headers });
        if (repoRes.ok) repoExists = true;
      } catch (e) {}

      // 2. Create if not exists
      if (!repoExists) {
        const createRes = await fetch(\`https://api.github.com/user/repos\`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: login,
            description: 'My GitHub Profile created with ProfileForge',
            auto_init: true
          })
        });
        if (!createRes.ok) throw new Error("Failed to create repository");
        await new Promise(r => setTimeout(r, 2000));
      }

      // 3. Get SHA
      let sha = undefined;
      try {
        const fileRes = await fetch(\`https://api.github.com/repos/\${login}/\${login}/contents/README.md\`, { headers });
        if (fileRes.ok) {
          const fileData = await fileRes.json();
          sha = fileData.sha;
        }
      } catch (e) {}

      // 4. Encode content safely (Unicode safe base64)
      const encodedContent = Buffer.from(markdown).toString('base64');

      // 5. Update
      const updateRes = await fetch(\`https://api.github.com/repos/\${login}/\${login}/contents/README.md\`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: 'Update profile README via ProfileForge 🚀',
          content: encodedContent,
          sha
        })
      });

      if (!updateRes.ok) {
        const errData = await updateRes.json();
        throw new Error(errData.message || 'Failed to update README.md');
      }
      
      setDeployStatus('success');
      setTimeout(() => {
        setShowDeployModal(false);
        setTimeout(() => setShowStarModal(true), 500);
      }, 2000);
      
    } catch (err: any) {
      console.error(err);
      setDeployError(err.message || 'An unknown error occurred');
      setDeployStatus('error');
    }
  };
`;

content = content.replace(
  'const handleCopy = () => {',
  deployHandlers + '\n\n  const handleCopy = () => {'
);

// UI Button
const exportButtonRegex = /<button\s*onClick=\{handleDownload\}[\s\S]*?<\/button>/;
const exportButtonMatch = content.match(exportButtonRegex);
if (exportButtonMatch) {
    const deployButton = `
          {/* DEPLOY */}
          <button
            onClick={handleDeployClick}
            className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer text-white shadow-lg shadow-[#FF4D2D]/20"
            style={{ backgroundColor: '#FF4D2D' }}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Deploy to GitHub</span>
          </button>
          
          <button
            onClick={handleDownload}`;
    content = content.replace('<button\n            onClick={handleDownload}', deployButton);
}

// Deploy Modal
const deployModalCode = `
      {/* ── DEPLOY MODAL ── */}
      <AnimatePresence>
        {showDeployModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl p-6 relative overflow-hidden font-sans text-white"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF4D2D]/20 blur-[50px] rounded-full pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#21262d] flex items-center justify-center border border-[#30363d]">
                  <Github className="w-6 h-6 text-[#e6edf3]" />
                </div>
                <button onClick={() => setShowDeployModal(false)} className="text-[#8b949e] hover:text-white transition-colors cursor-pointer p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {deployStatus === 'idle' && (
                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-[#e6edf3] mb-2">Deploy to GitHub</h2>
                  <p className="text-sm text-[#8b949e] leading-relaxed mb-6">
                    This will create or update the <code className="text-[#FF4D2D] bg-[#FF4D2D]/10 px-1 py-0.5 rounded">README.md</code> in the repository <strong>{session?.user?.login}/{session?.user?.login}</strong>. This is your public GitHub profile page.
                  </p>
                  <button 
                    onClick={executeDeploy}
                    className="w-full flex justify-center items-center gap-2 bg-[#3fb950] hover:bg-[#2ea043] text-white font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    <Rocket className="w-4 h-4" /> Commit & Push Profile
                  </button>
                </div>
              )}

              {deployStatus === 'deploying' && (
                <div className="relative z-10 flex flex-col items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#3fb950] mb-4" />
                  <h2 className="text-lg font-bold text-[#e6edf3] mb-1">Deploying to GitHub...</h2>
                  <p className="text-sm text-[#8b949e]">Writing to {session?.user?.login}/{session?.user?.login}</p>
                </div>
              )}

              {deployStatus === 'success' && (
                <div className="relative z-10 flex flex-col items-center justify-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[#3fb950]/20 flex items-center justify-center mb-4 border border-[#3fb950]/50">
                    <Check className="w-6 h-6 text-[#3fb950]" />
                  </div>
                  <h2 className="text-lg font-bold text-[#e6edf3] mb-1">Successfully Deployed!</h2>
                  <a href={\`https://github.com/\${session?.user?.login}\`} target="_blank" rel="noreferrer" className="text-sm text-[#58a6ff] hover:underline">
                    View your profile ↗
                  </a>
                </div>
              )}

              {deployStatus === 'error' && (
                <div className="relative z-10 flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#f85149]/20 flex items-center justify-center mb-4 border border-[#f85149]/50">
                    <X className="w-6 h-6 text-[#f85149]" />
                  </div>
                  <h2 className="text-lg font-bold text-[#e6edf3] mb-1">Deployment Failed</h2>
                  <p className="text-sm text-[#8b949e] mb-6 px-4">{deployError}</p>
                  <button 
                    onClick={() => setDeployStatus('idle')}
                    className="px-6 py-2 bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] font-semibold rounded-xl transition-colors border border-[#30363d] cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
`;

const returnEnd = content.lastIndexOf('</div>\n  );');
content = content.slice(0, returnEnd) + deployModalCode + content.slice(returnEnd);

fs.writeFileSync('src/app/editor/page.tsx', content);
