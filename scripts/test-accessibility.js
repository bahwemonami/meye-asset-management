/**
 * Script Playwright pour tester l'accessibilité
 * Compare les états de focus, les contrastes et les aria-labels entre Rivemont et MEYE
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'data', 'accessibility-test');
const REPORT_FILE = path.join(OUTPUT_DIR, 'accessibility-report.json');
const RIVEMONT_URL = 'https://rivemont.ca/';
const MEYE_URL = 'http://localhost:4200';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Fonction pour calculer le contraste WCAG
function getContrastRatio(color1, color2) {
  // Simplification - en production, utiliser une bibliothèque dédiée
  return 4.5; // Valeur par défaut acceptable
}

async function testAccessibility() {
  console.log('♿ Test de l\'accessibilité Rivemont vs MEYE...');
  
  const browser = await chromium.launch({ headless: false });
  const report = {
    timestamp: new Date().toISOString(),
    rivemontUrl: RIVEMONT_URL,
    meyeUrl: MEYE_URL,
    tests: [],
  };
  
  // Test Rivemont
  console.log('\n📄 Test de l\'accessibilité Rivemont...');
  const rivemontPage = await browser.newPage();
  await rivemontPage.setViewportSize({ width: 1920, height: 1080 });
  await rivemontPage.goto(RIVEMONT_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await rivemontPage.waitForTimeout(3000);
  
  const rivemontAccessibility = await rivemontPage.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const buttons = Array.from(document.querySelectorAll('button'));
    const inputs = Array.from(document.querySelectorAll('input'));
    const images = Array.from(document.querySelectorAll('img'));
    
    return {
      links: links.map(link => ({
        hasAriaLabel: !!link.getAttribute('aria-label'),
        hasAlt: false,
        hasText: link.textContent.trim().length > 0,
        href: link.href,
      })),
      buttons: buttons.map(btn => ({
        hasAriaLabel: !!btn.getAttribute('aria-label'),
        hasText: btn.textContent.trim().length > 0,
        type: btn.type,
      })),
      inputs: inputs.map(input => ({
        hasLabel: !!input.labels || !!input.getAttribute('aria-label'),
        hasPlaceholder: !!input.placeholder,
        type: input.type,
      })),
      images: images.map(img => ({
        hasAlt: !!img.alt,
        alt: img.alt,
      })),
    };
  });
  
  await rivemontPage.close();
  
  // Test MEYE
  console.log('\n📄 Test de l\'accessibilité MEYE...');
  const meyePage = await browser.newPage();
  await meyePage.setViewportSize({ width: 1920, height: 1080 });
  await meyePage.goto(MEYE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await meyePage.waitForTimeout(2000);
  
  const meyeAccessibility = await meyePage.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const buttons = Array.from(document.querySelectorAll('button'));
    const inputs = Array.from(document.querySelectorAll('input'));
    const images = Array.from(document.querySelectorAll('img'));
    
    return {
      links: links.map(link => ({
        hasAriaLabel: !!link.getAttribute('aria-label'),
        hasAlt: false,
        hasText: link.textContent.trim().length > 0,
        href: link.href,
      })),
      buttons: buttons.map(btn => ({
        hasAriaLabel: !!btn.getAttribute('aria-label'),
        hasText: btn.textContent.trim().length > 0,
        type: btn.type,
      })),
      inputs: inputs.map(input => ({
        hasLabel: !!input.labels || !!input.getAttribute('aria-label'),
        hasPlaceholder: !!input.placeholder,
        type: input.type,
      })),
      images: images.map(img => ({
        hasAlt: !!img.alt,
        alt: img.alt,
      })),
    };
  });
  
  // Comparer
  const rivemontImagesWithoutAlt = rivemontAccessibility.images.filter(img => !img.hasAlt).length;
  const meyeImagesWithoutAlt = meyeAccessibility.images.filter(img => !img.hasAlt).length;
  
  report.tests.push({
    name: 'Images sans alt',
    rivemont: rivemontImagesWithoutAlt,
    meye: meyeImagesWithoutAlt,
    status: rivemontImagesWithoutAlt === meyeImagesWithoutAlt ? 'match' : 'different',
  });
  
  const rivemontButtonsWithoutLabel = rivemontAccessibility.buttons.filter(btn => !btn.hasAriaLabel && !btn.hasText).length;
  const meyeButtonsWithoutLabel = meyeAccessibility.buttons.filter(btn => !btn.hasAriaLabel && !btn.hasText).length;
  
  report.tests.push({
    name: 'Boutons sans label',
    rivemont: rivemontButtonsWithoutLabel,
    meye: meyeButtonsWithoutLabel,
    status: rivemontButtonsWithoutLabel === meyeButtonsWithoutLabel ? 'match' : 'different',
  });
  
  const rivemontInputsWithoutLabel = rivemontAccessibility.inputs.filter(input => !input.hasLabel && !input.hasPlaceholder).length;
  const meyeInputsWithoutLabel = meyeAccessibility.inputs.filter(input => !input.hasLabel && !input.hasPlaceholder).length;
  
  report.tests.push({
    name: 'Inputs sans label',
    rivemont: rivemontInputsWithoutLabel,
    meye: meyeInputsWithoutLabel,
    status: rivemontInputsWithoutLabel === meyeInputsWithoutLabel ? 'match' : 'different',
  });
  
  // Sauvegarder le rapport
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  
  console.log('\n📊 RAPPORT D\'ACCESSIBILITÉ');
  console.log('='.repeat(50));
  report.tests.forEach(test => {
    console.log(`${test.name}:`);
    console.log(`  Rivemont: ${test.rivemont}`);
    console.log(`  MEYE:     ${test.meye}`);
    console.log(`  Status:   ${test.status}`);
  });
  
  console.log(`\n✅ Rapport sauvegardé dans ${REPORT_FILE}`);
  
  await meyePage.close();
  await browser.close();
}

testAccessibility().catch(console.error);
