const fs = require('fs');
const glob = require('fs').globSync || require('child_process').execSync;
const path = require('path');

const filesToUpdate = require('child_process').execSync('dir /s /b src\\*.astro').toString().split('\r\n').filter(Boolean);

let updatedFiles = 0;

for (const file of filesToUpdate) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace px-12 with px-6 md:px-12 lg:px-20 xl:px-32
  // We need to be careful with overlaps, but since it's tailwind, it's fairly safe
  // We'll use regex to match class attributes containing px-12 or px-10
  
  content = content.replace(/px-12\b/g, 'px-6 md:px-12 lg:px-20 xl:px-32');
  content = content.replace(/px-10\b/g, 'px-5 md:px-10 lg:px-16 xl:px-24');

  // Also need to adjust main grids for mobile
  // LecturePage.astro: grid grid-cols-[220px_1fr_200px] -> grid grid-cols-1 md:grid-cols-[220px_1fr_200px]
  if (file.includes('LecturePage.astro')) {
    content = content.replace(/grid grid-cols-\[220px_1fr_200px\]/g, 'grid grid-cols-1 md:grid-cols-[1fr_200px] lg:grid-cols-[220px_1fr_200px]');
    content = content.replace(/aside class="border-r/g, 'aside class="hidden lg:block border-r');
    content = content.replace(/aside class="border-l/g, 'aside class="hidden md:block border-l');
  }

  // TpPage.astro: grid grid-cols-[1fr_280px]
  if (file.includes('TpPage.astro')) {
    content = content.replace(/grid grid-cols-\[1fr_280px\]/g, 'grid grid-cols-1 md:grid-cols-[1fr_280px]');
    content = content.replace(/aside class="py-10/g, 'aside class="hidden md:block py-10');
    // For TpPage we also have px-13, let's make it responsive
    content = content.replace(/px-13\b/g, 'px-6 md:px-13 lg:px-20');
  }

  // Navbar: flex items-center justify-between
  // Hide top links on mobile, we can do hidden md:flex for the nav links
  if (file.includes('Navbar.astro')) {
    content = content.replace(/<div class="flex gap-7">/, '<div class="hidden md:flex gap-7">');
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    updatedFiles++;
  }
}

console.log(`Updated ${updatedFiles} files with responsive classes.`);
