/**
 * Script Playwright pour comparer les styles entre Rivemont et MEYE
 * Génère un rapport détaillé des différences
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'data');
const RIVEMONT_STYLES_FILE = path.join(OUTPUT_DIR, 'rivemont-styles.json');
const COMPARISON_REPORT_FILE = path.join(OUTPUT_DIR, 'comparison-report.json');
const DIFFERENCES_FILE = path.join(OUTPUT_DIR, 'differences.json');

// URL du site MEYE (à adapter selon votre configuration)
const MEYE_URL = 'http://localhost:4200'; // Ou l'URL de votre site MEYE

async function compareStyles() {
  console.log('🔍 Démarrage de la comparaison Rivemont vs MEYE...');
  
  // Charger les styles de Rivemont
  if (!fs.existsSync(RIVEMONT_STYLES_FILE)) {
    console.error('❌ Fichier rivemont-styles.json non trouvé. Exécutez d\'abord extract-rivemont-styles.js');
    process.exit(1);
  }
  
  const rivemontStyles = JSON.parse(fs.readFileSync(RIVEMONT_STYLES_FILE, 'utf-8'));
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Aller sur le site MEYE
  console.log(`📄 Chargement de ${MEYE_URL}...`);
  try {
    await page.goto(MEYE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
  } catch (e) {
    console.warn(`⚠️ Impossible de charger ${MEYE_URL}, utilisation des données Rivemont uniquement`);
    console.warn('💡 Pour comparer, démarrez le serveur Angular avec: npm start');
    await browser.close();
    return;
  }
  
  console.log('🔍 Extraction des styles MEYE...');
  
  // Extraire les styles de MEYE avec la même fonction
  const meyeStyles = await page.evaluate(() => {
    const getComputedStyles = (selector, pseudo = null) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      
      const styles = window.getComputedStyle(element, pseudo);
      return {
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        letterSpacing: styles.letterSpacing,
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        opacity: styles.opacity,
        width: styles.width,
        height: styles.height,
        maxWidth: styles.maxWidth,
        padding: styles.padding,
        paddingTop: styles.paddingTop,
        paddingRight: styles.paddingRight,
        paddingBottom: styles.paddingBottom,
        paddingLeft: styles.paddingLeft,
        margin: styles.margin,
        marginTop: styles.marginTop,
        marginRight: styles.marginRight,
        marginBottom: styles.marginBottom,
        marginLeft: styles.marginLeft,
        gap: styles.gap,
        border: styles.border,
        borderRadius: styles.borderRadius,
        borderTopLeftRadius: styles.borderTopLeftRadius,
        borderTopRightRadius: styles.borderTopRightRadius,
        borderBottomLeftRadius: styles.borderBottomLeftRadius,
        borderBottomRightRadius: styles.borderBottomRightRadius,
        boxShadow: styles.boxShadow,
        textShadow: styles.textShadow,
        transform: styles.transform,
        transition: styles.transition,
        transitionProperty: styles.transitionProperty,
        transitionDuration: styles.transitionDuration,
        transitionTimingFunction: styles.transitionTimingFunction,
        transitionDelay: styles.transitionDelay,
        animation: styles.animation,
        display: styles.display,
        position: styles.position,
        zIndex: styles.zIndex,
        background: styles.background,
        backgroundImage: styles.backgroundImage,
        backgroundPosition: styles.backgroundPosition,
        backgroundSize: styles.backgroundSize,
        overflow: styles.overflow,
        cursor: styles.cursor,
      };
    };
    
    const getHoverStyles = (selector) => {
      return getComputedStyles(selector, ':hover');
    };
    
    // Utiliser les mêmes sélecteurs que le script d'extraction
    const selectors = {
      header: 'header',
      navLink: 'header nav a',
      clientAccessLink: 'header a[href*="monportefeuilleplus"]',
      heroH1: 'main h1',
      heroCtaBtn: 'main section:first-child a',
      missionSection: 'main section:nth-of-type(2)',
      missionH2: 'main section:nth-of-type(2) h2',
      missionP: 'main section:nth-of-type(2) p',
      missionLink: 'main section:nth-of-type(2) a',
      teamPreviewSection: 'main section:nth-of-type(3)',
      teamPreviewLink: 'main section:nth-of-type(3) a',
      performanceSection: 'main section:nth-of-type(4)',
      performanceH2: 'main section:nth-of-type(4) h2',
      performanceLink: 'main section:nth-of-type(4) a',
      communicationsSection: 'main section:last-child',
      communicationsH2: 'main section:last-child h2',
      communicationCard: 'main section:last-child a',
      communicationsLink: 'main section:last-child a:last-child',
      newsletterInput: 'footer input[type="email"]',
      newsletterButton: 'footer button[type="submit"]',
      newsletterH2: 'footer h2',
      footerNavLink: 'footer nav a',
      actionButton: 'a[href*="devenir-client"]',
    };
    
    const extractedStyles = {};
    
    for (const [name, selector] of Object.entries(selectors)) {
      const normal = getComputedStyles(selector);
      const hover = name.includes('Hover') ? null : getHoverStyles(selector);
      
      extractedStyles[name] = {
        selector,
        normal,
        hover,
      };
    }
    
    return extractedStyles;
  });
  
  // Comparer les styles
  console.log('⚖️ Comparaison des styles...');
  
  const differences = [];
  const comparisonReport = {
    timestamp: new Date().toISOString(),
    rivemontUrl: 'https://rivemont.ca/',
    meyeUrl: MEYE_URL,
    elementsCompared: 0,
    differencesFound: 0,
    details: {},
  };
  
  // Comparer chaque élément
  for (const [elementName, rivemontData] of Object.entries(rivemontStyles.elements)) {
    if (!meyeStyles[elementName]) {
      differences.push({
        element: elementName,
        issue: 'missing',
        message: `Élément ${elementName} non trouvé sur MEYE`,
      });
      continue;
    }
    
    comparisonReport.elementsCompared++;
    
    const meyeData = meyeStyles[elementName];
    const elementDifferences = [];
    
    // Comparer les styles normaux
    if (rivemontData.normal && meyeData.normal) {
      for (const [property, rivemontValue] of Object.entries(rivemontData.normal)) {
        if (rivemontValue === null || rivemontValue === undefined) continue;
        
        const meyeValue = meyeData.normal[property];
        
        if (rivemontValue !== meyeValue) {
          elementDifferences.push({
            property,
            rivemont: rivemontValue,
            meye: meyeValue,
            state: 'normal',
          });
          comparisonReport.differencesFound++;
        }
      }
    }
    
    // Comparer les styles hover
    if (rivemontData.hover && meyeData.hover) {
      for (const [property, rivemontValue] of Object.entries(rivemontData.hover)) {
        if (rivemontValue === null || rivemontValue === undefined) continue;
        
        const meyeValue = meyeData.hover[property];
        
        if (rivemontValue !== meyeValue) {
          elementDifferences.push({
            property,
            rivemont: rivemontValue,
            meye: meyeValue,
            state: 'hover',
          });
          comparisonReport.differencesFound++;
        }
      }
    }
    
    if (elementDifferences.length > 0) {
      differences.push({
        element: elementName,
        selector: rivemontData.selector,
        differences: elementDifferences,
      });
      
      comparisonReport.details[elementName] = {
        selector: rivemontData.selector,
        differencesCount: elementDifferences.length,
        differences: elementDifferences,
      };
    }
  }
  
  // Sauvegarder les rapports
  fs.writeFileSync(COMPARISON_REPORT_FILE, JSON.stringify(comparisonReport, null, 2));
  fs.writeFileSync(DIFFERENCES_FILE, JSON.stringify(differences, null, 2));
  
  console.log('\n📊 RAPPORT DE COMPARAISON');
  console.log('='.repeat(50));
  console.log(`Éléments comparés: ${comparisonReport.elementsCompared}`);
  console.log(`Différences trouvées: ${comparisonReport.differencesFound}`);
  console.log(`Éléments avec différences: ${differences.length}`);
  console.log('\n📋 Top 10 des différences:');
  
  differences.slice(0, 10).forEach((diff, index) => {
    console.log(`\n${index + 1}. ${diff.element} (${diff.selector})`);
    diff.differences.slice(0, 3).forEach(d => {
      console.log(`   - ${d.property} [${d.state}]:`);
      console.log(`     Rivemont: ${d.rivemont}`);
      console.log(`     MEYE:     ${d.meye}`);
    });
  });
  
  console.log(`\n✅ Rapport sauvegardé dans ${COMPARISON_REPORT_FILE}`);
  console.log(`✅ Différences détaillées dans ${DIFFERENCES_FILE}`);
  
  await browser.close();
}

compareStyles().catch(console.error);
