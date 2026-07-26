"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowRight,
    ArrowUpRight,
    ChevronDown,
    Eye,
    FileCode2,
    GitBranch,
    Globe,
    Heart,
    Layers,
    LayoutTemplate,
    Loader2,
    Sparkles,
    Star,
    Terminal,
    Trophy,
    UserCheck,
    Zap,
} from "lucide-react";

/* ── GitHub Dark Palette ── */
const GH = {
    canvas: "#0d1117",
    surface: "#161b22",
    overlay: "#21262d",
    border: "#30363d",
    text: "#e6edf3",
    muted: "#8b949e",
    subtle: "#6e7681",
    blue: "#58a6ff",
    green: "#3fb950",
    greenBtn: "#3fb950",
    red: "#f85149",
    orange: "#d29922",
    purple: "#bc8cff",
};

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
        </svg>
    );
}

/* ── Hero Octocat (exact ChatGPT asset) ── */
function OctocatHero({ className = "w-full h-auto" }: { className?: string }) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/octocat-writer.png"
            alt="Octocat writing a README"
            className={`${className} object-contain select-none`}
            draggable={false}
        />
    );
}

const MARQUEE_ROW1 = [
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
];

const MARQUEE_ROW2 = [
    { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
];

const MARQUEE_ROW3 = [
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
    { name: "Prisma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
    { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "Sass", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
    { name: "Bun", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg" },
    { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
];

const TEMPLATES = [
    {
        title: "Developer Pro",
        desc: "Vibrant header with typing SVG, stats cards, tech badge grid, and streak graph.",
        badges: [{ label: "POPULAR", color: GH.green }],
    },
    {
        title: "Lead Architect",
        desc: "Structured enterprise layout with high-impact project focus & YAML config block.",
        badges: [{ label: "PROFESSIONAL", color: GH.blue }],
    },
    {
        title: "Power User (Cyberpunk)",
        desc: "Interactive collapsible details, neon badge styling, dark synthwave theme, and live activity metrics.",
        badges: [
            { label: "INTERACTIVE", color: GH.purple },
            { label: "CYBERPUNK", color: GH.purple },
        ],
    },
    {
        title: "Monospace Stack",
        desc: "Ultra clean monospace tech stack and footer with ASCII art styling.",
        badges: [{ label: "MINIMAL", color: GH.text }],
    },
];

const FEATURES = [
    {
        icon: LayoutTemplate,
        title: "Visual Drag & Drop Editor",
        desc: "Build your README block-by-block with live preview. No markdown syntax required.",
        color: GH.blue,
    },
    {
        icon: Zap,
        title: "Instant GitHub Fetch",
        desc: "Pull your avatar, bio, repos, and stats automatically from any GitHub username.",
        color: GH.green,
    },
    {
        icon: Layers,
        title: "300+ Tech Badges",
        desc: "Shields.io badges for every language, framework, tool, and cloud provider.",
        color: GH.purple,
    },
    {
        icon: Star,
        title: "Live Stats Cards",
        desc: "GitHub streak, top languages, contribution graphs, and trophy banners — auto-synced.",
        color: GH.orange,
    },
    {
        icon: Eye,
        title: "Visitor Counter",
        desc: "Track profile views with a live counter badge that updates automatically.",
        color: GH.blue,
    },
    {
        icon: Heart,
        title: "Donation Links",
        desc: "Add Buy Me a Coffee, Patreon, or custom support links directly into your profile.",
        color: GH.red,
    },
    {
        icon: FileCode2,
        title: "One-Click Markdown Export",
        desc: "Copy clean, error-free markdown ready to paste into your GitHub profile repo.",
        color: GH.green,
    },
    {
        icon: Globe,
        title: "Social Link Badges",
        desc: "LinkedIn, Twitter/X, Instagram, portfolio — styled social pills that look native.",
        color: GH.purple,
    },
];

const FAQS = [
    {
        q: "Is ProfileForge completely free to use?",
        a: "Yes. ProfileForge is 100% free and open source. Build unlimited READMEs, export markdown anytime, and self-host if you want — no paywall, no account required.",
    },
    {
        q: "Do I need to know Markdown?",
        a: "No. The visual editor generates valid GitHub-flavored markdown for you. You can still peek at or edit the raw markdown if you prefer.",
    },
    {
        q: "How does GitHub profile fetching work?",
        a: "Enter your GitHub username and we pull public profile data (avatar, bio, popular repos, stats endpoints) to prefill your README. Nothing is stored on our servers without your action.",
    },
    {
        q: "Can I use custom templates?",
        a: "Absolutely. Start from any handcrafted template, then fully customize sections, badges, colors, and widgets in the editor before exporting.",
    },
    {
        q: "Will stats and badges stay up to date?",
        a: "Yes. Stats cards and shields use live endpoints (GitHub APIs / Shields.io), so they refresh whenever someone views your profile README.",
    },
    {
        q: "Where do I put the generated README?",
        a: "Create a public repo named exactly like your GitHub username, add a README.md with the exported content, and it becomes your profile page.",
    },
];

function MarqueeRow({
    items,
    reverse = false,
    duration = 40,
}: {
    items: { name: string; logo: string }[];
    reverse?: boolean;
    duration?: number;
}) {
    const [paused, setPaused] = useState(false);
    const doubled = [...items, ...items, ...items];
    return (
        // Hovering THIS row only pauses it — sibling rows keep moving
        <div
            className="relative overflow-hidden py-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                className="flex w-max gap-3 will-change-transform"
                style={{
                    animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration}s linear infinite`,
                    animationPlayState: paused ? "paused" : "running",
                }}
            >
                {doubled.map((item, i) => (
                    <div
                        key={`${item.name}-${i}`}
                        className="flex flex-col items-center justify-center gap-2 min-w-[92px] h-[92px] rounded-2xl px-3 transition-colors"
                        style={{
                            backgroundColor: GH.surface,
                            border: `1px solid ${GH.border}`,
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.logo} alt={item.name} className="w-8 h-8 object-contain" />
                        <span className="text-[9px] font-bold tracking-wider uppercase" style={{ color: GH.muted }}>
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Page() {
    const router = useRouter();
    const [githubUser, setGithubUser] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const handleFetchProfile = async (e: FormEvent) => {
        e.preventDefault();
        if (!githubUser.trim()) return;
        setIsFetching(true);
        try {
            const mod = await import("@/store/profileStore");
            const store = mod.useProfileStore.getState?.() ?? mod.useProfileStore();
            if (store?.importFromGithub) {
                await store.importFromGithub(githubUser.trim());
            }
        } catch (err) {
            console.warn("profileStore unavailable, opening editor anyway:", err);
        } finally {
            setIsFetching(false);
            router.push("/editor");
        }
    };

    return (
        <div
            className="min-h-screen text-[#e6edf3] font-sans antialiased selection:bg-[#58a6ff]/30 selection:text-white overflow-x-hidden"
            style={{ backgroundColor: GH.canvas }}
        >
            <style
                dangerouslySetInnerHTML={{
                    __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `,
                }}
            />

            {/* ── NAV ── */}
            <header
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
                style={{ backgroundColor: `${GH.canvas}cc`, borderColor: `${GH.border}80` }}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2 shrink-0 group">
                        <span className="text-[#58a6ff] text-2xl leading-none group-hover:rotate-180 transition-transform duration-500 inline-block">
                            ✴
                        </span>
                        <span className="font-extrabold text-[17px] tracking-tight lowercase">profileforge</span>
                    </Link>

                    <nav
                        className="hidden lg:flex items-center gap-7 text-[11px] font-bold tracking-[0.14em] uppercase"
                        style={{ color: GH.muted }}
                    >
                        <a href="#features" className="hover:text-white transition-colors inline-flex items-center gap-1">
                            Features <ChevronDown className="w-3 h-3 opacity-60" />
                        </a>
                        <Link href="/templates" className="hover:text-white transition-colors">
                            Templates
                        </Link>
                        <a href="#faq" className="hover:text-white transition-colors">
                            FAQ
                        </a>
                        <a href="#opensource" className="hover:text-white transition-colors">
                            Open Source
                        </a>
                        <a href="#community" className="hover:text-white transition-colors">
                            Community
                        </a>
                    </nav>

                    <Link href="/editor" className="shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold tracking-wide uppercase text-[#0d1117] cursor-pointer shadow-lg shadow-emerald-500/20"
                            style={{ backgroundColor: GH.greenBtn }}
                        >
                            Launch Editor <ArrowRight className="w-3.5 h-3.5" />
                        </motion.button>
                    </Link>
                </div>
            </header>

            {/* ── HERO ── */}
            <section className="relative pt-28 sm:pt-32 pb-8 sm:pb-10 px-5 sm:px-8 overflow-hidden">
                {/* Grid structure backdrop */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(48, 54, 61, 0.55) 1px, transparent 1px),
              linear-gradient(90deg, rgba(48, 54, 61, 0.55) 1px, transparent 1px)
            `,
                        backgroundSize: "72px 72px",
                        backgroundPosition: "center top",
                        opacity: 0.55,
                        maskImage:
                            "radial-gradient(ellipse 90% 80% at 50% 35%, black 15%, rgba(0,0,0,0.65) 45%, transparent 78%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse 90% 80% at 50% 35%, black 15%, rgba(0,0,0,0.65) 45%, transparent 78%)",
                    }}
                />
                {/* Soft vignette so grid feels built into the hero */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 60% at 70% 40%, rgba(88,166,255,0.06) 0%, transparent 60%)",
                    }}
                />

                <div className="relative max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center min-h-[480px] lg:min-h-[560px]">
                        {/* Left copy */}
                        <div className="z-10">
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45 }}
                                className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-6"
                                style={{ color: GH.blue }}
                            >
                                Visual GitHub Profile README Builder
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: 0.05 }}
                                className="text-[42px] sm:text-[56px] lg:text-[64px] xl:text-[68px] font-semibold tracking-tight leading-[1.05] mb-8"
                                style={{ color: GH.text }}
                            >
                                Stand out on
                                <br />
                                GitHub. Without
                                <br />
                                writing Markdown.
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                                className="flex flex-wrap items-center gap-3"
                            >
                                <Link href="/editor">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-bold tracking-wide uppercase text-[#0d1117] cursor-pointer shadow-xl shadow-emerald-500/25"
                                        style={{ backgroundColor: GH.greenBtn }}
                                    >
                                        Start Building Free <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </Link>
                                <Link href="/templates">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-bold tracking-wide uppercase cursor-pointer"
                                        style={{
                                            backgroundColor: GH.overlay,
                                            border: `1px solid ${GH.border}`,
                                            color: GH.text,
                                        }}
                                    >
                                        Explore 14+ Templates <ArrowRight className="w-4 h-4 opacity-70" />
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right mascot — exact ChatGPT image, large */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
                            className="relative flex justify-center lg:justify-end items-center"
                        >
                            <motion.div 
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[520px] xl:max-w-[560px]"
                            >
                                <div
                                    className="absolute inset-[12%] rounded-full blur-3xl opacity-25 pointer-events-none"
                                    style={{ background: `radial-gradient(circle, ${GH.blue} 0%, transparent 70%)` }}
                                />
                                <OctocatHero className="relative w-full h-auto drop-shadow-2xl scale-105 sm:scale-110" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FETCH BAR (below hero, right-aligned like screenshot) ── */}
            <section className="relative px-5 sm:px-8 pb-20 sm:pb-28">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.3 }}
                        className="lg:ml-auto lg:w-[min(100%,520px)] space-y-5"
                    >
                        <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: GH.muted }}>
                            Visual editor with live HTML preview, instant Shields.io tech badges, GitHub stats cards, and
                            auto-profile fetching. Craft a stunning developer profile README in seconds.
                        </p>

                        <form
                            onSubmit={handleFetchProfile}
                            className="w-full p-2.5 rounded-2xl flex items-center gap-2 shadow-2xl"
                            style={{ backgroundColor: GH.surface, border: `1px solid ${GH.border}` }}
                        >
                            <div className="pl-2.5 text-[#58a6ff] shrink-0">
                                <GithubIcon className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={githubUser}
                                onChange={(e) => setGithubUser(e.target.value)}
                                placeholder="enter github username..."
                                className="flex-1 bg-transparent text-sm px-2 py-2.5 focus:outline-none font-mono min-w-0"
                                style={{ color: GH.text }}
                                autoComplete="off"
                                spellCheck={false}
                            />
                            <button
                                type="submit"
                                disabled={isFetching}
                                className="px-4 sm:px-5 py-2.5 rounded-xl text-white font-bold text-[11px] sm:text-xs uppercase tracking-wide transition-all cursor-pointer flex items-center gap-2 shrink-0 disabled:opacity-50"
                                style={{ backgroundColor: GH.blue }}
                            >
                                {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4" />}
                                <span>{isFetching ? "..." : "Fetch & Build"}</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* ── TEMPLATES ── */}
            <section id="templates" className="py-20 sm:py-28 px-5 sm:px-8" style={{ backgroundColor: GH.canvas }}>
                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="space-y-3">
                        <p className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: GH.muted }}>
                            Handcrafted GitHub README Templates
                        </p>
                        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight" style={{ color: GH.text }}>
                            Learn & build from the best
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {TEMPLATES.map((t, idx) => (
                            <motion.button
                                key={t.title}
                                type="button"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.06 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => router.push("/editor")}
                                className="text-left p-6 rounded-2xl min-h-[260px] flex flex-col justify-between cursor-pointer group transition-all"
                                style={{
                                    backgroundColor: GH.surface,
                                    border: `1px solid ${idx === 2 ? `${GH.blue}55` : GH.border}`,
                                }}
                            >
                                <div>
                                    <h3 className="font-bold text-lg tracking-tight mb-3" style={{ color: GH.text }}>
                                        {t.title}
                                    </h3>
                                    <p className="text-xs leading-relaxed" style={{ color: GH.muted }}>
                                        {t.desc}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {t.badges.map((b) => (
                                        <span
                                            key={b.label}
                                            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md"
                                            style={{ backgroundColor: `${b.color}22`, color: b.color }}
                                        >
                                            {b.label}
                                        </span>
                                    ))}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES INTRO STRIP ── */}
            <section className="px-5 sm:px-8 pb-6" id="features">
                <div className="max-w-7xl mx-auto">
                    <p
                        className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase flex items-center gap-2"
                        style={{ color: GH.blue }}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Features — we got everything that you need !
                    </p>
                </div>
            </section>

            {/* ── FEATURE GRID ── */}
            <section className="py-10 sm:py-16 px-5 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                            Everything you need for a stunning README
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed" style={{ color: GH.muted }}>
                            Our editor gives you unmatched control over your profile. Build visually, copy the markdown, and
                            impress recruiters in minutes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {FEATURES.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <motion.div
                                    key={f.title}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.04 }}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    className="p-6 rounded-2xl space-y-4 transition-all"
                                    style={{ backgroundColor: GH.surface, border: `1px solid ${GH.border}` }}
                                >
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                                        style={{
                                            backgroundColor: `${f.color}18`,
                                            border: `1px solid ${f.color}33`,
                                            color: f.color,
                                        }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-[15px] tracking-tight">{f.title}</h3>
                                    <p className="text-xs leading-relaxed" style={{ color: GH.muted }}>
                                        {f.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Stats strip */}
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { n: "100%", l: "Visual editing" },
                            { n: "300+", l: "Tech badges" },
                            { n: "14+", l: "Templates" },
                            { n: "0", l: "Syntax errors" },
                        ].map((s) => (
                            <div
                                key={s.l}
                                className="rounded-2xl p-6 text-center"
                                style={{ backgroundColor: GH.overlay, border: `1px solid ${GH.border}` }}
                            >
                                <div className="text-3xl sm:text-4xl font-semibold tracking-tight mb-1">{s.n}</div>
                                <div className="text-xs font-medium uppercase tracking-wider" style={{ color: GH.muted }}>
                                    {s.l}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TECH MARQUEE ── */}
            <section className="py-16 sm:py-20 border-y" style={{ borderColor: GH.border }}>
                <div className="max-w-[100vw] space-y-3">
                    <MarqueeRow items={MARQUEE_ROW1} duration={45} />
                    <MarqueeRow items={MARQUEE_ROW2} reverse duration={38} />
                    <MarqueeRow items={MARQUEE_ROW3} duration={50} />
                </div>
            </section>

            {/* ── OPEN SOURCE ── */}
            <section id="opensource" className="py-20 sm:py-28 px-5 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
                        style={{
                            background: `linear-gradient(135deg, ${GH.surface} 0%, ${GH.overlay} 100%)`,
                            border: `1px solid ${GH.border}`,
                        }}
                    >
                        <div className="max-w-xl space-y-4">
                            <div
                                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full"
                                style={{ backgroundColor: `${GH.green}18`, color: GH.green, border: `1px solid ${GH.green}33` }}
                            >
                                <GitBranch className="w-3.5 h-3.5" /> Open Source
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                                Built in the open.
                                <br />
                                Yours to fork.
                            </h2>
                            <p className="text-sm leading-relaxed" style={{ color: GH.muted }}>
                                ProfileForge is free and open source. Star the repo, open issues, ship PRs — help make the best
                                GitHub profile README builder for everyone.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="https://github.com/Aditya-myst/readme"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-[#0d1117]"
                                style={{ backgroundColor: GH.greenBtn }}
                            >
                                <GithubIcon className="w-4 h-4" /> Star on GitHub
                            </a>
                            <Link
                                href="/editor"
                                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold"
                                style={{ backgroundColor: GH.canvas, border: `1px solid ${GH.border}`, color: GH.text }}
                            >
                                Open Editor <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="py-20 sm:py-28 px-5 sm:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12 space-y-4">
                        <span
                            className="inline-flex text-[10px] font-bold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full"
                            style={{
                                backgroundColor: GH.surface,
                                border: `1px solid ${GH.border}`,
                                color: GH.blue,
                            }}
                        >
                            Frequently Asked Questions
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto" style={{ color: GH.muted }}>
                            Everything you need to know about ProfileForge, README generation, and GitHub customization.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((item, i) => {
                            const open = openFaq === i;
                            return (
                                <div
                                    key={item.q}
                                    className="rounded-2xl overflow-hidden transition-colors"
                                    style={{
                                        backgroundColor: GH.surface,
                                        border: `1px solid ${open ? `${GH.blue}66` : GH.border}`,
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(open ? null : i)}
                                        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 cursor-pointer"
                                    >
                                        <span className="font-semibold text-sm sm:text-[15px]">{item.q}</span>
                                        <ChevronDown
                                            className={`w-5 h-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                                            style={{ color: GH.muted }}
                                        />
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {open && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.22 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-5 sm:px-6 pb-5 text-sm leading-relaxed" style={{ color: GH.muted }}>
                                                    {item.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── COMMUNITY CTA ── */}
            <section id="community" className="py-16 px-5 sm:px-8">
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl" style={{ backgroundColor: GH.surface, border: `1px solid ${GH.border}` }}>
                        <Trophy className="w-6 h-6 text-[#d29922]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Ready to ship your profile?</h2>
                    <p className="text-sm sm:text-base max-w-lg mx-auto" style={{ color: GH.muted }}>
                        Join developers who stopped fighting markdown and started shipping profiles that get noticed.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <Link href="/editor">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0d1117] cursor-pointer"
                                style={{ backgroundColor: GH.greenBtn }}
                            >
                                <Terminal className="w-4 h-4" /> Launch Editor
                            </motion.button>
                        </Link>
                        <Link href="/templates">
                            <button
                                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide cursor-pointer"
                                style={{ backgroundColor: GH.surface, border: `1px solid ${GH.border}`, color: GH.text }}
                            >
                                Browse Templates
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer
                className="py-10 px-5 sm:px-8 border-t"
                style={{ borderColor: GH.border, color: GH.subtle }}
            >
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-[11px] font-bold tracking-wider uppercase">
                    <div className="flex items-center gap-2">
                        <span className="text-[#58a6ff] text-base leading-none">✴</span>
                        <span style={{ color: GH.text }}>profileforge</span>
                        <span>© {new Date().getFullYear()}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-5">
                        <Link href="/templates" className="hover:text-[#e6edf3] transition-colors">
                            Templates
                        </Link>
                        <Link href="/editor" className="hover:text-[#e6edf3] transition-colors">
                            Editor
                        </Link>
                        <a href="#faq" className="hover:text-[#e6edf3] transition-colors">
                            FAQ
                        </a>
                        <a
                            href="https://github.com/Aditya-myst/readme"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#e6edf3] transition-colors"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
