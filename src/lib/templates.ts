import { ProfileState } from "@/store/profileStore";

export const templates: Record<string, { title: string, render: (data: ProfileState) => string }> = {
    minimal: {
        title: "Minimalist",
        render: (data) => `
# Hi, I'm ${data.name} 👋
## ${data.tagline}

${data.about}

### 🛠 Skills
${data.skills.split(',').map(s => s.trim()).join(' | ')}

### 📫 Connect with me
- **Website:** [${data.website}](${data.website})
- **LinkedIn:** [${data.linkedin}](https://linkedin.com/in/${data.linkedin})
- **Twitter:** [@${data.twitter}](https://twitter.com/${data.twitter})
- **GitHub:** [${data.github}](https://github.com/${data.github})
`.trim()
    },
    pro: {
        title: "Developer Pro",
        render: (data) => `
<h1 align="center">Hi 👋, I'm ${data.name}</h1>
<h3 align="center">${data.tagline}</h3>

<p align="center">
  <a href="${data.website}" target="blank"><img align="center" src="https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=About.me&logoColor=white" alt="Website" /></a>
  <a href="https://linkedin.com/in/${data.linkedin}" target="blank"><img align="center" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="${data.linkedin}" /></a>
  <a href="https://twitter.com/${data.twitter}" target="blank"><img align="center" src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="${data.twitter}" /></a>
</p>

---

### 👨‍💻 About Me
${data.about}

### 🛠 Languages and Tools:
<code>${data.skills}</code>

### 📊 GitHub Stats:
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=radical" alt="${data.name}'s GitHub Stats" />
</p>
<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=radical" alt="${data.name}'s GitHub Streak" />
</p>
`.trim()
    },
    influencer: {
        title: "Influencer",
        render: (data) => `
<p align="center">
  <img src="https://gpvc.arturio.dev/${data.github}" alt="profile views"> •  
  <a href="https://twitter.com/intent/follow?screen_name=${data.twitter}"><img src="https://img.shields.io/twitter/follow/${data.twitter}?label=%40${data.twitter}&style=social"></a> •
  <a href="${data.website}">Website / Blog</a> •
  <a href="https://linkedin.com/in/${data.linkedin}">LinkedIn</a> •
  <a href="https://github.com/${data.github}">Work README</a>
</p>

---

I'm currently working as a **${data.tagline.split('|')[0] || data.tagline}**. ${data.about} 

<a href="https://github.com/${data.github}">
  <img align="right" src="https://myoctocat.dev/assets/images/base-octocat.svg" width=200 />
</a>

- 👯 I am open to collaborating on **${data.skills}**.
- 💬 Ask me about **tech, career growth, and code**.
- 📫 How to reach me: Twitter [@${data.twitter}](https://twitter.com/${data.twitter})

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=default" width="48%" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=default" width="48%" />
</p>
`.trim()
    },
    poweruser: {
        title: "Power User",
        render: (data) => `
<p align="center">
  <!-- Typing SVG -->
  <a href="https://github.com/${data.github}">
    <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(data.tagline)};${encodeURIComponent(data.skills.split(',')[0] || 'Code')}&font=Fira%20Code&center=true&width=440&height=45&color=f75c7e&vCenter=true&pause=1000&size=22" />
  </a>
</p>

<!-- Social icons section -->
<p align="center">
  <a href="https://www.linkedin.com/in/${data.linkedin}/"><img width="32px" alt="LinkedIn" title="LinkedIn" src="https://i.imgur.com/yRpa1dQ.png"/></a>
  &#8287;&#8287;
  <a href="https://twitter.com/${data.twitter}"><img width="32px" alt="Twitter" title="Twitter" src="https://i.imgur.com/AixJgnm.png"/></a>
  &#8287;&#8287;
  <a href="${data.website}"><img width="32px" alt="Website" title="Website" src="https://i.imgur.com/mVm29vK.png"></a>
</p>

<details open> 
  <summary><h2>🛠️ My Favorite Tools</h2></summary>
  <p>
      <a href="#"><img alt="Tool 1" src="https://img.shields.io/badge/-${encodeURIComponent(data.skills.split(',')[0] || 'Code')}-14354C.svg?style=flat&logoColor=white"></a>
      <a href="#"><img alt="Tool 2" src="https://img.shields.io/badge/-${encodeURIComponent(data.skills.split(',')[1] || 'Web')}-007ACC.svg?style=flat&logoColor=white"></a>
  </p>
</details>

<details open> 
  <summary><h2>📊 Stats and Activity</h2></summary>
  <h3>🔥 Streak Stats</h3>
  <p><img alt="${data.name}'s streak" src="https://github-readme-streak-stats-eight.vercel.app/?user=${data.github}&theme=monokai-metallian&hide_border=true&short_numbers=true"/></p>

  <h3>💻 GitHub Profile Stats</h3>
  <img alt="${data.name}'s Github Stats" src="https://denvercoder1-github-readme-stats.vercel.app/api/?username=${data.github}&show_icons=true&theme=react&hide_border=true&bg_color=1F222E&title_color=F85D7F&icon_color=F8D866" height="192px"/>
</details>
`.trim()
    },
    retro: {
      title: "90s Retro",
      render: (data) => `
<div align="center">
<img src="https://media.giphy.com/media/mXbQ2iqKAqfxK/giphy.gif" width="200" alt="Retro Welcome" />
<br />
<h1>Welcome to ${data.name}'s Homepage</h1>
<br />
</div>

<!-- Social -->
<table width="100%" align="center">
<tr>
  <td align="center">
    <a href="${data.website}">
      <strong>Visit my personal website </strong>
      <br /><br />
      <p><img alt="Globe" height="80" src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/globe.gif"></p>
    </a>
  </td>
  <td align="center">
    <a href="https://twitter.com/${data.twitter}">
      <strong>Send me a Tweet</strong>
      <br /><br />
      <p><img height="80" alt="Computer" src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"></p>
    </a>
  </td>
</tr>
</table>

<div align="center">
<a href="https://github.com/${data.github}/${data.github}/issues/new"><img src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/guestbook.svg"></a> 
</div>

<!-- Guestbook -->
| Name | Date | Message |
|---|---|---|
| <a href="https://github.com/torvalds"><img width="24" src="https://avatars.githubusercontent.com/u/1024025?v=4" alt="Linus" /> Linus</a> |7/15/2026, 11:03:06 AM|Nice profile repo :]|
| <a href="https://github.com/${data.github}"><img width="24" src="https://avatars.githubusercontent.com/u/9919?v=4" alt="You" /> You</a> |6/30/2026, 1:28:27 PM|Welcome to my guestbook!|

<!-- Footer -->
<div align="center">
<img height="120" alt="Thanks for visiting me" width="100%" src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/marquee.svg" />
<br />
![Visitor Count](https://profile-counter.glitch.me/${data.github}/count.svg)
<br />
<img src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/notepad.gif" alt="Site created with Notepad" height="30" />
<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>  
<img src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/ie_logo.gif" alt="Microsoft Internet Explorer" />
<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>  
<img src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/noframes.gif" alt="No Frames" />
</div>
`.trim()
  }
};
