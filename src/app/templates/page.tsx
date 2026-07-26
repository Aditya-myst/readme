"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfileStore, TemplateType } from "@/store/profileStore";
import { templates } from "@/lib/templates/index";
import { ArrowLeft, ArrowRight, Sparkles, Check, ChevronDown } from "lucide-react";

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

export default function TemplatesPage() {
  const router = useRouter();
  const { template: currentTemplate, setTemplate } = useProfileStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Popular", "Developer", "Open Source", "Specialized", "Creative", "Minimal", "Nostalgic"];

  const handleSelectTemplate = (key: TemplateType) => {
    setTemplate(key);
    router.push("/editor");
  };

  const filteredTemplates = Object.entries(templates).filter(([key, tpl]) => {
    if (selectedCategory === "All") return true;
    return tpl.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen text-[#e6edf3] font-sans antialiased selection:bg-[#58a6ff]/30 selection:text-white" style={{ backgroundColor: GH.canvas }}>
      
      {/* ── TOP NAVIGATION BAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md px-6 sm:px-12 py-5 flex items-center justify-between" style={{ backgroundColor: `${GH.canvas}e6`, borderBottom: `1px solid ${GH.border}` }}>
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tighter text-xl group">
          <span className="text-[#58a6ff] text-2xl group-hover:rotate-180 transition-transform duration-500">✴</span>
          <span className="text-[#e6edf3] font-extrabold text-xl lowercase tracking-tight">profileforge</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: GH.muted }}>
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> HOME
          </Link>
          <Link href="/templates" className="text-white transition-colors">
            TEMPLATES
          </Link>
          <Link href="/#opensource" className="hover:text-white transition-colors">
            OPEN SOURCE
          </Link>
          <Link href="/#socials" className="hover:text-white transition-colors">
            COMMUNITY
          </Link>
        </div>

        <Link href="/editor">
          <button className="px-6 py-2.5 rounded-lg text-white font-bold tracking-wider text-xs uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg" style={{ backgroundColor: GH.green }}>
            <span>LAUNCH EDITOR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: GH.blue }}>
            14+ HANDCRAFTED GITHUB README TEMPLATES
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight" style={{ color: GH.text }}>
            Explore README Templates. Click & Edit Instantly.
          </h1>
          
          <p className="text-base leading-relaxed" style={{ color: GH.muted }}>
            Select from 14+ templates built for Developers, Open Source Maintainers, AI Researchers, DevOps Specialists, and Designers.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border"
              style={
                selectedCategory === cat
                  ? { backgroundColor: GH.blue, color: "#ffffff", borderColor: GH.blue }
                  : { backgroundColor: GH.surface, color: GH.muted, borderColor: GH.border }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(([key, tpl], idx) => {
            const isSelected = currentTemplate === key;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => handleSelectTemplate(key as TemplateType)}
                className="group rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between hover:scale-[1.02]"
                style={{
                  backgroundColor: GH.surface,
                  border: `1px solid ${isSelected ? GH.blue : GH.border}`
                }}
              >
                <div className="p-8 space-y-4">
                  {key === 'terminal' && (
                     <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#30363d] mb-6 relative">
                       <img src="/templates/terminal.png" alt="Terminal Minimalist Preview" className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity" />
                     </div>
                  )}
                  {key === 'polyglot' && (
                     <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#30363d] mb-6 relative">
                       <img src="/templates/polyglot.png" alt="Polyglot Badges Preview" className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity" />
                     </div>
                  )}

                  {key === 'minimalist_mono' && (
                     <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#30363d] mb-6 relative bg-[#111]">
                       <img src="/templates/minimalist_mono.png" alt="Monospace Stack Preview" className="w-full h-full object-contain object-top opacity-80 group-hover:opacity-100 transition-opacity" />
                     </div>
                  )}
                  {key === 'ai_engineer' && (
                     <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#30363d] mb-6 relative bg-[#111]">
                       <img src="/templates/ai_engineer.png" alt="AI & ML Architect Preview" className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity" />
                     </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded" style={{ backgroundColor: `${GH.blue}15`, color: GH.blue, border: `1px solid ${GH.blue}30` }}>
                      {tpl.category}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-white px-2.5 py-1 rounded" style={{ backgroundColor: GH.green }}>
                        <Check className="w-3 h-3" /> ACTIVE
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#58a6ff] transition-colors" style={{ color: GH.text }}>
                      {tpl.title}
                    </h3>
                    <p className="text-xs leading-relaxed line-clamp-3" style={{ color: GH.muted }}>
                      {tpl.description}
                    </p>
                  </div>
                </div>

                <div className="px-8 py-5 flex items-center justify-between transition-colors" style={{ backgroundColor: GH.overlay, borderTop: `1px solid ${GH.border}` }}>
                  <span className="text-xs font-bold tracking-wider uppercase transition-colors" style={{ color: GH.muted }}>
                    LOAD IN EDITOR ↗
                  </span>
                  <div className="p-2 rounded-lg text-white transition-colors" style={{ backgroundColor: `${GH.blue}20`, color: GH.blue }}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </main>
    </div>
  );
}
