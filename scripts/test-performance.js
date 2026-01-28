/**
 * Script Playwright pour comparer les performances
 * Mesure les temps de chargement et la fluidité des animations
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'data', 'performance-test');
const REPORT_FILE = path.join(OUTPUT_DIR, 'performance-report.json');
const RIVEMONT_URL = 'https://rivemont.ca/';
const MEYE_URL = 'http://localhost:4200';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function testPerformance() {
  console.log('⚡ Test des performances Rivemont vs MEYE...');
  
  const browser = await chromium.launch({ headless: false });
  const report = {
    timestamp: new Date().toISOString(),
    rivemontUrl: RIVEMONT_URL,
    meyeUrl: MEYE_URL,
    metrics: {},
  };
  
  // Test Rivemont
  console.log('\n📄 Test des performances Rivemont...');
  const rivemontPage = await browser.newPage();
  await rivemontPage.setViewportSize({ width: 1920, height: 1080 });
  
  const rivemontStartTime = Date.now();
  await rivemontPage.goto(RIVEMONT_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const rivemontLoadTime = Date.now() - rivemontStartTime;
  
  await rivemontPage.waitForTimeout(2000);
  
  const rivemontMetrics = await rivemontPage.evaluate(() => {
    const perfData = window.performance.timing;
    return {
      domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
      loadComplete: perfData.loadEventEnd - perfData.navigationStart,
      resources: performance.getEntriesByType('resource').length,
    };
  });
  
  rivemontMetrics.loadTime = rivemontLoadTime;
  report.metrics.rivemont = rivemontMetrics;
  
  await rivemontPage.close();
  
  // Test MEYE
  console.log('\n📄 Test des performances MEYE...');
  const meyePage = await browser.newPage();
  await meyePage.setViewportSize({ width: 1920, height: 1080 });
  
  const meyeStartTime = Date.now();
  await meyePage.goto(MEYE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  const meyeLoadTime = Date.now() - meyeStartTime;
  
  await meyePage.waitForTimeout(2000);
  
  const meyeMetrics = await meyePage.evaluate(() => {
    const perfData = window.performance.timing;
    return {
      domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
      loadComplete: perfData.loadEventEnd - perfData.navigationStart,
      resources: performance.getEntriesByType('resource').length,
    };
  });
  
  meyeMetrics.loadTime = meyeLoadTime;
  report.metrics.meye = meyeMetrics;
  
  // Comparer
  const differences = [];
  if (Math.abs(rivemontMetrics.loadTime - meyeMetrics.loadTime) > 500) {
    differences.push({
      metric: 'loadTime',
      rivemont: rivemontMetrics.loadTime,
      meye: meyeMetrics.loadTime,
      difference: meyeMetrics.loadTime - rivemontMetrics.loadTime,
    });
  }
  
  report.differences = differences;
  
  // Sauvegarder le rapport
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  
  console.log('\n📊 RAPPORT DE PERFORMANCE');
  console.log('='.repeat(50));
  console.log('Rivemont:');
  console.log(`  Temps de chargement: ${rivemontMetrics.loadTime}ms`);
  console.log(`  DOM Content Loaded: ${rivemontMetrics.domContentLoaded}ms`);
  console.log(`  Load Complete: ${rivemontMetrics.loadComplete}ms`);
  console.log(`  Ressources: ${rivemontMetrics.resources}`);
  console.log('\nMEYE:');
  console.log(`  Temps de chargement: ${meyeMetrics.loadTime}ms`);
  console.log(`  DOM Content Loaded: ${meyeMetrics.domContentLoaded}ms`);
  console.log(`  Load Complete: ${meyeMetrics.loadComplete}ms`);
  console.log(`  Ressources: ${meyeMetrics.resources}`);
  
  if (differences.length > 0) {
    console.log('\n📋 Différences:');
    differences.forEach(diff => {
      console.log(`  ${diff.metric}: Différence de ${diff.difference}ms`);
    });
  }
  
  console.log(`\n✅ Rapport sauvegardé dans ${REPORT_FILE}`);
  
  await meyePage.close();
  await browser.close();
}

testPerformance().catch(console.error);
