import { Injectable, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

export type Language = 'fr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private router = inject(Router);
  private readonly defaultLanguage: Language = 'fr';
  currentLanguage = signal<Language>(this.defaultLanguage);

  constructor() {
    // Détecter la langue depuis l'URL au démarrage
    this.detectLanguageFromUrl();
    
    // Écouter les changements de route pour mettre à jour la langue
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.detectLanguageFromUrl();
      });
  }

  /**
   * Détecte la langue depuis l'URL actuelle
   */
  private detectLanguageFromUrl(): void {
    const url = this.router.url;
    const segments = url.split('/').filter(s => s);
    
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'fr')) {
      this.currentLanguage.set(segments[0] as Language);
    } else {
      this.currentLanguage.set(this.defaultLanguage);
    }
  }

  /**
   * Change la langue et redirige vers la même page dans la nouvelle langue
   */
  setLanguage(lang: Language): void {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/').filter(s => s);
    
    // Retirer le préfixe de langue actuel s'il existe
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'fr')) {
      segments.shift();
    }
    
    // Construire la nouvelle URL avec le nouveau préfixe de langue (toujours inclure le préfixe)
    const newUrl = '/' + lang + '/' + segments.join('/');
    
    this.router.navigateByUrl(newUrl);
  }

  /**
   * Retourne le préfixe de langue pour l'URL (vide pour fr par défaut)
   */
  getLanguagePrefix(): string {
    const lang = this.currentLanguage();
    return lang === this.defaultLanguage ? '' : lang;
  }

  /**
   * Construit une URL avec le préfixe de langue approprié
   * Maintenant que les routes nécessitent un préfixe, on inclut toujours le préfixe
   */
  buildUrl(path: string): string {
    const lang = this.currentLanguage();
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Toujours inclure le préfixe de langue car les routes sont configurées avec les préfixes
    return '/' + lang + '/' + cleanPath;
  }

  /**
   * Retourne le chemin sans le préfixe de langue
   */
  getPathWithoutLanguage(path: string): string {
    const segments = path.split('/').filter(s => s);
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'fr')) {
      segments.shift();
    }
    return '/' + segments.join('/');
  }
}
