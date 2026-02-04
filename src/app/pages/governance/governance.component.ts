import { Component, inject, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageMappingService } from '../../services/image-mapping.service';
import { AosService } from '../../services/aos.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-governance',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="template-gouvernance-page-container">
      <div class="sections">
        <!-- Section 1: Registration with Authorities - Image à droite, texte à gauche -->
        <section class="template-part-desc-image template-part-desc-image--1 template-part-desc-image--reverse">
          <div class="content">
            <div class="col">
              <div class="description gl-text-editor" data-aos="fade">
                <h1>{{ t.get('governance.registration') }}</h1>
                <p>{{ t.get('governance.registrationText') }}</p>
                <p>
                  {{ t.get('governance.registerLinkText') }}&nbsp;<a href="https://lautorite.qc.ca/en/general-public/registers/register-of-firms-and-individuals-authorized-to-practice" target="_blank" rel="noopener noreferrer">https://lautorite.qc.ca/en/general-public/registers/register-of-firms-and-individuals-authorized-to-practice</a>
                </p>
              </div>
              <div class="button-holder" data-aos="fade-up">
                <a href="http://lautorite.qc.ca" class="gl-button" target="_blank" rel="noopener noreferrer">
                  {{ t.get('governance.clickHere') }}
                </a>
              </div>
            </div>
            <div class="col">
              <div class="image-holder" data-aos="fade-up">
                <img [src]="imageService.getImage('shutterstock-2')" alt="" width="836" height="998" class="attachment-large size-large" decoding="async" fetchpriority="high" />
              </div>
            </div>
          </div>
        </section>

        <!-- Section 2: Protection of your assets - Image à gauche, texte à droite -->
        <section class="template-part-desc-image template-part-desc-image--1 template-part-desc-image--reverse-order-mobile">
          <div class="content">
            <div class="col">
              <div class="description gl-text-editor" data-aos="fade">
                <h2>{{ t.get('governance.assetProtection') }}</h2>
                <p>{{ t.get('governance.assetProtectionText1') }}</p>
                <p>{{ t.get('governance.assetProtectionText2') }}</p>
                <p>{{ t.get('governance.assetProtectionText3') }}</p>
              </div>
            </div>
            <div class="col">
              <div class="image-holder" data-aos="fade-up">
                <img [src]="imageService.getImage('shutterstock-1')" alt="" width="836" height="998" class="attachment-large size-large" decoding="async" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Section 3: Privacy Policy -->
      <section class="description-section">
        <div class="content">
          <div class="col">
            <div class="description" data-aos="fade">
              <h2>{{ t.get('governance.privacyPolicy') }}</h2>
              <p>{{ t.get('governance.privacyPolicyText1') }}</p>
              <p>{{ t.get('governance.privacyPolicyText2') }}</p>
            </div>
          </div>
          <div class="col">
            <div class="banner" data-aos="fade-up">
              <div class="banner-title">{{ t.get('governance.privacyPolicyTitle') }}</div>
              <a href="#" class="gl-button" target="_blank">
                {{ t.get('governance.download') }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Complaint Handling Policy -->
      <section class="description-section">
        <div class="content">
          <div class="col">
            <div class="description" data-aos="fade">
              <h3>{{ t.get('governance.complaintHandling') }}</h3>
              <p>{{ t.get('governance.complaintHandlingText') }}</p>
            </div>
          </div>
          <div class="col">
            <div class="banner" data-aos="fade-up">
              <div class="banner-title">{{ t.get('governance.complaintHandlingSummary') }}</div>
              <a href="#" class="gl-button" target="_blank">
                {{ t.get('governance.download') }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: ``
})
export class GovernanceComponent implements AfterViewInit {
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
}
