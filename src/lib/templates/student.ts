import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const student = {
title: "Academic & Student Scholar",
    category: "Specialized",
    description: "Clean academic layout featuring university studies, internships, and projects.",
    render: (data: ProfileState) => `
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
  };
