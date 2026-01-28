/**
 * Script Playwright pour tester le responsive sur tous les breakpoints
 * Compare Rivemont et MEYE à différentes tailles d'écran
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'data', 'responsive-test');
const REPORT_FILE = path.join(OUTPUT_DIR, 'responsive-report.json');
const RIVEMONT_URL = 'https://rivemont.ca/';
const MEYE_URL = 'http://localhost:4200';

const BREAKPOINTS = [
  { name: 'mobile', width: 320, height: 568 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop-small', width: 1024, height: 768 },
  { name: 'desktop-medium', width: 1440, height: 900 },
  { name: 'desktop-large', width: 1920, height: 1080 },
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function testResponsive() {
  console.log('📱 Test du responsive Rivemont vs MEYE...');
  
  const browser = await chromium.launch({ headless: false });
  const report = {
    timestamp: new Date().toISOString(),
    rivemontUrl: RIVEMONT_URL,
    meyeUrl: MEYE_URL,
    breakpoints: [],
  };
  
  for (const breakpoint of BREAKPOINTS) {
    console.log(`\n📱 Test du breakpoint ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})...`);
    
    const breakpointReport = {
      name: breakpoint.name,
      width: breakpoint.width,
      height: breakpoint.height,
      rivemont: {},
      meye: {},
      differences: [],
    };
    
    // Test Rivemont
    try {
      const rivemontPage = await browser.newPage();
      await rivemontPage.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await rivemontPage.goto(RIVEMONT_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await rivemontPage.waitForTimeout(3000);
      
      const rivemontMetrics = await rivemontPage.evaluate(() => {
        const header = document.querySelector('header');
        const hero = document.querySelector('.hero-section');
        const mission = document.querySelector('.mission-section');
        const footer = document.querySelector('footer');
        
        return {
          headerHeight: header ? header.offsetHeight : 0,
          heroHeight: hero ? hero.offsetHeight : 0,
          missionPadding: mission ? window.getComputedStyle(mission).padding : '',
          footerHeight: footer ? footer.offsetHeight : 0,
          bodyWidth: document.body.offsetWidth,
          bodyHeight: document.body.offsetHeight,
        };
      });
      
      breakpointReport.rivemont = rivemontMetrics;
      
      // Screenshot
      await rivemontPage.screenshot({
        path: path.join(OUTPUT_DIR, `rivemont-${breakpoint.name}.png`),
        fullPage: true,
      });
      
      await rivemontPage.close();
    } catch (error) {
      console.log(`⚠️ Erreur Rivemont ${breakpoint.name}: ${error.message}`);
      breakpointReport.rivemont = { error: error.message };
    }
    
    // Test MEYE
    try {
      const meyePage = await browser.newPage();
      await meyePage.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await meyePage.goto(MEYE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await meyePage.waitForTimeout(2000);
      
      const meyeMetrics = await meyePage.evaluate(() => {
        const header = document.querySelector('header');
        const hero = document.querySelector('.hero-section');
        const mission = document.querySelector('.mission-section');
        const footer = document.querySelector('footer');
        
        return {
          headerHeight: header ? header.offsetHeight : 0,
          heroHeight: hero ? hero.offsetHeight : 0,
          missionPadding: mission ? window.getComputedStyle(mission).padding : '',
          footerHeight: footer ? footer.offsetHeight : 0,
          bodyWidth: document.body.offsetWidth,
          bodyHeight: document.body.offsetHeight,
        };
      });
      
      breakpointReport.meye = meyeMetrics;
      
      // Comparer les métriques
      if (breakpointReport.rivemont.headerHeight && breakpointReport.meye.headerHeight) {
        const headerDiff = Math.abs(breakpointReport.rivemont.headerHeight - breakpointReport.meye.headerHeight);
        if (headerDiff > 5) {
          breakpointReport.differences.push({
            element: 'header',
            property: 'height',
            rivemont: breakpointReport.rivemont.headerHeight,
            meye: breakpointReport.meye.headerHeight,
            difference: headerDiff,
          });
        }
      }
      
      // Screenshot
      await meyePage.screenshot({
        path: path.join(OUTPUT_DIR, `meye-${breakpoint.name}.png`),
        fullPage: true,
      });
      
      await meyePage.close();
    } catch (error) {
      console.log(`⚠️ Erreur MEYE ${breakpoint.name}: ${error.message}`);
      breakpointReport.meye = { error: error.message };
    }
    
    report.breakpoints.push(breakpointReport);
  }
  
  // Sauvegarder le rapport
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  
  console.log('\n📊 RAPPORT RESPONSIVE');
  console.log('='.repeat(50));
  
  let totalDifferences = 0;
  report.breakpoints.forEach(bp => {
    if (bp.differences.length > 0) {
      totalDifferences += bp.differences.length;
      console.log(`\n${bp.name} (${bp.width}x${bp.height}):`);
      bp.differences.forEach(diff => {
        console.log(`  - ${diff.element}.${diff.property}: Rivemont=${diff.rivemont}, MEYE=${diff.meye}, Diff=${diff.difference}px`);
      });
    }
  });
  
  console.log(`\n✅ Total différences: ${totalDifferences}`);
  console.log(`✅ Rapport sauvegardé dans ${REPORT_FILE}`);
  console.log(`✅ Screenshots sauvegardés dans ${OUTPUT_DIR}`);
  
  await browser.close();
}

testResponsive().catch(console.error);
