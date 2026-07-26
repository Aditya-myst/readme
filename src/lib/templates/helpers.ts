import { ProfileState, TemplateType } from "@/store/profileStore";
import { SKILL_BADGES } from "@/lib/skills";

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

