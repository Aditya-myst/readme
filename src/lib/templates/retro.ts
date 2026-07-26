import { ProfileState } from "@/store/profileStore";
import { renderSkillsBadges, renderSocialBadges, renderWidgets } from "./helpers";

export const retro = {
title: "90s Web 1.0 Retro",
    category: "Nostalgic",
    description: "Nostalgic Web 1.0 GIFs, guestbook tables, and marquee graphics.",
    render: (data: ProfileState) => `
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
  };
