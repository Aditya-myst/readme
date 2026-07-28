import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const architect = {
title: "Lead Architect",
    category: "Professional",
    description: "Structured enterprise layout with high-impact project focus & YAML config block.",
    render: (data: ProfileState) => `
# 🏛️ ${data.name}
**${data.tagline}**

> ${data.about}

\`\`\`yaml
Location: "${data.location || 'Remote'}"
Status: "Building high-performance software"
Primary Focus: "${data.workingOnName || 'System Design & Engineering'}"
Connect: "${data.website || `github.com/${data.github}`}"
\`\`\`

## 🚀 Key Highlights & Projects
- 📌 **[${data.workingOnName || 'Project Alpha'}](${data.workingOnUrl || '#'})**: High-performance scalable application architecture.
- 🎯 **Current Focus:** ${data.learning || 'Distributed Systems & Cloud Computing'}
- 🤝 **Collaboration:** ${data.collaborateOn || 'Architectural reviews and open source projects'}

## 🛠 Tech Stack Matrix
${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}

---

## 📈 Activity & Insights
<p align="center">
  ${data.showStats ? `<img src="https://denvercoder1-github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=dark&hide_border=true" alt="Stats" />` : ''}
  ${data.showTopLangs ? `<img src="https://denvercoder1-github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=dark&hide_border=true" alt="Langs" />` : ''}
</p>

<p align="center">
  ${renderSocialBadges(data)}
</p>
`.trim()
  };
