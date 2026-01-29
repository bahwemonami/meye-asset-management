import { Component, inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./contact.component.scss'],
  template: `
    <div class="template-contact-page-container">
      <section class="section-hero">
        <div class="content">
          <div class="col">
            <div class="image-holder" data-aos="fade-up">
              <img [src]="imageService.getImage('contact-hero')" alt="" />
            </div>
          </div>
          <div class="col">
            <h1 class="title">Contact</h1>
            <div class="rows">
              <div class="row">
                <p class="address">
                  <a href="https://maps.app.goo.gl/3J5cE5756qnxb7ic9" target="_blank">
                    160, boul. de l’Hôpital, bureau 202<br>
                    Gatineau, Québec, J8T 8J1
                  </a>
                </p>
                <div class="contacts">
                  <div class="contact">
                    <div class="contact-title">Tél. : &nbsp;</div>
                    <div class="contact-text"><a href="tel:819 246-8800">819 246-8800</a></div>
                  </div>
                  <div class="contact">
                    <div class="contact-title">Courriel : &nbsp;</div>
                    <div class="contact-text"><a href="mailto:info@rivemont.ca">info@rivemont.ca</a></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <p class="address">
                  <a href="https://maps.app.goo.gl/HmpL8Vany252sq3FA" target="_blank">
                    19 rue Le Royer Ouest, bureau 300<br>
                    Montréal, Québec, H2Y 1W4
                  </a>
                </p>
                <div class="contacts">
                  <div class="contact">
                    <div class="contact-title">Tél. : &nbsp;</div>
                    <div class="contact-text"><a href="tel:819 246-8800">819 246-8800</a></div>
                  </div>
                  <div class="contact">
                    <div class="contact-title">Courriel : &nbsp;</div>
                    <div class="contact-text"><a href="mailto:info@rivemont.ca">info@rivemont.ca</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-contact">
        <div class="content">
          <h2 class="title">Écrivez-nous</h2>
          <div class="gl-form-holder">
            <form (ngSubmit)="onSubmit()" class="gl-form">
              <div class="gl-form-controls gl-form-controls--two-col">
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.prenom"
                    name="prenom"
                    placeholder="Prénom"
                    class="gl-input"
                    required>
                </div>
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.nom"
                    name="nom"
                    placeholder="Nom"
                    class="gl-input"
                    required>
                </div>
              </div>
              <div class="gl-form-controls gl-form-controls--two-col">
                <div class="gl-form-control">
                  <input
                    type="email"
                    [(ngModel)]="formData.courriel"
                    name="courriel"
                    placeholder="Courriel"
                    class="gl-input"
                    required>
                </div>
                <div class="gl-form-control">
                  <input
                    type="text"
                    [(ngModel)]="formData.telephone"
                    name="telephone"
                    placeholder="Téléphone"
                    class="gl-input">
                </div>
              </div>
              <div class="gl-form-control">
                <textarea
                  [(ngModel)]="formData.message"
                  name="message"
                  placeholder="Message"
                  rows="5"
                  class="gl-textarea"
                  required></textarea>
              </div>
              <div class="gl-form-control gl-form-control--submit">
                <button type="submit" class="gl-button gl-button--blue-dark">Envoyer</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class ContactComponent {
  imageService = inject(ImageMappingService);
  
  formData = {
    prenom: '',
    nom: '',
    courriel: '',
    telephone: '',
    message: ''
  };

  onSubmit() {
    console.log('Formulaire soumis:', this.formData);
    alert('Merci pour votre message! Nous vous répondrons dans les plus brefs délais.');
  }
}
