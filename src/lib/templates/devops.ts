import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const devops = {
title: "DevOps & Cloud Specialist",
    category: "Specialized",
    description: "CI/CD pipelines, Docker, Kubernetes, Terraform, and cloud architecture.",
    render: (data: ProfileState) => `
${data.showTypingHeader ? `\n<div align="center">\n  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`Hi, I'm ${data.name} 👋`)};${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\n</div>\n` : ''}
<h1 align="center">☁️ ${data.name} | DevOps & Infrastructure</h1>
<p align="center"><code>Automation</code> • <code>Kubernetes</code> • <code>CI/CD</code> • <code>Terraform</code></p>

<p align="center">
  ${renderSocialBadges(data)}
</p>

---

### ⚙️ Pipeline Overview
${data.about}

- 🐳 **Infrastructure Focus:** ${data.workingOnName || 'Kubernetes Cluster & GitOps Setup'}
- ⚡ **Automating:** ${data.learning || 'CI/CD Pipelines & Cloud Scalability'}
- 🛡️ **Ask Me About:** ${data.askMeAbout || 'Docker, AWS, Terraform & Kubernetes'}

### 🛠️ Infrastructure & Tools Stack
${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}

${data.showStats ? `
<p align="center">
  <img src="https://denvercoder1-github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=nord&hide_border=true" />
</p>` : ''}
`.trim()
  };
