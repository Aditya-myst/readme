"use client";

import { useState, useEffect } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";
import { useProfileStore } from "@/store/profileStore";
import { templates } from "@/lib/templates";
import { Settings, Eye, Code2, FileJson, LayoutTemplate, Copy, Check } from "lucide-react";
import Editor from "@monaco-editor/react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Link from "next/link";

export default function EditorPage() {
  const profileState = useProfileStore();
  const [activeTab, setActiveTab] = useState<"content" | "templates">("content");
  const [copied, setCopied] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState("");

  const currentTemplate = templates[profileState.template];
  const markdownContent = currentTemplate.render(profileState);

  useEffect(() => {
    // Convert markdown to HTML for live preview
    const rawHtml = marked.parse(markdownContent);
    // Sanitize the HTML before rendering
    const cleanHtml = typeof window !== 'undefined' ? DOMPurify.sanitize(rawHtml as string) : rawHtml as string;
    setHtmlPreview(cleanHtml);
  }, [markdownContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col overflow-hidden selection:bg-[#FF4D2D] selection:text-white">
      {/* Editor Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#111] z-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-lg hover:text-[#FF4D2D] transition-colors">
            <LayoutTemplate className="w-5 h-5 text-[#FF4D2D]" /> ProfileForge
          </Link>
          <div className="h-4 w-px bg-white/20"></div>
          <span className="text-sm font-medium text-white/50">Editor</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleCopy}
            className="px-5 py-2 text-sm font-semibold bg-[#FF4D2D] text-white rounded-md hover:bg-[#e03d20] transition-colors flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy README"}
          </button>
        </div>
      </header>

      {/* 3-Panel Split */}
      <div className="flex-1 overflow-hidden">
        <Group orientation="horizontal">
          
          {/* Left Panel: Configuration */}
          <Panel defaultSize={25} minSize={20} maxSize={35} className="bg-[#0A0A0A] flex flex-col">
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setActiveTab("content")}
                className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 ${activeTab === "content" ? "text-[#FF4D2D] border-b-2 border-[#FF4D2D] bg-white/5" : "text-white/50 hover:text-white hover:bg-white/5"}`}
              >
                <Settings className="w-4 h-4" /> Content
              </button>
              <button 
                onClick={() => setActiveTab("templates")}
                className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 ${activeTab === "templates" ? "text-[#FF4D2D] border-b-2 border-[#FF4D2D] bg-white/5" : "text-white/50 hover:text-white hover:bg-white/5"}`}
              >
                <LayoutTemplate className="w-4 h-4" /> Templates
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {activeTab === "content" && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Personal Info</h3>
                    
                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">Full Name</label>
                      <input 
                        type="text" 
                        value={profileState.name}
                        onChange={(e) => profileState.updateField('name', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">Tagline</label>
                      <input 
                        type="text" 
                        value={profileState.tagline}
                        onChange={(e) => profileState.updateField('tagline', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">About Me</label>
                      <textarea 
                        rows={3}
                        value={profileState.about}
                        onChange={(e) => profileState.updateField('about', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">Skills (Comma Separated)</label>
                      <input 
                        type="text" 
                        value={profileState.skills}
                        onChange={(e) => profileState.updateField('skills', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Social Links</h3>
                    
                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">GitHub Username</label>
                      <input 
                        type="text" 
                        value={profileState.github}
                        onChange={(e) => profileState.updateField('github', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">Twitter Handle</label>
                      <input 
                        type="text" 
                        value={profileState.twitter}
                        onChange={(e) => profileState.updateField('twitter', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">LinkedIn Username</label>
                      <input 
                        type="text" 
                        value={profileState.linkedin}
                        onChange={(e) => profileState.updateField('linkedin', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">Website URL</label>
                      <input 
                        type="text" 
                        value={profileState.website}
                        onChange={(e) => profileState.updateField('website', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === "templates" && (
                <div className="space-y-3">
                  <div className="text-xs text-white/50 mb-4">Select a base layout. Your content will be injected automatically.</div>
                  
                  {Object.entries(templates).map(([key, tpl]) => (
                    <div 
                      key={key}
                      onClick={() => profileState.updateField('template', key as any)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${profileState.template === key ? 'bg-[#FF4D2D]/10 border-[#FF4D2D]' : 'bg-[#111] border-white/5 hover:border-white/20'}`}
                    >
                      <h4 className="font-bold text-sm text-white mb-1">{tpl.title}</h4>
                      <p className="text-xs text-white/50">Click to apply this theme</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Panel>

          <Separator className="w-1 bg-[#222] hover:bg-[#FF4D2D] transition-colors cursor-col-resize" />

          {/* Middle Panel: Live Preview */}
          <Panel defaultSize={45} minSize={30}>
            <div className="h-full flex flex-col bg-[#0A0A0A]">
              <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 text-xs font-bold uppercase tracking-wider text-white/50 bg-[#111]">
                <Eye className="w-4 h-4" /> Visual Preview
              </div>
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[#050505]">
                {/* Visual Preview Container */}
                <div 
                  className="max-w-3xl mx-auto bg-white text-black rounded-xl p-8 shadow-2xl markdown-body min-h-full"
                  dangerouslySetInnerHTML={{ __html: htmlPreview }}
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
                  }}
                />
              </div>
            </div>
          </Panel>

          <Separator className="w-1 bg-[#222] hover:bg-[#FF4D2D] transition-colors cursor-col-resize" />

          {/* Right Panel: Markdown Editor */}
          <Panel defaultSize={30} minSize={20} className="bg-[#0A0A0A] flex flex-col">
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 text-xs font-bold uppercase tracking-wider text-white/50 bg-[#111]">
              <Code2 className="w-4 h-4" /> Source Code
            </div>
            <div className="flex-1 relative bg-[#0A0A0A]">
              <Editor
                height="100%"
                defaultLanguage="markdown"
                theme="vs-dark"
                value={markdownContent}
                options={{
                  minimap: { enabled: false },
                  wordWrap: "on",
                  readOnly: true, // In V2 we can make this editable, but for now it's auto-generated from template
                  padding: { top: 16 },
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </Panel>
        </Group>
      </div>
      
      {/* Basic styles for the injected markdown preview */}
      <style dangerouslySetInnerHTML={{__html: `
        .markdown-body h1, .markdown-body h2, .markdown-body h3 {
          border-bottom: 1px solid #eaecef;
          padding-bottom: 0.3em;
          margin-bottom: 16px;
          margin-top: 24px;
        }
        .markdown-body p {
          margin-bottom: 16px;
        }
        .markdown-body img {
          max-width: 100%;
        }
        .markdown-body a {
          color: #0969da;
          text-decoration: none;
        }
        .markdown-body code {
          background-color: rgba(175,184,193,0.2);
          padding: 0.2em 0.4em;
          border-radius: 6px;
          font-family: monospace;
          font-size: 85%;
        }
      `}} />
    </div>
  );
}
