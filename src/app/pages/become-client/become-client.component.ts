import { Component, inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageMappingService } from '../../services/image-mapping.service';

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
          <h1 class="title">Passez à l'action,<br>devenez client.</h1>
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
          <h2 class="title">Devenir client</h2>
          <div class="gl-form-holder">
            <form (ngSubmit)="onSubmit()" class="gl-form">
              <div class="gl-form-controls gl-form-controls--two-col">
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.prenom"
                    name="prenom"
                    placeholder="Prénom"
                    required
                  />
                </div>
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.nom"
                    name="nom"
                    placeholder="Nom"
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
                    placeholder="Courriel"
                    required
                  />
                </div>
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.telephone"
                    name="telephone"
                    placeholder="Téléphone"
                  />
                </div>
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.codePostal"
                    name="codePostal"
                    placeholder="3 caractères du code postal*"
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
                  placeholder="Valeur approximative des actifs à gérer*"
                  required
                />
              </div>

              <div class="gl-form-control">
                <textarea
                  [(ngModel)]="formData.source"
                  name="source"
                  placeholder="Comment avez-vous entendu parler de nous ?"
                  rows="4"
                  class="small"
                ></textarea>
              </div>

              <div class="gl-form-control">
                <textarea
                  [(ngModel)]="formData.besoin"
                  name="besoin"
                  placeholder="Quel est le besoin à répondre ?"
                  rows="4"
                  class="small"
                ></textarea>
              </div>

              <div class="gl-form-controls gl-form-controls--radio-submit">
                <div class="gl-form-control gl-form-control--list">
                  <label>Préférence de contact</label>
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
                          <span class="wpcf7-list-item-label">Téléphone</span>
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
                          <span class="wpcf7-list-item-label">Courriel</span>
                        </label>
                      </span>
                    </span>
                  </span>
                </div>
                <div class="gl-form-control">
                  <button type="submit" class="gl-button gl-button--blue-dark">Envoyer</button>
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
    alert('Merci pour votre intérêt! Nous vous contacterons dans les plus brefs délais.');
  }
}
