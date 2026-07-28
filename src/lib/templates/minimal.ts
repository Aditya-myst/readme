import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const minimal = {
title: "Minimalist Stark",
    category: "Minimal",
    description: "Clean, elegant markdown list focused on typography & zero bloat.",
    render: (data: ProfileState) => `
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

${data.showVisitorCount ? `\n![Visitor Count](https://komarev.com/ghpvc/?username=${data.github || "developer"}&style=flat-square&color=blue)` : ''}
`.trim()
  };
