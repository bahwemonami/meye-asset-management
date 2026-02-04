/**
 * Script Playwright pour scraper la structure exacte de la page Rivemont Long/Short Fund
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const RIVEMONT_URL = 'https://rivemont.ca/en/alternative-funds/rivemont-long-short-fund/';
const OUTPUT_DIR = path.join(__dirname, 'data', 'rivemont-long-short');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'structure.json');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function scrapeRivemontLongShort() {
  console.log('🚀 Scraping de la page Rivemont Long/Short Fund...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  await page.goto(RIVEMONT_URL, { 
    waitUntil: 'networkidle',
    timeout: 60000 
  });
  
  await page.waitForTimeout(3000);
  
  // Extraire la structure complète de la page
  const structure = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    
    // Trouver la section principale
    const pageContent = main.querySelector('.page-content') || main.querySelector('section');
    
    if (!pageContent) return null;
    
    // Extraire le titre principal
    const mainTitle = pageContent.querySelector('h1');
    
    // Extraire la sidebar de navigation
    const sidebar = pageContent.querySelector('.page-content__sidebar') || pageContent.querySelector('.section-sidebar');
    const sidebarLinks = sidebar ? Array.from(sidebar.querySelectorAll('a, li')).map(item => ({
      text: item.textContent.trim(),
      href: item.href || item.getAttribute('href'),
      className: item.className,
    })) : [];
    
    // Extraire le contenu principal
    const builder = pageContent.querySelector('.page-content__builder');
    const description = builder ? builder.querySelector('.description') : null;
    
    // Extraire toutes les sections
    const sections = [];
    if (description) {
      const headings = description.querySelectorAll('h2, h3, h4');
      headings.forEach((heading, index) => {
        const section = {
          type: heading.tagName.toLowerCase(),
          text: heading.textContent.trim(),
          className: heading.className,
          content: []
        };
        
        // Récupérer le contenu jusqu'au prochain titre
        let current = heading.nextSibling;
        while (current && current.nodeType === 1) {
          const nextHeading = current.querySelector('h2, h3, h4');
          if (nextHeading) break;
          
          if (current.tagName === 'P') {
            section.content.push({
              type: 'paragraph',
              text: current.textContent.trim()
            });
          } else if (current.tagName === 'UL' || current.tagName === 'OL') {
            const items = Array.from(current.querySelectorAll('li')).map(li => li.textContent.trim());
            section.content.push({
              type: current.tagName === 'UL' ? 'unordered-list' : 'ordered-list',
              items
            });
          }
          
          current = current.nextSibling;
        }
        
        sections.push(section);
      });
    }
    
    // Extraire le HTML complet pour référence
    const html = pageContent.innerHTML.substring(0, 100000);
    
    return {
      title: mainTitle ? mainTitle.textContent.trim() : '',
      sidebarLinks,
      sections,
      html: html.substring(0, 50000), // Limiter la taille
      structure: {
        hasSidebar: !!sidebar,
        hasBuilder: !!builder,
        hasDescription: !!description,
      }
    };
  });
  
  // Sauvegarder
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(structure, null, 2));
  console.log(`✅ Structure sauvegardée dans ${OUTPUT_FILE}`);
  
  // Prendre un screenshot
  const screenshotPath = path.join(OUTPUT_DIR, 'page.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 Screenshot sauvegardé dans ${screenshotPath}`);
  
  await browser.close();
  
  return structure;
}

scrapeRivemontLongShort().catch(console.error);
