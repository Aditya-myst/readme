"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LayoutTemplate, ArrowLeft, ArrowUpRight } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF4D2D] selection:text-white font-sans antialiased overflow-hidden pt-32 pb-20 px-8">
      {/* Soft Top Glow */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FF4D2D]/10 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[#888] hover:text-white transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-medium mb-6 tracking-tight">Curated Templates</h1>
          <p className="text-[#888888] text-xl max-w-2xl mb-16 leading-relaxed">
            Start with a stunning foundation. Our templates are reverse-engineered from top developers and completely free to use. Just select one and customize it in the editor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Minimalist", desc: "Clean text, bullet points, basic links.", color: "bg-[#1A1A1A]" },
            { name: "Developer Pro", desc: "GitHub stats cards and neat badges.", color: "bg-[#2D1B4E]" },
            { name: "Influencer", desc: "sw-yx style: High density, endorsements.", color: "bg-[#182944]" },
            { name: "Power User", desc: "DenverCoder1 style: Typing header, toggles.", color: "bg-[#451F1F]" },
            { name: "90s Retro", desc: "Fun, nostalgic GIFs and guestbooks.", color: "bg-[#1D2B23]" },
          ].map((template, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`w-full aspect-[4/3] rounded-2xl ${template.color} mb-5 relative overflow-hidden border border-white/5 transition-transform duration-300 group-hover:scale-[1.02] flex items-center justify-center shadow-xl`}>
                <div className="text-white/20 font-bold text-3xl">{template.name}</div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 backdrop-blur-sm transition-opacity">
                  <Link href="/editor">
                    <button className="rounded-full bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition-colors cursor-pointer shadow-2xl flex items-center gap-2">
                      Use Template <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
              <h3 className="font-semibold text-xl text-white">{template.name}</h3>
              <p className="text-[#888] text-sm mt-2">{template.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
