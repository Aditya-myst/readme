import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const terminal = {
title: "Terminal Minimalist",
    category: "Minimal",
    description: "Monospace aesthetic inspired by minimalist IDEs. Lowercase text, clean grids, and code blocks.",
    render: (data: ProfileState) => {
      const allSkills = [
        ...data.selectedSkills,
        ...(data.customSkills ? data.customSkills.split(',').map(s => s.trim()) : [])
      ].filter(Boolean);
      
      const skillsHtml = allSkills.length 
        ? allSkills.map(s => `<code>${s.toLowerCase()}</code>`).join(' ')
        : `<code>python</code> <code>typescript</code> <code>react</code> <code>node.js</code>`;

      return `
${data.showTypingHeader ? `\n<div align="center">\n  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`Hi, I'm ${data.name} 👋`)};${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\n</div>\n` : ''}<h2><code>${data.name.toLowerCase()}</code></h2>
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
  };
