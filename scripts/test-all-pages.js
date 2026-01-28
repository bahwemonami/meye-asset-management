/**
 * Script Playwright pour tester toutes les pages internes
 * Vérifie que toutes les pages utilisent les bons styles et classes
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const MEYE_URL = 'http://localhost:4200';
const OUTPUT_DIR = path.join(__dirname, 'data', 'pages-test');
const REPORT_FILE = path.join(OUTPUT_DIR, 'pages-test-report.json');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const pages = [
  { path: '', name: 'home' },
  { path: '/firm-profile', name: 'firm-profile' },
  { path: '/our-team', name: 'team' },
  { path: '/governance', name: 'governance' },
  { path: '/private-management', name: 'private-management' },
  { path: '/performance', name: 'performance' },
  { path: '/communications', name: 'communications' },
  { path: '/alternative-funds', name: 'alternative-funds' },
  { path: '/contact', name: 'contact' },
];

async function testAllPages() {
  console.log('🔍 Test de toutes les pages MEYE...');
  
  const browser = await chromium.launch({ headless: false });
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: MEYE_URL,
    pages: [],
  };
  
  for (const pageInfo of pages) {
    console.log(`\n📄 Test de la page: ${pageInfo.name} (${pageInfo.path})`);
    
    try {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const url = `${MEYE_URL}${pageInfo.path}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);
      
      // Vérifier les éléments essentiels
      const checks = await page.evaluate(() => {
        const results = {
          hasHeader: !!document.querySelector('header, .site-header'),
          hasFooter: !!document.querySelector('footer, .site-footer'),
          hasMain: !!document.querySelector('main'),
          h1Count: document.querySelectorAll('h1').length,
          h2Count: document.querySelectorAll('h2').length,
          linksCount: document.querySelectorAll('a').length,
          imagesCount: document.querySelectorAll('img').length,
          errors: [],
        };
        
        // Vérifier les classes CSS importantes
        const importantClasses = [
          'hero-section',
          'mission-section',
          'team-preview-section',
          'performance-section',
          'communications-section',
          'page-hero',
          'content-section',
        ];
        
        importantClasses.forEach(className => {
          const elements = document.querySelectorAll(`.${className}`);
          if (elements.length > 0) {
            results[`has${className.replace(/-/g, '')}`] = true;
          }
        });
        
        return results;
      });
      
      // Prendre un screenshot
      const screenshotPath = path.join(OUTPUT_DIR, `${pageInfo.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      
      report.pages.push({
        name: pageInfo.name,
        path: pageInfo.path,
        url,
        status: 'success',
        checks,
        screenshot: screenshotPath,
      });
      
      console.log(`✅ Page ${pageInfo.name} testée avec succès`);
      await page.close();
      
    } catch (error) {
      console.error(`❌ Erreur sur la page ${pageInfo.name}:`, error.message);
      report.pages.push({
        name: pageInfo.name,
        path: pageInfo.path,
        status: 'error',
        error: error.message,
      });
    }
  }
  
  // Sauvegarder le rapport
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  console.log(`\n✅ Rapport sauvegardé dans ${REPORT_FILE}`);
  console.log(`📊 ${report.pages.filter(p => p.status === 'success').length}/${pages.length} pages testées avec succès`);
  
  await browser.close();
}

testAllPages().catch(console.error);
