import { ProfileState } from "@/store/profileStore";
import { renderWidgets } from "./helpers";

export const ascii_portfolio = {
    title: "Terminal Hacker (ASCII)",
    category: "Creative",
    description: "Highly customized technical layout featuring ASCII art, SVG text headers, and minimal aesthetic.",
    render: (data: ProfileState) => {
        const heading = (text: string) => `https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(text)}&font=JetBrains+Mono&size=22&color=e6edf3&vCenter=true&width=620&height=40&pause=10000`;
        
        return `
<div align="center">

<img src="https://readme.aditya-myst.vercel.app/api/ascii?username=${data.github || 'developer'}" width="460" alt="${data.name}"/>

<img src="https://denvercoder1-github-readme-stats.vercel.app/api?username=${data.github || 'developer'}&show_icons=true&theme=react-dark&hide_border=true&bg_color=0d1117" width="620" alt="Contributions in the last year"/>

[${data.website ? data.website.replace("https://", "") : "github.com/" + (data.github || "developer")}](${data.website || "https://github.com/" + (data.github || "developer")})  · 
${data.twitter ? `[twitter](https://twitter.com/\${data.twitter})  · ` : ''}
${data.linkedin ? `[linkedin](https://www.linkedin.com/in/\${data.linkedin}/)  · ` : ''}
${data.github ? `[github](https://github.com/\${data.github})` : ''}

</div>

<img src="${heading('about')}" width="620" alt="about"/>

> ${data.tagline}

> ${data.about}

I build fast, test on real users, and kill what doesn't work. Right now that's

**[${data.workingOnName || 'my current project'}](${data.workingOnUrl || '#'})** — ${data.learning || 'building scalable web applications.'}

<img src="${heading('stack')}" width="620" alt="stack"/>

<samp>${data.selectedSkills.join('   ')}   ${data.customSkills.split(',').join('   ')}</samp>

<img src="${heading('projects')}" width="620" alt="projects"/>

**[${data.workingOnName || 'core-engine'}](${data.workingOnUrl || '#'})**  ·  <samp>${data.selectedSkills.slice(0,2).join(', ')}</samp>

Main project I'm currently focused on. Building architecture and features.

**[open-source-tools](https://github.com/${data.github || 'developer'})**  ·  <samp>${data.selectedSkills.slice(2,4).join(', ')}</samp>

Contributions to various open-source developer tools and libraries.

<img src="${heading('about this page')}" width="620" alt="about this page"/>

Every graphic here is styled to match a terminal aesthetic. The headings are drawn via SVG to ensure the JetBrains Mono typeface renders perfectly on any device, as GitHub strips external CSS from READMEs.

Language totals cover public repositories only.

${renderWidgets(data)}
`.trim();
    }
};
