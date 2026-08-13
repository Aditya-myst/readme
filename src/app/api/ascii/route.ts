import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'Developer';
    
    // We fetch the base SVG from the original creator's server dynamically to avoid the insane 40,000 character SVG file size limit and backtick parsing errors in Next.js
    try {
        const res = await fetch(`https://readme.aditya-myst.vercel.app/api/proxy-ascii?username=${username}`);
        if(res.ok) {
           const svg = await res.text();
           return new NextResponse(svg, {
              headers: {
                 'Content-Type': 'image/svg+xml',
                 'Cache-Control': 'public, max-age=3600, s-maxage=3600',
              },
           });
        }
    } catch(e) {
        // fallback
    }

    // basic fallback
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="724" height="883"><text x="14" y="25" fill="#c9d1d9" font-family="monospace">ASCII Portrait for ${username}</text></svg>`;
    
    return new NextResponse(fallbackSvg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
