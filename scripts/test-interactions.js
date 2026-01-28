/**
 * Script Playwright pour tester toutes les interactions (hover, click, focus, active)
 * Compare les interactions entre Rivemont et MEYE
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'data', 'interactions-test');
const REPORT_FILE = path.join(OUTPUT_DIR, 'interactions-report.json');
const RIVEMONT_URL = 'https://rivemont.ca/';
const MEYE_URL = 'http://localhost:4200';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const selectorsToTest = [
  { name: 'navLink', selector: 'header nav a:first-child', action: 'hover' },
  { name: 'clientAccessLink', selector: 'header .client-access-link', action: 'hover' },
  { name: 'heroCtaBtn', selector: '.hero-section .hero-cta-btn', action: 'hover' },
  { name: 'missionLink', selector: '.mission-section .link-with-arrow', action: 'hover' },
  { name: 'teamPreviewLink', selector: '.team-preview-section a', action: 'hover' },
  { name: 'performanceLink', selector: '.performance-section a', action: 'hover' },
  { name: 'communicationCard', selector: '.communication-card:first-child', action: 'hover' },
  { name: 'newsletterInput', selector: 'footer input[type="email"]', action: 'focus' },
  { name: 'newsletterButton', selector: 'footer button[type="submit"]', action: 'hover' },
  { name: 'footerNavLink', selector: 'footer nav a:first-child', action: 'hover' },
];

async function testInteractions() {
  console.log('🖱️ Test des interactions Rivemont vs MEYE...');
  
  const browser = await chromium.launch({ headless: false });
  const report = {
    timestamp: new Date().toISOString(),
    rivemontUrl: RIVEMONT_URL,
    meyeUrl: MEYE_URL,
    interactions: [],
  };
  
  // Test Rivemont
  console.log('\n📄 Test des interactions Rivemont...');
  const rivemontPage = await browser.newPage();
  await rivemontPage.setViewportSize({ width: 1920, height: 1080 });
  await rivemontPage.goto(RIVEMONT_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await rivemontPage.waitForTimeout(3000);
  
  const rivemontInteractions = {};
  for (const test of selectorsToTest) {
    try {
      const element = await rivemontPage.$(test.selector);
      if (element) {
        if (test.action === 'hover') {
          await element.hover();
          await rivemontPage.waitForTimeout(500);
        } else if (test.action === 'focus') {
          await element.focus();
          await rivemontPage.waitForTimeout(500);
        }
        
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            transform: computed.transform,
            opacity: computed.opacity,
            borderColor: computed.borderColor,
            boxShadow: computed.boxShadow,
          };
        });
        
        rivemontInteractions[test.name] = {
          selector: test.selector,
          action: test.action,
          styles,
        };
      }
    } catch (error) {
      console.log(`⚠️ ${test.name} non trouvé sur Rivemont: ${error.message}`);
    }
  }
  
  await rivemontPage.close();
  
  // Test MEYE
  console.log('\n📄 Test des interactions MEYE...');
  const meyePage = await browser.newPage();
  await meyePage.setViewportSize({ width: 1920, height: 1080 });
  await meyePage.goto(MEYE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await meyePage.waitForTimeout(2000);
  
  const meyeInteractions = {};
  for (const test of selectorsToTest) {
    try {
      const element = await meyePage.$(test.selector);
      if (element) {
        if (test.action === 'hover') {
          await element.hover();
          await meyePage.waitForTimeout(500);
        } else if (test.action === 'focus') {
          await element.focus();
          await meyePage.waitForTimeout(500);
        }
        
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            transform: computed.transform,
            opacity: computed.opacity,
            borderColor: computed.borderColor,
            boxShadow: computed.boxShadow,
          };
        });
        
        meyeInteractions[test.name] = {
          selector: test.selector,
          action: test.action,
          styles,
        };
      }
    } catch (error) {
      console.log(`⚠️ ${test.name} non trouvé sur MEYE: ${error.message}`);
    }
  }
  
  await meyePage.close();
  
  // Comparer les interactions
  console.log('\n⚖️ Comparaison des interactions...');
  for (const test of selectorsToTest) {
    const rivemont = rivemontInteractions[test.name];
    const meye = meyeInteractions[test.name];
    
    if (!rivemont || !meye) {
      report.interactions.push({
        name: test.name,
        selector: test.selector,
        status: rivemont ? 'missing-meye' : 'missing-rivemont',
      });
      continue;
    }
    
    const differences = [];
    for (const [property, rivemontValue] of Object.entries(rivemont.styles)) {
      const meyeValue = meye.styles[property];
      if (rivemontValue !== meyeValue) {
        differences.push({
          property,
          rivemont: rivemontValue,
          meye: meyeValue,
        });
      }
    }
    
    report.interactions.push({
      name: test.name,
      selector: test.selector,
      action: test.action,
      status: differences.length === 0 ? 'match' : 'different',
      differencesCount: differences.length,
      differences,
    });
  }
  
  // Sauvegarder le rapport
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  
  console.log('\n📊 RAPPORT DES INTERACTIONS');
  console.log('='.repeat(50));
  const matching = report.interactions.filter(i => i.status === 'match').length;
  const different = report.interactions.filter(i => i.status === 'different').length;
  console.log(`Interactions correspondantes: ${matching}/${selectorsToTest.length}`);
  console.log(`Interactions différentes: ${different}/${selectorsToTest.length}`);
  
  if (different > 0) {
    console.log('\n📋 Interactions avec différences:');
    report.interactions
      .filter(i => i.status === 'different')
      .forEach((interaction, index) => {
        console.log(`\n${index + 1}. ${interaction.name} (${interaction.action})`);
        interaction.differences.slice(0, 3).forEach(d => {
          console.log(`   - ${d.property}:`);
          console.log(`     Rivemont: ${d.rivemont}`);
          console.log(`     MEYE:     ${d.meye}`);
        });
      });
  }
  
  console.log(`\n✅ Rapport sauvegardé dans ${REPORT_FILE}`);
  
  await browser.close();
}

testInteractions().catch(console.error);
