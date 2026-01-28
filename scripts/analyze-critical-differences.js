/**
 * Script pour analyser les différences critiques (visuelles) vs non-critiques
 * Filtre les différences pour ne garder que celles qui impactent visuellement
 */

const fs = require('fs');
const path = require('path');

const DIFFERENCES_FILE = path.join(__dirname, 'data', 'differences.json');
const CRITICAL_DIFFERENCES_FILE = path.join(__dirname, 'data', 'critical-differences.json');

// Propriétés critiques qui impactent visuellement
const CRITICAL_PROPERTIES = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'color',
  'backgroundColor',
  'background',
  'backgroundImage',
  'border',
  'borderWidth',
  'borderStyle',
  'borderColor',
  'borderRadius',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'opacity',
  'transform',
  'boxShadow',
  'textShadow',
  'display',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'zIndex',
  'flexDirection',
  'justifyContent',
  'alignItems',
  'gridTemplateColumns',
  'gridTemplateRows',
  'gap',
  'gridGap',
];

// Propriétés non-critiques (computed styles qui ne changent pas l'apparence)
const NON_CRITICAL_PROPERTIES = [
  'textTransform', // undefined vs none - pas critique visuellement
  'textDecoration', // undefined vs none - pas critique visuellement
  'transition',
  'transitionProperty',
  'transitionDuration',
  'transitionTimingFunction',
  'transitionDelay',
  'animation',
  'animationName',
  'animationDuration',
  'animationTimingFunction',
  'animationDelay',
  'animationIterationCount',
  'animationDirection',
  'transformOrigin',
  'cursor',
  'pointerEvents',
  'userSelect',
  'overflow',
  'overflowX',
  'overflowY',
  'backgroundRepeat',
  'backgroundAttachment',
  'backgroundPosition',
  'backgroundSize',
];

function isCriticalDifference(property, rivemontValue, meyeValue) {
  // Ignorer les différences undefined vs none/empty (computed styles)
  if (rivemontValue === '' || rivemontValue === null || rivemontValue === undefined) {
    return false;
  }
  
  if (meyeValue === undefined || meyeValue === null) {
    // Si Rivemont a une valeur mais MEYE est undefined, c'est critique seulement pour les propriétés critiques
    return CRITICAL_PROPERTIES.includes(property);
  }
  
  // Si c'est une propriété critique, c'est important
  if (CRITICAL_PROPERTIES.includes(property)) {
    // Ignorer les différences minimes de hauteur/largeur (< 5px)
    if (property === 'height' || property === 'width') {
      const rivemontNum = parseFloat(rivemontValue);
      const meyeNum = parseFloat(meyeValue);
      if (!isNaN(rivemontNum) && !isNaN(meyeNum)) {
        return Math.abs(rivemontNum - meyeNum) > 5;
      }
    }
    return true;
  }
  
  return false;
}

async function analyzeCriticalDifferences() {
  console.log('🔍 Analyse des différences critiques...');
  
  if (!fs.existsSync(DIFFERENCES_FILE)) {
    console.error('❌ Fichier differences.json non trouvé. Exécutez d\'abord compare-sites.js');
    process.exit(1);
  }
  
  const differences = JSON.parse(fs.readFileSync(DIFFERENCES_FILE, 'utf-8'));
  const criticalDifferences = [];
  const nonCriticalCount = { total: 0, byProperty: {} };
  
  differences.forEach(elementDiff => {
    const criticalElementDiffs = [];
    
    elementDiff.differences.forEach(diff => {
      if (isCriticalDifference(diff.property, diff.rivemont, diff.meye)) {
        criticalElementDiffs.push(diff);
      } else {
        nonCriticalCount.total++;
        nonCriticalCount.byProperty[diff.property] = (nonCriticalCount.byProperty[diff.property] || 0) + 1;
      }
    });
    
    if (criticalElementDiffs.length > 0) {
      criticalDifferences.push({
        element: elementDiff.element,
        selector: elementDiff.selector,
        differences: criticalElementDiffs,
        criticalCount: criticalElementDiffs.length,
        totalCount: elementDiff.differences.length,
      });
    }
  });
  
  // Sauvegarder les différences critiques
  fs.writeFileSync(CRITICAL_DIFFERENCES_FILE, JSON.stringify(criticalDifferences, null, 2));
  
  console.log('\n📊 ANALYSE DES DIFFÉRENCES');
  console.log('='.repeat(50));
  console.log(`Total différences: ${differences.reduce((sum, el) => sum + el.differences.length, 0)}`);
  console.log(`Différences critiques: ${criticalDifferences.reduce((sum, el) => sum + el.criticalCount, 0)}`);
  console.log(`Différences non-critiques: ${nonCriticalCount.total}`);
  
  console.log('\n📋 Top 10 différences critiques:');
  criticalDifferences
    .sort((a, b) => b.criticalCount - a.criticalCount)
    .slice(0, 10)
    .forEach((el, index) => {
      console.log(`\n${index + 1}. ${el.element} (${el.selector})`);
      console.log(`   Critiques: ${el.criticalCount}/${el.totalCount}`);
      el.differences.slice(0, 3).forEach(d => {
        console.log(`   - ${d.property} [${d.state}]:`);
        console.log(`     Rivemont: ${d.rivemont}`);
        console.log(`     MEYE:     ${d.meye || 'undefined'}`);
      });
    });
  
  console.log('\n📋 Propriétés non-critiques les plus fréquentes:');
  Object.entries(nonCriticalCount.byProperty)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([prop, count]) => {
      console.log(`   ${prop}: ${count}`);
    });
  
  console.log(`\n✅ Différences critiques sauvegardées dans ${CRITICAL_DIFFERENCES_FILE}`);
}

analyzeCriticalDifferences().catch(console.error);
