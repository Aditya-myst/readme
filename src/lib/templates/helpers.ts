import { ProfileState, TemplateType } from "@/store/profileStore";
import { SKILL_BADGES } from "@/lib/skills";

export const TROPHY_OPTIONS = [
  { id: 'github-stars', label: '100+ Stars', color: 'FFD700' },
  { id: 'commits', label: '1,000+ Commits', color: '4CAF50' },
  { id: 'pull-requests', label: '100+ PRs Merged', color: '2196F3' },
  { id: 'issues', label: 'Bug Hunter', color: 'F44336' },
  { id: 'repositories', label: '50+ Repos', color: '9C27B0' },
  { id: 'followers', label: '100+ Followers', color: 'FF9800' },
  { id: 'open-source', label: 'OS Contributor', color: '00BCD4' },
  { id: 'pro', label: 'Pro Developer', color: '607D8B' },
  { id: 'streak', label: 'Streak Master', color: 'FF5722' },
  { id: 'reviews', label: 'Code Reviewer', color: '795548' }
];

// Helper to generate tech badges HTML string
export const renderSkillsBadges = (selectedSkills: string[], customSkillsStr: string, style: string = 'for-the-badge') => {
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
export const renderSocialBadges = (data: ProfileState) => {
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
    if (data.selectedTrophies && data.selectedTrophies.length > 0) {
      const trophyBadges = data.selectedTrophies.map(id => {
        const t = TROPHY_OPTIONS.find(x => x.id === id);
        if (!t) return '';
        return `<img src="https://img.shields.io/badge/🏆_${encodeURIComponent(t.label)}-${t.color}?style=for-the-badge" alt="${t.label}" />`;
      }).filter(Boolean).join(' ');

      parts.push(`
<p align="center">
  ${trophyBadges}
</p>`);
    } else {
      parts.push(`
<p align="center">
  <i>(Select trophies from the editor)</i>
</p>`);
    }
  }

  if (data.showStats || data.showTopLangs) {
    parts.push(`
<p align="center">
  ${data.showStats ? `<img src="https://denvercoder1-github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=${data.statsTheme}&hide_border=true" alt="GitHub Stats" height="170" />` : ''}
  ${data.showTopLangs ? `<img src="https://denvercoder1-github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=${data.statsTheme}&hide_border=true" alt="Top Languages" height="170" />` : ''}
</p>`);
  }

  if (data.showStreak) {
    parts.push(`
<p align="center">
  <img src="https://github-readme-streak-stats-eight.vercel.app/?user=${data.github}&theme=${data.statsTheme}&hide_border=true" alt="GitHub Streak" />
</p>`);
  }

  if (data.showActivityGraph) {
    parts.push(`
<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.github}&theme=react-dark" alt="Activity Graph" />
</p>`);
  }


  if (data.showQuotes) {
    parts.push(`
<p align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${data.statsTheme}" alt="Dev Quote" />
</p>`);
  }

  if (data.showGithubChart) {
    parts.push(`
<p align="center">
  <img src="https://ghchart.rshah.org/${data.github || 'torvalds'}" alt="Contribution Graph" />
</p>`);
  }

  if (data.showVisitorCount) {
    parts.push(`
<p align="center">
  <img src="https://komarev.com/ghpvc/?username=${data.github || "developer"}&style=flat-square&color=blue" alt="Visitors Counter" />
</p>`);
  }

  if (parts.length === 0) return '';
  return `\n---\n\n### 📊 GitHub Analytics & Widgets\n${parts.join('\n')}`;
};

