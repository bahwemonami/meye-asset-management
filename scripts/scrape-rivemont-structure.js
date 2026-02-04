/**
 * Script Playwright pour scraper la structure HTML/markdown de Rivemont.ca
 * Alternative à Firecrawl quand les crédits ne sont pas disponibles
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const RIVEMONT_URL = 'https://rivemont.ca';
const OUTPUT_DIR = path.join(__dirname, 'data', 'rivemont-structure');
const REPORT_FILE = path.join(OUTPUT_DIR, 'rivemont-structure-report.json');

// Créer le dossier de sortie
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const pagesToScrape = [
  { path: '/', name: 'home' },
  { path: '/profil-de-la-firme/', name: 'firm-profile' },
  { path: '/gestion-privee/', name: 'private-management' },
  { path: '/rendements/', name: 'performance' },
  { path: '/contact/', name: 'contact' },
];

// Fonction pour convertir HTML en markdown simplifié
function htmlToMarkdown(html) {
  if (!html) return '';
  
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function scrapeRivemontStructure() {
  console.log('🚀 Démarrage du scraping de la structure Rivemont...');
  
  const browser = await chromium.launch({ headless: false });
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: RIVEMONT_URL,
    pages: [],
  };
  
  for (const pageInfo of pagesToScrape) {
    console.log(`\n📄 Scraping de la page: ${pageInfo.name} (${pageInfo.path})`);
    
    try {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const url = `${RIVEMONT_URL}${pageInfo.path}`;
      await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 60000 
      });
      
      await page.waitForTimeout(3000);
      
      // Extraire le HTML et la structure
      const pageData = await page.evaluate(() => {
        const main = document.querySelector('main') || document.body;
        
        // Extraire toutes les sections
        const sections = Array.from(main.querySelectorAll('section, .template-part-desc-image, .template-part-hero, .section-hero, .section-info, .section-chart, .section-posts')).map((section, index) => {
          return {
            index,
            tagName: section.tagName,
            className: section.className,
            id: section.id,
            html: section.innerHTML.substring(0, 5000), // Limiter la taille
            textContent: section.textContent.trim().substring(0, 1000),
            boundingBox: {
              x: section.getBoundingClientRect().x,
              y: section.getBoundingClientRect().y,
              width: section.getBoundingClientRect().width,
              height: section.getBoundingClientRect().height,
            }
          };
        });
        
        // Extraire les titres principaux
        const headings = {
          h1: Array.from(main.querySelectorAll('h1')).map(h => ({
            text: h.textContent.trim(),
            className: h.className,
          })),
          h2: Array.from(main.querySelectorAll('h2')).map(h => ({
            text: h.textContent.trim(),
            className: h.className,
          })),
        };
        
        // Extraire les liens
        const links = Array.from(main.querySelectorAll('a')).map(a => ({
          text: a.textContent.trim(),
          href: a.href,
          className: a.className,
        }));
        
        // Extraire les images
        const images = Array.from(main.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          className: img.className,
        }));
        
        return {
          title: document.title,
          url: window.location.href,
          sections,
          headings,
          links: links.slice(0, 50), // Limiter le nombre
          images: images.slice(0, 20), // Limiter le nombre
          html: main.innerHTML.substring(0, 50000), // Limiter la taille
        };
      });
      
      // Convertir en markdown
      const markdown = htmlToMarkdown(pageData.html);
      
      // Sauvegarder les fichiers
      const htmlFile = path.join(OUTPUT_DIR, `${pageInfo.name}.html`);
      const markdownFile = path.join(OUTPUT_DIR, `${pageInfo.name}.md`);
      const jsonFile = path.join(OUTPUT_DIR, `${pageInfo.name}.json`);
      
      fs.writeFileSync(htmlFile, pageData.html);
      fs.writeFileSync(markdownFile, markdown);
      fs.writeFileSync(jsonFile, JSON.stringify(pageData, null, 2));
      
      report.pages.push({
        name: pageInfo.name,
        path: pageInfo.path,
        url: pageData.url,
        title: pageData.title,
        sectionsCount: pageData.sections.length,
        headingsCount: {
          h1: pageData.headings.h1.length,
          h2: pageData.headings.h2.length,
        },
        files: {
          html: htmlFile,
          markdown: markdownFile,
          json: jsonFile,
        }
      });
      
      console.log(`✅ Page ${pageInfo.name} scrapée: ${pageData.sections.length} sections trouvées`);
      
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
  console.log(`📊 ${report.pages.length} pages scrapées`);
  
  await browser.close();
}

scrapeRivemontStructure().catch(console.error);
