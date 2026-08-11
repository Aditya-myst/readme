import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const polyglot = {
title: "Polyglot Badges Showcase",
    category: "Minimal",
    description: "Categorized layout of tech stack badges with a clean intro and stats.",
    render: (data: ProfileState) => `
${data.showTypingHeader ? `\n<div align="center">\n  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`Hi, I'm ${data.name} 👋`)};${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\n</div>\n` : ''}
<div align="center">
  <h1>Hi 👋, I'm ${data.name}</h1>
  <h3>${data.tagline}</h3>
  <br/>
  <p>${data.about}</p>
  <p>${renderSocialBadges(data)}</p>
</div>

---

### 👨‍💻 What I'm doing
- 🔭 I’m currently working on **[${data.workingOnName}](${data.workingOnUrl || '#'})**
- 🌱 I’m currently learning **${data.learning}**
- 💬 Ask me about **${data.askMeAbout}**

---

### 🛠️ Tech Stack & Tools

#### Dev Tools
${renderSkillsBadges(data.selectedSkills, '', data.badgeStyle)}

#### DevOps & Infra
${renderSkillsBadges([], 'pm2, docker, nginx, grafana, windows, linux, vmware', data.badgeStyle)}

#### Remote & Network
${renderSkillsBadges([], 'termius, putty, rdp, filezilla', data.badgeStyle)}

#### Databases
${renderSkillsBadges([], 'sqlite, mysql, mongodb, phpmyadmin, supabase', data.badgeStyle)}

#### Hardware
${renderSkillsBadges([], 'raspberrypi, flipper zero, kvm, ledger, thinkpad', data.badgeStyle)}

---

<div align="center">
  
</div>

${renderWidgets(data)}
`.trim()
  };
