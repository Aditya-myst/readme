import { ProfileState, TemplateType } from "@/store/profileStore";
import { SKILL_BADGES } from "@/lib/skills";

// Helper to generate tech badges HTML string
const renderSkillsBadges = (selectedSkills: string[], customSkillsStr: string, style: string = 'for-the-badge') => {
  const badgeStyle = style || 'for-the-badge';
  const badgeImgs = selectedSkills
    .map((id) => SKILL_BADGES.find((b) => b.id === id))
    .filter(Boolean)
    .map((b) => {
      const url = b!.badgeUrl.replace(/style=[a-z-]+/g, `style=${badgeStyle}`);
      return `<img src="${url}" alt="${b!.name}" />`;
    });

  if (customSkillsStr && customSkillsStr.trim()) {
    const customList = customSkillsStr.split(',').map(s => s.trim()).filter(Boolean);
    customList.forEach(skill => {
      const encoded = encodeURIComponent(skill);
      badgeImgs.push(`<img src="https://img.shields.io/badge/${encoded}-222222?style=${badgeStyle}&logoColor=white" alt="${skill}" />`);
    });
  }

  return badgeImgs.length > 0 ? badgeImgs.join(' ') : '`JavaScript` | `TypeScript` | `React` | `Node.js`';
};

// Helper for social links
const renderSocialBadges = (data: ProfileState) => {
  const badgeStyle = data.badgeStyle || 'for-the-badge';
  const badges: string[] = [];

  if (data.github) {
    badges.push(`<a href="https://github.com/${data.github}"><img src="https://img.shields.io/badge/GitHub-100000?style=${badgeStyle}&logo=github&logoColor=white" alt="GitHub" /></a>`);
  }
  if (data.linkedin) {
    badges.push(`<a href="https://linkedin.com/in/${data.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=${badgeStyle}&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>`);
  }
  if (data.twitter) {
    badges.push(`<a href="https://twitter.com/${data.twitter}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=${badgeStyle}&logo=twitter&logoColor=white" alt="Twitter" /></a>`);
  }
  if (data.website) {
    badges.push(`<a href="${data.website}"><img src="https://img.shields.io/badge/Website-000000?style=${badgeStyle}&logo=About.me&logoColor=white" alt="Website" /></a>`);
  }
  if (data.devto) {
    badges.push(`<a href="https://dev.to/${data.devto}"><img src="https://img.shields.io/badge/DEV.to-0A0A0A?style=${badgeStyle}&logo=devto&logoColor=white" alt="DEV.to" /></a>`);
  }
  if (data.youtube) {
    badges.push(`<a href="https://youtube.com/@${data.youtube}"><img src="https://img.shields.io/badge/YouTube-FF0000?style=${badgeStyle}&logo=youtube&logoColor=white" alt="YouTube" /></a>`);
  }
  if (data.instagram) {
    badges.push(`<a href="https://instagram.com/${data.instagram}"><img src="https://img.shields.io/badge/Instagram-E4405F?style=${badgeStyle}&logo=instagram&logoColor=white" alt="Instagram" /></a>`);
  }

  return badges.join(' ');
};

// Helper to render all active widgets & analytics
export const renderWidgets = (data: ProfileState) => {
  const parts: string[] = [];

  if (data.showTrophies) {
    parts.push(`
<p align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${data.github}&theme=flat&no-frame=true&column=6" alt="GitHub Trophies" />
</p>`);
  }

  if (data.showStats || data.showTopLangs) {
    parts.push(`
<p align="center">
  ${data.showStats ? `<img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" alt="GitHub Stats" height="170" />` : ''}
  ${data.showTopLangs ? `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=${data.statsTheme}&hide_border=true" alt="Top Languages" height="170" />` : ''}
</p>`);
  }

  if (data.showStreak) {
    parts.push(`
<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=${data.statsTheme}&hide_border=true" alt="GitHub Streak" />
</p>`);
  }

  if (data.showActivityGraph) {
    parts.push(`
<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.github}&theme=react-dark" alt="Activity Graph" />
</p>`);
  }

  if (data.showWakaTime) {
    parts.push(`
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/wakatime?username=${data.wakatimeUser || data.github}&theme=${data.statsTheme}&hide_border=true" alt="WakaTime Stats" />
</p>`);
  }

  if (data.showQuotes) {
    parts.push(`
<p align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${data.statsTheme}" alt="Dev Quote" />
</p>`);
  }

  if (data.showSnake) {
    parts.push(`
<p align="center">
  <img src="https://raw.githubusercontent.com/${data.github}/${data.github}/output/github-contribution-grid-snake.svg" alt="Contribution Snake" />
</p>`);
  }

  if (data.showVisitorCount) {
    parts.push(`
<p align="center">
  <img src="https://profile-counter.glitch.me/${data.github || 'developer'}/count.svg" alt="Visitors Counter" />
</p>`);
  }

  if (parts.length === 0) return '';
  return `\n---\n\n### 📊 GitHub Analytics & Widgets\n${parts.join('\n')}`;
};

export const templates: Record<TemplateType, { title: string; category: string; description: string; render: (data: ProfileState) => string }> = {
  pro: {
    title: "Developer Pro",
    category: "Popular",
    description: "Vibrant header with typing SVG, stats cards, badge grid, and streak graph.",
    render: (data) => `
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
  },

  architect: {
    title: "Lead Architect",
    category: "Professional",
    description: "Structured enterprise layout with high-impact project focus & YAML config block.",
    render: (data) => `
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
  ${data.showStats ? `<img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=dark&hide_border=true" alt="Stats" />` : ''}
  ${data.showTopLangs ? `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=dark&hide_border=true" alt="Langs" />` : ''}
</p>

<p align="center">
  ${renderSocialBadges(data)}
</p>
`.trim()
  },

  influencer: {
    title: "Tech Influencer",
    category: "High Density",
    description: "High-density profile with octocat mascot, quick links & badges.",
    render: (data) => `
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
  <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=tokyonight&hide_border=true" width="48%" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=tokyonight&hide_border=true" width="48%" />
</p>
` : ''}

${data.showVisitorCount ? `
<p align="center">
  👀 <b>Profile Views:</b> <img src="https://profile-counter.glitch.me/${data.github || 'influencer'}/count.svg" alt="Views" align="center" />
</p>` : ''}
`.trim()
  },

  poweruser: {
    title: "Power User (Cyberpunk)",
    category: "Interactive",
    description: "Interactive collapsible details, neon badge styling & dark synthwave theme.",
    render: (data) => `
<p align="center">
  <a href="https://github.com/${data.github}">
    <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(data.name)};${encodeURIComponent(data.tagline)};${encodeURIComponent(data.learning || 'Always Building')}&font=Fira+Code&center=true&width=450&height=50&color=8B5CF6&vCenter=true&pause=1000&size=22" alt="Power User Typing Header" />
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
  ${data.showStreak ? `<p align="center"><img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=synthwave&hide_border=true" alt="Streak" /></p>` : ''}
  ${data.showStats ? `<p align="center"><img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=synthwave&hide_border=true" alt="Stats" /></p>` : ''}
</details>
` : ''}
`.trim()
  },

  minimal: {
    title: "Minimalist Stark",
    category: "Minimal",
    description: "Clean, elegant markdown list focused on typography & zero bloat.",
    render: (data) => `
# Hi there, I'm ${data.name} 👋
### ${data.tagline}

${data.about}

${data.location ? `📍 **Based in:** ${data.location}` : ''}

---

### 🚀 What I'm Up To
${data.workingOnName ? `- 🔭 I’m currently working on [**${data.workingOnName}**](${data.workingOnUrl || '#'})` : ''}
${data.learning ? `- 🌱 I’m currently learning **${data.learning}**` : ''}
${data.collaborateOn ? `- 👯 I’m looking to collaborate on **${data.collaborateOn}**` : ''}
${data.askMeAbout ? `- 💬 Ask me about **${data.askMeAbout}**` : ''}

---

### 🛠️ Tech Stack
${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}

---

### 📫 Connect with Me
${data.website ? `- **Portfolio:** [${data.website}](${data.website})` : ''}
${data.github ? `- **GitHub:** [@${data.github}](https://github.com/${data.github})` : ''}
${data.linkedin ? `- **LinkedIn:** [${data.linkedin}](https://linkedin.com/in/${data.linkedin})` : ''}
${data.twitter ? `- **Twitter/X:** [@${data.twitter}](https://twitter.com/${data.twitter})` : ''}

${data.showVisitorCount ? `\n![Visitor Count](https://profile-counter.glitch.me/${data.github || 'visitor'}/count.svg)` : ''}
`.trim()
  },

  retro: {
    title: "90s Web 1.0 Retro",
    category: "Nostalgic",
    description: "Nostalgic Web 1.0 GIFs, guestbook tables, and marquee graphics.",
    render: (data) => `
<div align="center">
<img src="https://media.giphy.com/media/mXbQ2iqKAqfxK/giphy.gif" width="180" alt="Retro Welcome" />
<br />
<h1>✨ Welcome to ${data.name}'s Homepage ✨</h1>
<h3>${data.tagline}</h3>
<br />
</div>

<p align="center">
  ${data.about}
</p>

<!-- Social Table -->
<table width="100%" align="center">
<tr>
  <td align="center">
    <a href="${data.website || '#'}">
      <strong>Visit My Website</strong>
      <br /><br />
      <p><img alt="Globe" height="60" src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/globe.gif"></p>
    </a>
  </td>
  <td align="center">
    <a href="https://twitter.com/${data.twitter}">
      <strong>Send Me A Tweet</strong>
      <br /><br />
      <p><img height="60" alt="Computer" src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"></p>
    </a>
  </td>
</tr>
</table>

### 🛠️ Favorite Tech & Gadgets
${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}

<br />

<!-- Guestbook -->
### 📖 Guestbook Log
| Name | Status | Message |
|---|---|---|
| 👾 Linus | Certified | Nice profile repository! |
| 🚀 ${data.name} | Owner | ${data.workingOnName ? `Check out my project ${data.workingOnName}!` : 'Welcome to my profile!'} |

<br />

<!-- Footer -->
<div align="center">
<img height="90" alt="Thanks for visiting" width="100%" src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/marquee.svg" />
<br />
${data.showVisitorCount ? `![Visitor Count](https://profile-counter.glitch.me/${data.github || 'retro'}/count.svg)` : ''}
<br />
<img src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/notepad.gif" alt="Site created with Notepad" height="30" />
<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>  
<img src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/ie_logo.gif" alt="Microsoft Internet Explorer" />
<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>  
<img src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/noframes.gif" alt="No Frames" />
</div>
`.trim()
  },

  fullstack: {
    title: "Full-Stack Master",
    category: "Developer",
    description: "Layered breakdown of Frontend, Backend, Database, and DevOps skills.",
    render: (data) => `
<div align="center">
  <h1>⚡ ${data.name} ⚡</h1>
  <h3>${data.tagline}</h3>
  <p>${renderSocialBadges(data)}</p>
</div>

---

### 🌐 System Architecture & Full Stack Overview
${data.about}

#### 🎯 Active Focus Areas:
- 💻 **Frontend:** React, Next.js, TypeScript, Tailwind CSS
- ⚙️ **Backend:** Node.js, Express, Python, REST & GraphQL APIs
- 🗄️ **Databases & Cloud:** PostgreSQL, MongoDB, Redis, AWS, Docker

---

### 🧰 Tech Stack Badges
<p align="left">
  ${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}
</p>

${data.showStats ? `
---

### 📊 GitHub Activity
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=radical&hide_border=true" width="48%" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=radical&hide_border=true" width="48%" />
</p>
` : ''}
`.trim()
  },

  opensource: {
    title: "Open Source Maintainer",
    category: "Open Source",
    description: "Focus on open source contributions, repositories, PRs, and sponsorship badges.",
    render: (data) => `
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
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=dark&hide_border=true" alt="Streak" />
</p>` : ''}
`.trim()
  },

  aiml: {
    title: "AI & ML Researcher",
    category: "Specialized",
    description: "Tailored for AI engineers, data scientists, PyTorch, and machine learning models.",
    render: (data) => `
# 🧠 ${data.name} | AI & ML Engineer
> ${data.tagline}

${data.about}

\`\`\`python
class Developer:
    def __init__(self):
        self.name = "${data.name}"
        self.role = "AI / ML Researcher"
        self.location = "${data.location || 'Remote'}"
        self.current_project = "${data.workingOnName || 'LLM Fine-Tuning'}"
        self.interests = ["Deep Learning", "NLP", "Computer Vision", "LLMs"]

    def get_socials(self):
        return {
            "github": "https://github.com/${data.github}",
            "website": "${data.website}"
        }
\`\`\`

### 🔬 Research Stack & Frameworks
${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}

---

### 📊 GitHub Model Training Stats
<p align="center">
  ${data.showStats ? `<img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=tokyonight&hide_border=true" alt="AI Stats" />` : ''}
</p>
`.trim()
  },

  devops: {
    title: "DevOps & Cloud Specialist",
    category: "Specialized",
    description: "CI/CD pipelines, Docker, Kubernetes, Terraform, and cloud architecture.",
    render: (data) => `
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
  },

  polyglot: {
    title: "Polyglot Badges Showcase",
    category: "Minimal",
    description: "Categorized layout of tech stack badges with a clean intro and stats.",
    render: (data) => `
<div align="center">
  <h1>Hi 👋, I'm ${data.name}</h1>
  <h3>${data.tagline}</h3>
  <br/>
  <p>${data.about}</p>
  <p>${renderSocialBadges(data)}</p>
</div>

---

### 👨‍💻 What I'm doing
- 🔭 I’m currently working on **[${data.workingOnName}](${data.workingOnUrl || '#'})**
- 🌱 I’m currently learning **${data.learning}**
- 💬 Ask me about **${data.askMeAbout}**

---

### 🛠️ Tech Stack & Tools

#### Dev Tools
${renderSkillsBadges(data.selectedSkills, '', data.badgeStyle)}

#### DevOps & Infra
${renderSkillsBadges([], 'pm2, docker, nginx, grafana, windows, linux, vmware', data.badgeStyle)}

#### Remote & Network
${renderSkillsBadges([], 'termius, putty, rdp, filezilla', data.badgeStyle)}

#### Databases
${renderSkillsBadges([], 'sqlite, mysql, mongodb, phpmyadmin, supabase', data.badgeStyle)}

#### Hardware
${renderSkillsBadges([], 'raspberrypi, flipper zero, kvm, ledger, thinkpad', data.badgeStyle)}

---

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}" alt="GitHub Stats" />
</div>
`.trim()
  },

  gamer: {
    title: "Gamer & Streamer Dev",
    category: "Creative",
    description: "Neon cyberpunk gaming theme with Twitch, Discord, and RGB vibes.",
    render: (data) => `
<div align="center">
  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`GAMER & DEV: ${data.name}`)};${encodeURIComponent(data.tagline)}&font=Press+Start+2P&center=true&width=500&height=50&color=00FF66&vCenter=true&size=16" alt="Gamer Header" />
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
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=synthwave&hide_border=true" alt="Streak" />
</p>` : ''}
`.trim()
  },

  designer: {
    title: "UI/UX Creative Engineer",
    category: "Creative",
    description: "Focus on design systems, Figma, frontend aesthetics, and portfolio links.",
    render: (data) => `
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
  },

  student: {
    title: "Academic & Student Scholar",
    category: "Specialized",
    description: "Clean academic layout featuring university studies, internships, and projects.",
    render: (data) => `
# 🎓 ${data.name}
**${data.tagline}**

> ${data.about}

📍 **Location:** ${data.location || 'University Campus'}

---

### 📚 Academic & Project Highlights
- 🎓 **Studies & Focus:** ${data.learning || 'Computer Science & Software Engineering'}
- 🚀 **Current Project:** [${data.workingOnName}](${data.workingOnUrl || '#'})
- 🤝 **Interested In:** ${data.collaborateOn || 'Summer Internships & Open Source'}

### 🛠️ Technical Skills
${renderSkillsBadges(data.selectedSkills, data.customSkills, data.badgeStyle)}

---

### 📫 Let's Connect!
${renderSocialBadges(data)}
`.trim()
  },
  terminal: {
    title: "Terminal Minimalist",
    category: "Minimal",
    description: "Monospace aesthetic inspired by minimalist IDEs. Lowercase text, clean grids, and code blocks.",
    render: (data) => {
      const allSkills = [
        ...data.selectedSkills,
        ...(data.customSkills ? data.customSkills.split(',').map(s => s.trim()) : [])
      ].filter(Boolean);
      
      const skillsHtml = allSkills.length 
        ? allSkills.map(s => `<code>${s.toLowerCase()}</code>`).join(' ')
        : `<code>python</code> <code>typescript</code> <code>react</code> <code>node.js</code>`;

      return `<h2><code>${data.name.toLowerCase()}</code></h2>
<p><code>${data.tagline.toLowerCase()}</code></p>

---

<br/>

### <code>SELECTED WORK</code>

<table>
  <tr>
    <td width="50%" valign="top">
      <b>${data.workingOnName ? data.workingOnName.toLowerCase() : 'student dashboard'}</b><br/><br/>
      Description of the project. Unified interface, task manager, and attendance tracker.<br/><br/>
      <code>react.js</code> <code>typescript</code> <code>tailwind</code>
    </td>
    <td width="50%" valign="top">
      <b>course & module recognition</b><br/><br/>
      ML system classifying academic courses from unstructured input.<br/><br/>
      <code>python</code> <code>sklearn</code> <code>nlp</code>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <b>expense tracker</b><br/><br/>
      Multi-user finance tracker. Smart savings planner and streak tracking.<br/><br/>
      <code>flask</code> <code>postgresql</code> <code>chart.js</code>
    </td>
    <td width="50%" valign="top">
      <b>krypt</b><br/><br/>
      Zero-knowledge password manager. Argon2id key derivation, AES-256-GCM.<br/><br/>
      <code>rust</code> <code>docker</code> <code>redis</code>
    </td>
  </tr>
</table>

<br/>

---

<br/>

### <code>EXPERIENCE</code>

<table width="100%">
  <tr>
    <td width="70%" align="left">
      <b>ambian strategy — full stack developer</b><br/>
      <i>proposalos · scraping pipeline · ai scoring</i>
    </td>
    <td width="30%" align="right">
      <code>june 2026 — present</code>
    </td>
  </tr>
  <tr>
    <td width="70%" align="left">
      <br/>
      <b>vit scope — summer research intern</b><br/>
      <i>bio-inspired hallucination suppression · blockchain audit</i>
    </td>
    <td width="30%" align="right">
      <br/>
      <code>may 2026 — present</code>
    </td>
  </tr>
  <tr>
    <td width="70%" align="left">
      <br/>
      <b>geopacific solutions — billing system developer</b><br/>
      <i>multi-role billing backend · jsonb schema</i>
    </td>
    <td width="30%" align="right">
      <br/>
      <code>may 2025 — july 2025</code>
    </td>
  </tr>
</table>

<br/>

---

<br/>

### <code>STACK</code>

${skillsHtml}

<br/>

---

<p align="left">
  <a href="${data.github ? `https://github.com/${data.github}` : '#' }"><code>github</code></a> · 
  <a href="${data.linkedin ? `https://linkedin.com/in/${data.linkedin}` : '#' }"><code>linkedin</code></a> · 
  <a href="${data.twitter ? `https://twitter.com/${data.twitter}` : '#' }"><code>twitter</code></a>
</p>
`.trim();
    }
  },
  minimalist_mono: {
    title: "Monospace Stack",
    category: "Minimal",
    description: "Ultra clean monospace tech stack and footer with ASCII art styling.",
    render: (data) => `
<h1><code>${data.name.toLowerCase()}</code></h1>
<p><code>${data.tagline.toLowerCase()}</code></p>

<br/>

<h2><code>06  S T A C K</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>~/06-stack</code></h2>
<hr/>
<br/>

<table>
  <tr>
    <td width="20%" valign="top"><b><code>LANGUAGES</code></b></td>
    <td width="80%" valign="top"><code>Swift · TypeScript · JavaScript · Python · Dart · C++</code></td>
  </tr>
  <tr>
    <td width="20%" valign="top"><b><code>MOBILE</code></b></td>
    <td width="80%" valign="top"><code>SwiftUI · WidgetKit · Core Data · Flutter</code></td>
  </tr>
  <tr>
    <td width="20%" valign="top"><b><code>WEB</code></b></td>
    <td width="80%" valign="top"><code>React · Next.js · Node.js · Express · Tailwind</code></td>
  </tr>
  <tr>
    <td width="20%" valign="top"><b><code>DATA</code></b></td>
    <td width="80%" valign="top"><code>PostgreSQL · Supabase · FastAPI · PostGIS · JSONB</code></td>
  </tr>
  <tr>
    <td width="20%" valign="top"><b><code>AI</code></b></td>
    <td width="80%" valign="top"><code>MCP servers · OpenRouter · OpenAI API · AI-native architectures</code></td>
  </tr>
  <tr>
    <td width="20%" valign="top"><b><code>TERMINAL</code></b></td>
    <td width="80%" valign="top"><code>TUI / CLI · Node.js blessed · keyboard-driven workflows</code></td>
  </tr>
  <tr>
    <td width="20%" valign="top"><b><code>TOOLING</code></b></td>
    <td width="80%" valign="top"><code>Git · Docker · Figma · Notion · Postman · Neovim</code></td>
  </tr>
</table>

<br/>
<hr/>
<br/>

<table width="100%">
  <tr>
    <td width="60%" align="left">
      <b><code>◉ STATUS — BUILDING</code></b><br/>
      <code>probably in a terminal, probably past midnight</code>
    </td>
    <td width="40%" align="right">
      <code>${data.website ? data.website.replace('https://', '') : 'your.site'} · ${data.location || 'Location'} · © ${new Date().getFullYear()}</code>
    </td>
  </tr>
</table>
`.trim()
  },
};
