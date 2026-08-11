import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const fullstack = {
title: "Full-Stack Master",
    category: "Developer",
    description: "Layered breakdown of Frontend, Backend, Database, and DevOps skills.",
    render: (data: ProfileState) => `
${data.showTypingHeader ? `\n<div align="center">\n  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`Hi, I'm ${data.name} 👋`)};${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\n</div>\n` : ''}
<div align="center">
  <h1>⚡ ${data.name} ⚡</h1>
  <h3>${data.tagline}</h3>
  <p>${renderSocialBadges(data)}</p>
</div>

---

### 🌐 System Architecture & Full Stack Overview
${data.about}

#### 🎯 Active Focus Areas:
- 💻 **Frontend:** React, Next.js, TypeScript, Tailwind CSS
- ⚙️ **Backend:** Node.js, Express, Python, REST & GraphQL APIs
- 🗄️ **Databases & Cloud:** PostgreSQL, MongoDB, Redis, AWS, Docker

---

### 🧰 Tech Stack Badges
<p align="left">
  ${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}
</p>

${data.showStats ? `
---

### 📊 GitHub Activity

` : ''}

${renderWidgets(data)}
`.trim()
  };
