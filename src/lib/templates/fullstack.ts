import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const fullstack = {
title: "Full-Stack Master",
    category: "Developer",
    description: "Layered breakdown of Frontend, Backend, Database, and DevOps skills.",
    render: (data: ProfileState) => `
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
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=radical&hide_border=true" width="48%" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=radical&hide_border=true" width="48%" />
</p>
` : ''}
`.trim()
  };
