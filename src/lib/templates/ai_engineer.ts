import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const ai_engineer = {
title: "AI & ML Architect",
    category: "Specialized",
    description: "High-tech animated layout with waving headers, typing SVG, and complex stats graphs.",
    render: (data: ProfileState) => `
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=250&section=header&text=${encodeURIComponent(data.name)}&fontSize=70&animation=twinkling" alt="${data.name} profile header" />
</p>

<!-- Title -->
<h3 align="center">
    <samp>
        &gt; Hey There!, I am
        <b><a target="_blank" href="${data.linkedin ? `https://linkedin.com/in/${data.linkedin}` : '#' }">${data.name}</a></b>
    </samp>
</h3>
<br>

<p align="center">
<samp>
「 ${data.tagline} 」  
</samp>
</p>

<p align="center">
  ${data.showTypingHeader ? `<img
    src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&pause=1200&color=36BCF7&center=true&vCenter=true&width=900&lines=${encodeURIComponent(data.tagline)};${encodeURIComponent('Building scalable architectures')};${encodeURIComponent('Open Source Contributor')}"
    alt="Typing SVG"
  />` : `<h1>${data.name}</h1>`}
</p>

<p align="center">
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2J1a3Q1cTB0MGg2d2p0Z3g2eTJpY3J3a3Rqd3VzdnE1a2l3a3ZrbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SWoSkN6DxTszqIKEqv/giphy.gif" width="450" alt="Animated machine learning visual">
</p>

<br>

[![divider_arc_reactor](https://raw.githubusercontent.com/HiradEmami/readme-ux-kit/master/assets/dividers/animated/unique_effects/divider_cyber_cycle.svg)](https://github.com/${data.github || 'torvalds'})

# 🛠 Technologies, Projects, and Domains

<table border="0" cellspacing="10" cellpadding="0">
<tr>
<!-- LEFT: TOOLS -->
<td width="500" valign="top" align="center">
<h3>🛠 Technologies</h3>
<br>
${renderSkillsBadges(data.selectedSkills, data.customSkills, 'flat-square')}
</td>

<!-- PROJECTS -->
<td width="300" valign="top" align="center">
<h3>🧪 Core Projects</h3>
<br>
<div style="width:250px; text-align: left;">
  <p><strong><a href="${data.workingOnUrl || '#'}">${data.workingOnName || 'System Portal'}</a></strong><br/>
  Current main focus and development area.</p>
  <p><strong><a href="#">Neural Lab</a></strong><br/>
  AI and Machine learning experiments.</p>
  <p><strong><a href="#">Model Forge</a></strong><br/>
  Distributed model training platform.</p>
</div>
</td>
</tr>
</table>

[![divider_moving_neon_gradient](https://raw.githubusercontent.com/HiradEmami/readme-ux-kit/master/assets/dividers/animated/bars/divider_circuit_pulse_bar.svg)](https://github.com/${data.github || 'torvalds'})

### 📊 Vital Statistics

<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.github || 'torvalds'}&theme=radical" alt="Streak" />
</p>

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.github || 'torvalds'}&theme=react-dark&hide_border=true&bg_color=0d1117&color=bc8cff&line=bc8cff&point=e6edf3" width="100%" alt="Contribution Graph" />
</p>    

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=${data.github || 'torvalds'}&label=PROFILE%20VIEWS&color=36BCF7&style=flat-square" alt="Views" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Code%20Time-3817%20hrs%2020%20mins-blue?style=flat" alt="Code Time" />
</p>

[![divider_twin_serpant](https://raw.githubusercontent.com/HiradEmami/readme-ux-kit/master/assets/dividers/animated/bars/divider_dual_energy_tracks.svg)](https://github.com/${data.github || 'torvalds'})

<table width="100%" border="0" cellspacing="10" cellpadding="0">
<tr>
<!-- LEFT: COLLAB -->
<td width="50%" valign="top">
<h2>🤝 Collaboration</h2>
I’m open to collaborating on:
<ul>
  <li>${data.collaborateOn || 'ML infrastructure projects'}</li>
  <li>Reinforcement learning systems</li>
  <li>Large-scale AI platforms</li>
</ul>
</td>

<!-- RIGHT: CONTACT -->
<td width="50%" valign="top" align="center">
<h2>📫 Contact</h2>
<br>
<a href="${data.website || '#'}">
  <img src="https://img.shields.io/badge/Personal%20Website-Visit_Now-36BCF7?style=for-the-badge&logo=google-chrome" alt="Personal website link">
</a>
<br><br>
<a href="https://twitter.com/${data.twitter || '#'}">
  <img src="https://img.shields.io/badge/Twitter-Follow_Me-blue?style=for-the-badge&logo=twitter" alt="Twitter contact link">
</a>
<br><br>
<a href="https://www.linkedin.com/in/${data.linkedin || '#'}">
  <img src="https://img.shields.io/badge/linkedin-Connect-blue?style=for-the-badge&logo=linkedin" alt="LinkedIn profile link">
</a>
</td>
</tr>
</table>

[![divider_twin_serpant](https://raw.githubusercontent.com/HiradEmami/readme-ux-kit/master/assets/dividers/animated/bars/divider_dual_energy_tracks.svg)](https://github.com/${data.github || 'torvalds'})

<p align="center">
⚡ ${data.about || 'Building scalable AI systems and machine learning infrastructure'}
</p>
<p align="center">
Star ⭐ the repos if they helped you!
</p>
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer&width=100" alt="Profile footer wave"/>
</p>
`.trim()
  };
