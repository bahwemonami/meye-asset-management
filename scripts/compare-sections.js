/**
 * Script de comparaison section par section entre Rivemont et MEYE
 * Identifie les différences de spacing, typography, alignment
 */

const fs = require('fs');
const path = require('path');

const RIVEMONT_REPORT = path.join(__dirname, 'data', 'rivemont-sections', 'rivemont-sections-report.json');
const MEYE_REPORT = path.join(__dirname, 'data', 'meye-sections', 'meye-sections-report.json');
const OUTPUT_DIR = path.join(__dirname, 'data', 'section-comparison');
const REPORT_FILE = path.join(OUTPUT_DIR, 'section-comparison-report.json');

// Créer le dossier de sortie
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Mapping des pages entre Rivemont et MEYE
const pageMapping = {
  'home': ['home-fr', 'home-en'],
  'firm-profile': ['firm-profile-fr', 'firm-profile-en'],
  'private-management': ['private-management-fr', 'private-management-en'],
  'performance': ['performance-fr', 'performance-en'],
  'contact': ['contact-fr', 'contact-en'],
};

// Mapping des sections entre Rivemont et MEYE
const sectionMapping = {
  'hero': 'hero',
  'mission': 'mission',
  'team-preview': 'team-preview',
  'performance': 'performance',
  'communications': 'communications',
  'main-content': 'main-content',
  'section-2': 'section-2',
  'section-3': 'section-3',
  'content': 'content',
  'description': 'description',
  'table': 'table',
  'form': 'form',
};

// Fonction pour convertir une valeur CSS en pixels
function cssToPixels(value) {
  if (!value || value === 'auto' || value === 'none' || value === 'normal') {
    return null;
  }
  
  if (value.endsWith('px')) {
    return parseFloat(value);
  }
  
  if (value.endsWith('rem')) {
    return parseFloat(value) * 16; // Assumant 16px de base
  }
  
  if (value.endsWith('em')) {
    return parseFloat(value) * 16; // Approximation
  }
  
  if (value.endsWith('%')) {
    return null; // Ne peut pas convertir sans contexte
  }
  
  return null;
}

// Fonction pour comparer deux valeurs CSS
function compareCSSValues(rivemontValue, meyeValue, propertyName) {
  const rivemontPx = cssToPixels(rivemontValue);
  const meyePx = cssToPixels(meyeValue);
  
  if (rivemontPx === null || meyePx === null) {
    // Comparaison textuelle pour les valeurs non-numériques
    if (rivemontValue !== meyeValue) {
      return {
        different: true,
        rivemont: rivemontValue,
        meye: meyeValue,
        difference: null,
        differencePercent: null,
      };
    }
    return null; // Identique
  }
  
  const difference = meyePx - rivemontPx;
  const differencePercent = rivemontPx !== 0 ? (difference / rivemontPx) * 100 : null;
  
  // Seuil de tolérance: 2px ou 5%
  const tolerance = Math.max(2, rivemontPx * 0.05);
  
  if (Math.abs(difference) > tolerance) {
    return {
      different: true,
      rivemont: rivemontValue,
      meye: meyeValue,
      rivemontPx,
      meyePx,
      difference,
      differencePercent: differencePercent ? differencePercent.toFixed(2) : null,
    };
  }
  
  return null; // Différence négligeable
}

// Fonction pour comparer les styles d'une section
function compareSectionStyles(rivemontSection, meyeSection) {
  const differences = {
    section: {
      name: rivemontSection.name,
      rivemontSelector: rivemontSection.selector,
      meyeSelector: meyeSection.selector,
    },
    styles: {},
    children: {},
    critical: [],
  };
  
  // Comparer les styles de la section principale
  const rivemontStyles = rivemontSection.styles || {};
  const meyeStyles = meyeSection.styles || {};
  
  const styleProperties = [
    'fontSize', 'fontFamily', 'fontWeight',
    'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
    'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
    'gap', 'gridGap',
    'width', 'maxWidth', 'minHeight',
    'display', 'flexDirection', 'justifyContent', 'alignItems',
    'gridTemplateColumns',
  ];
  
  for (const property of styleProperties) {
    const comparison = compareCSSValues(rivemontStyles[property], meyeStyles[property], property);
    if (comparison) {
      differences.styles[property] = comparison;
      
      // Marquer comme critique si la différence est importante
      if (property.includes('padding') || property.includes('margin') || property.includes('gap')) {
        if (Math.abs(comparison.difference) > 10) {
          differences.critical.push({
            type: 'spacing',
            property,
            ...comparison,
          });
        }
      }
      
      if (property.includes('fontSize')) {
        if (Math.abs(comparison.difference) > 2) {
          differences.critical.push({
            type: 'typography',
            property,
            ...comparison,
          });
        }
      }
    }
  }
  
  // Comparer les styles des enfants (h1, h2, p)
  if (rivemontSection.children && meyeSection.children) {
    const childTypes = ['h1', 'h2', 'p'];
    
    for (const childType of childTypes) {
      const rivemontChildren = rivemontSection.children[childType] || [];
      const meyeChildren = meyeSection.children[childType] || [];
      
      if (rivemontChildren.length > 0 && meyeChildren.length > 0) {
        // Comparer le premier élément de chaque type
        const rivemontChild = rivemontChildren[0];
        const meyeChild = meyeChildren[0];
        
        if (rivemontChild && meyeChild && rivemontChild.styles && meyeChild.styles) {
          const childDifferences = {};
          
          for (const property of ['fontSize', 'fontWeight', 'lineHeight', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom']) {
            const comparison = compareCSSValues(
              rivemontChild.styles[property],
              meyeChild.styles[property],
              property
            );
            
            if (comparison) {
              childDifferences[property] = comparison;
              
              // Marquer comme critique
              if (property.includes('fontSize') && Math.abs(comparison.difference) > 2) {
                differences.critical.push({
                  type: 'typography',
                  element: childType,
                  property,
                  ...comparison,
                });
              }
              
              if ((property.includes('margin') || property.includes('padding')) && Math.abs(comparison.difference) > 5) {
                differences.critical.push({
                  type: 'spacing',
                  element: childType,
                  property,
                  ...comparison,
                });
              }
            }
          }
          
          if (Object.keys(childDifferences).length > 0) {
            differences.children[childType] = childDifferences;
          }
        }
      }
    }
  }
  
  // Comparer les bounding boxes (dimensions)
  if (rivemontSection.boundingBox && meyeSection.boundingBox) {
    const widthDiff = Math.abs(meyeSection.boundingBox.width - rivemontSection.boundingBox.width);
    const heightDiff = Math.abs(meyeSection.boundingBox.height - rivemontSection.boundingBox.height);
    
    if (widthDiff > 20 || heightDiff > 20) {
      differences.boundingBox = {
        rivemont: rivemontSection.boundingBox,
        meye: meyeSection.boundingBox,
        widthDifference: widthDiff,
        heightDifference: heightDiff,
      };
      
      differences.critical.push({
        type: 'layout',
        property: 'boundingBox',
        widthDifference: widthDiff,
        heightDifference: heightDiff,
      });
    }
  }
  
  return differences;
}

async function compareSections() {
  console.log('🔍 Démarrage de la comparaison section par section...');
  
  // Charger les rapports
  if (!fs.existsSync(RIVEMONT_REPORT)) {
    console.error(`❌ Rapport Rivemont non trouvé: ${RIVEMONT_REPORT}`);
    console.error('   Exécutez d\'abord: node scripts/capture-rivemont-sections.js');
    return;
  }
  
  if (!fs.existsSync(MEYE_REPORT)) {
    console.error(`❌ Rapport MEYE non trouvé: ${MEYE_REPORT}`);
    console.error('   Exécutez d\'abord: node scripts/capture-meye-sections.js');
    return;
  }
  
  const rivemontData = JSON.parse(fs.readFileSync(RIVEMONT_REPORT, 'utf8'));
  const meyeData = JSON.parse(fs.readFileSync(MEYE_REPORT, 'utf8'));
  
  console.log(`📊 Rivemont: ${rivemontData.pages.length} pages`);
  console.log(`📊 MEYE: ${meyeData.pages.length} pages`);
  
  const comparison = {
    timestamp: new Date().toISOString(),
    pages: [],
    summary: {
      totalPages: 0,
      totalSections: 0,
      sectionsWithDifferences: 0,
      criticalDifferences: 0,
    },
  };
  
  // Comparer chaque page
  for (const [rivemontPageName, meyePageNames] of Object.entries(pageMapping)) {
    console.log(`\n📄 Comparaison de la page: ${rivemontPageName}`);
    
    // Trouver la page Rivemont
    const rivemontPage = rivemontData.pages.find(p => p.name === rivemontPageName);
    if (!rivemontPage) {
      console.log(`  ⚠️  Page Rivemont ${rivemontPageName} non trouvée`);
      continue;
    }
    
    // Comparer avec chaque version MEYE (FR et EN)
    for (const meyePageName of meyePageNames) {
      const meyePage = meyeData.pages.find(p => p.name === meyePageName);
      if (!meyePage) {
        console.log(`  ⚠️  Page MEYE ${meyePageName} non trouvée`);
        continue;
      }
      
      console.log(`  🔄 Comparaison avec ${meyePageName}`);
      
      const pageComparison = {
        rivemontPage: rivemontPageName,
        meyePage: meyePageName,
        lang: meyePage.lang || 'unknown',
        sections: [],
      };
      
      // Comparer chaque section
      for (const rivemontSection of rivemontPage.sections || []) {
        const sectionName = rivemontSection.name;
        const mappedSectionName = sectionMapping[sectionName] || sectionName;
        
        const meyeSection = (meyePage.sections || []).find(s => s.name === mappedSectionName);
        
        if (!meyeSection) {
          console.log(`    ⚠️  Section ${sectionName} non trouvée dans MEYE`);
          continue;
        }
        
        console.log(`    📸 Comparaison de la section: ${sectionName}`);
        
        const sectionDiff = compareSectionStyles(rivemontSection, meyeSection);
        
        if (Object.keys(sectionDiff.styles).length > 0 || 
            Object.keys(sectionDiff.children).length > 0 ||
            sectionDiff.boundingBox) {
          pageComparison.sections.push(sectionDiff);
          comparison.summary.sectionsWithDifferences++;
          
          if (sectionDiff.critical.length > 0) {
            comparison.summary.criticalDifferences += sectionDiff.critical.length;
            console.log(`      ⚠️  ${sectionDiff.critical.length} différences critiques trouvées`);
          }
        }
      }
      
      if (pageComparison.sections.length > 0) {
        comparison.pages.push(pageComparison);
        comparison.summary.totalPages++;
        comparison.summary.totalSections += pageComparison.sections.length;
      }
    }
  }
  
  // Sauvegarder le rapport
  fs.writeFileSync(REPORT_FILE, JSON.stringify(comparison, null, 2));
  
  console.log(`\n✅ Comparaison terminée`);
  console.log(`📊 Résumé:`);
  console.log(`   - Pages comparées: ${comparison.summary.totalPages}`);
  console.log(`   - Sections avec différences: ${comparison.summary.sectionsWithDifferences}`);
  console.log(`   - Différences critiques: ${comparison.summary.criticalDifferences}`);
  console.log(`\n📄 Rapport sauvegardé dans ${REPORT_FILE}`);
  
  // Générer un rapport d'ajustements
  generateAdjustmentsReport(comparison);
}

function generateAdjustmentsReport(comparison) {
  const adjustmentsFile = path.join(OUTPUT_DIR, 'adjustments-needed.json');
  const adjustments = {
    timestamp: new Date().toISOString(),
    pages: [],
  };
  
  for (const pageComparison of comparison.pages) {
    const pageAdjustments = {
      page: pageComparison.meyePage,
      lang: pageComparison.lang,
      adjustments: [],
    };
    
    for (const sectionDiff of pageComparison.sections) {
      const sectionAdjustments = {
        section: sectionDiff.section.name,
        styles: {},
        children: {},
      };
      
      // Ajustements de styles de section
      for (const [property, diff] of Object.entries(sectionDiff.styles)) {
        if (diff.different) {
          sectionAdjustments.styles[property] = {
            current: diff.meye,
            target: diff.rivemont,
            change: diff.difference,
            changePercent: diff.differencePercent,
          };
        }
      }
      
      // Ajustements des enfants
      for (const [childType, childDiffs] of Object.entries(sectionDiff.children)) {
        sectionAdjustments.children[childType] = {};
        for (const [property, diff] of Object.entries(childDiffs)) {
          if (diff.different) {
            sectionAdjustments.children[childType][property] = {
              current: diff.meye,
              target: diff.rivemont,
              change: diff.difference,
              changePercent: diff.differencePercent,
            };
          }
        }
      }
      
      if (Object.keys(sectionAdjustments.styles).length > 0 || 
          Object.keys(sectionAdjustments.children).length > 0) {
        pageAdjustments.adjustments.push(sectionAdjustments);
      }
    }
    
    if (pageAdjustments.adjustments.length > 0) {
      adjustments.pages.push(pageAdjustments);
    }
  }
  
  fs.writeFileSync(adjustmentsFile, JSON.stringify(adjustments, null, 2));
  console.log(`📋 Rapport d'ajustements sauvegardé dans ${adjustmentsFile}`);
}

compareSections().catch(console.error);
