/**
 * Script Playwright pour capturer MEYE localhost:4200 section par section
 * Capture chaque section individuellement en 1920x1080 et extrait les styles CSS
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const MEYE_URL = 'http://localhost:4200';
const OUTPUT_DIR = path.join(__dirname, 'data', 'meye-sections');
const REPORT_FILE = path.join(OUTPUT_DIR, 'meye-sections-report.json');

// Créer le dossier de sortie
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Pages et leurs sections à capturer (FR et EN)
const pagesToCapture = [
  {
    path: '/fr/',
    name: 'home-fr',
    lang: 'fr',
    sections: [
      { selector: '.section-hero, section:first-child', name: 'hero' },
      { selector: '.template-part-desc-image, section:nth-of-type(2)', name: 'mission' },
      { selector: '.section-info, section:nth-of-type(3)', name: 'team-preview' },
      { selector: '.section-chart, section:nth-of-type(4)', name: 'performance' },
      { selector: '.section-posts, section:last-child', name: 'communications' },
    ]
  },
  {
    path: '/en/',
    name: 'home-en',
    lang: 'en',
    sections: [
      { selector: '.section-hero, section:first-child', name: 'hero' },
      { selector: '.template-part-desc-image, section:nth-of-type(2)', name: 'mission' },
      { selector: '.section-info, section:nth-of-type(3)', name: 'team-preview' },
      { selector: '.section-chart, section:nth-of-type(4)', name: 'performance' },
      { selector: '.section-posts, section:last-child', name: 'communications' },
    ]
  },
  {
    path: '/fr/firm-profile',
    name: 'firm-profile-fr',
    lang: 'fr',
    sections: [
      { selector: '.template-part-desc-image, main > section:first-child, section:first-child', name: 'main-content' },
      { selector: 'section:nth-of-type(2)', name: 'section-2' },
      { selector: 'section:nth-of-type(3)', name: 'section-3' },
    ]
  },
  {
    path: '/en/firm-profile',
    name: 'firm-profile-en',
    lang: 'en',
    sections: [
      { selector: '.template-part-desc-image, main > section:first-child, section:first-child', name: 'main-content' },
      { selector: 'section:nth-of-type(2)', name: 'section-2' },
      { selector: 'section:nth-of-type(3)', name: 'section-3' },
    ]
  },
  {
    path: '/fr/private-management',
    name: 'private-management-fr',
    lang: 'fr',
    sections: [
      { selector: '.template-part-hero, section:first-child', name: 'hero' },
      { selector: '.template-builder-page-container, .page-content, main > section:nth-of-type(2)', name: 'content' },
      { selector: 'section:nth-of-type(3)', name: 'section-3' },
    ]
  },
  {
    path: '/en/private-management',
    name: 'private-management-en',
    lang: 'en',
    sections: [
      { selector: '.template-part-hero, section:first-child', name: 'hero' },
      { selector: '.template-builder-page-container, .page-content, main > section:nth-of-type(2)', name: 'content' },
      { selector: 'section:nth-of-type(3)', name: 'section-3' },
    ]
  },
  {
    path: '/fr/performance',
    name: 'performance-fr',
    lang: 'fr',
    sections: [
      { selector: '.template-part-hero, section:first-child', name: 'hero' },
      { selector: '.description-section, section:nth-of-type(2)', name: 'description' },
      { selector: '.section-table, section:nth-of-type(3)', name: 'table' },
    ]
  },
  {
    path: '/en/performance',
    name: 'performance-en',
    lang: 'en',
    sections: [
      { selector: '.template-part-hero, section:first-child', name: 'hero' },
      { selector: '.description-section, section:nth-of-type(2)', name: 'description' },
      { selector: '.section-table, section:nth-of-type(3)', name: 'table' },
    ]
  },
  {
    path: '/fr/contact',
    name: 'contact-fr',
    lang: 'fr',
    sections: [
      { selector: '.section-hero, section:first-child', name: 'hero' },
      { selector: 'section:nth-of-type(2)', name: 'form' },
    ]
  },
  {
    path: '/en/contact',
    name: 'contact-en',
    lang: 'en',
    sections: [
      { selector: '.section-hero, section:first-child', name: 'hero' },
      { selector: 'section:nth-of-type(2)', name: 'form' },
    ]
  },
];

async function captureMeyeSections() {
  console.log('🚀 Démarrage de la capture MEYE section par section...');
  console.log(`📍 URL de base: ${MEYE_URL}`);
  console.log('⚠️  Assurez-vous que le serveur Angular est démarré (ng serve)');
  
  const browser = await chromium.launch({ headless: false });
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: MEYE_URL,
    viewport: { width: 1920, height: 1080 },
    pages: [],
  };
  
  for (const pageInfo of pagesToCapture) {
    console.log(`\n📄 Capture de la page: ${pageInfo.name} (${pageInfo.path})`);
    
    try {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const url = `${MEYE_URL}${pageInfo.path}`;
      
      // Vérifier que le serveur répond
      try {
        await page.goto(url, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });
      } catch (error) {
        if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
          console.error(`❌ Impossible de se connecter à ${MEYE_URL}`);
          console.error('   Veuillez démarrer le serveur avec: ng serve');
          await page.close();
          continue;
        }
        throw error;
      }
      
      // Attendre que la page soit complètement chargée
      await page.waitForTimeout(3000);
      
      // Scroller jusqu'en haut
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);
      
      const pageData = {
        name: pageInfo.name,
        path: pageInfo.path,
        lang: pageInfo.lang,
        url,
        sections: [],
      };
      
      for (const sectionInfo of pageInfo.sections) {
        console.log(`  📸 Capture de la section: ${sectionInfo.name}`);
        
        try {
          // Trouver l'élément de section
          const sectionExists = await page.evaluate((selector) => {
            return document.querySelector(selector) !== null;
          }, sectionInfo.selector);
          
          if (!sectionExists) {
            console.log(`    ⚠️  Section ${sectionInfo.name} non trouvée avec le sélecteur: ${sectionInfo.selector}`);
            // Essayer de trouver toutes les sections disponibles
            const availableSections = await page.evaluate(() => {
              const sections = document.querySelectorAll('section, .template-part-desc-image, .template-part-hero, .section-hero, .section-info, .section-chart, .section-posts, .template-builder-page-container');
              return Array.from(sections).map((s, i) => ({
                index: i,
                tagName: s.tagName,
                className: s.className,
                id: s.id,
              }));
            });
            console.log(`    Sections disponibles:`, availableSections);
            continue;
          }
          
          // Scroller jusqu'à la section
          await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, sectionInfo.selector);
          
          await page.waitForTimeout(1000);
          
          // Extraire les styles et informations de la section
          const sectionData = await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (!element) return null;
            
            const styles = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            
            // Extraire les styles des éléments enfants importants
            const children = {
              h1: Array.from(element.querySelectorAll('h1')).map(h => ({
                text: h.textContent.trim().substring(0, 50),
                styles: {
                  fontSize: window.getComputedStyle(h).fontSize,
                  fontWeight: window.getComputedStyle(h).fontWeight,
                  lineHeight: window.getComputedStyle(h).lineHeight,
                  marginTop: window.getComputedStyle(h).marginTop,
                  marginBottom: window.getComputedStyle(h).marginBottom,
                  paddingTop: window.getComputedStyle(h).paddingTop,
                  paddingBottom: window.getComputedStyle(h).paddingBottom,
                }
              })),
              h2: Array.from(element.querySelectorAll('h2')).map(h => ({
                text: h.textContent.trim().substring(0, 50),
                styles: {
                  fontSize: window.getComputedStyle(h).fontSize,
                  fontWeight: window.getComputedStyle(h).fontWeight,
                  lineHeight: window.getComputedStyle(h).lineHeight,
                  marginTop: window.getComputedStyle(h).marginTop,
                  marginBottom: window.getComputedStyle(h).marginBottom,
                  paddingTop: window.getComputedStyle(h).paddingTop,
                  paddingBottom: window.getComputedStyle(h).paddingBottom,
                }
              })),
              p: Array.from(element.querySelectorAll('p')).slice(0, 5).map(p => ({
                text: p.textContent.trim().substring(0, 50),
                styles: {
                  fontSize: window.getComputedStyle(p).fontSize,
                  lineHeight: window.getComputedStyle(p).lineHeight,
                  marginTop: window.getComputedStyle(p).marginTop,
                  marginBottom: window.getComputedStyle(p).marginBottom,
                  paddingTop: window.getComputedStyle(p).paddingTop,
                  paddingBottom: window.getComputedStyle(p).paddingBottom,
                }
              })),
              // Extraire les styles des colonnes si présentes
              cols: Array.from(element.querySelectorAll('.col, [class*="col-"]')).slice(0, 3).map(col => ({
                className: col.className,
                styles: {
                  width: window.getComputedStyle(col).width,
                  padding: window.getComputedStyle(col).padding,
                  margin: window.getComputedStyle(col).margin,
                  gap: window.getComputedStyle(col).gap,
                }
              })),
            };
            
            return {
              selector,
              className: element.className,
              tagName: element.tagName,
              id: element.id,
              
              // Styles de la section
              styles: {
                fontSize: styles.fontSize,
                fontFamily: styles.fontFamily,
                padding: styles.padding,
                paddingTop: styles.paddingTop,
                paddingBottom: styles.paddingBottom,
                paddingLeft: styles.paddingLeft,
                paddingRight: styles.paddingRight,
                margin: styles.margin,
                marginTop: styles.marginTop,
                marginBottom: styles.marginBottom,
                marginLeft: styles.marginLeft,
                marginRight: styles.marginRight,
                gap: styles.gap,
                display: styles.display,
                flexDirection: styles.flexDirection,
                justifyContent: styles.justifyContent,
                alignItems: styles.alignItems,
                gridTemplateColumns: styles.gridTemplateColumns,
                gridGap: styles.gridGap,
                width: styles.width,
                maxWidth: styles.maxWidth,
                minHeight: styles.minHeight,
              },
              
              // Bounding box
              boundingBox: {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height,
              },
              
              // Styles des enfants
              children,
            };
          }, sectionInfo.selector);
          
          if (!sectionData) {
            console.log(`    ❌ Impossible d'extraire les données de la section ${sectionInfo.name}`);
            continue;
          }
          
          // Capturer un screenshot de la section
          const screenshotPath = path.join(OUTPUT_DIR, `${pageInfo.name}-${sectionInfo.name}.png`);
          
          // S'assurer que la section est visible dans le viewport
          await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (element) {
              const rect = element.getBoundingClientRect();
              const scrollY = window.scrollY + rect.top - 100; // 100px de marge en haut
              window.scrollTo(0, scrollY);
            }
          }, sectionInfo.selector);
          
          await page.waitForTimeout(500);
          
          // Prendre le screenshot de la section
          const element = await page.$(sectionInfo.selector);
          if (element) {
            await element.screenshot({ 
              path: screenshotPath,
              timeout: 10000
            });
          } else {
            // Fallback: screenshot de la page complète
            await page.screenshot({ 
              path: screenshotPath,
              fullPage: false
            });
          }
          
          sectionData.screenshot = screenshotPath;
          pageData.sections.push({
            name: sectionInfo.name,
            selector: sectionInfo.selector,
            ...sectionData,
          });
          
          console.log(`    ✅ Section ${sectionInfo.name} capturée`);
          
        } catch (error) {
          console.error(`    ❌ Erreur lors de la capture de la section ${sectionInfo.name}:`, error.message);
        }
      }
      
      report.pages.push(pageData);
      console.log(`✅ Page ${pageInfo.name} capturée avec ${pageData.sections.length} sections`);
      
      await page.close();
      
    } catch (error) {
      console.error(`❌ Erreur sur la page ${pageInfo.name}:`, error.message);
      report.pages.push({
        name: pageInfo.name,
        path: pageInfo.path,
        lang: pageInfo.lang,
        status: 'error',
        error: error.message,
      });
    }
  }
  
  // Sauvegarder le rapport
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  console.log(`\n✅ Rapport sauvegardé dans ${REPORT_FILE}`);
  console.log(`📊 ${report.pages.length} pages capturées`);
  
  await browser.close();
}

captureMeyeSections().catch(console.error);
