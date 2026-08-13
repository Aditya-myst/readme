const DOMPurify = require('isomorphic-dompurify');

const html = '<img src="https://denvercoder1-github-readme-stats.vercel.app/api?username=torvalds&show_icons=true" alt="GitHub Stats" height="170" align="center" />';

console.log(DOMPurify.sanitize(html, { ADD_ATTR: ['align', 'target', 'width', 'height', 'valign', 'bgcolor'] }));
