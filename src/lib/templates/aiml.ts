import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const aiml = {
title: "AI & ML Researcher",
    category: "Specialized",
    description: "Tailored for AI engineers, data scientists, PyTorch, and machine learning models.",
    render: (data: ProfileState) => `
${data.showTypingHeader ? `\n<div align="center">\n  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`Hi, I'm ${data.name} 👋`)};${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\n</div>\n` : ''}
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
  ${data.showStats ? `<img src="https://denvercoder1-github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=tokyonight&hide_border=true" alt="AI Stats" />` : ''}
</p>
`.trim()
  };
