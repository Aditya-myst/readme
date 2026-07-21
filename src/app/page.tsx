"use client";

import { motion } from "framer-motion";
import { Globe, LayoutTemplate, Zap, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#FF4D2D] selection:text-white font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 mx-auto max-w-7xl backdrop-blur-md bg-[#050505]/80 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <LayoutTemplate className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-xl tracking-tight">ProfileForge</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-[#888888]">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#templates" className="hover:text-white transition-colors">Templates</Link>
          <Link href="#showcase" className="hover:text-white transition-colors">Showcase</Link>
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-5">
          <Link href="https://github.com" target="_blank" rel="noreferrer" className="text-[#888888] hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
          </Link>
          <Button className="rounded-full px-6 py-5 bg-[#FF4D2D] text-white hover:bg-[#e03d20] font-semibold border-none text-[15px]">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 flex flex-col items-center text-center min-h-[90vh] justify-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-[#333] text-sm font-medium mb-12 text-[#AAAAAA]"
        >
          Visual GitHub Profile designer
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-[85px] font-bold tracking-tight max-w-[1000px] leading-[1.05] mb-8"
        >
          Design & Profile <br /> Acceleration <br /> for Developers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[#888888] max-w-2xl mb-12 font-medium"
        >
          Build stunning GitHub READMEs visually without writing Markdown. Choose from premium templates, drag-and-drop widgets, and export instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 relative z-20"
        >
          <Link href="/editor">
            <Button size="lg" className="rounded-full px-10 h-16 text-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white group border-none font-semibold">
              Open Editor
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg border-[#333] text-white hover:bg-[#111] hover:text-white bg-transparent font-semibold">
            View Templates
          </Button>
        </motion.div>

        {/* Hero Floating Widgets */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-[1400px] mx-auto z-10">
          {/* Left Floating Widget (Like the Rocket card) */}
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 40 }}
            className="absolute top-[30%] left-[5%] w-[180px] bg-[#121212] rounded-2xl p-4 shadow-2xl border border-[#222]"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <div className="text-xs font-bold bg-[#1F1F1F] px-2 py-1 rounded-md">346+</div>
            </div>
            <div className="flex items-end gap-1.5 h-12">
               <div className="w-full h-[40%] bg-[#333] rounded-sm" />
               <div className="w-full h-[70%] bg-[#333] rounded-sm" />
               <div className="w-full h-[50%] bg-[#333] rounded-sm" />
               <div className="w-full h-[90%] bg-[#FF4D2D] rounded-sm" />
            </div>
          </motion.div>

          {/* Right Floating Widget (Installs card) */}
          <motion.div
            initial={{ opacity: 0, y: -50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 40 }}
            className="absolute top-[20%] right-[5%] w-[260px] bg-[#121212] rounded-2xl p-5 shadow-2xl border border-[#222]"
          >
            <div className="text-sm font-medium mb-5">Profile Views</div>
            <div className="flex items-end gap-1.5 h-[100px] relative">
              <div className="w-full h-[50%] bg-[#222] rounded-t-sm" />
              <div className="w-full h-[40%] bg-[#222] rounded-t-sm" />
              <div className="w-full h-[60%] bg-[#222] rounded-t-sm" />
              <div className="w-full h-[100%] bg-[#FFB800] rounded-t-sm flex flex-col justify-end pb-2 items-center">
                <div className="absolute top-[-30px] bg-[#10B981] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">952</div>
                <div className="absolute top-[5px] bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded">282</div>
              </div>
              <div className="w-full h-[70%] bg-[#222] rounded-t-sm" />
              <div className="w-full h-[50%] bg-[#222] rounded-t-sm" />
              <div className="w-full h-[80%] bg-[#222] rounded-t-sm" />
            </div>
            <div className="flex justify-between mt-3 text-[10px] text-[#666] font-semibold">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </motion.div>

          {/* Bottom Right Blue Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute bottom-[10%] right-[15%] w-[180px] h-[180px] bg-[#0066FF] rounded-full flex items-center justify-center text-center p-6"
          >
            <div>
              <div className="text-4xl font-bold text-white mb-1">+30%</div>
              <div className="text-[11px] text-white/90 font-medium leading-tight">Speed up your productivity</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Massive Typography Statement (Reference 3) */}
      <section className="py-32 px-4 max-w-5xl mx-auto text-center border-t border-[#111]">
        <h2 className="text-4xl md:text-[65px] font-bold leading-[1.1] tracking-tight text-white mb-8">
          We prove, design, <br />
          implement, and market <br />
          your idea with absolute <br />
          transparency and <br />
          efficiency in its <span className="text-[#666666]">core</span>
        </h2>
      </section>

      {/* Isometric/Bento Showcase (Reference 2) */}
      <section className="py-24 bg-[#0A0A0A] overflow-hidden" id="showcase">
        <div className="max-w-7xl mx-auto px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful Widget Control</h2>
            <p className="text-lg text-[#888888] max-w-2xl mx-auto">Customize every aspect of your profile with drag-and-drop widgets. From GitHub stats to top languages, everything is a few clicks away.</p>
          </div>

          <div className="relative w-full h-[700px] flex items-center justify-center">
            {/* The tilted perspective container */}
            <motion.div
              initial={{ rotateX: 45, rotateZ: -20, y: 100, opacity: 0 }}
              whileInView={{ rotateX: 10, rotateZ: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
              viewport={{ once: true }}
              className="w-full max-w-4xl h-[600px] bg-[#D2D6DC] rounded-3xl p-8 shadow-2xl relative"
            >
               {/* Inner Dashboard */}
               <div className="w-full h-full bg-white rounded-2xl p-8 flex flex-col gap-6 overflow-hidden shadow-inner border border-white/20">
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Visit statistics</h3>
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                       <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                  </div>

                  <div className="flex gap-6 h-[200px]">
                     {/* Line Chart */}
                     <div className="flex-1 border-b border-gray-100 flex items-end relative pb-4">
                        <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                          <polyline points="0,150 50,130 150,140 250,80 350,100 450,40" fill="none" stroke="#FFB800" strokeWidth="3" />
                        </svg>
                        <div className="w-full flex justify-between absolute bottom-[-20px] text-xs text-gray-400 font-medium">
                          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span className="bg-gray-100 px-2 py-1 rounded text-black font-bold">Jun</span><span>Jul</span><span>Aug</span>
                        </div>
                     </div>
                     
                     {/* Stats Sidebar */}
                     <div className="w-[180px] flex flex-col gap-4">
                        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col justify-center">
                          <div className="text-gray-500 text-sm font-semibold mb-2">Visitors <span className="float-right text-green-500 bg-green-50 px-1 rounded text-xs">+14%</span></div>
                          <div className="text-4xl font-bold text-gray-900">56K</div>
                        </div>
                        <div className="flex-1 bg-[#FF4D2D] rounded-xl p-4 flex flex-col justify-center">
                          <div className="text-white/80 text-sm font-semibold mb-1">Rate</div>
                          <div className="text-4xl font-bold text-white">+58%</div>
                        </div>
                     </div>
                  </div>

                  {/* Device Type Section */}
                  <div className="mt-8">
                     <h4 className="text-gray-500 font-semibold mb-4">Device type</h4>
                     <div className="flex gap-4">
                        <div className="flex-[2] bg-[#FFB800] rounded-xl p-4 h-24 flex items-end">
                           <div className="w-full flex justify-between items-end">
                              <span className="text-black font-bold text-2xl">72%</span>
                           </div>
                        </div>
                        <div className="flex-[1] bg-[#FF4D2D] rounded-xl p-4 h-24 flex items-end">
                           <span className="text-white font-bold text-2xl">20%</span>
                        </div>
                        <div className="flex-[0.5] bg-[#7C3AED] rounded-xl p-4 h-24 flex items-end">
                           <span className="text-white font-bold text-xl">8%</span>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Templates Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto" id="templates">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Premium Templates</h2>
            <p className="text-[#888888] text-lg max-w-xl">Start with a stunning foundation. Our templates are designed by professionals and built for developers.</p>
          </div>
          <Button variant="outline" className="hidden md:flex rounded-full border-[#333] hover:bg-[#111] text-white bg-transparent h-12 px-6">
            View all templates <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Minimal Developer", color: "bg-[#1A1A1A]" },
            { name: "Neon Cyberpunk", color: "bg-[#2D1B4E]" },
            { name: "SaaS Professional", color: "bg-[#182944]" },
            { name: "Creative Designer", color: "bg-[#451F1F]" },
            { name: "Open Source Contributor", color: "bg-[#1D2B23]" },
            { name: "Data Scientist", color: "bg-[#252525]" },
          ].map((template, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className={`w-full aspect-[4/3] rounded-2xl ${template.color} mb-4 relative overflow-hidden border border-[#222] transition-transform duration-300 group-hover:scale-[1.02]`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm transition-opacity">
                  <Button className="rounded-full bg-white text-black hover:bg-gray-200">Use Template</Button>
                </div>
              </div>
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <p className="text-[#666] text-sm">Free to use</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 bg-[#FF4D2D] text-white text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight max-w-4xl mx-auto">Ready to upgrade your GitHub profile?</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">Join thousands of developers building stunning profiles with ProfileForge. Free and open source forever.</p>
        <Link href="/editor">
          <Button size="lg" className="rounded-full px-12 h-16 text-xl bg-white text-[#FF4D2D] hover:bg-gray-100 font-bold">
            Start Designing
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 max-w-7xl mx-auto border-t border-[#222]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <LayoutTemplate className="w-3 h-3 text-black" />
            </div>
            <span className="font-bold text-lg">ProfileForge</span>
          </div>
          <div className="flex gap-8 text-sm text-[#888888] font-medium">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Twitter</Link>
            <Link href="https://github.com" className="hover:text-white">GitHub</Link>
          </div>
          <div className="text-sm text-[#666]">
            &copy; {new Date().getFullYear()} ProfileForge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
