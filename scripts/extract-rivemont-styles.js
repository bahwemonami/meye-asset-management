/**
 * Script Playwright pour extraire tous les styles CSS exacts du site Rivemont
 * Extrait les computed styles, hover states, animations, transitions, etc.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'rivemont-styles.json');

// Créer le dossier data s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function extractStyles() {
  console.log('🚀 Démarrage de l\'extraction des styles Rivemont...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Aller sur le site Rivemont
  await page.goto('https://rivemont.ca/', { 
    waitUntil: 'domcontentloaded',
    timeout: 60000 
  });
  await page.waitForTimeout(3000); // Attendre le chargement complet
  
  console.log('📄 Page chargée, extraction des styles...');
  
  // Extraire tous les styles
  const styles = await page.evaluate(() => {
    const getComputedStyles = (selector, pseudo = null) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      
      const styles = window.getComputedStyle(element, pseudo);
      return {
        // Typographie
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        letterSpacing: styles.letterSpacing,
        textTransform: styles.textTransform,
        textDecoration: styles.textDecoration,
        
        // Couleurs
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        opacity: styles.opacity,
        
        // Dimensions
        width: styles.width,
        height: styles.height,
        maxWidth: styles.maxWidth,
        minWidth: styles.minWidth,
        maxHeight: styles.maxHeight,
        minHeight: styles.minHeight,
        
        // Espacements
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
        
        // Border
        border: styles.border,
        borderWidth: styles.borderWidth,
        borderStyle: styles.borderStyle,
        borderColor: styles.borderColor,
        borderRadius: styles.borderRadius,
        borderTopLeftRadius: styles.borderTopLeftRadius,
        borderTopRightRadius: styles.borderTopRightRadius,
        borderBottomLeftRadius: styles.borderBottomLeftRadius,
        borderBottomRightRadius: styles.borderBottomRightRadius,
        
        // Shadows
        boxShadow: styles.boxShadow,
        textShadow: styles.textShadow,
        
        // Transforms
        transform: styles.transform,
        transformOrigin: styles.transformOrigin,
        
        // Transitions
        transition: styles.transition,
        transitionProperty: styles.transitionProperty,
        transitionDuration: styles.transitionDuration,
        transitionTimingFunction: styles.transitionTimingFunction,
        transitionDelay: styles.transitionDelay,
        
        // Animations
        animation: styles.animation,
        animationName: styles.animationName,
        animationDuration: styles.animationDuration,
        animationTimingFunction: styles.animationTimingFunction,
        animationDelay: styles.animationDelay,
        animationIterationCount: styles.animationIterationCount,
        animationDirection: styles.animationDirection,
        
        // Layout
        display: styles.display,
        position: styles.position,
        top: styles.top,
        right: styles.right,
        bottom: styles.bottom,
        left: styles.left,
        zIndex: styles.zIndex,
        flexDirection: styles.flexDirection,
        justifyContent: styles.justifyContent,
        alignItems: styles.alignItems,
        gridTemplateColumns: styles.gridTemplateColumns,
        gridTemplateRows: styles.gridTemplateRows,
        gridGap: styles.gridGap,
        
        // Background
        background: styles.background,
        backgroundImage: styles.backgroundImage,
        backgroundPosition: styles.backgroundPosition,
        backgroundSize: styles.backgroundSize,
        backgroundRepeat: styles.backgroundRepeat,
        backgroundAttachment: styles.backgroundAttachment,
        
        // Autres
        overflow: styles.overflow,
        overflowX: styles.overflowX,
        overflowY: styles.overflowY,
        cursor: styles.cursor,
        pointerEvents: styles.pointerEvents,
        userSelect: styles.userSelect,
      };
    };
    
    const getHoverStyles = (selector) => {
      return getComputedStyles(selector, ':hover');
    };
    
    const getFocusStyles = (selector) => {
      return getComputedStyles(selector, ':focus');
    };
    
    const getActiveStyles = (selector) => {
      return getComputedStyles(selector, ':active');
    };
    
    // Extraire les @keyframes
    const extractKeyframes = () => {
      const styleSheets = Array.from(document.styleSheets);
      const keyframes = {};
      
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule instanceof CSSKeyframesRule) {
              keyframes[rule.name] = {};
              Array.from(rule.cssRules).forEach(keyframeRule => {
                keyframes[rule.name][keyframeRule.keyText] = {};
                const styles = keyframeRule.style;
                for (let i = 0; i < styles.length; i++) {
                  const prop = styles[i];
                  keyframes[rule.name][keyframeRule.keyText][prop] = styles.getPropertyValue(prop);
                }
              });
            }
          });
        } catch (e) {
          // Ignorer les erreurs CORS
        }
      });
      
      return keyframes;
    };
    
    // Extraire les media queries
    const extractMediaQueries = () => {
      const styleSheets = Array.from(document.styleSheets);
      const mediaQueries = {};
      
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule instanceof CSSMediaRule) {
              const media = rule.media.mediaText;
              if (!mediaQueries[media]) {
                mediaQueries[media] = [];
              }
              Array.from(rule.cssRules).forEach(mediaRule => {
                if (mediaRule instanceof CSSStyleRule) {
                  mediaQueries[media].push({
                    selector: mediaRule.selectorText,
                    styles: Object.fromEntries(
                      Array.from(mediaRule.style).map(prop => [
                        prop,
                        mediaRule.style.getPropertyValue(prop)
                      ])
                    )
                  });
                }
              });
            }
          });
        } catch (e) {
          // Ignorer les erreurs CORS
        }
      });
      
      return mediaQueries;
    };
    
    // Sélecteurs des éléments clés à analyser (basés sur la structure réelle de Rivemont)
    const selectors = {
      // Header
      header: 'header',
      navLink: 'header nav a',
      clientAccessLink: 'header a[href*="monportefeuilleplus"]',
      
      // Hero
      heroH1: 'main h1',
      heroCtaBtn: 'main section:first-child a',
      
      // Mission
      missionSection: 'main section:nth-of-type(2)',
      missionH2: 'main section:nth-of-type(2) h2',
      missionP: 'main section:nth-of-type(2) p',
      missionLink: 'main section:nth-of-type(2) a',
      
      // Team Preview
      teamPreviewSection: 'main section:nth-of-type(3)',
      teamPreviewLink: 'main section:nth-of-type(3) a',
      
      // Performance
      performanceSection: 'main section:nth-of-type(4)',
      performanceH2: 'main section:nth-of-type(4) h2',
      performanceLink: 'main section:nth-of-type(4) a',
      
      // Communications
      communicationsSection: 'main section:last-child',
      communicationsH2: 'main section:last-child h2',
      communicationCard: 'main section:last-child a',
      communicationsLink: 'main section:last-child a:last-child',
      
      // Footer
      newsletterInput: 'footer input[type="email"]',
      newsletterButton: 'footer button[type="submit"]',
      newsletterH2: 'footer h2',
      footerNavLink: 'footer nav a',
      
      // Action Button
      actionButton: 'a[href*="devenir-client"]',
    };
    
    const extractedStyles = {
      elements: {},
      keyframes: extractKeyframes(),
      mediaQueries: extractMediaQueries(),
      timestamp: new Date().toISOString(),
    };
    
    // Extraire les styles pour chaque sélecteur avec hover simulé
    for (const [name, selector] of Object.entries(selectors)) {
      const element = document.querySelector(selector);
      if (!element) {
        extractedStyles.elements[name] = {
          selector,
          found: false,
        };
        continue;
      }
      
      const normal = getComputedStyles(selector);
      
      // Simuler hover pour capturer les styles hover
      let hover = null;
      try {
        // Utiliser la méthode CSS :hover directement
        hover = getHoverStyles(selector);
      } catch (e) {
        // Si ça échoue, essayer avec mouseenter
        try {
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, cancelable: true }));
          hover = getComputedStyles(selector);
          element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        } catch (e2) {
          // Ignorer si ça échoue
        }
      }
      
      const focus = getFocusStyles(selector);
      const active = getActiveStyles(selector);
      
      extractedStyles.elements[name] = {
        selector,
        found: true,
        normal,
        hover,
        focus,
        active,
      };
    }
    
    return extractedStyles;
  });
  
  // Sauvegarder dans un fichier JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(styles, null, 2));
  console.log(`✅ Styles extraits et sauvegardés dans ${OUTPUT_FILE}`);
  console.log(`📊 ${Object.keys(styles.elements).length} éléments analysés`);
  console.log(`🎬 ${Object.keys(styles.keyframes).length} animations trouvées`);
  console.log(`📱 ${Object.keys(styles.mediaQueries).length} media queries trouvées`);
  
  await browser.close();
}

extractStyles().catch(console.error);
