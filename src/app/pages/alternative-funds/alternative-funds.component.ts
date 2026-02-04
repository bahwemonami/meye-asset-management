import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';
import { AosService } from '../../services/aos.service';

@Component({
  selector: 'app-alternative-funds',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./alternative-funds.component.scss'],
  template: `
    <div class="template-fonds-page-container">
      <section class="section-hero">
        <div class="content">
          <img
            [src]="imageService.getImage('image-3')"
            alt=""
            class="gl-responsive-background gl-responsive-background--desktop gl-img-grey"
            loading="eager"
            fetchpriority="high"
          />
          <h1 class="title" data-aos="fade">{{ t.get('alternativeFunds.title') }}</h1>
          <div class="links">
            <div class="link-holder" data-aos="zoom-in">
              <a class="link" [routerLink]="langService.buildUrl('alternative-funds/long-short')">
                {{ t.get('alternativeFunds.longShort') }}
              </a>
            </div>
            <div class="link-holder" data-aos="zoom-in">
              <a class="link" [routerLink]="langService.buildUrl('alternative-funds/fonds-meye-crypto')">
                {{ t.get('alternativeFunds.crypto') }}
              </a>
            </div>
            <div class="link-holder" data-aos="zoom-in">
              <a class="link" [routerLink]="langService.buildUrl('alternative-funds/fonds-meye-microcap')">
                {{ t.get('alternativeFunds.microcap') }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Long/Short Fund Section -->
      <section class="template-part-desc-image">
        <div class="content">
          <div class="col">
            <div class="description gl-text-editor" data-aos="fade">
              <h2>{{ t.get('alternativeFunds.longShort.title') }}</h2>
              <p>{{ t.get('alternativeFunds.longShort.disclaimer') }}</p>
              <p>{{ t.get('alternativeFunds.longShort.paragraph1') }}</p>
              <p>{{ t.get('alternativeFunds.longShort.paragraph2') }}</p>
              <p>{{ t.get('alternativeFunds.longShort.paragraph3') }}</p>
              <p>{{ t.get('alternativeFunds.longShort.paragraph4') }}</p>
            </div>
            <div class="button-holder" data-aos="fade-up">
              <a [routerLink]="langService.buildUrl('contact')" class="gl-button gl-button--blue-dark" target="_self">
                {{ t.get('common.contactUs') }}
              </a>
            </div>
          </div>
          <div class="col">
            <div class="image-holder" data-aos="fade-up">
              <img [src]="imageService.getImage('image-2')" alt="Meye Long/Short Fund" width="557" height="665" class="attachment-large size-large" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class AlternativeFundsComponent implements AfterViewInit {
  imageService = inject(ImageMappingService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
  aosService = inject(AosService);

  ngAfterViewInit() {
    setTimeout(() => {
      this.aosService.refresh();
    }, 100);
  }
}
