import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section - Identique à Rivemont -->
    <section class="template-part-hero">
      <div class="content">
        <img [src]="imageService.getImage('contact-hero')" alt="" class="gl-responsive-background gl-responsive-background--desktop gl-img-grey" />
      </div>
    </section>

    <!-- Content Section - Identique à Rivemont -->
    <section class="content-section">
      <div class="content-container">
        <h1>Contact</h1>
        
        <!-- Addresses -->
        <div class="addresses-section">
          <div class="address-card">
            <a href="https://maps.app.goo.gl/3J5cE5756qnxb7ic9" target="_blank" class="address-link">
              160, boul. de l'Hôpital, bureau 202<br>
              Gatineau, Québec, J8T 8J1
            </a>
            <div class="contact-info">
              <div class="info-row">
                <span class="label">Tél. :</span>
                <a href="tel:8192468800">819 246-8800</a>
              </div>
              <div class="info-row">
                <span class="label">Courriel :</span>
                <a href="mailto:info@rivemont.ca">info&#64;rivemont.ca</a>
              </div>
            </div>
          </div>
          
          <div class="address-card">
            <a href="https://maps.app.goo.gl/HmpL8Vany252sq3FA" target="_blank" class="address-link">
              19 rue Le Royer Ouest, bureau 300<br>
              Montréal, Québec, H2Y 1W4
            </a>
            <div class="contact-info">
              <div class="info-row">
                <span class="label">Tél. :</span>
                <a href="tel:8192468800">819 246-8800</a>
              </div>
              <div class="info-row">
                <span class="label">Courriel :</span>
                <a href="mailto:info@rivemont.ca">info&#64;rivemont.ca</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="form-section">
          <h2>Écrivez-nous</h2>
          <form (ngSubmit)="onSubmit()" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <input 
                  type="text" 
                  [(ngModel)]="formData.prenom"
                  name="prenom"
                  placeholder="Prénom"
                  required>
              </div>
              <div class="form-group">
                <input 
                  type="text" 
                  [(ngModel)]="formData.nom"
                  name="nom"
                  placeholder="Nom"
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
                  required>
              </div>
              <div class="form-group">
                <input 
                  type="tel" 
                  [(ngModel)]="formData.telephone"
                  name="telephone"
                  placeholder="Téléphone">
              </div>
            </div>
            <div class="form-group">
              <textarea 
                [(ngModel)]="formData.message"
                name="message"
                placeholder="Message"
                rows="5"
                required></textarea>
            </div>
            <button type="submit" class="btn-submit">Envoyer</button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .addresses-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      margin-bottom: 80px;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }
    
    .address-card {
      .address-link {
        display: block;
        font-size: 1.1rem;
        line-height: 1.7;
        color: var(--meye-primary);
        text-decoration: none;
        margin-bottom: 25px;
        
        &:hover {
          color: var(--meye-accent);
        }
      }
      
      .contact-info {
        .info-row {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          
          .label {
            color: var(--meye-text-light);
          }
          
          a {
            color: var(--meye-primary);
            text-decoration: none;
            
            &:hover {
              color: var(--meye-accent);
            }
          }
        }
      }
    }
    
    .form-section {
      max-width: 800px;
      
      h2 {
        font-size: 2rem;
        margin-bottom: 40px;
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
        
        input,
        textarea {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid var(--meye-gray);
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.3s ease;
          
          &:focus {
            outline: none;
            border-color: var(--meye-accent);
          }
          
          &::placeholder {
            color: var(--meye-text-light);
          }
        }
        
        textarea {
          resize: vertical;
          min-height: 150px;
        }
      }
    }
    
    .btn-submit {
      background: var(--meye-accent);
      color: var(--meye-white);
      border: none;
      padding: 16px 50px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: var(--meye-accent-light);
        transform: translateY(-2px);
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
