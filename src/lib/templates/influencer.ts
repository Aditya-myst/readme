import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const influencer = {
title: "Tech Influencer",
    category: "High Density",
    description: "High-density profile with octocat mascot, quick links & badges.",
    render: (data: ProfileState) => `
<p align="center">
  <a href="https://github.com/${data.github}"><img src="https://img.shields.io/github/followers/${data.github}?label=Followers&style=social" alt="Followers" /></a> • 
  <a href="https://twitter.com/intent/follow?screen_name=${data.twitter}"><img src="https://img.shields.io/twitter/follow/${data.twitter}?label=%40${data.twitter}&style=social" alt="Twitter" /></a> •
  ${data.website ? `<a href="${data.website}">Website</a> •` : ''}
  <a href="https://github.com/${data.github}">GitHub Profile</a>
</p>

---

<a href="https://github.com/${data.github}">
  <img align="right" src="https://raw.githubusercontent.com/octocat/Octocat-Pro-Files/master/octocats/Terracotta-Octocat.png" width="180" alt="Octocat" />
</a>

## Hey! I'm ${data.name} ⚡

**${data.tagline}**

${data.about}

- 🔭 Working on: **[${data.workingOnName || 'Cool Projects'}](${data.workingOnUrl || '#'})**
- 🌱 Exploring: **${data.learning || 'New Technologies'}**
- 💬 Ask me about: **${data.askMeAbout || 'Tech & Engineering'}**
- 📫 Reach me on Twitter: **[@${data.twitter}](${data.twitter ? `https://twitter.com/${data.twitter}` : '#'})**

<br />

### 🧰 Primary Technologies
${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}

---

${data.showStats ? `
<p align="center">
  <img src="https://denvercoder1-github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=tokyonight&hide_border=true" width="48%" />
  <img src="https://denvercoder1-github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=tokyonight&hide_border=true" width="48%" />
</p>
` : ''}

${data.showVisitorCount ? `
<p align="center">
  👀 <b>Profile Views:</b> <img src="https://komarev.com/ghpvc/?username=${data.github || "developer"}&style=flat-square&color=blue" alt="Views" align="center" />
</p>` : ''}
`.trim()
  };
