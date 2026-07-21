"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Orbit, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF4D2D] selection:text-white font-sans antialiased overflow-hidden">
      {/* Soft Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between pr-2 pl-6 py-2 rounded-full backdrop-blur-xl bg-[#1A1A1A]/80 border border-white/10 shadow-2xl min-w-[500px]">
        <div className="flex items-center gap-2 pr-6 border-r border-white/10">
          <Orbit className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-8 px-6 text-[14px] font-medium text-[#A0A0A0]">
          <Link href="#cases" className="hover:text-white transition-colors">Cases</Link>
          <Link href="#service" className="hover:text-white transition-colors">Service</Link>
          <Link href="#blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="#about" className="hover:text-white transition-colors">About us</Link>
        </div>
        <button className="rounded-full px-6 py-2.5 bg-[#FF4D2D] text-white hover:bg-[#e03d20] font-medium text-[14px] transition-colors">
          Contact
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-4 flex flex-col items-center text-center min-h-[95vh] justify-start max-w-[1400px] mx-auto z-10">
        
        {/* Subtitle Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-5 py-2 rounded-full bg-[#1A1A1A]/80 border border-white/10 text-[15px] font-medium mb-10 text-[#CCCCCC]"
        >
          Digital brand design agency
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[64px] md:text-[88px] font-medium tracking-tight max-w-[900px] leading-[1.05] mb-8"
        >
          Design & Brand <br />
          Acceleration <br />
          for SaaS Startups
        </motion.h1>

        {/* Hero Floating Widgets */}
        <div className="absolute inset-0 pointer-events-none z-0">
          
          {/* Top Left: White Circle + Rocket Widget */}
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20, rotate: -5 }}
            animate={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="absolute top-[20%] left-[8%] hidden lg:block"
          >
            {/* White Circle Background Element */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#F3F4F6] rounded-full flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-[#FF4D2D] rounded-lg flex items-center justify-center" style={{ transform: "rotate(15deg) skewX(-10deg)" }}>
                 <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Main Rocket Widget */}
            <div className="relative w-[180px] bg-[#1A1A1A] rounded-2xl p-4 shadow-2xl border border-white/10 backdrop-blur-md">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="text-xl">🚀</span>
                </div>
                <div className="text-xs font-semibold bg-[#2A2A2A] text-white px-2.5 py-1 rounded-md">346+</div>
              </div>
              <div className="flex items-end gap-2 h-14 w-full">
                 <div className="w-full h-[40%] bg-[#333] rounded-sm" />
                 <div className="w-full h-[60%] bg-[#333] rounded-sm" />
                 <div className="w-full h-[45%] bg-[#333] rounded-sm" />
                 <div className="w-full h-[90%] bg-[#FF4D2D] rounded-sm" />
              </div>
            </div>
          </motion.div>

          {/* Bottom Left: Widget Control */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: -30 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="absolute bottom-[20%] left-[12%] hidden xl:block"
          >
            <div className="w-[280px] bg-[#161616] rounded-2xl p-5 shadow-2xl border border-white/5 relative">
              <div className="text-[13px] font-medium text-[#888] mb-6">Widget control</div>
              
              {/* Line chart mock */}
              <div className="relative h-24 mb-4">
                 {/* Faint vertical grid lines */}
                 <div className="absolute inset-0 flex justify-between">
                    <div className="w-px h-full bg-white/5" />
                    <div className="w-px h-full bg-white/5" />
                    <div className="w-px h-full bg-white/5" />
                    <div className="w-px h-full bg-white/5" />
                    <div className="w-px h-full bg-white/5" />
                 </div>
                 {/* Line */}
                 <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <polyline points="0,70 30,65 60,30 100,30" fill="none" stroke="#FFB800" strokeWidth="2" />
                    {/* Dots */}
                    <circle cx="0" cy="70" r="3" fill="#FFB800" />
                    <circle cx="30" cy="65" r="3" fill="#FFB800" />
                    <circle cx="60" cy="30" r="3" fill="#FFB800" />
                    <circle cx="100" cy="30" r="3" fill="#FFB800" />
                 </svg>
              </div>
              <div className="flex justify-between text-[9px] text-[#555] font-medium uppercase tracking-wider mb-2">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
              </div>
              
              {/* Floating blue button */}
              <div className="absolute -right-8 -bottom-6 bg-[#0066FF] rounded-xl p-3 shadow-xl">
                 <div className="flex justify-between items-center gap-6 mb-1 text-white/80 text-[11px] font-medium">
                   <span>Result</span>
                   <TrendingUp className="w-3 h-3" />
                 </div>
                 <div className="text-xl font-bold text-white">+ 58%</div>
              </div>
            </div>
          </motion.div>

          {/* Top Right: Installs Widget */}
          <motion.div
            initial={{ opacity: 0, y: -40, x: 40 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="absolute top-[25%] right-[10%] hidden lg:block"
          >
            <div className="w-[280px] bg-[#161616] rounded-2xl p-5 shadow-2xl border border-white/5">
              <div className="text-[13px] font-medium text-white mb-6">Installs</div>
              <div className="flex items-end justify-between gap-1.5 h-28 relative">
                {/* Mock bars */}
                {[
                  { height: "50%" },
                  { height: "40%" },
                  { height: "70%" },
                  { height: "60%" },
                  { height: "100%", isHighlight: true, top: "562", bottom: "286" },
                  { height: "45%" },
                  { height: "80%" }
                ].map((bar, i) => (
                  <div key={i} className="w-full relative h-full flex flex-col justify-end group">
                    <div className="absolute inset-0 rounded-md border border-white/10 border-dashed opacity-30" />
                    {bar.isHighlight ? (
                      <div className="w-full bg-[#FFB800] rounded-md flex flex-col justify-between items-center py-1 z-10" style={{ height: bar.height }}>
                        <div className="bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded-sm absolute -top-6">562</div>
                        <div className="bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded-sm mt-1">286</div>
                      </div>
                    ) : (
                      <div className={`w-full bg-[#2A2A2A] rounded-md z-10`} style={{ height: bar.height }} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[9px] text-[#555] font-medium uppercase tracking-wider">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right: Blue Circle & Purple Pill */}
          <div className="absolute bottom-[10%] right-[8%] hidden xl:flex flex-col items-end gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
              className="w-[180px] h-[180px] bg-[#0066FF] rounded-full flex items-center justify-center text-center p-6 shadow-2xl"
            >
              <div>
                <div className="text-[40px] font-bold text-white leading-none mb-2">+30%</div>
                <div className="text-[12px] text-white/90 font-medium leading-snug">Speed up your<br/>productivity</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/editor">
                <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-4 rounded-full font-medium flex items-center gap-3 transition-colors shadow-xl text-[15px]">
                  Book a call <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Center Bottom: Tablet Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#222] rounded-t-[40px] border-[8px] border-[#333] border-b-0 shadow-2xl overflow-hidden hidden md:block"
          >
             {/* Tablet Screen Content */}
             <div className="w-full h-full bg-[#111] relative pt-8 px-10">
                <div className="text-center mb-8">
                   <h3 className="text-2xl font-medium text-white mb-2">Crypto platform for<br/>smart loans</h3>
                </div>
                
                {/* Inner App Mockup */}
                <div className="w-full h-full bg-[#1A1A1A] rounded-t-2xl border border-white/5 p-4 relative">
                   {/* Green tag overlay */}
                   <div className="absolute right-8 top-16 bg-[#10B981] text-black text-[10px] font-bold px-3 py-1.5 rounded-sm rotate-[15deg] z-20">
                     Analyze the<br/>market
                   </div>
                   
                   {/* App header */}
                   <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                     <div className="text-sm font-medium">Welcome back Alice</div>
                   </div>
                   
                   {/* App stats */}
                   <div className="flex gap-4 mb-4">
                      <div className="flex-1 bg-[#222] rounded-xl p-3">
                         <div className="text-[10px] text-[#888] mb-1">Active credit</div>
                         <div className="text-sm font-bold">11,2 BTC</div>
                      </div>
                      <div className="flex-1 bg-[#222] rounded-xl p-3">
                         <div className="text-[10px] text-[#888] mb-1">Payment goal</div>
                         <div className="text-sm font-bold">26%</div>
                      </div>
                      <div className="flex-1 bg-[#222] rounded-xl p-3">
                         <div className="text-[10px] text-[#888] mb-1">Price analytics</div>
                         <div className="text-sm font-bold">$28,165</div>
                      </div>
                   </div>
                   
                   {/* App Chart Area */}
                   <div className="w-full h-32 bg-[#222] rounded-xl flex items-end p-2 gap-1 overflow-hidden relative">
                       {/* Mock bars inside app */}
                       <div className="w-full h-[40%] bg-[#7C3AED] rounded-t-sm opacity-80" />
                       <div className="w-full h-[60%] bg-[#7C3AED] rounded-t-sm opacity-80" />
                       <div className="w-full h-[30%] bg-[#7C3AED] rounded-t-sm opacity-80" />
                       <div className="w-full h-[80%] bg-[#7C3AED] rounded-t-sm opacity-80" />
                       <div className="w-full h-[50%] bg-[#7C3AED] rounded-t-sm opacity-80" />
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Massive Typography Statement (Reference 3) */}
      <section className="py-40 px-4 max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.1] tracking-tight text-white mb-24">
          We prove, design, <br />
          implement, and market <br />
          your idea with absolute <br />
          transparency and <br />
          efficiency in it's <span className="text-[#888]">core</span>
        </h2>
        
        {/* $300m & 60+ Cards */}
        <div className="flex flex-col md:flex-row gap-6 text-left">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="flex-1 bg-[#0F0F0F] rounded-3xl p-10 border border-white/5 shadow-2xl relative overflow-hidden"
           >
              <div className="absolute top-6 right-6 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center pr-4 pl-1 py-1 gap-2">
                 <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-[#FF4D2D]" fill="#FF4D2D" />
                 </div>
                 <span className="text-[13px] font-medium text-[#CCC]">Business-driven UX</span>
              </div>
              <div className="mt-12">
                 <div className="text-[72px] font-medium tracking-tight mb-4">$300m</div>
                 <p className="text-[#888] text-[15px] max-w-[200px] leading-relaxed">
                   In funding clients raised owing<br/>to our design work
                 </p>
              </div>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             viewport={{ once: true }}
             className="flex-[0.7] bg-[#0F0F0F] rounded-3xl p-10 border border-white/5 shadow-2xl flex flex-col justify-end"
           >
              <div className="text-[72px] font-medium tracking-tight mb-4">60+</div>
              <p className="text-[#888] text-[15px] leading-relaxed">
                World's biggest<br/>brands trust us
              </p>
           </motion.div>
        </div>
      </section>

      {/* Isometric/Bento Showcase (Reference 2) */}
      <section className="py-32 bg-[#E5E7EB] overflow-hidden relative" id="showcase">
        <div className="max-w-7xl mx-auto px-8 relative flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
          
          {/* Left Text */}
          <div className="lg:w-1/3 mb-12 lg:mb-0">
             <h2 className="text-4xl md:text-5xl font-medium text-black mb-6 tracking-tight">Key features<br/>for SaaS startups</h2>
             <p className="text-lg text-gray-600">Our dashboards provide unmatched visibility and control over your core metrics. Built for speed and clarity.</p>
          </div>

          {/* Right Isometric Bento Box */}
          <div className="lg:w-2/3 relative h-[800px] flex items-center justify-center">
            
            {/* The tilted perspective container */}
            <motion.div
              initial={{ rotateX: 30, rotateY: -15, rotateZ: 10, opacity: 0, scale: 0.9 }}
              whileInView={{ rotateX: 30, rotateY: -15, rotateZ: 10, opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full max-w-[700px] flex flex-col gap-6 perspective-[2000px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
               {/* Top Stats Bar */}
               <div className="w-full bg-white rounded-[24px] p-6 shadow-xl flex gap-4 h-[200px]">
                  {["#FF4D2D", "#FFB800", "#FFB800", "#E5E7EB", "#E5E7EB"].map((color, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end relative h-full">
                       <div className="w-full rounded-full absolute bottom-0" style={{ height: `${80 - i*10}%`, backgroundColor: color }} />
                    </div>
                  ))}
               </div>
               
               {/* Middle Section: Line Chart + Orange/White cards */}
               <div className="flex gap-6 h-[260px]">
                  {/* Left Line Chart */}
                  <div className="flex-[2] bg-white rounded-[24px] p-6 shadow-xl relative overflow-hidden flex flex-col">
                     <h3 className="text-gray-800 font-medium mb-4">Visit statistics</h3>
                     <div className="flex-1 relative w-full mt-4">
                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                           <polyline points="0,100 50,90 100,50 150,70 250,40 350,45 450,20" fill="none" stroke="#FFB800" strokeWidth="4" />
                           <circle cx="0" cy="100" r="5" fill="#FFB800" />
                           <circle cx="50" cy="90" r="5" fill="#FFB800" />
                           <circle cx="100" cy="50" r="5" fill="#FFB800" />
                           <circle cx="150" cy="70" r="5" fill="#FFB800" />
                           <circle cx="250" cy="40" r="5" fill="#FFB800" />
                           <circle cx="350" cy="45" r="5" fill="#FFB800" />
                           <circle cx="450" cy="20" r="5" fill="#FFB800" />
                        </svg>
                     </div>
                     <div className="flex justify-between text-[11px] font-medium text-gray-400 mt-4">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span className="text-black bg-gray-100 px-2 py-1 rounded">Jun</span><span>Jul</span><span>Aug</span>
                     </div>
                  </div>
                  
                  {/* Right small cards */}
                  <div className="flex-[1] flex flex-col gap-6">
                     <div className="flex-1 bg-white rounded-[24px] p-6 shadow-xl flex flex-col justify-center">
                        <div className="text-gray-500 font-medium mb-1">Visitors</div>
                        <div className="w-full h-1 bg-gray-100 rounded-full mb-3"><div className="w-[60%] h-full bg-green-500 rounded-full"></div></div>
                        <div className="flex items-end justify-between">
                           <span className="text-[32px] font-medium text-black leading-none">56K</span>
                           <span className="text-green-500 text-[12px] font-bold bg-green-50 px-2 py-1 rounded-full">↑ +14%</span>
                        </div>
                     </div>
                     <div className="flex-1 bg-[#FF4D2D] rounded-[24px] p-6 shadow-xl flex flex-col justify-center">
                        <div className="text-white/90 font-medium mb-2">Rate</div>
                        <div className="text-[36px] font-medium text-white leading-none">+58%</div>
                     </div>
                  </div>
               </div>
               
               {/* Bottom Section: Device Type */}
               <div className="w-full bg-white rounded-[24px] p-6 shadow-xl relative overflow-hidden h-[240px]">
                  <h3 className="text-gray-800 font-medium mb-6">Device type</h3>
                  
                  <div className="flex justify-between items-start">
                     <div className="flex flex-col gap-4">
                        <div>
                           <div className="text-gray-400 text-sm">Windows</div>
                           <div className="text-xl font-medium text-black">24,578</div>
                        </div>
                        <div>
                           <div className="text-gray-400 text-sm">Mac Os</div>
                           <div className="text-xl font-medium text-black">36,452</div>
                        </div>
                     </div>
                     
                     <div className="flex items-end gap-3 h-[140px] absolute bottom-0 right-6 w-[60%]">
                        <div className="flex-[1.5] bg-[#FFB800] rounded-t-[20px] p-4 flex flex-col justify-end text-black h-[50%]">
                           <div className="text-xl font-medium">72%</div>
                        </div>
                        <div className="flex-[2] bg-[#FF4D2D] rounded-t-[20px] p-4 flex flex-col justify-end text-white h-[80%]">
                           <div className="text-2xl font-medium">20%</div>
                        </div>
                        <div className="flex-[1.8] bg-[#8B5CF6] rounded-t-[20px] p-4 flex flex-col justify-end text-white h-[40%]">
                           <div className="text-xl font-medium">8%</div>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Book a call pill for the light section */}
        <div className="absolute bottom-8 right-8 z-20">
           <Link href="/editor">
             <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 transition-colors shadow-2xl text-[15px]">
               Book a call <ArrowUpRight className="w-4 h-4" />
             </button>
           </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 max-w-[1400px] mx-auto border-t border-[#111]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Orbit className="w-6 h-6 text-white" />
            <span className="font-bold text-lg">ProfileForge</span>
          </div>
          <div className="flex gap-8 text-[14px] text-[#888888] font-medium">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Dribbble</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
