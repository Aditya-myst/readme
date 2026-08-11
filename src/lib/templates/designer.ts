import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const designer = {
title: "UI/UX Creative Engineer",
    category: "Creative",
    description: "Focus on design systems, Figma, frontend aesthetics, and portfolio links.",
    render: (data: ProfileState) => `
${data.showTypingHeader ? `\n<div align="center">\n  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`Hi, I'm ${data.name} 👋`)};${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\n</div>\n` : ''}
<div align="center">
  <h1>🎨 ${data.name}</h1>
  <p><b>${data.tagline}</b></p>
  <p>Design Systems • Creative Frontend • UI/UX Design</p>
  <p>${renderSocialBadges(data)}</p>
</div>

---

### ✨ Craft & Vision
${data.about}

- 🎨 **Designing & Building:** [${data.workingOnName}](${data.workingOnUrl || '#'})
- 💡 **Exploring:** ${data.learning || 'Design Tokens & Micro-Animations'}
- 🎯 **Portfolio:** [${data.website}](${data.website})

### 🧰 Creative Toolkit
${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}

${data.showStats ? `
` : ''}

${renderWidgets(data)}
`.trim()
  };
