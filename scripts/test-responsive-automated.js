/**
 * Script Playwright automatisé pour tester le responsive sur tous les breakpoints
 * Teste toutes les pages principales et vérifie les problèmes de responsive
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'data', 'responsive-test-automated');
const REPORT_FILE = path.join(OUTPUT_DIR, 'responsive-test-report.json');
const MEYE_URL = process.env.MEYE_URL || 'http://localhost:4200';

// Breakpoints à tester (basés sur _tokens.scss)
const BREAKPOINTS = [
  { name: 'xxs', width: 320, height: 568 },
  { name: 'xs', width: 568, height: 800 },
  { name: 'mobile-sm', width: 640, height: 900 },
  { name: 'mobile', width: 768, height: 1024 },
  { name: 'sm', width: 968, height: 1200 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'md', width: 1189, height: 800 },
  { name: 'md-lg', width: 1200, height: 900 },
  { name: 'lg', width: 1400, height: 1000 },
  { name: 'xl', width: 1600, height: 1200 },
  { name: 'desktop-large', width: 1920, height: 1080 },
];

// Pages à tester
const PAGES = [
  { path: '/', name: 'home' },
  { path: '/contact', name: 'contact' },
  { path: '/private-management', name: 'private-management' },
  { path: '/performance', name: 'performance' },
  { path: '/financial-planning', name: 'financial-planning' },
  { path: '/firm-profile', name: 'firm-profile' },
  { path: '/our-team', name: 'team' },
  { path: '/alternative-funds', name: 'alternative-funds' },
  { path: '/alternative-funds/fonds-meye-crypto', name: 'crypto-fund' },
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function testPageResponsive(page, url, breakpoint) {
  const results = {
    url,
    breakpoint: breakpoint.name,
    width: breakpoint.width,
    height: breakpoint.height,
    issues: [],
    metrics: {},
  };

  try {
    await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Vérifier le débordement horizontal
    const horizontalScroll = await page.evaluate(() => {
      return {
        bodyScrollWidth: document.body.scrollWidth,
        bodyClientWidth: document.body.clientWidth,
        hasHorizontalScroll: document.body.scrollWidth > document.body.clientWidth,
        windowInnerWidth: window.innerWidth,
      };
    });

    results.metrics.horizontalScroll = horizontalScroll;

    if (horizontalScroll.hasHorizontalScroll) {
      results.issues.push({
        type: 'horizontal-overflow',
        severity: 'high',
        message: `Débordement horizontal détecté: scrollWidth=${horizontalScroll.bodyScrollWidth}px, clientWidth=${horizontalScroll.bodyClientWidth}px`,
      });
    }

    // Vérifier les éléments critiques
    const criticalElements = await page.evaluate(() => {
      const elements = {};
      
      // Header
      const header = document.querySelector('#site-header');
      if (header) {
        const rect = header.getBoundingClientRect();
        elements.header = {
          exists: true,
          width: rect.width,
          height: rect.height,
          isVisible: rect.width > 0 && rect.height > 0,
          overflow: window.getComputedStyle(header).overflow,
        };
      } else {
        elements.header = { exists: false };
      }

      // Footer
      const footer = document.querySelector('#site-footer, .site-footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        elements.footer = {
          exists: true,
          width: rect.width,
          height: rect.height,
          isVisible: rect.width > 0 && rect.height > 0,
        };
      } else {
        elements.footer = { exists: false };
      }

      // Hero section
      const hero = document.querySelector('.section-hero, .template-part-hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        elements.hero = {
          exists: true,
          width: rect.width,
          height: rect.height,
          isVisible: rect.width > 0 && rect.height > 0,
        };
      } else {
        elements.hero = { exists: false };
      }

      // Boutons
      const buttons = document.querySelectorAll('.gl-button');
      elements.buttons = {
        count: buttons.length,
        visible: Array.from(buttons).filter(btn => {
          const rect = btn.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        }).length,
      };

      // Formulaires
      const forms = document.querySelectorAll('form');
      elements.forms = {
        count: forms.length,
        visible: Array.from(forms).filter(form => {
          const rect = form.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        }).length,
      };

      return elements;
    });

    results.metrics.elements = criticalElements;

    // Vérifier les problèmes spécifiques
    if (criticalElements.header && criticalElements.header.exists && !criticalElements.header.isVisible) {
      results.issues.push({
        type: 'header-hidden',
        severity: 'high',
        message: 'Le header n\'est pas visible',
      });
    }

    if (criticalElements.footer && criticalElements.footer.exists && !criticalElements.footer.isVisible) {
      results.issues.push({
        type: 'footer-hidden',
        severity: 'medium',
        message: 'Le footer n\'est pas visible',
      });
    }

    // Vérifier les images qui débordent
    const imageIssues = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const issues = [];
      
      images.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        const parent = img.parentElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          if (rect.width > parentRect.width + 10) {
            issues.push({
              index,
              src: img.src.substring(0, 100),
              imageWidth: rect.width,
              parentWidth: parentRect.width,
            });
          }
        }
      });
      
      return issues;
    });

    if (imageIssues.length > 0) {
      results.issues.push({
        type: 'image-overflow',
        severity: 'medium',
        message: `${imageIssues.length} image(s) débordent de leur conteneur`,
        details: imageIssues,
      });
    }

    // Screenshot
    const screenshotPath = path.join(OUTPUT_DIR, `${results.breakpoint}-${results.url.replace(/\//g, '_') || 'home'}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    results.screenshot = screenshotPath;

  } catch (error) {
    results.error = error.message;
    results.issues.push({
      type: 'error',
      severity: 'high',
      message: `Erreur lors du test: ${error.message}`,
    });
  }

  return results;
}

async function runResponsiveTests() {
  console.log('🚀 Démarrage des tests responsive automatisés...\n');
  console.log(`URL de test: ${MEYE_URL}\n`);

  const browser = await chromium.launch({ headless: true });
  const report = {
    timestamp: new Date().toISOString(),
    meyeUrl: MEYE_URL,
    breakpoints: BREAKPOINTS.map(bp => ({ name: bp.name, width: bp.width, height: bp.height })),
    pages: PAGES.map(p => ({ path: p.path, name: p.name })),
    results: [],
    summary: {
      totalTests: 0,
      passed: 0,
      failed: 0,
      issues: {
        high: 0,
        medium: 0,
        low: 0,
      },
    },
  };

  for (const pageInfo of PAGES) {
    console.log(`\n📄 Test de la page: ${pageInfo.name} (${pageInfo.path})`);
    
    for (const breakpoint of BREAKPOINTS) {
      console.log(`  📱 Breakpoint: ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`);
      
      const page = await browser.newPage();
      const url = `${MEYE_URL}${pageInfo.path}`;
      const result = await testPageResponsive(page, url, breakpoint);
      
      result.pageName = pageInfo.name;
      result.pagePath = pageInfo.path;
      report.results.push(result);
      report.summary.totalTests++;

      // Compter les issues
      result.issues.forEach(issue => {
        if (issue.severity === 'high') report.summary.issues.high++;
        else if (issue.severity === 'medium') report.summary.issues.medium++;
        else report.summary.issues.low++;
      });

      if (result.issues.length === 0) {
        report.summary.passed++;
        console.log(`    ✅ OK`);
      } else {
        report.summary.failed++;
        console.log(`    ❌ ${result.issues.length} problème(s) détecté(s)`);
        result.issues.forEach(issue => {
          console.log(`       - [${issue.severity.toUpperCase()}] ${issue.type}: ${issue.message}`);
        });
      }

      await page.close();
    }
  }

  await browser.close();

  // Sauvegarder le rapport
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

  // Générer un rapport texte
  const textReport = generateTextReport(report);
  const textReportPath = path.join(OUTPUT_DIR, 'responsive-test-report.txt');
  fs.writeFileSync(textReportPath, textReport);

  console.log('\n' + '='.repeat(80));
  console.log('📊 RÉSUMÉ DES TESTS');
  console.log('='.repeat(80));
  console.log(textReport);
  console.log(`\n📁 Rapport JSON: ${REPORT_FILE}`);
  console.log(`📁 Rapport texte: ${textReportPath}`);
  console.log(`📁 Screenshots: ${OUTPUT_DIR}\n`);

  return report;
}

function generateTextReport(report) {
  let text = `RAPPORT DE TESTS RESPONSIVE AUTOMATISÉS\n`;
  text += `==========================================\n\n`;
  text += `Date: ${new Date(report.timestamp).toLocaleString('fr-FR')}\n`;
  text += `URL testée: ${report.meyeUrl}\n\n`;
  text += `RÉSUMÉ\n`;
  text += `------\n`;
  text += `Total de tests: ${report.summary.totalTests}\n`;
  text += `✅ Réussis: ${report.summary.passed}\n`;
  text += `❌ Échoués: ${report.summary.failed}\n\n`;
  text += `PROBLÈMES DÉTECTÉS\n`;
  text += `------------------\n`;
  text += `🔴 Critiques (high): ${report.summary.issues.high}\n`;
  text += `🟡 Moyens (medium): ${report.summary.issues.medium}\n`;
  text += `🟢 Mineurs (low): ${report.summary.issues.low}\n\n`;

  // Grouper par page
  const pagesWithIssues = {};
  report.results.forEach(result => {
    if (result.issues.length > 0) {
      if (!pagesWithIssues[result.pageName]) {
        pagesWithIssues[result.pageName] = [];
      }
      pagesWithIssues[result.pageName].push(result);
    }
  });

  if (Object.keys(pagesWithIssues).length > 0) {
    text += `DÉTAILS PAR PAGE\n`;
    text += `----------------\n\n`;
    
    Object.keys(pagesWithIssues).forEach(pageName => {
      text += `${pageName.toUpperCase()}\n`;
      text += `${'-'.repeat(pageName.length)}\n`;
      
      pagesWithIssues[pageName].forEach(result => {
        text += `  Breakpoint: ${result.breakpoint} (${result.width}x${result.height})\n`;
        result.issues.forEach(issue => {
          text += `    [${issue.severity.toUpperCase()}] ${issue.type}: ${issue.message}\n`;
        });
        text += `\n`;
      });
    });
  } else {
    text += `✅ Aucun problème détecté ! Tous les tests sont passés.\n`;
  }

  return text;
}

// Exécuter les tests
if (require.main === module) {
  runResponsiveTests()
    .then(() => {
      console.log('✅ Tests terminés avec succès');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Erreur lors des tests:', error);
      process.exit(1);
    });
}

module.exports = { runResponsiveTests, BREAKPOINTS, PAGES };
