import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const poweruser = {
title: "Power User (Cyberpunk)",
    category: "Interactive",
    description: "Interactive collapsible details, neon badge styling & dark synthwave theme.",
    render: (data: ProfileState) => `
<p align="center">
  <a href="https://github.com/${data.github}">
    ${data.showTypingHeader ? `<img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(data.name)};${encodeURIComponent(data.tagline)};${encodeURIComponent(data.learning || 'Always Building')}&font=Fira+Code&center=true&width=450&height=50&color=8B5CF6&vCenter=true&pause=1000&size=22" alt="Power User Typing Header" />` : `<h1>${data.name}</h1>`}
  </a>
</p>

<p align="center">
  ${renderSocialBadges(data)}
</p>

<details open>
  <summary><h2>⚡ Quick Overview</h2></summary>
  <p>${data.about}</p>
  <ul>
    ${data.workingOnName ? `<li>🔭 <b>Active Project:</b> <a href="${data.workingOnUrl}">${data.workingOnName}</a></li>` : ''}
    ${data.learning ? `<li>🌱 <b>Learning Curve:</b> ${data.learning}</li>` : ''}
    ${data.collaborateOn ? `<li>👯 <b>Open Source:</b> ${data.collaborateOn}</li>` : ''}
    ${data.askMeAbout ? `<li>💬 <b>Ask Me:</b> ${data.askMeAbout}</li>` : ''}
  </ul>
</details>

<details open>
  <summary><h2>💻 Tech Stack & Tooling</h2></summary>
  <p>
    ${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}
  </p>
</details>

${(data.showStats || data.showStreak) ? `
<details open>
  <summary><h2>📊 Statistics & Metrics</h2></summary>
  ${data.showStreak ? `<p align="center"><img src="https://github-readme-streak-stats-eight.vercel.app/?user=${data.github}&theme=synthwave&hide_border=true" alt="Streak" /></p>` : ''}
  ${data.showStats ? `<p align="center"><img src="https://denvercoder1-github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=synthwave&hide_border=true" alt="Stats" /></p>` : ''}
</details>
` : ''}
`.trim()
  };
