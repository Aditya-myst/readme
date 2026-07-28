import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const minimalist_mono = {
title: "Monospace Stack",
    category: "Minimal",
    description: "Ultra clean monospace tech stack, contribution graph, and footer with ASCII art styling.",
    render: (data: ProfileState) => `
${data.showTypingHeader ? `\n<div align="center">\n  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(`Hi, I'm ${data.name} 👋`)};${encodeURIComponent(data.tagline)}&font=Fira+Code&center=true&width=500&height=50&color=58a6ff&vCenter=true&size=22" alt="Typing Header" />\n</div>\n` : ''}
<h1><code>${data.name.toLowerCase()}</code></h1>
<p><code>${data.tagline.toLowerCase()}</code></p>

<br/>

<h2><code>05  A C T I V I T Y</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <code>~/05-activity</code></h2>
<hr/>
<br/>

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.github || 'torvalds'}&theme=react-dark&hide_border=true&bg_color=0d1117&color=58a6ff&line=58a6ff&point=e6edf3" width="100%" alt="Contribution Graph" />
</div>

<br/>
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
  };
