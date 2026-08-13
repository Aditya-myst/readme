import { NextResponse } from 'next/server';
import { Jimp } from 'jimp';

const RAMP = ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' '];
const CHAR_W = 7.74;
const LINE_H = 15;
const CHAR_H = 12.9;
const ROW_DELAY = 0.09;
const FG_LIGHT = '#6e7681';
const FG_DARK = '#c9d1d9';
const FAMILY = "JBMono,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'Developer';

    try {
        const resp = await fetch(`https://github.com/${username}.png?size=80`);
        if (!resp.ok) throw new Error("Failed to fetch avatar");
        const buffer = await resp.arrayBuffer();
        
        const image = await Jimp.read(Buffer.from(buffer));
        image.resize({ w: 60, h: 40 }); 
        image.greyscale();

        let lines: string[] = [];
        for (let y = 0; y < image.bitmap.height; y++) {
            let line = "";
            for (let x = 0; x < image.bitmap.width; x++) {
                const idx = (y * image.bitmap.width + x) * 4;
                const r = image.bitmap.data[idx]; 
                const charIdx = Math.floor((r / 255) * (RAMP.length - 1));
                line += RAMP[charIdx];
            }
            lines.push(line);
        }

        const pad = 14;
        const width = Math.floor(60 * CHAR_W + pad * 2);
        const height = lines.length * LINE_H + pad * 2;

        let p: string[] = [];
        p.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="${FAMILY}">`);
        p.push(`<style>.a{fill:${FG_LIGHT}}@media(prefers-color-scheme:dark){.a{fill:${FG_DARK}}}</style>`);

        lines.forEach((line, i) => {
            const y = pad + i * LINE_H;
            const begin = (i * ROW_DELAY).toFixed(2);
            const end = ((i + 1) * ROW_DELAY).toFixed(2);
            const w = Math.max(line.length, 1) * CHAR_W;
            const safe = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

            p.push(`<clipPath id="c${i}"><rect x="${pad}" y="${y}" height="${LINE_H}" width="0"><animate attributeName="width" from="0" to="${w}" begin="${begin}s" dur="${ROW_DELAY}s" fill="freeze"/></rect></clipPath>`);
            p.push(`<g clip-path="url(#c${i})"><text xml:space="preserve" x="${pad}" y="${y + CHAR_H}" class="a" font-size="${CHAR_H}">${safe}</text></g>`);
            p.push(`<rect y="${y + 1}" width="6" height="${LINE_H - 3}" class="a" opacity="0"><animate attributeName="x" from="${pad}" to="${pad + w}" begin="${begin}s" dur="${ROW_DELAY}s" fill="freeze"/><set attributeName="opacity" to="0.8" begin="${begin}s"/><set attributeName="opacity" to="0" begin="${end}s"/></rect>`);
        });

        p.push(`</svg>`);

        return new NextResponse(p.join('\n'), {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    } catch(e) {
        console.error(e);
        const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="724" height="883"><text x="14" y="25" fill="#c9d1d9" font-family="monospace">ASCII Portrait for ${username}</text></svg>`;
        return new NextResponse(fallbackSvg, {
            headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store' }
        });
    }
}
