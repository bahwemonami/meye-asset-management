// Script pour sauvegarder les données Firecrawl scrapées
// Ce script sera utilisé pour stocker les données HTML scrapées pour référence future

const fs = require('fs');
const path = require('path');

const firecrawlDataDir = path.join(__dirname, '../data/firecrawl');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(firecrawlDataDir)) {
  fs.mkdirSync(firecrawlDataDir, { recursive: true });
}

// Les données seront sauvegardées manuellement après chaque scrape Firecrawl
// Ce script sert de référence pour la structure de données

console.log('Firecrawl data directory ready:', firecrawlDataDir);
