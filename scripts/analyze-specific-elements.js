/**
 * Script pour analyser des éléments spécifiques avec leurs styles exacts
 * et générer un rapport détaillé pour correction
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'data');
const ANALYSIS_FILE = path.join(OUTPUT_DIR, 'element-analysis.json');

async function analyzeElements() {
  console.log('🔍 Analyse détaillée des éléments Rivemont...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  await page.goto('https://rivemont.ca/', { 
    waitUntil: 'domcontentloaded',
    timeout: 60000 
  });
  await page.waitForTimeout(3000);
  
  const analysis = await page.evaluate(() => {
    const analyze = (selector, name) => {
      const el = document.querySelector(selector);
      if (!el) return { found: false, name, selector };
      
      const normal = window.getComputedStyle(el);
      const get = (prop) => normal.getPropertyValue(prop) || normal[prop];
      
      // Hover
      el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      const hover = window.getComputedStyle(el);
      el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      
      return {
        found: true,
        name,
        selector,
        normal: {
          // Typographie
          fontFamily: get('font-family'),
          fontSize: get('font-size'),
          fontWeight: get('font-weight'),
          lineHeight: get('line-height'),
          letterSpacing: get('letter-spacing'),
          
          // Couleurs
          color: get('color'),
          backgroundColor: get('background-color'),
          opacity: get('opacity'),
          
          // Border
          borderRadius: get('border-radius'),
          border: get('border'),
          borderBottom: get('border-bottom'),
          borderBottomColor: get('border-bottom-color'),
          borderBottomWidth: get('border-bottom-width'),
          
          // Shadows
          boxShadow: get('box-shadow'),
          textShadow: get('text-shadow'),
          
          // Transitions
          transition: get('transition'),
          transitionDuration: get('transition-duration'),
          transitionTimingFunction: get('transition-timing-function'),
          
          // Transform
          transform: get('transform'),
          
          // Layout
          display: get('display'),
          position: get('position'),
          zIndex: get('z-index'),
          padding: get('padding'),
          paddingTop: get('padding-top'),
          paddingRight: get('padding-right'),
          paddingBottom: get('padding-bottom'),
          paddingLeft: get('padding-left'),
          margin: get('margin'),
          marginTop: get('margin-top'),
          marginBottom: get('margin-bottom'),
          width: get('width'),
          height: get('height'),
          maxWidth: get('max-width'),
          
          // Background
          background: get('background'),
          backgroundImage: get('background-image'),
          backgroundSize: get('background-size'),
          backgroundPosition: get('background-position'),
        },
        hover: {
          color: hover.getPropertyValue('color') || hover.color,
          backgroundColor: hover.getPropertyValue('background-color') || hover.backgroundColor,
          borderBottomColor: hover.getPropertyValue('border-bottom-color') || hover.borderBottomColor,
          transform: hover.getPropertyValue('transform') || hover.transform,
          boxShadow: hover.getPropertyValue('box-shadow') || hover.boxShadow,
        }
      };
    };
    
    return {
      header: analyze('header', 'header'),
      headerScrolled: analyze('header.scrolled', 'headerScrolled'),
      logo: analyze('header .logo-link img', 'logo'),
      navLink: analyze('header nav a', 'navLink'),
      clientAccessLink: analyze('header a[href*="monportefeuilleplus"]', 'clientAccessLink'),
      languageToggle: analyze('header button[aria-label*="Switch"]', 'languageToggle'),
      
      heroSection: analyze('main > section:first-child', 'heroSection'),
      heroH1: analyze('main h1', 'heroH1'),
      heroCtaBtn: analyze('main section:first-child a', 'heroCtaBtn'),
      
      missionSection: analyze('main section:nth-of-type(2)', 'missionSection'),
      missionH2: analyze('main section:nth-of-type(2) h2', 'missionH2'),
      missionP: analyze('main section:nth-of-type(2) p', 'missionP'),
      missionLink: analyze('main section:nth-of-type(2) a', 'missionLink'),
      
      teamPreviewSection: analyze('main section:nth-of-type(3)', 'teamPreviewSection'),
      teamPreviewLink: analyze('main section:nth-of-type(3) a', 'teamPreviewLink'),
      teamPreviewText: analyze('main section:nth-of-type(3) span', 'teamPreviewText'),
      
      performanceSection: analyze('main section:nth-of-type(4)', 'performanceSection'),
      performanceH2: analyze('main section:nth-of-type(4) h2', 'performanceH2'),
      performanceLink: analyze('main section:nth-of-type(4) a', 'performanceLink'),
      
      communicationsSection: analyze('main section:last-child', 'communicationsSection'),
      communicationsH2: analyze('main section:last-child h2', 'communicationsH2'),
      communicationCard: analyze('main section:last-child a', 'communicationCard'),
      communicationsLink: analyze('main section:last-child a:last-child', 'communicationsLink'),
      
      actionButton: analyze('a[href*="devenir-client"]', 'actionButton'),
      
      newsletterSection: analyze('footer section', 'newsletterSection'),
      newsletterInput: analyze('footer input[type="email"]', 'newsletterInput'),
      newsletterButton: analyze('footer button[type="submit"]', 'newsletterButton'),
      newsletterH2: analyze('footer h2', 'newsletterH2'),
      ctaSection: analyze('footer .cta-section', 'ctaSection'),
      ctaLink: analyze('footer .cta-section a', 'ctaLink'),
      
      footerLinks: analyze('footer .footer-links', 'footerLinks'),
      footerLogo: analyze('footer .footer-logo img', 'footerLogo'),
      footerNavLink: analyze('footer nav a', 'footerNavLink'),
      socialLink: analyze('footer .social-links a', 'socialLink'),
      loginLink: analyze('footer .login-link', 'loginLink'),
    };
  });
  
  // Sauvegarder
  fs.writeFileSync(ANALYSIS_FILE, JSON.stringify(analysis, null, 2));
  console.log(`✅ Analyse sauvegardée dans ${ANALYSIS_FILE}`);
  
  // Afficher un résumé
  console.log('\n📊 RÉSUMÉ DE L\'ANALYSE');
  console.log('='.repeat(50));
  Object.entries(analysis).forEach(([key, value]) => {
    if (value.found) {
      console.log(`✅ ${key}: ${value.selector}`);
      if (value.normal.borderRadius && value.normal.borderRadius !== '0px') {
        console.log(`   Border-radius: ${value.normal.borderRadius}`);
      }
      if (value.normal.transition && value.normal.transition !== 'all' && value.normal.transition !== '0s') {
        console.log(`   Transition: ${value.normal.transition}`);
      }
      if (value.hover.color && value.hover.color !== value.normal.color) {
        console.log(`   Hover color: ${value.normal.color} → ${value.hover.color}`);
      }
    } else {
      console.log(`❌ ${key}: Non trouvé`);
    }
  });
  
  await browser.close();
}

analyzeElements().catch(console.error);
