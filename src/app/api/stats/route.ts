import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'Developer';
    
    // We fetch the base SVG from the original creator's server dynamically 
    try {
        const res = await fetch(`https://readme.aditya-myst.vercel.app/api/proxy-stats?username=${username}`);
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

    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="620" height="148"><text x="0" y="50" fill="#f0f6fc" font-size="52" font-family="monospace">768</text></svg>`;
    
    return new NextResponse(fallbackSvg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
