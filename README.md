<div align="center">
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/477ce375-1d9b-4036-9475-603a125f738b" />

  <h1 align="center">ProfileForge ✴</h1>

  <p align="center">
    <strong>The Ultimate GitHub Profile README Generator.</strong><br />
    Build, preview, and deploy high-end, outcrowd-inspired GitHub profiles in seconds.
  </p>

  <p align="center">
    <a href="https://github.com/Aditya-myst/readme/stargazers"><img src="https://img.shields.io/github/stars/Aditya-myst/readme?style=for-the-badge&color=58a6ff&logo=github" alt="Stars" /></a>
    <a href="https://github.com/Aditya-myst/readme/network/members"><img src="https://img.shields.io/github/forks/Aditya-myst/readme?style=for-the-badge&color=3fb950&logo=github" alt="Forks" /></a>
    <a href="https://github.com/Aditya-myst/readme/issues"><img src="https://img.shields.io/github/issues/Aditya-myst/readme?style=for-the-badge&color=d29922&logo=github" alt="Issues" /></a>
    <a href="https://github.com/Aditya-myst/readme/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Aditya-myst/readme?style=for-the-badge&color=bc8cff" alt="License" /></a>
  </p>

  <h3>
    <a href="https://readme-psi-virid.vercel.app/">Live Demo</a>
    <span> | </span>
    <a href="#-features">Features</a>
    <span> | </span>
    <a href="#-templates">Templates</a>
    <span> | </span>
    <a href="#-tech-stack">Tech Stack</a>
  </h3>
</div>

---

<div align="center">
  <img width="1917" height="981" src="https://github.com/user-attachments/assets/5939f94b-ee19-42ee-b6c6-4ca42e5fb66e" />
</div>

## 🚀 Overview

**ProfileForge** is a premium, open-source Next.js application designed to eliminate the hassle of writing complex Markdown and wrestling with broken widget APIs. Whether you are an AI Architect, a Web 1.0 Retro fan, or a Minimalist Developer, ProfileForge provides an elite selection of templates with a state-of-the-art live editing experience.

Gone are the days of manually assembling `img.shields.io` URLs or dealing with 503 errors from overloaded stat generators. ProfileForge dynamically compiles working API mirrors, interactive charts, and rich visual elements directly into your repository.

---

## ✨ Features

- ⚡ **Real-Time Split-Pane Editor:** Powered by `@monaco-editor/react`, watch your Markdown render natively with full GitHub-flavored styling in real-time.
- 🎨 **18+ High-End Templates:** Choose from beautifully crafted, outcrowd-inspired templates (Minimal, Developer Pro, Influencer, Polyglot, 90s Retro, Terminal, AI Engineer, and more).
- 🏆 **Integrated Working Widgets:** We've pre-configured the most reliable API mirrors for:
  - Total Stats & Top Languages Cards
  - Contribution Streak Stats
  - Live Visitor View Counters
  - 2D GitHub Contribution Grids (Activity Calendar)
  - Animated Typing Headers (`readme-typing-svg`)
- 🛡️ **Fail-Safe Trophies:** We replaced the globally broken GitHub Trophy APIs with a robust manual trophy selector using custom Shield.io badges.
- 🚀 **1-Click GitHub Deploy:** OAuth integration allows you to push your newly generated `README.md` directly to your `username/username` repository with a single click.
- 📱 **Fully Responsive:** The editor seamlessly adapts to mobile and tablet screens, automatically toggling between configuration panels and preview modes.

---

## 🛠 Tech Stack

ProfileForge is built with a modern, high-performance web stack:

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Editor:** Monaco Editor
- **Markdown Parsing:** Marked + DOMPurify
- **Authentication:** NextAuth.js (GitHub Provider)

---

## 🚦 Getting Started

Want to run ProfileForge locally or contribute? Follow these steps:

### Prerequisites
- Node.js 18.x or later
- npm or pnpm
- A GitHub OAuth App (for NextAuth)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aditya-myst/readme.git
   cd readme
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate_a_random_secret_string"
   GITHUB_ID="your_github_oauth_client_id"
   GITHUB_SECRET="your_github_oauth_client_secret"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see the app in action!

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by the Open Source Community.
</p>
