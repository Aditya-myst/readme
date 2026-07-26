import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const pro = {
title: "Developer Pro",
    category: "Popular",
    description: "Vibrant header with typing SVG, stats cards, badge grid, and streak graph.",
    render: (data: ProfileState) => `
<div align="center">
  ${data.showTypingHeader ? `
  <a href="https://github.com/${data.github}">
    <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`Hi, I'm ${data.name} 👋`)};${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=FF4D2D&vCenter=true&size=24" alt="Typing Header" />
  </a>
  ` : `<h1 align="center">Hi 👋, I'm ${data.name}</h1><h3 align="center">${data.tagline}</h3>`}
  
  <p align="center">
    ${renderSocialBadges(data)}
  </p>
</div>

---

### 👨‍💻 About Me
${data.about}

${data.workingOnName ? `- 🔭 **Currently Working On:** [${data.workingOnName}](${data.workingOnUrl || '#'})` : ''}
${data.learning ? `- 🌱 **Learning & Exploring:** ${data.learning}` : ''}
${data.collaborateOn ? `- 👯 **Open For Collaboration:** ${data.collaborateOn}` : ''}
${data.askMeAbout ? `- 💬 **Ask Me About:** ${data.askMeAbout}` : ''}

---

### 🛠 Tech Stack
<p align="left">
  ${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}
</p>

${renderWidgets(data)}
`.trim()
  };
