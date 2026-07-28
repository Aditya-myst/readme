const fs = require('fs');

// Create the native SplitPane component first
const splitPaneCode = `"use client";
import React, { useState, useRef, useEffect } from 'react';

export default function SplitPane({ leftPane, rightPane }: { leftPane: React.ReactNode, rightPane: React.ReactNode }) {
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMobile) return;
    if ('touches' in e) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row h-full w-full overflow-hidden select-none">
      <div style={{ width: isMobile ? '100%' : \`\${leftWidth}%\` }} className="h-1/2 lg:h-full flex flex-col overflow-hidden w-full lg:w-auto">
        {leftPane}
      </div>
      
      <div 
        onMouseDown={startDragging}
        className={\`hidden lg:flex w-[1px] cursor-col-resize flex-col items-center justify-center relative z-50 transition-all \${isDragging ? 'bg-[#58a6ff] w-[4px]' : 'bg-[#30363d] hover:bg-[#58a6ff] hover:w-[4px]'}\`}
      >
        <div className="absolute inset-y-0 -left-2 -right-2 cursor-col-resize z-50" />
      </div>

      {/* Mobile divider */}
      <div className="lg:hidden w-full h-[2px] bg-[#30363d] shrink-0" />

      <div style={{ width: isMobile ? '100%' : \`\${100 - leftWidth}%\` }} className="h-1/2 lg:h-full flex flex-col overflow-hidden w-full lg:w-auto">
        {rightPane}
      </div>
    </div>
  );
}`;

fs.writeFileSync('src/components/SplitPane.tsx', splitPaneCode);

// Now safely update editor/page.tsx to use SplitPane
let content = fs.readFileSync('src/app/editor/page.tsx', 'utf8');

// The line is: style={{ borderRight: viewMode === "split" ? `1px solid ${GH.border}` : "none" }}
content = content.replace(
  /style=\{\{ borderRight: "none" \}\}/g,
  ''
);

content = content.replace(
  'import { useState, useEffect } from "react";\nimport { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";',
  'import { useState, useEffect } from "react";\nimport SplitPane from "@/components/SplitPane";'
);

const rightWorkspaceStart = content.indexOf('{/* ── RIGHT WORKSPACE ── */}');
const rightWorkspaceEnd = content.indexOf('{/* Markdown Preview Styles */}');

const rightWorkspace = `        {/* ── RIGHT WORKSPACE ── */}
        <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: GH.canvas }}>
          {viewMode === "split" ? (
            <SplitPane 
              leftPane={
                <div className="w-full h-full flex flex-col overflow-hidden">
                  <div className="h-10 px-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] shrink-0" style={{ background: GH.surface, borderBottom: \`1px solid \${GH.border}\`, color: GH.muted }}>
                    <div className="flex items-center gap-2" style={{ color: GH.text }}>
                      <Eye className="w-4 h-4" style={{ color: GH.green }} />
                      <span>GitHub Visual Preview</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span>THEME: {profileState.previewTheme.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 lg:p-6 overflow-y-auto custom-scrollbar" style={{ backgroundColor: GH.canvas }}>
                    <div
                      className={\`max-w-4xl mx-auto rounded-xl p-6 lg:p-10 shadow-2xl border transition-colors duration-200 \${
                        profileState.previewTheme === 'dark'
                          ? 'bg-[#0d1117] text-[#c9d1d9] border-[#30363d] markdown-body-dark'
                          : 'bg-white text-[#24292f] border-[#e1e4e8] markdown-body-light'
                      }\`}
                      dangerouslySetInnerHTML={{ __html: htmlPreview }}
                      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}
                    />
                  </div>
                </div>
              }
              rightPane={
                <div className="w-full h-full flex flex-col overflow-hidden" style={{ backgroundColor: GH.canvas }}>
                  <div className="h-10 px-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] shrink-0" style={{ background: GH.surface, borderBottom: \`1px solid \${GH.border}\`, color: GH.muted }}>
                    <div className="flex items-center gap-2" style={{ color: GH.text }}>
                      <Code2 className="w-4 h-4" style={{ color: GH.blue }} />
                      <span>Source Code (Editable)</span>
                    </div>
                    {profileState.customMarkdown !== null && (
                      <button
                        onClick={() => profileState.setCustomMarkdown(null)}
                        className="text-[10px] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        style={{ color: GH.blue }}
                      >
                        <RefreshCw className="w-3 h-3" /> RESET TEMPLATE
                      </button>
                    )}
                  </div>
                  <div className="flex-1 relative w-full overflow-hidden">
                    <Editor
                      height="100%"
                      defaultLanguage="markdown"
                      theme="vs-dark"
                      value={markdownContent}
                      onChange={(val) => profileState.setCustomMarkdown(val || "")}
                      options={{
                        minimap: { enabled: false },
                        wordWrap: "on",
                        readOnly: false,
                        padding: { top: 16 },
                        fontSize: 13,
                        fontFamily: "var(--font-mono)",
                        scrollBeyondLastLine: false,
                      }}
                    />
                  </div>
                </div>
              }
            />
          ) : viewMode === "preview" ? (
            <div className="w-full h-full flex flex-col overflow-hidden">
              <div className="h-10 px-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] shrink-0" style={{ background: GH.surface, borderBottom: \`1px solid \${GH.border}\`, color: GH.muted }}>
                <div className="flex items-center gap-2" style={{ color: GH.text }}>
                  <Eye className="w-4 h-4" style={{ color: GH.green }} />
                  <span>GitHub Visual Preview</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span>THEME: {profileState.previewTheme.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar" style={{ backgroundColor: GH.canvas }}>
                <div
                  className={\`max-w-4xl mx-auto rounded-2xl p-10 shadow-2xl border transition-colors duration-200 \${
                    profileState.previewTheme === 'dark'
                      ? 'bg-[#0d1117] text-[#c9d1d9] border-[#30363d] markdown-body-dark'
                      : 'bg-white text-[#24292f] border-[#e1e4e8] markdown-body-light'
                  }\`}
                  dangerouslySetInnerHTML={{ __html: htmlPreview }}
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col overflow-hidden" style={{ backgroundColor: GH.canvas }}>
              <div className="h-10 px-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] shrink-0" style={{ background: GH.surface, borderBottom: \`1px solid \${GH.border}\`, color: GH.muted }}>
                <div className="flex items-center gap-2" style={{ color: GH.text }}>
                  <Code2 className="w-4 h-4" style={{ color: GH.blue }} />
                  <span>Source Code (Editable)</span>
                </div>
                {profileState.customMarkdown !== null && (
                  <button
                    onClick={() => profileState.setCustomMarkdown(null)}
                    className="text-[10px] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    style={{ color: GH.blue }}
                  >
                    <RefreshCw className="w-3 h-3" /> RESET TEMPLATE
                  </button>
                )}
              </div>
              <div className="flex-1 relative w-full overflow-hidden">
                <Editor
                  height="100%"
                  defaultLanguage="markdown"
                  theme="vs-dark"
                  value={markdownContent}
                  onChange={(val) => profileState.setCustomMarkdown(val || "")}
                  options={{
                    minimap: { enabled: false },
                    wordWrap: "on",
                    readOnly: false,
                    padding: { top: 16 },
                    fontSize: 14,
                    fontFamily: "var(--font-mono)",
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>\n\n      `;

content = content.substring(0, rightWorkspaceStart) + rightWorkspace + content.substring(rightWorkspaceEnd);
fs.writeFileSync('src/app/editor/page.tsx', content);
