const fs = require('fs');
const path = require('path');

const dest = 'public/dotlottie-player.wasm';

// Direct path (npm/yarn)
const direct = 'node_modules/@lottiefiles/dotlottie-web/dist/dotlottie-player.wasm';
if (fs.existsSync(direct)) {
  fs.copyFileSync(direct, dest);
  process.exit(0);
}

// pnpm virtual store
const pnpmDir = 'node_modules/.pnpm';
if (fs.existsSync(pnpmDir)) {
  for (const dir of fs.readdirSync(pnpmDir)) {
    if (dir.startsWith('@lottiefiles+dotlottie-web@')) {
      const src = path.join(pnpmDir, dir, 'node_modules/@lottiefiles/dotlottie-web/dist/dotlottie-player.wasm');
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log('Copied dotlottie-player.wasm from pnpm store');
        process.exit(0);
      }
    }
  }
}

console.warn('dotlottie-player.wasm not found, skipping');
