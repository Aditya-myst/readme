import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const gamer = {
title: "Gamer & Streamer Dev",
    category: "Creative",
    description: "Neon cyberpunk gaming theme with Twitch, Discord, and RGB vibes.",
    render: (data: ProfileState) => `
<div align="center">
  ${data.showTypingHeader ? `<img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`GAMER & DEV: ${data.name}`)};${encodeURIComponent(data.tagline)}&font=Press+Start+2P&center=true&width=500&height=50&color=00FF66&vCenter=true&size=16" alt="Gamer Header" />` : `<h1>${data.name}</h1>`}
  <p>${renderSocialBadges(data)}</p>
</div>

---

### 🎮 Player Stats & Bio
${data.about}

- 🕹️ **Maining:** ${data.workingOnName || 'Game Dev & Web Apps'}
- 🏆 **Leveling Up:** ${data.learning || 'Unreal Engine & WebGL'}
- 🎧 **Discord:** ${data.discord || '@gamerdev'}

### 🛡️ Inventory / Equipment Stack
${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}

${data.showStreak ? `
<p align="center">
  <img src="https://github-readme-streak-stats-eight.vercel.app/?user=${data.github}&theme=synthwave&hide_border=true" alt="Streak" />
</p>` : ''}
`.trim()
  };
