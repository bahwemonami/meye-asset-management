import { Component, inject, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { AosService } from '../../services/aos.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-firm-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./firm-profile.component.scss'],
  template: `
    <div class="template-about-page-container">
      <!-- Main Content Section - Clone 1:1 de Rivemont -->
      <section class="template-part-desc-image    template-part-desc-image--reverse">
        <div class="content">
          <div class="col">
            <div class="description gl-text-editor" data-aos="fade">
              <h1>{{ t.get('firmProfile.title') }}</h1>
              <p>{{ t.get('firmProfile.text1') }}</p>
              <ul>
                <li>{{ t.get('firmProfile.traditionalStrategies') }}</li>
              </ul>
              <p><strong>{{ t.get('firmProfile.alternativeStrategiesTitle') }}</strong></p>
              <ul>
                @for (strategy of getArray('firmProfile.alternativeStrategies'); track strategy) {
                  <li>{{ strategy }}</li>
                }
              </ul>
              <p>{{ t.get('firmProfile.text2') }}</p>
              <p>{{ t.get('firmProfile.text3') }}</p>
            </div>
            <div class="button-holder" data-aos="fade-up">
              <a [routerLink]="langService.buildUrl('contact')" class="gl-button " target="_self">
                {{ t.get('common.contactUs') }}
              </a>
            </div>
          </div>
          <div class="col">
            <div class="image-holder" data-aos="fade-up">
              <img [src]="imageService.getImage('image-2')" alt="" width="557" height="665" class="attachment-large size-large" decoding="async" fetchpriority="high" />
            </div>
          </div>
        </div>
      </section>

      <!-- Team CTA Section - Clone 1:1 de Rivemont -->
      <section class="section-cta">
        <div class="content">
          <div class="image-holder">
            <img [src]="imageService.getImage('team-2')" alt="" class="background" decoding="async" loading="lazy" />
            <div class="button-holder">
              <a [routerLink]="langService.buildUrl('our-team')" class="gl-button" target="_self">
                {{ t.get('firmProfile.discoverTeam') }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: ``
})
export class FirmProfileComponent implements AfterViewInit {
  imageService = inject(ImageMappingService);
  aosService = inject(AosService);
  t = inject(TranslationService);
  langService = inject(LanguageService);

  ngAfterViewInit() {
    // Rafraîchir AOS après le chargement de la vue
    setTimeout(() => {
      this.aosService.refresh();
    }, 100);
  }

  getArray(key: string): string[] {
    const value = this.t.get(key);
    return Array.isArray(value) ? value : [];
  }
}
