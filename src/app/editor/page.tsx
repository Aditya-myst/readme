"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitPane from "@/components/SplitPane";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useProfileStore, ProfileState, TemplateType, BadgeStyleType } from "@/store/profileStore";
import { templates } from "@/lib/templates/index";
import { TROPHY_OPTIONS } from "@/lib/templates/helpers";
import { SKILL_BADGES, SKILL_CATEGORIES } from "@/lib/skills";
import { Star, X,  
  User, 
  Layers, 
  Share2, 
  BarChart2, 
  LayoutTemplate, 
  Eye, 
  Code2, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  Sun, 
  Moon, 
  Sparkles,
  Columns,
  Loader2,
  RefreshCw,
  Edit3,
  PanelLeftClose,
  PanelLeftOpen,
  SlidersHorizontal,
  Terminal,
  ArrowRight,
  Search
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

/* ── GitHub Dark Palette ── */
const GH = {
  canvas:    "#0d1117",
  surface:   "#161b22",
  overlay:   "#21262d",
  border:    "#30363d",
  text:      "#e6edf3",
  muted:     "#8b949e",
  subtle:    "#6e7681",
  blue:      "#58a6ff",
  green:     "#3fb950",
  red:       "#f85149",
  orange:    "#d29922",
  purple:    "#bc8cff",
};

export default function EditorPage() {
  const profileState = useProfileStore();
  const [activeTab, setActiveTab] = useState<"bio" | "skills" | "social" | "widgets" | "templates">("bio");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"split" | "preview" | "code">("split");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && viewMode === "split") {
        setViewMode("preview");
        setSidebarOpen(false); // Auto close sidebar on mobile
      }
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewMode]);
  const [copied, setCopied] = useState(false);
  const [showStarModal, setShowStarModal] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState("");
  const [githubInput, setGithubInput] = useState(profileState.github || "");
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [skillSearch, setSkillSearch] = useState("");

  const currentTemplate = templates[profileState.template] || templates.pro;

  const markdownContent = profileState.customMarkdown !== null
    ? profileState.customMarkdown
    : currentTemplate.render(profileState);

  useEffect(() => {
    const rawHtml = marked.parse(markdownContent);
    const cleanHtml = typeof window !== 'undefined' ? DOMPurify.sanitize(rawHtml as string, { ADD_ATTR: ['align', 'target', 'width', 'height', 'valign', 'bgcolor'] }) : (rawHtml as string);
    setHtmlPreview(cleanHtml);
  }, [markdownContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowStarModal(true), 800);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGithubImport = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!githubInput.trim()) return;

    setImportStatus("fetching");
    const success = await profileState.importFromGithub(githubInput);
    if (success) {
      setImportStatus("success");
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus("error");
      setTimeout(() => setImportStatus(null), 3000);
    }
  };

  const TABS = [
    { id: "bio", label: "BIO", icon: User },
    { id: "skills", label: "STACK", icon: Layers },
    { id: "social", label: "SOCIAL", icon: Share2 },
    { id: "widgets", label: "WIDGETS", icon: BarChart2 },
    { id: "templates", label: "LAYOUT", icon: LayoutTemplate },
  ] as const;

  return (
    <div
      className="h-screen w-full flex flex-col overflow-hidden font-sans antialiased selection:bg-[#58a6ff]/30 selection:text-white"
      style={{ background: GH.canvas, color: GH.text }}
    >
      {/* ── TOP HEADER BAR ── */}
      <header
        className="h-14 flex items-center justify-between px-5 z-20 shrink-0 select-none overflow-x-auto"
        style={{ background: GH.surface, borderBottom: `1px solid ${GH.border}` }}
      >
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Collapse Panel" : "Expand Panel"}
            className="p-1.5 rounded-lg transition-colors cursor-pointer"
            style={{ color: sidebarOpen ? GH.blue : GH.muted }}
          >
            {sidebarOpen ? <PanelLeftClose className="w-[18px] h-[18px] mb-1" /> : <PanelLeftOpen className="w-[18px] h-[18px] mb-1" />}
          </button>

          {/* Logo */}
          <Link href="/" title="Go to Home" className="flex items-center gap-2 shrink-0 group">
            <span className="text-[#58a6ff] text-2xl leading-none group-hover:rotate-180 transition-transform duration-500 inline-block">
                ✴
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => profileState.updateField('previewTheme', profileState.previewTheme === 'dark' ? 'light' : 'dark')}
            title="Toggle GitHub Preview Theme"
            className="p-2 rounded-xl cursor-pointer transition-colors"
            style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
          >
            {profileState.previewTheme === 'dark' ? <Moon className="w-4 h-4" style={{ color: GH.purple }} /> : <Sun className="w-4 h-4" style={{ color: GH.orange }} />}
          </button>
          
          <button
            onClick={() => profileState.resetDefaults()}
            title="Reset Form Data"
            className="p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
            style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.muted }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
          >
            <Download className="w-3.5 h-3.5" style={{ color: GH.green }} />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer text-white"
            style={{ backgroundColor: GH.green }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "COPIED!" : "COPY"}</span>
          </button>
        </div>
      </header>

      {/* ── SUB-TOOLBAR ── */}
      <div
        className="h-14 sm:h-12 px-2 sm:px-5 flex items-center justify-between z-10 shrink-0 select-none overflow-x-auto gap-2"
        style={{ background: GH.surface, borderBottom: `1px solid ${GH.border}` }}
      >
        {/* Template Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-[0.15em] uppercase hidden sm:inline" style={{ color: GH.muted }}>TEMPLATE:</span>
          <select
            value={profileState.template}
            onChange={(e) => profileState.setTemplate(e.target.value as TemplateType)}
            className="rounded-xl px-3 py-1 text-xs font-bold focus:outline-none cursor-pointer shadow-sm"
            style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
          >
            {Object.entries(templates).map(([key, tpl]) => (
              <option key={key} value={key}>
                {tpl.title} ({tpl.category})
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl" style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}` }}>
          {[
            { id: "split", label: "SPLIT VIEW", icon: Columns },
            { id: "preview", label: "PREVIEW ONLY", icon: Eye },
            { id: "code", label: "CODE ONLY", icon: Code2 },
          ].map((mode) => {
            const Icon = mode.icon;
            const active = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className="px-3.5 py-1 rounded-lg text-[11px] font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                style={
                  active
                    ? { backgroundColor: GH.blue, color: "#ffffff" }
                    : { color: GH.muted }
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN WORKSPACE ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── IDE ICON RAIL (56px) ── */}
        <div
          className="w-14 shrink-0 flex flex-col items-center py-4 justify-between z-10"
          style={{ background: GH.canvas, borderRight: `1px solid ${GH.border}` }}
        >
          <div className="flex flex-col gap-3 w-full px-2">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id && sidebarOpen;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id);
                    if (!sidebarOpen) setSidebarOpen(true);
                  }}
                  title={t.label}
                  className="w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative group font-sans hover:bg-[#21262d]"
                  style={
                    isActive
                      ? { background: `${GH.blue}15`, color: GH.blue, borderColor: `${GH.blue}44` }
                      : { color: GH.muted }
                  }
                >
                  <Icon className="w-[18px] h-[18px] mb-1" />
                  <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-center truncate w-full px-1">{t.label}</span>
                  {isActive && (
                    <div
                      className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                      style={{ background: GH.blue }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Collapse Drawer" : "Expand Drawer"}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
            style={{ color: GH.muted }}
          >
            {sidebarOpen ? <PanelLeftClose className="w-[18px] h-[18px] mb-1" /> : <PanelLeftOpen className="w-[18px] h-[18px] mb-1" />}
          </button>
        </div>

        {/* ── FORM DRAWER (380px) ── */}
        <div
          className={`shrink-0 flex flex-col h-full z-10 transition-all duration-300 ease-in-out overflow-hidden ${
            sidebarOpen ? "w-[360px] sm:w-[380px] opacity-100" : "w-0 opacity-0"
          }`}
          style={{ background: GH.surface, borderRight: sidebarOpen ? `1px solid ${GH.border}` : "none" }}
        >
          {/* Drawer Header */}
          <div className="h-12 px-5 flex items-center justify-between shrink-0 font-bold text-xs uppercase tracking-[0.15em]" style={{ borderBottom: `1px solid ${GH.border}`, color: GH.muted }}>
            <div className="flex items-center gap-2" style={{ color: GH.text }}>
              <SlidersHorizontal className="w-4 h-4" style={{ color: GH.blue }} />
              <span>{TABS.find(t => t.id === activeTab)?.label}</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded transition-colors cursor-pointer"
              style={{ color: GH.muted }}
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-5 flex-1 overflow-y-auto space-y-6 custom-scrollbar">

            {/* TAB 1: BIO */}
            {activeTab === "bio" && (
              <div className="space-y-4 font-sans">
                {/* Auto Import */}
                <div className="p-4 rounded-2xl space-y-3" style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider" style={{ color: GH.text }}>
                      <Sparkles className="w-4 h-4" style={{ color: GH.blue }} />
                      <span>Auto-Import GitHub</span>
                    </div>
                    {importStatus === "success" && (
                      <span className="text-[10px] font-bold flex items-center gap-1" style={{ color: GH.green }}>
                        <Check className="w-3 h-3" /> Imported!
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed font-normal" style={{ color: GH.muted }}>
                    Fetch real profile data, repos, and language badges from your GitHub username:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={githubInput}
                      onChange={(e) => setGithubInput(e.target.value)}
                      placeholder="username (e.g. torvalds)"
                      className="flex-1 rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                      style={{ backgroundColor: GH.canvas, border: `1px solid ${GH.border}`, color: GH.text }}
                    />
                    <button
                      type="button"
                      onClick={() => handleGithubImport()}
                      disabled={profileState.isGithubLoading}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 text-white"
                      style={{ backgroundColor: GH.blue }}
                    >
                      {profileState.isGithubLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Fetch"}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: GH.muted }}>Personal Details</h3>

                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: GH.muted }}>Full Name</label>
                    <input
                      type="text"
                      value={profileState.name}
                      onChange={(e) => profileState.updateField('name', e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full rounded-xl px-3 py-2 text-sm font-sans focus:outline-none"
                      style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: GH.muted }}>Tagline / Title</label>
                    <input
                      type="text"
                      value={profileState.tagline}
                      onChange={(e) => profileState.updateField('tagline', e.target.value)}
                      placeholder="Full Stack Engineer 🚀"
                      className="w-full rounded-xl px-3 py-2 text-sm font-sans focus:outline-none"
                      style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: GH.muted }}>Location</label>
                    <input
                      type="text"
                      value={profileState.location}
                      onChange={(e) => profileState.updateField('location', e.target.value)}
                      placeholder="San Francisco, CA"
                      className="w-full rounded-xl px-3 py-2 text-sm font-sans focus:outline-none"
                      style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: GH.muted }}>About Me / Bio</label>
                    <textarea
                      rows={3}
                      value={profileState.about}
                      onChange={(e) => profileState.updateField('about', e.target.value)}
                      placeholder="Write a brief overview..."
                      className="w-full rounded-xl px-3 py-2 text-sm font-sans focus:outline-none resize-none"
                      style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: GH.muted }}>Current Focus</h3>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-medium mb-1 block" style={{ color: GH.muted }}>Project Name</label>
                      <input
                        type="text"
                        value={profileState.workingOnName}
                        onChange={(e) => profileState.updateField('workingOnName', e.target.value)}
                        placeholder="My App"
                        className="w-full rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                        style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium mb-1 block" style={{ color: GH.muted }}>Project URL</label>
                      <input
                        type="text"
                        value={profileState.workingOnUrl}
                        onChange={(e) => profileState.updateField('workingOnUrl', e.target.value)}
                        placeholder="https://..."
                        className="w-full rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                        style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium mb-1 block" style={{ color: GH.muted }}>Currently Learning</label>
                    <input
                      type="text"
                      value={profileState.learning}
                      onChange={(e) => profileState.updateField('learning', e.target.value)}
                      placeholder="Rust & WebAssembly"
                      className="w-full rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                      style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium mb-1 block" style={{ color: GH.muted }}>Open To Collaborate On</label>
                    <input
                      type="text"
                      value={profileState.collaborateOn}
                      onChange={(e) => profileState.updateField('collaborateOn', e.target.value)}
                      placeholder="Open source developer tools"
                      className="w-full rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                      style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium mb-1 block" style={{ color: GH.muted }}>Ask Me About</label>
                    <input
                      type="text"
                      value={profileState.askMeAbout}
                      onChange={(e) => profileState.updateField('askMeAbout', e.target.value)}
                      placeholder="React, TypeScript, System Architecture"
                      className="w-full rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                      style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TECH STACK (CATEGORIZED SECTIONS & BADGE STYLE SELECTOR) */}
            {activeTab === "skills" && (
              <div className="space-y-5 font-sans">
                
                {/* ── STACK CONTROLS HEADER (Badge Style Theme + Search) ── */}
                <div className="p-4 rounded-2xl space-y-4" style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}` }}>
                  
                  {/* Title & Selection Counter */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 font-bold text-[11px] sm:text-xs uppercase tracking-wider" style={{ color: GH.text }}>
                      <Layers className="w-4 h-4 shrink-0" style={{ color: GH.blue }} />
                      <span className="truncate">Tech Stack & Badges</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] sm:text-xs font-bold font-mono px-2 py-0.5 rounded" style={{ backgroundColor: `${GH.blue}20`, color: GH.blue }}>
                        {profileState.selectedSkills.length} Selected
                      </span>
                      {profileState.selectedSkills.length > 0 && (
                        <button
                          onClick={() => profileState.updateField('selectedSkills', [])}
                          className="text-[10px] font-bold uppercase hover:underline cursor-pointer shrink-0"
                          style={{ color: GH.red }}
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Badge Style Theme Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: GH.muted }}>
                      Badge Theme (Style)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {[
                        { id: 'for-the-badge', label: 'For The Badge' },
                        { id: 'flat', label: 'Flat' },
                        { id: 'flat-square', label: 'Flat Square' },
                        { id: 'plastic', label: 'Plastic' },
                        { id: 'social', label: 'Social' },
                      ].map((st) => {
                        const isSel = (profileState.badgeStyle || 'for-the-badge') === st.id;
                        return (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => profileState.updateField('badgeStyle', st.id as BadgeStyleType)}
                            className="px-2 py-1.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border truncate"
                            style={
                              isSel
                                ? { backgroundColor: `${GH.blue}25`, borderColor: GH.blue, color: GH.text }
                                : { backgroundColor: GH.surface, borderColor: GH.border, color: GH.muted }
                            }
                          >
                            {st.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Search Input Filter */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: GH.muted }} />
                    <input
                      type="text"
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      placeholder="Filter tech badges (e.g. React, Rust, AWS)..."
                      className="w-full rounded-xl pl-9 pr-3 py-2 text-xs font-sans focus:outline-none"
                      style={{ backgroundColor: GH.canvas, border: `1px solid ${GH.border}`, color: GH.text }}
                    />
                  </div>

                </div>

                {/* ── CATEGORY WISE BADGE SECTIONS ── */}
                <div className="space-y-4">
                  {SKILL_CATEGORIES.map((cat) => {
                    const categoryBadges = SKILL_BADGES.filter(
                      (b) => b.category === cat.id && b.name.toLowerCase().includes(skillSearch.toLowerCase().trim())
                    );

                    if (categoryBadges.length === 0 && skillSearch.trim()) return null;

                    const selectedCountInCat = categoryBadges.filter((b) => profileState.selectedSkills.includes(b.id)).length;

                    return (
                      <div
                        key={cat.id}
                        className="rounded-2xl overflow-hidden transition-all"
                        style={{ backgroundColor: GH.surface, border: `1px solid ${GH.border}` }}
                      >
                        {/* Category Header */}
                        <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: GH.overlay, borderBottom: `1px solid ${GH.border}` }}>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: GH.text }}>
                              {cat.label}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${GH.blue}15`, color: GH.blue }}>
                              {categoryBadges.length}
                            </span>
                          </div>
                          {selectedCountInCat > 0 && (
                            <span className="text-[10px] font-bold font-mono" style={{ color: GH.green }}>
                              {selectedCountInCat} selected
                            </span>
                          )}
                        </div>

                        {/* Badges Grid */}
                        <div className="p-3 grid grid-cols-2 gap-2">
                          {categoryBadges.map((badge) => {
                            const isSelected = profileState.selectedSkills.includes(badge.id);
                            return (
                              <button
                                key={badge.id}
                                onClick={() => profileState.toggleSkill(badge.id)}
                                className="px-3 py-2 rounded-xl text-xs font-bold border flex items-center justify-between transition-all cursor-pointer font-sans"
                                style={
                                  isSelected
                                    ? { backgroundColor: `${GH.blue}20`, border: `1px solid ${GH.blue}`, color: GH.text }
                                    : { backgroundColor: GH.canvas, border: `1px solid ${GH.border}`, color: GH.muted }
                                }
                              >
                                <span className="truncate">{badge.name}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" style={{ color: GH.blue }} />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Badges Input */}
                <div className="p-4 rounded-2xl space-y-2" style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}` }}>
                  <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: GH.text }}>Custom Badges (Comma Separated)</label>
                  <input
                    type="text"
                    value={profileState.customSkills}
                    onChange={(e) => profileState.updateField('customSkills', e.target.value)}
                    placeholder="GraphQL, Prisma, Redis, AWS"
                    className="w-full rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                    style={{ backgroundColor: GH.canvas, border: `1px solid ${GH.border}`, color: GH.text }}
                  />
                </div>

              </div>
            )}

            {/* TAB 3: SOCIAL */}
            {activeTab === "social" && (
              <div className="space-y-4 font-sans">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] pb-2" style={{ borderBottom: `1px solid ${GH.border}`, color: GH.text }}>
                  Social Links & Handles
                </h3>

                {[
                  { field: 'github', label: 'GitHub Username', placeholder: 'janedoe' },
                  { field: 'linkedin', label: 'LinkedIn Username', placeholder: 'janedoe-dev' },
                  { field: 'twitter', label: 'Twitter / X Handle', placeholder: 'janedoe_codes' },
                  { field: 'website', label: 'Portfolio Website URL', placeholder: 'https://janedoe.dev' },
                  { field: 'instagram', label: 'Instagram Handle', placeholder: 'janedoe_codes' },
                  { field: 'devto', label: 'DEV.to Username', placeholder: 'janedoe' },
                  { field: 'youtube', label: 'YouTube Handle', placeholder: 'janedoecodes' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className="text-xs font-medium mb-1 block" style={{ color: GH.muted }}>{label}</label>
                    <input
                      type="text"
                      value={profileState[field as keyof ProfileState] as string}
                      onChange={(e) => profileState.updateField(field as any, e.target.value)}
                      placeholder={placeholder}
                      className="w-full rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                      style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}`, color: GH.text }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: WIDGETS & THEMES (EXPANDED WITH ALL POSSIBLE WIDGETS) */}
            {activeTab === "widgets" && (
              <div className="space-y-5 font-sans">
                
                {/* Stats Card Theme Selector */}
                <div className="p-4 rounded-2xl space-y-2" style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}` }}>
                  <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: GH.text }}>
                    Card Color Theme
                  </label>
                  <select
                    value={profileState.statsTheme}
                    onChange={(e) => profileState.updateField('statsTheme', e.target.value)}
                    className="w-full rounded-xl px-3 py-2 text-xs font-bold font-sans focus:outline-none cursor-pointer"
                    style={{ backgroundColor: GH.canvas, border: `1px solid ${GH.border}`, color: GH.text }}
                  >
                    <option value="radical">Radical (Neon Purple)</option>
                    <option value="dark">Dark Classic (GitHub)</option>
                    <option value="tokyonight">Tokyo Night</option>
                    <option value="dracula">Dracula</option>
                    <option value="synthwave">Synthwave Cyberpunk</option>
                    <option value="gruvbox">Gruvbox</option>
                    <option value="nord">Nord</option>
                    <option value="onedark">One Dark Pro</option>
                    <option value="nightowl">Night Owl</option>
                  </select>
                </div>

                {/* Display Toggles */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1" style={{ borderBottom: `1px solid ${GH.border}` }}>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: GH.text }}>
                      Active Widgets (10 Available)
                    </h4>
                  </div>

                  {[
                    { key: 'showTrophies', label: '🏆 GitHub Trophies & Achievements', desc: 'Display star, repo, and commit trophies' },
                    { key: 'showStats', label: '📊 GitHub Stats Card', desc: 'Total stars, commits, PRs, and issues' },
                    { key: 'showStreak', label: '🔥 Contribution Streak Stats', desc: 'Current and longest contribution streaks' },
                    { key: 'showTopLangs', label: '🔤 Top Languages Card', desc: 'Visual breakdown of most used languages' },
                    { key: 'showActivityGraph', label: '📈 Activity Timeline Graph', desc: 'Interactive contribution activity chart' },
                    { key: 'showTypingHeader', label: '⌨️ Animated Typing Header SVG', desc: 'Dynamic typing text banner' },
                    { key: 'showQuotes', label: '💬 Daily Dev Quotes Card', desc: 'Random developer inspiration quote' },
                    { key: 'showGithubChart', label: '📅 GitHub Contribution Calendar', desc: 'Beautiful 2D commit grid' },
                    { key: 'showVisitorCount', label: '👀 Visitor Counter Badge', desc: 'Live profile view counter' },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="p-3 rounded-2xl transition-all"
                      style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}` }}
                    >
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <span className="text-xs font-bold block" style={{ color: GH.text }}>{item.label}</span>
                          <span className="text-[10px] block mt-0.5" style={{ color: GH.muted }}>{item.desc}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={!!profileState[item.key as keyof ProfileState]}
                          onChange={(e) => profileState.updateField(item.key as any, e.target.checked)}
                          className="w-4 h-4 rounded cursor-pointer accent-[#58a6ff] shrink-0 ml-3"
                        />
                      </label>

                      {/* Extra input for Trophies Selector */}
                      {item.key === 'showTrophies' && profileState.showTrophies && (
                        <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${GH.border}` }}>
                          <label className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: GH.muted }}>Select Displayed Trophies</label>
                          <div className="flex flex-wrap gap-2">
                            {TROPHY_OPTIONS.map((trophy) => (
                              <button
                                key={trophy.id}
                                onClick={() => profileState.toggleTrophy(trophy.id)}
                                className="px-2 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer border"
                                style={{
                                  backgroundColor: profileState.selectedTrophies?.includes(trophy.id) ? `#${trophy.color}20` : GH.canvas,
                                  borderColor: profileState.selectedTrophies?.includes(trophy.id) ? `#${trophy.color}` : GH.border,
                                  color: profileState.selectedTrophies?.includes(trophy.id) ? `#${trophy.color}` : GH.subtle
                                }}
                              >
                                {trophy.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 5: TEMPLATES */}
            {activeTab === "templates" && (
              <div className="space-y-3 font-sans">
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GH.muted }}>Select Layout Template:</div>

                {Object.entries(templates).map(([key, tpl]) => {
                  const isSelected = profileState.template === key;
                  return (
                    <div
                      key={key}
                      onClick={() => profileState.setTemplate(key as TemplateType)}
                      className="p-4 rounded-2xl border cursor-pointer transition-all"
                      style={
                        isSelected
                          ? { backgroundColor: `${GH.blue}15`, border: `1px solid ${GH.blue}` }
                          : { backgroundColor: GH.overlay, border: `1px solid ${GH.border}` }
                      }
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-xs" style={{ color: GH.text }}>{tpl.title}</h4>
                        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded" style={{ backgroundColor: `${GH.blue}20`, color: GH.blue }}>
                          {tpl.category}
                        </span>
                      </div>
                      <p className="text-[11px] line-clamp-2" style={{ color: GH.muted }}>{tpl.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>

                        {/* ── RIGHT WORKSPACE ── */}
        <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: GH.canvas }}>
          {viewMode === "split" ? (
            <SplitPane 
              leftPane={
                <div className="w-full h-full flex flex-col overflow-hidden">
                  <div className="h-10 px-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] shrink-0" style={{ background: GH.surface, borderBottom: `1px solid ${GH.border}`, color: GH.muted }}>
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
                      className={`max-w-4xl mx-auto rounded-xl p-6 lg:p-10 shadow-2xl border transition-colors duration-200 ${
                        profileState.previewTheme === 'dark'
                          ? 'bg-[#0d1117] text-[#c9d1d9] border-[#30363d] markdown-body-dark'
                          : 'bg-white text-[#24292f] border-[#e1e4e8] markdown-body-light'
                      }`}
                      dangerouslySetInnerHTML={{ __html: htmlPreview }}
                      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}
                    />
                  </div>
                </div>
              }
              rightPane={
                <div className="w-full h-full flex flex-col overflow-hidden" style={{ backgroundColor: GH.canvas }}>
                  <div className="h-10 px-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] shrink-0" style={{ background: GH.surface, borderBottom: `1px solid ${GH.border}`, color: GH.muted }}>
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
              <div className="h-10 px-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] shrink-0" style={{ background: GH.surface, borderBottom: `1px solid ${GH.border}`, color: GH.muted }}>
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
                  className={`max-w-4xl mx-auto rounded-2xl p-10 shadow-2xl border transition-colors duration-200 ${
                    profileState.previewTheme === 'dark'
                      ? 'bg-[#0d1117] text-[#c9d1d9] border-[#30363d] markdown-body-dark'
                      : 'bg-white text-[#24292f] border-[#e1e4e8] markdown-body-light'
                  }`}
                  dangerouslySetInnerHTML={{ __html: htmlPreview }}
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col overflow-hidden" style={{ backgroundColor: GH.canvas }}>
              <div className="h-10 px-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] shrink-0" style={{ background: GH.surface, borderBottom: `1px solid ${GH.border}`, color: GH.muted }}>
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
      </div>

      {/* Markdown Preview Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .markdown-body-dark h1, .markdown-body-dark h2, .markdown-body-dark h3 {
          border-bottom: 1px solid #21262d;
          padding-bottom: 0.3em;
          margin-bottom: 16px;
          margin-top: 24px;
          color: #f0f6fc;
        }
        .markdown-body-dark p { margin-bottom: 16px; line-height: 1.6; }
        .markdown-body-dark img { max-width: 100%; border-radius: 4px; display: inline-block; margin: 2px; }
        .markdown-body-dark a { color: #58a6ff; text-decoration: none; }
        .markdown-body-dark a:hover { text-decoration: underline; }
        .markdown-body-dark code {
          background-color: rgba(110,118,129,0.4);
          padding: 0.2em 0.4em;
          border-radius: 6px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 85%;
        }
        .markdown-body-dark table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 16px;
        }
        .markdown-body-dark th, .markdown-body-dark td {
          border: 1px solid #30363d;
          padding: 8px 12px;
        }

        .markdown-body-light h1, .markdown-body-light h2, .markdown-body-light h3 {
          border-bottom: 1px solid #eaecef;
          padding-bottom: 0.3em;
          margin-bottom: 16px;
          margin-top: 24px;
          color: #24292f;
        }
        .markdown-body-light p { margin-bottom: 16px; line-height: 1.6; }
        .markdown-body-light img { max-width: 100%; border-radius: 4px; display: inline-block; margin: 2px; }
        .markdown-body-light a { color: #0969da; text-decoration: none; }
        .markdown-body-light a:hover { text-decoration: underline; }
        .markdown-body-light code {
          background-color: rgba(175,184,193,0.2);
          padding: 0.2em 0.4em;
          border-radius: 6px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 85%;
        }
        .markdown-body-light table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 16px;
        }
        .markdown-body-light th, .markdown-body-light td {
          border: 1px solid #d0d7de;
          padding: 8px 12px;
        }
      `}} />
    
      {/* ── STAR REPO MODAL ── */}
      <AnimatePresence>
        {showStarModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl p-6 relative overflow-hidden font-sans"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#58a6ff]/20 blur-[50px] rounded-full pointer-events-none" />
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#21262d] flex items-center justify-center border border-[#30363d]">
                  <Star className="w-6 h-6 text-[#d29922]" fill="#d29922" />
                </div>
                <button onClick={() => setShowStarModal(false)} className="text-[#8b949e] hover:text-white transition-colors cursor-pointer p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-[#e6edf3] mb-2 relative z-10">Found ProfileForge useful?</h2>
              <p className="text-sm text-[#8b949e] leading-relaxed mb-8 relative z-10">
                If this tool saved you time or helped you build an awesome GitHub profile, please consider starring our repository. It helps us grow and keep the project 100% free and open-source!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10">
                <a 
                  href="https://github.com/Aditya-myst/readme" 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={() => setShowStarModal(false)}
                  className="flex-1 w-full flex justify-center items-center gap-2 bg-[#3fb950] hover:bg-[#2ea043] text-white font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  <Star className="w-4 h-4" /> Star on GitHub
                </a>
                <button 
                  onClick={() => setShowStarModal(false)}
                  className="flex-1 w-full flex justify-center items-center bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] font-semibold py-2.5 px-4 rounded-xl transition-colors border border-[#30363d] cursor-pointer"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
</div>
  );
}
