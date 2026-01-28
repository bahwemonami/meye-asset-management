const fs = require('fs');
const path = require('path');

// Read the home.html file
const htmlPath = path.join(__dirname, '..', 'cloned-site-html', 'home.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// Extract the base64 font data
const fontMatch = html.match(/src:\s*url\(data:application\/font-woff2;base64,([^)]+)\)/);

if (fontMatch && fontMatch[1]) {
  const base64Data = fontMatch[1];
  const fontBuffer = Buffer.from(base64Data, 'base64');
  
  // Save the font file
  const fontPath = path.join(__dirname, '..', 'src', 'assets', 'rivemont', 'fonts', 'peridot-pe-variable.woff2');
  fs.writeFileSync(fontPath, fontBuffer);
  
  console.log(`Font extracted successfully to: ${fontPath}`);
  console.log(`Font size: ${(fontBuffer.length / 1024).toFixed(2)} KB`);
} else {
  console.error('Could not find font data in HTML file');
}
