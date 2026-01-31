import { Injectable, signal, inject, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService, Language } from './language.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface Translations {
  [key: string]: string | Translations;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private http = inject(HttpClient);
  private languageService = inject(LanguageService);
  
  private translations = signal<Translations>({});
  private loading = signal<boolean>(false);

  constructor() {
    // Charger les traductions au démarrage
    this.loadTranslations(this.languageService.currentLanguage());
    
    // Recharger les traductions quand la langue change
    effect(() => {
      const lang = this.languageService.currentLanguage();
      this.loadTranslations(lang);
    });
  }

  /**
   * Charge les traductions depuis le fichier JSON
   */
  private loadTranslations(lang: Language): void {
    this.loading.set(true);
    this.http.get<Translations>(`/assets/i18n/${lang}.json`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors du chargement des traductions ${lang}:`, error);
          return of({});
        })
      )
      .subscribe(translations => {
        this.translations.set(translations);
        this.loading.set(false);
      });
  }

  /**
   * Récupère une traduction par clé
   * Supporte les clés imbriquées avec la notation "section.key"
   * Peut retourner string ou array selon le type de valeur
   */
  get(key: string, params?: { [key: string]: string | number }): string | string[] {
    const translations = this.translations();
    
    if (!translations || Object.keys(translations).length === 0) {
      return key; // Retourner la clé si les traductions ne sont pas encore chargées
    }

    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Retourner la clé si la traduction n'existe pas
      }
    }

    // Si c'est un array, le retourner tel quel
    if (Array.isArray(value)) {
      return value;
    }

    // Si c'est une string, remplacer les paramètres si fournis
    if (typeof value === 'string') {
      if (params) {
        return this.replaceParams(value, params);
      }
      return value;
    }

    return key;
  }

  /**
   * Remplace les paramètres dans une chaîne de traduction
   */
  private replaceParams(text: string, params: { [key: string]: string | number }): string {
    let result = text;
    for (const [key, value] of Object.entries(params)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    }
    return result;
  }

  /**
   * Retourne un observable pour les traductions (utile pour les observables)
   */
  getAsync(key: string, params?: { [key: string]: string | number }): Observable<string | string[]> {
    const value = this.get(key, params);
    return of(value);
  }

  /**
   * Vérifie si les traductions sont chargées
   */
  isLoaded(): boolean {
    return !this.loading() && Object.keys(this.translations()).length > 0;
  }
}
