import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

console.log('🚀 Starting Build Process...');

// 1. Validate source files exist
const requiredFiles = [
  'index.html',
  'css/style.css',
  'js/app.js',
  'js/taskManager.js'
];

for (const relFile of requiredFiles) {
  const filePath = path.resolve(rootDir, relFile);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Build Error: Missing required file "${relFile}"`);
    process.exit(1);
  }
}

// 2. Prepare dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Helper to copy recursive
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 3. Copy static files to dist
copyRecursiveSync(path.resolve(rootDir, 'index.html'), path.resolve(distDir, 'index.html'));
copyRecursiveSync(path.resolve(rootDir, 'css'), path.resolve(distDir, 'css'));
copyRecursiveSync(path.resolve(rootDir, 'js'), path.resolve(distDir, 'js'));

console.log('✅ Assets bundled successfully to ./dist');
console.log('🎉 Build completed cleanly with 0 errors!');
