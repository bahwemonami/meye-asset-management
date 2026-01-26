/**
 * Script de téléchargement d'images depuis Rivemont.ca
 * 
 * ⚠️ AVERTISSEMENT LÉGAL IMPORTANT:
 * Ce script télécharge des images protégées par le droit d'auteur.
 * L'utilisation de ces images sans autorisation peut constituer une violation du droit d'auteur.
 * Utilisez ce script uniquement si vous avez obtenu l'autorisation de Rivemont.
 * 
 * Pour un usage légal, utilisez plutôt des images stock libres de droits.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const RIVEMONT_BASE_URL = 'https://rivemont.ca';
const OUTPUT_DIR = path.join(__dirname, '../src/assets/images/rivemont');
const MAPPING_FILE = path.join(__dirname, 'image-mapping.json');

// Créer les dossiers nécessaires
const dirs = {
  logo: path.join(OUTPUT_DIR, 'logo'),
  team: path.join(OUTPUT_DIR, 'team'),
  backgrounds: path.join(OUTPUT_DIR, 'backgrounds'),
  icons: path.join(OUTPUT_DIR, 'icons'),
  general: path.join(OUTPUT_DIR, 'general')
};

Object.values(dirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Mapping des images
const imageMapping = {
  images: [],
  metadata: {
    downloadedAt: new Date().toISOString(),
    warning: 'These images are copyrighted by Rivemont. Use only with permission.'
  }
};

/**
 * Télécharge un fichier depuis une URL
 */
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    const file = fs.createWriteStream(outputPath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Suivre les redirections
        return downloadFile(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(outputPath);
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      reject(err);
    });
  });
}

/**
 * Détermine le type d'image et le dossier de destination
 */
function categorizeImage(url, pageUrl) {
  const urlLower = url.toLowerCase();
  const filename = path.basename(url);
  
  if (urlLower.includes('logo') || urlLower.includes('rivemont')) {
    return { type: 'logo', dir: dirs.logo };
  }
  
  if (urlLower.includes('team') || urlLower.includes('membre') || urlLower.includes('equipe')) {
    return { type: 'team', dir: dirs.team };
  }
  
  if (urlLower.includes('background') || urlLower.includes('bg') || urlLower.includes('hero')) {
    return { type: 'background', dir: dirs.backgrounds };
  }
  
  if (urlLower.includes('icon') || urlLower.includes('social') || 
      urlLower.includes('facebook') || urlLower.includes('youtube') || urlLower.includes('linkedin')) {
    return { type: 'icon', dir: dirs.icons };
  }
  
  return { type: 'general', dir: dirs.general };
}

/**
 * Extrait les URLs d'images depuis le HTML
 */
function extractImageUrls(html, baseUrl) {
  const imageUrls = new Set();
  
  // Images dans les balises <img>
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1];
    if (url && !url.startsWith('data:')) {
      const absoluteUrl = url.startsWith('http') ? url : new URL(url, baseUrl).href;
      imageUrls.add(absoluteUrl);
    }
  }
  
  // Images dans les CSS (background-image)
  const bgRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(html)) !== null) {
    const url = match[1];
    if (url && !url.startsWith('data:')) {
      const absoluteUrl = url.startsWith('http') ? url : new URL(url, baseUrl).href;
      imageUrls.add(absoluteUrl);
    }
  }
  
  // Images dans les attributs data-*
  const dataRegex = /data-[^=]*=["']([^"']*\.(jpg|jpeg|png|gif|svg|webp))["']/gi;
  while ((match = dataRegex.exec(html)) !== null) {
    const url = match[1];
    if (url && !url.startsWith('data:')) {
      const absoluteUrl = url.startsWith('http') ? url : new URL(url, baseUrl).href;
      imageUrls.add(absoluteUrl);
    }
  }
  
  return Array.from(imageUrls);
}

/**
 * Télécharge le HTML d'une page
 */
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return fetchPage(response.headers.location).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url}: ${response.statusCode}`));
        return;
      }
      
      let html = '';
      response.on('data', (chunk) => { html += chunk; });
      response.on('end', () => resolve(html));
    }).on('error', reject);
  });
}

/**
 * Télécharge toutes les images d'une page
 */
async function downloadImagesFromPage(pageUrl) {
  console.log(`\n📄 Analyzing page: ${pageUrl}`);
  
  try {
    const html = await fetchPage(pageUrl);
    const imageUrls = extractImageUrls(html, pageUrl);
    
    console.log(`   Found ${imageUrls.length} images`);
    
    const downloaded = [];
    
    for (const imageUrl of imageUrls) {
      try {
        const category = categorizeImage(imageUrl, pageUrl);
        const filename = path.basename(new URL(imageUrl).pathname) || 'image.jpg';
        const ext = path.extname(filename) || '.jpg';
        const baseName = path.basename(filename, ext);
        const outputPath = path.join(category.dir, `${baseName}${ext}`);
        
        // Éviter les doublons
        if (fs.existsSync(outputPath)) {
          console.log(`   ⏭️  Skipping (exists): ${filename}`);
          continue;
        }
        
        console.log(`   ⬇️  Downloading: ${filename} -> ${category.type}/`);
        await downloadFile(imageUrl, outputPath);
        
        downloaded.push({
          originalUrl: imageUrl,
          localPath: path.relative(path.join(__dirname, '..'), outputPath),
          type: category.type,
          pageUrl: pageUrl,
          filename: filename
        });
        
        // Petite pause pour éviter de surcharger le serveur
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`   ❌ Error downloading ${imageUrl}:`, error.message);
      }
    }
    
    return downloaded;
  } catch (error) {
    console.error(`❌ Error processing page ${pageUrl}:`, error.message);
    return [];
  }
}

/**
 * Pages à analyser
 */
const pagesToAnalyze = [
  'https://rivemont.ca/',
  'https://rivemont.ca/profil-de-la-firme/',
  'https://rivemont.ca/notre-equipe/',
  'https://rivemont.ca/gestion-privee/',
  'https://rivemont.ca/rendements/',
  'https://rivemont.ca/communications/',
  'https://rivemont.ca/fonds-alternatifs/',
  'https://rivemont.ca/contact/',
  'https://rivemont.ca/devenir-client/',
  'https://rivemont.ca/gouvernance/'
];

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Starting image download from Rivemont.ca');
  console.log('⚠️  LEGAL WARNING: Only use downloaded images with proper authorization!');
  console.log('');
  
  for (const pageUrl of pagesToAnalyze) {
    const downloaded = await downloadImagesFromPage(pageUrl);
    imageMapping.images.push(...downloaded);
  }
  
  // Sauvegarder le mapping
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(imageMapping, null, 2));
  
  console.log(`\n✅ Download complete!`);
  console.log(`   Total images downloaded: ${imageMapping.images.length}`);
  console.log(`   Mapping saved to: ${MAPPING_FILE}`);
  console.log(`   Images saved to: ${OUTPUT_DIR}`);
  console.log('\n⚠️  Remember: These images are copyrighted. Use only with permission!');
}

// Exécuter le script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { downloadImagesFromPage, extractImageUrls, categorizeImage };
