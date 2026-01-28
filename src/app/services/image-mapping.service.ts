import { Injectable } from '@angular/core';

/**
 * Service de mapping des images disponibles dans les stocks
 * vers les sections appropriées de MEYE ASSET MANAGER
 */
@Injectable({
  providedIn: 'root'
})
export class ImageMappingService {
  
  /**
   * Mapping des images par section
   */
  private readonly imageMap: Record<string, string> = {
    // Logos
    'logo-light': '/assets/images/rivemont/logo/logo-light.svg',
    'logo-dark': '/assets/images/rivemont/logo/logo-dark.svg',
    'logo-light-png': '/assets/images/rivemont/logo/logo-light.png',
    'user-icon': '/assets/images/rivemont/logo/user.svg',
    
    // Icons
    'arrow-left-dark': '/assets/images/rivemont/icons/arrow-left-dark.svg',
    'arrow-left-blue': '/assets/images/rivemont/icons/arrow-left-blue.svg',
    
    // Hero Images
    'home-hero': '/assets/images/rivemont/logo/home-hero.jpg',
    'form-hero': '/assets/images/rivemont/logo/form-hero.jpg',
    'contact-hero': '/assets/images/rivemont/logo/contac-hero.jpg',
    'performance-hero': '/assets/images/rivemont/logo/Rendements-hero.jpg',
    'private-management-hero': '/assets/images/rivemont/logo/Gestion-privee-hero.jpg',
    
    // Team Images
    'team-preview': '/assets/images/rivemont/logo/team.jpg',
    'team-preview-2': '/assets/images/rivemont/logo/team-2.jpg',
    'team-2': '/assets/images/rivemont/logo/team-2.jpg',
    
    // Team Portraits
    'martin-lalonde': '/assets/images/rivemont/logo/Martin-Lalonde-Portrait.jpg',
    'martin-lalonde-1': '/assets/images/rivemont/logo/Martin-Lalonde-Portrait-1.jpg',
    'philippe-jette': '/assets/images/rivemont/logo/Philippe-Jette-Portrait.jpg',
    'mathieu-martin': '/assets/images/rivemont/logo/Mathieu-Martin-Portrait.jpg',
    'martin-piche': '/assets/images/rivemont/logo/Martin-Piche-Portrait.jpg',
    'david-blouin': '/assets/images/rivemont/logo/David-Blouin-Portrait.jpg',
    'jeffrey-veilleux': '/assets/images/rivemont/logo/Jeffrey-Veilleux-Portrait.jpg',
    'julien-carl': '/assets/images/rivemont/logo/thumbnail_Julien-Carl_Rivemont_Finale-34-683x1024.jpg',
    
    // Backgrounds
    'newsletter-bg': '/assets/images/rivemont/logo/newsletter-bg.png',
    'image-1': '/assets/images/rivemont/logo/image-1.jpg',
    'image-2': '/assets/images/rivemont/logo/image-2.jpg',
    'image-3': '/assets/images/rivemont/logo/image-3.jpg',
    'image-4': '/assets/images/rivemont/logo/image-4.jpg',
    'gestion-privee-hero': '/assets/images/rivemont/logo/Gestion-privee-hero.jpg',
    'shutterstock-1': '/assets/images/rivemont/logo/shutterstock_2483012659.jpg',
    'shutterstock-2': '/assets/images/rivemont/logo/shutterstock_2478343593.jpg',
    
    // Autres
    'clipboard-1': '/assets/images/rivemont/logo/Clipboard_20260126.png',
    'clipboard-2': '/assets/images/rivemont/logo/Clipboard_20251211.png',
    'performance-chart': '/assets/images/rivemont/logo/Clipboard_20250605.png',
  };

  /**
   * Obtient le chemin d'une image par sa clé
   */
  getImage(key: string): string {
    return this.imageMap[key] || '';
  }

  /**
   * Obtient toutes les images disponibles
   */
  getAllImages(): Record<string, string> {
    return { ...this.imageMap };
  }

  /**
   * Obtient les images par catégorie
   */
  getImagesByCategory(category: 'logo' | 'hero' | 'team' | 'background' | 'other'): Record<string, string> {
    const filtered: Record<string, string> = {};
    
    for (const [key, path] of Object.entries(this.imageMap)) {
      if (this.getCategory(key) === category) {
        filtered[key] = path;
      }
    }
    
    return filtered;
  }

  /**
   * Détermine la catégorie d'une image
   */
  private getCategory(key: string): 'logo' | 'hero' | 'team' | 'background' | 'other' {
    if (key.includes('logo') || key.includes('user-icon')) {
      return 'logo';
    }
    if (key.includes('hero')) {
      return 'hero';
    }
    if (key.includes('team') || key.includes('portrait') || key.includes('martin') || 
        key.includes('philippe') || key.includes('mathieu') || key.includes('david') || 
        key.includes('jeffrey') || key.includes('julien')) {
      return 'team';
    }
    if (key.includes('bg') || key.includes('background') || key.includes('shutterstock') || 
        key.includes('image-')) {
      return 'background';
    }
    return 'other';
  }
}
