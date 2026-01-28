/**
 * Script Playwright pour prendre des screenshots comparatifs
 * Compare visuellement Rivemont et MEYE section par section
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'data', 'screenshots');
const RIVEMONT_URL = 'https://rivemont.ca/';
const MEYE_URL = 'http://localhost:4200'; // À adapter

// Créer le dossier screenshots s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function takeScreenshots() {
  console.log('📸 Démarrage des screenshots comparatifs...');
  
  const browser = await chromium.launch({ headless: false });
  
  // Screenshots de Rivemont
  console.log('📸 Screenshots Rivemont...');
  const rivemontPage = await browser.newPage();
  await rivemontPage.setViewportSize({ width: 1920, height: 1080 });
  await rivemontPage.goto(RIVEMONT_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await rivemontPage.waitForTimeout(5000);
  
  // Screenshot complet
  await rivemontPage.screenshot({ 
    path: path.join(OUTPUT_DIR, 'rivemont-fullpage.png'),
    fullPage: true 
  });
  
  // Screenshots par section
  const sections = [
    { name: 'header', selector: 'header' },
    { name: 'hero', selector: '.hero-section' },
    { name: 'mission', selector: '.mission-section' },
    { name: 'team-preview', selector: '.team-preview-section' },
    { name: 'performance', selector: '.performance-section' },
    { name: 'communications', selector: '.communications-section' },
    { name: 'footer', selector: 'footer' },
  ];
  
  for (const section of sections) {
    try {
      const element = await rivemontPage.$(section.selector);
      if (element) {
        await element.screenshot({ 
          path: path.join(OUTPUT_DIR, `rivemont-${section.name}.png`) 
        });
      }
    } catch (e) {
      console.log(`⚠️ Section ${section.name} non trouvée sur Rivemont`);
    }
  }
  
  await rivemontPage.close();
  
  // Screenshots de MEYE
  console.log('📸 Screenshots MEYE...');
  const meyePage = await browser.newPage();
  await meyePage.setViewportSize({ width: 1920, height: 1080 });
  await meyePage.goto(MEYE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await meyePage.waitForTimeout(3000);
  
  // Screenshot complet
  await meyePage.screenshot({ 
    path: path.join(OUTPUT_DIR, 'meye-fullpage.png'),
    fullPage: true 
  });
  
  // Screenshots par section
  for (const section of sections) {
    try {
      const element = await meyePage.$(section.selector);
      if (element) {
        await element.screenshot({ 
          path: path.join(OUTPUT_DIR, `meye-${section.name}.png`) 
        });
      }
    } catch (e) {
      console.log(`⚠️ Section ${section.name} non trouvée sur MEYE`);
    }
  }
  
  await meyePage.close();
  
  console.log(`✅ Screenshots sauvegardés dans ${OUTPUT_DIR}`);
  console.log('💡 Comparez les images côte à côte pour identifier les différences visuelles');
  
  await browser.close();
}

takeScreenshots().catch(console.error);
