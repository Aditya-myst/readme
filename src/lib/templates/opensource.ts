import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const opensource = {
title: "Open Source Maintainer",
    category: "Open Source",
    description: "Focus on open source contributions, repositories, PRs, and sponsorship badges.",
    render: (data: ProfileState) => `
${data.showTypingHeader ? `\n<div align="center">\n  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`Hi, I'm ${data.name} 👋`)};${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\n</div>\n` : ''}
<div align="center">
  <h1>🚀 ${data.name}</h1>
  <p><b>${data.tagline}</b></p>
  <p>
    <a href="https://github.com/${data.github}"><img src="https://img.shields.io/github/followers/${data.github}?style=for-the-badge&logo=github&color=181717" alt="GitHub Followers" /></a>
    <a href="${data.website}"><img src="https://img.shields.io/badge/Sponsor-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white" alt="Sponsor" /></a>
  </p>
</div>

> 👋 ${data.about}

### 💚 Open Source Projects & Contributions
- 📦 **[${data.workingOnName || 'Open Core Project'}](${data.workingOnUrl || '#'})**: Maintained open-source library used by thousands of developers.
- 🤝 **Collaborating On:** ${data.collaborateOn || 'Developer tools & UI ecosystems'}
- 💡 **Help & Support:** ${data.askMeAbout || 'Architecture, PR reviews & code quality'}

### 🛠️ Languages & Frameworks
${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}

${data.showStreak ? `
<p align="center">
  <img src="https://github-readme-streak-stats-eight.vercel.app/?user=${data.github}&theme=dark&hide_border=true" alt="Streak" />
</p>` : ''}
`.trim()
  };
