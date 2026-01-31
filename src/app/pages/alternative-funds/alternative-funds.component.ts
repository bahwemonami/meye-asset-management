import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';

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
          />
          <h1 class="title" data-aos="fade">{{ t.get('alternativeFunds.title') }}</h1>
          <div class="links">
            <div class="link-holder" data-aos="zoom-in">
              <a class="link" [routerLink]="langService.buildUrl('alternative-funds/fonds-rivemont-long-short')">
                {{ t.get('alternativeFunds.longShort') }}
              </a>
            </div>
            <div class="link-holder" data-aos="zoom-in">
              <a class="link" [routerLink]="langService.buildUrl('alternative-funds/fonds-rivemont-crypto')">
                {{ t.get('alternativeFunds.crypto') }}
              </a>
            </div>
            <div class="link-holder" data-aos="zoom-in">
              <a class="link" [routerLink]="langService.buildUrl('alternative-funds/fonds-rivemont-microcap')">
                {{ t.get('alternativeFunds.microcap') }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class AlternativeFundsComponent {
  imageService = inject(ImageMappingService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
}
