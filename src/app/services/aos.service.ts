import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AosService {
  private platformId = inject(PLATFORM_ID);
  private initialized = false;
  private AOS: any = null;

  async init() {
    if (isPlatformBrowser(this.platformId) && !this.initialized) {
      try {
        // Import dynamique d'AOS
        const aosModule = await import('aos');
        this.AOS = aosModule.default || aosModule;
        
        if (this.AOS && this.AOS.init) {
          this.AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 0,
            disable: false
          });
          this.initialized = true;
        }
      } catch (error) {
        console.warn('AOS library could not be loaded:', error);
      }
    }
  }

  refresh() {
    if (isPlatformBrowser(this.platformId) && this.initialized && this.AOS && this.AOS.refresh) {
      this.AOS.refresh();
    }
  }

  refreshHard() {
    if (isPlatformBrowser(this.platformId) && this.initialized && this.AOS && this.AOS.refreshHard) {
      this.AOS.refreshHard();
    }
  }
}
