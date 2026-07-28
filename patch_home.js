const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace Launch Editor with Deploy to GitHub in Home Navigation
const replaceNav = `          <Link href="/templates">
            <button className="rounded-full px-5 py-2.5 text-white hover:text-[#FF4D2D] font-medium text-[14px] transition-colors cursor-pointer flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4" /> Explore Templates
            </button>
          </Link>
          <Link href="/editor">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full px-6 py-2.5 bg-[#FF4D2D] text-white hover:bg-[#e03d20] font-medium text-[14px] transition-colors cursor-pointer flex items-center gap-2"
            >
              Deploy to GitHub <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>`;

content = content.replace(/<Link href="\/templates">[\s\S]*?<\/Link>\s*<Link href="\/editor">[\s\S]*?<\/Link>/m, replaceNav);

fs.writeFileSync('src/app/page.tsx', content);
