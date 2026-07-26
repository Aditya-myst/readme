import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const devops = {
title: "DevOps & Cloud Specialist",
    category: "Specialized",
    description: "CI/CD pipelines, Docker, Kubernetes, Terraform, and cloud architecture.",
    render: (data: ProfileState) => `
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
  <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=nord&hide_border=true" />
</p>` : ''}
`.trim()
  };
