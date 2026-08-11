import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const student = {
title: "Academic & Student Scholar",
    category: "Specialized",
    description: "Clean academic layout featuring university studies, internships, and projects.",
    render: (data: ProfileState) => `
${data.showTypingHeader ? `\n<div align="center">\n  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`Hi, I'm ${data.name} 👋`)};${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\n</div>\n` : ''}
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

${renderWidgets(data)}
`.trim()
  };
