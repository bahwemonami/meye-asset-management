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
    <!-- Hero Section - Identique à Rivemont -->
    <section class="template-part-hero">
      <div class="content">
        <h1 class="title">Contact</h1>
        <img [src]="imageService.getImage('contact-hero')" alt="" class="gl-responsive-background gl-responsive-background--desktop gl-img-grey" />
      </div>
    </section>

    <!-- Content Section - Identique à Rivemont -->
    <div class="page-content page-content--contact">
      <div class="page-content__builder">
        <!-- Addresses Section -->
        <div class="addresses-section" data-aos="fade">
          <div class="address-card">
            <div class="address-holder">
              <a href="https://maps.app.goo.gl/3J5cE5756qnxb7ic9" target="_blank" class="address-link">
                160, boul. de l'Hôpital, bureau 202<br>
                Gatineau, Québec, J8T 8J1
              </a>
            </div>
            <div class="contacts">
              <div class="contact">
                <div class="contact-title">Tél. :&nbsp;</div>
                <div class="contact-text"><a href="tel:8192468800">819 246-8800</a></div>
              </div>
              <div class="contact">
                <div class="contact-title">Courriel :&nbsp;</div>
                <div class="contact-text"><a href="mailto:info&#64;meyeasset.ca">info&#64;meyeasset.ca</a></div>
              </div>
            </div>
          </div>
          
          <div class="address-card">
            <div class="address-holder">
              <a href="https://maps.app.goo.gl/HmpL8Vany252sq3FA" target="_blank" class="address-link">
                19 rue Le Royer Ouest, bureau 300<br>
                Montréal, Québec, H2Y 1W4
              </a>
            </div>
            <div class="contacts">
              <div class="contact">
                <div class="contact-title">Tél. :&nbsp;</div>
                <div class="contact-text"><a href="tel:8192468800">819 246-8800</a></div>
              </div>
              <div class="contact">
                <div class="contact-title">Courriel :&nbsp;</div>
                <div class="contact-text"><a href="mailto:info&#64;meyeasset.ca">info&#64;meyeasset.ca</a></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div class="form-section" data-aos="fade-up">
          <h2 class="form-title">Écrivez-nous</h2>
          <form (ngSubmit)="onSubmit()" class="contact-form gl-form">
            <div class="form-row">
              <div class="form-group">
                <input 
                  type="text" 
                  [(ngModel)]="formData.prenom"
                  name="prenom"
                  placeholder="Prénom"
                  class="gl-input"
                  required>
              </div>
              <div class="form-group">
                <input 
                  type="text" 
                  [(ngModel)]="formData.nom"
                  name="nom"
                  placeholder="Nom"
                  class="gl-input"
                  required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <input 
                  type="email" 
                  [(ngModel)]="formData.courriel"
                  name="courriel"
                  placeholder="Courriel"
                  class="gl-input"
                  required>
              </div>
              <div class="form-group">
                <input 
                  type="tel" 
                  [(ngModel)]="formData.telephone"
                  name="telephone"
                  placeholder="Téléphone"
                  class="gl-input">
              </div>
            </div>
            <div class="form-group form-group--full">
              <textarea 
                [(ngModel)]="formData.message"
                name="message"
                placeholder="Message"
                rows="5"
                class="gl-textarea"
                required></textarea>
            </div>
            <div class="form-submit">
              <button type="submit" class="gl-button gl-button--blue-dark">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  `,
  styles: [`
    .page-content--contact {
      padding: 0 165px 160px;
      
      @media (max-width: 1400px) {
        padding: 0 80px 120px;
      }
      
      @media (max-width: 768px) {
        padding: 0 20px 80px;
      }
    }
    
    .addresses-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      margin-bottom: 80px;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }
    
    .address-card {
      .address-holder {
        margin-bottom: 25px;
      }
      
      .address-link {
        display: block;
        font-family: peridot-pe-variable, sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 30px;
        color: rgb(24, 64, 104);
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: rgb(81, 178, 214);
        }
      }
      
      .contacts {
        .contact {
          display: flex;
          margin-bottom: 10px;
          
          .contact-title {
            font-family: peridot-pe-variable, sans-serif;
            font-size: 17px;
            font-weight: 400;
            line-height: 22.1px;
            color: rgb(128, 128, 128);
          }
          
          .contact-text {
            a {
              font-family: peridot-pe-variable, sans-serif;
              font-size: 17px;
              font-weight: 400;
              line-height: 22.1px;
              color: rgb(24, 64, 104);
              text-decoration: none;
              transition: color 0.3s ease;
              
              &:hover {
                color: rgb(81, 178, 214);
              }
            }
          }
        }
      }
    }
    
    .form-section {
      max-width: 800px;
      
      .form-title {
        font-family: peridot-pe-variable, sans-serif;
        font-size: 50px;
        font-weight: 700;
        line-height: 52px;
        color: rgb(24, 64, 104);
        margin: 0 0 40px;
        
        @media (max-width: 768px) {
          font-size: 40px;
          line-height: 44px;
          margin-bottom: 30px;
        }
      }
    }
    
    .contact-form {
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
        
        @media (max-width: 568px) {
          grid-template-columns: 1fr;
        }
      }
      
      .form-group {
        margin-bottom: 20px;
        
        &--full {
          grid-column: 1 / -1;
        }
      }
      
      .gl-input,
      .gl-textarea {
        width: 100%;
        padding: 16px 20px;
        border: 2px solid rgb(234, 243, 253);
        border-radius: 8px;
        font-family: peridot-pe-variable, sans-serif;
        font-size: 17px;
        font-weight: 400;
        line-height: 22.1px;
        color: rgb(24, 64, 104);
        background-color: rgb(255, 255, 255);
        transition: border-color 0.3s ease;
        
        &:focus {
          outline: none;
          border-color: rgb(24, 64, 104);
        }
        
        &::placeholder {
          color: rgb(128, 128, 128);
        }
      }
      
      .gl-textarea {
        resize: vertical;
        min-height: 150px;
      }
      
      .form-submit {
        margin-top: 30px;
      }
    }
  `]
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
