"use client";

import { useState } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";
import { useProfileStore } from "@/store/profileStore";
import { Settings, Eye, Code2, GripVertical, FileJson } from "lucide-react";
import Editor from "@monaco-editor/react";

export default function EditorPage() {
  const { username, widgets, setUsername } = useProfileStore();
  const [activeTab, setActiveTab] = useState<"widgets" | "profile">("profile");

  // A basic markdown generator based on state
  const generateMarkdown = () => {
    let md = `# Hi there, I'm ${username} 👋\n\n`;
    
    widgets.forEach(w => {
      if (w.type === 'github-stats') {
        md += `[![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${w.username}&theme=${w.theme}&show_icons=true)]()\n\n`;
      } else if (w.type === 'top-languages') {
        md += `[![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${w.username}&theme=${w.theme}&layout=compact)]()\n\n`;
      }
    });

    return md;
  };

  const markdownContent = generateMarkdown();

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* Editor Header */}
      <header className="h-14 border-b border-border/50 flex items-center justify-between px-4 bg-card/30 backdrop-blur-md z-10">
        <div className="flex items-center gap-2 font-bold tracking-tight">
          <FileJson className="w-5 h-5 text-primary" /> ProfileForge
        </div>
        <div className="flex gap-2">
          {/* Actions */}
          <button className="px-4 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Export README
          </button>
        </div>
      </header>

      {/* 3-Panel Split */}
      <div className="flex-1 overflow-hidden">
        <Group orientation="horizontal">
          
          {/* Left Panel: Configuration */}
          <Panel defaultSize={20} minSize={15} maxSize={30} className="bg-card/20 border-r border-border/50 flex flex-col">
            <div className="h-10 border-b border-border/50 flex items-center px-4 gap-2 text-sm font-medium text-muted-foreground bg-muted/20">
              <Settings className="w-4 h-4" /> Configuration
            </div>
            
            {/* Sidebar Tabs */}
            <div className="flex border-b border-border/50">
              <button 
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-2 text-xs font-semibold ${activeTab === "profile" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                Profile
              </button>
              <button 
                onClick={() => setActiveTab("widgets")}
                className={`flex-1 py-2 text-xs font-semibold ${activeTab === "widgets" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                Widgets
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">GitHub Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              )}
              {activeTab === "widgets" && (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground mb-2">Drag to reorder widgets</div>
                  {widgets.map((w, idx) => (
                    <div key={w.id} className="p-3 bg-background border border-border/50 rounded-md flex items-center gap-2 cursor-pointer hover:border-primary/50 transition-colors">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm font-medium">{w.type.replace('-', ' ')}</div>
                    </div>
                  ))}
                  <button className="w-full py-2 border border-dashed border-border/80 rounded-md text-xs font-medium hover:border-primary hover:text-primary transition-colors mt-4">
                    + Add Widget
                  </button>
                </div>
              )}
            </div>
          </Panel>

          <Separator className="w-1 bg-border/30 hover:bg-primary transition-colors cursor-col-resize" />

          {/* Middle Panel: Live Preview */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col bg-background/50">
              <div className="h-10 border-b border-border/50 flex items-center px-4 gap-2 text-sm font-medium text-muted-foreground bg-muted/20">
                <Eye className="w-4 h-4" /> Live Preview
              </div>
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <div className="max-w-3xl mx-auto bg-card border border-border/50 rounded-xl p-8 shadow-xl">
                  <h1 className="text-3xl font-bold mb-6">Hi there, I'm {username} 👋</h1>
                  
                  <div className="space-y-4 flex flex-col items-start">
                    {widgets.map(w => {
                      if (w.type === 'github-stats') {
                        return (
                          <img 
                            key={w.id} 
                            src={`https://github-readme-stats.vercel.app/api?username=${w.username || username}&theme=${w.theme}&show_icons=true`} 
                            alt="GitHub Stats" 
                            className="rounded-md"
                          />
                        );
                      }
                      if (w.type === 'top-languages') {
                        return (
                          <img 
                            key={w.id} 
                            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${w.username || username}&theme=${w.theme}&layout=compact`} 
                            alt="Top Languages"
                            className="rounded-md" 
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <Separator className="w-1 bg-border/30 hover:bg-primary transition-colors cursor-col-resize" />

          {/* Right Panel: Markdown Editor */}
          <Panel defaultSize={30} minSize={15} maxSize={40} className="bg-card/20 border-l border-border/50 flex flex-col">
            <div className="h-10 border-b border-border/50 flex items-center px-4 gap-2 text-sm font-medium text-muted-foreground bg-muted/20">
              <Code2 className="w-4 h-4" /> Markdown Source
            </div>
            <div className="flex-1 relative">
              <Editor
                height="100%"
                defaultLanguage="markdown"
                theme="vs-dark"
                value={markdownContent}
                options={{
                  minimap: { enabled: false },
                  wordWrap: "on",
                  readOnly: true,
                  padding: { top: 16 },
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                }}
              />
            </div>
          </Panel>
        </Group>
      </div>
    </div>
  );
}
