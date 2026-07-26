import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const designer = {
title: "UI/UX Creative Engineer",
    category: "Creative",
    description: "Focus on design systems, Figma, frontend aesthetics, and portfolio links.",
    render: (data: ProfileState) => `
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
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=radical&hide_border=true" />
</p>` : ''}
`.trim()
  };
