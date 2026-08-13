const { Jimp } = require("jimp");
const fs = require("fs");

async function generateAscii() {
    const username = "torvalds";
    const resp = await fetch(`https://github.com/${username}.png?size=60`);
    const buffer = await resp.arrayBuffer();
    
    const image = await Jimp.read(Buffer.from(buffer));
    image.resize({ w: 60, h: 30 }); 
    image.greyscale();

    const RAMP = ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' '];
    
    let lines = [];
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

    console.log(lines.join("\n"));
}

generateAscii();
