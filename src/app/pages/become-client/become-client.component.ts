import { Component, inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-become-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./become-client.component.scss'],
  template: `
    <div class="template-form-page-container">
      <!-- Hero Section - Identique à Rivemont -->
      <section class="template-part-hero">
        <div class="content">
          <h1 class="title">{{ t.get('becomeClient.title') }}</h1>
          <img
            [src]="imageService.getImage('form-hero')"
            alt=""
            class="gl-responsive-background gl-responsive-background--desktop gl-img-grey"
          />
        </div>
      </section>

      <!-- Form Section - Identique à Rivemont -->
      <section class="section-form">
        <div class="content">
          <h2 class="title">{{ t.get('becomeClient.formTitle') }}</h2>
          <div class="gl-form-holder">
            <form (ngSubmit)="onSubmit()" class="gl-form">
              <div class="gl-form-controls gl-form-controls--two-col">
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.prenom"
                    name="prenom"
                    [placeholder]="t.get('becomeClient.firstName')"
                    required
                  />
                </div>
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.nom"
                    name="nom"
                    [placeholder]="t.get('becomeClient.lastName')"
                    required
                  />
                </div>
              </div>

              <div class="gl-form-controls">
                <div class="gl-form-control">
                  <input
                    type="email"
                    [(ngModel)]="formData.courriel"
                    name="courriel"
                    [placeholder]="t.get('becomeClient.email')"
                    required
                  />
                </div>
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.telephone"
                    name="telephone"
                    [placeholder]="t.get('becomeClient.phone')"
                  />
                </div>
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.codePostal"
                    name="codePostal"
                    [placeholder]="t.get('becomeClient.postalCode')"
                    maxlength="3"
                    required
                  />
                </div>
              </div>

              <div class="gl-form-control">
                <input
                  type="text"
                  [(ngModel)]="formData.valeurActifs"
                  name="valeurActifs"
                    [placeholder]="t.get('becomeClient.assetValue')"
                  required
                />
              </div>

              <div class="gl-form-control">
                <textarea
                  [(ngModel)]="formData.source"
                  name="source"
                  [placeholder]="t.get('becomeClient.source')"
                  rows="4"
                  class="small"
                ></textarea>
              </div>

              <div class="gl-form-control">
                <textarea
                  [(ngModel)]="formData.besoin"
                  name="besoin"
                  [placeholder]="t.get('becomeClient.need')"
                  rows="4"
                  class="small"
                ></textarea>
              </div>

              <div class="gl-form-controls gl-form-controls--radio-submit">
                <div class="gl-form-control gl-form-control--list">
                  <label>{{ t.get('becomeClient.contactPreference') }}</label>
                  <span class="wpcf7-form-control-wrap">
                    <span class="wpcf7-form-control wpcf7-radio inline-list">
                      <span class="wpcf7-list-item first">
                        <label>
                          <input
                            type="radio"
                            name="preference"
                            value="telephone"
                            [(ngModel)]="formData.preference"
                          />
                          <span class="wpcf7-list-item-label">{{ t.get('becomeClient.phoneOption') }}</span>
                        </label>
                      </span>
                      <span class="wpcf7-list-item last">
                        <label>
                          <input
                            type="radio"
                            name="preference"
                            value="courriel"
                            [(ngModel)]="formData.preference"
                          />
                          <span class="wpcf7-list-item-label">{{ t.get('becomeClient.emailOption') }}</span>
                        </label>
                      </span>
                    </span>
                  </span>
                </div>
                <div class="gl-form-control">
                  <button type="submit" class="gl-button gl-button--blue-dark">{{ t.get('becomeClient.submit') }}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class BecomeClientComponent {
  imageService = inject(ImageMappingService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
  
  formData = {
    prenom: '',
    nom: '',
    courriel: '',
    telephone: '',
    codePostal: '',
    valeurActifs: '',
    source: '',
    besoin: '',
    preference: ''
  };

  onSubmit() {
    console.log('Formulaire soumis:', this.formData);
    alert(this.t.get('becomeClient.successMessage'));
  }
}
