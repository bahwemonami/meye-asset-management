import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AosService } from './services/aos.service';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <a href="#main-content" class="skip-to-content">{{ t.get('app.skipToContent') }}</a>
    <app-header />
    <main id="main-content" class="min-h-screen" role="main">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: ``
})
export class App implements OnInit {
  title = 'MEYE ASSET MANAGER';
  t = inject(TranslationService);
  private aosService = inject(AosService);

  ngOnInit() {
    // Initialiser AOS au démarrage de l'application
    this.aosService.init();
  }
}
