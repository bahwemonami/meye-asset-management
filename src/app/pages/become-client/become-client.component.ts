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
        <img [src]="imageService.getImage('form-hero')" alt="" class="gl-responsive-background gl-responsive-background--desktop gl-img-grey" />
      </div>
    </section>

    <!-- Form Section - Identique à Rivemont -->
    <section class="section-form">
      <div class="content-container">
        <div class="form-wrapper">
          <form (ngSubmit)="onSubmit()" class="client-form">
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

            <div class="form-row three-cols">
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
              <div class="form-group">
                <input 
                  type="text" 
                  [(ngModel)]="formData.codePostal"
                  name="codePostal"
                  placeholder="3 premiers caractères du code postal"
                  maxlength="3"
                  required>
              </div>
            </div>

            <div class="form-group">
              <input 
                type="text" 
                [(ngModel)]="formData.valeurActifs"
                name="valeurActifs"
                placeholder="Valeur approximative des actifs à gérer"
                required>
            </div>

            <div class="form-group">
              <input 
                type="text" 
                [(ngModel)]="formData.source"
                name="source"
                placeholder="Comment avez-vous entendu parler de nous?">
            </div>

            <div class="form-group">
              <textarea 
                [(ngModel)]="formData.besoin"
                name="besoin"
                placeholder="Quel besoin cherchez-vous à répondre?"
                rows="4"></textarea>
            </div>

            <div class="form-group radio-group">
              <span class="radio-label">Préférence de contact</span>
              <div class="radio-options">
                <label class="radio-option">
                  <input 
                    type="radio" 
                    name="preference" 
                    value="telephone"
                    [(ngModel)]="formData.preference">
                  <span>Téléphone</span>
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    name="preference" 
                    value="courriel"
                    [(ngModel)]="formData.preference">
                  <span>Courriel</span>
                </label>
              </div>
            </div>

            <button type="submit" class="btn-submit">Envoyer</button>
          </form>
        </div>
      </div>
    </section>
    </div>
  `,
  styles: [`
    .become-client-hero {
      position: relative;
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--meye-primary-dark);
      
      .hero-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.4;
        }
      }
      
      .hero-content {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 40px;
        
        h1 {
          color: var(--meye-white);
          font-size: 3.5rem;
          font-weight: 300;
          line-height: 1.2;
          
          @media (max-width: 768px) {
            font-size: 2.5rem;
          }
        }
      }
    }
    
    .form-wrapper {
      max-width: 700px;
    }
    
    .client-form {
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
        
        &.three-cols {
          grid-template-columns: 1fr 1fr 1fr;
          
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        }
        
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
          min-height: 120px;
        }
      }
      
      .radio-group {
        .radio-label {
          display: block;
          margin-bottom: 15px;
          font-weight: 500;
          color: var(--meye-text);
        }
        
        .radio-options {
          display: flex;
          gap: 30px;
        }
        
        .radio-option {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          
          input[type="radio"] {
            width: 18px;
            height: 18px;
            accent-color: var(--meye-accent);
          }
          
          span {
            color: var(--meye-text);
          }
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
      margin-top: 20px;
      
      &:hover {
        background: var(--meye-accent-light);
        transform: translateY(-2px);
      }
    }
  `]
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
    preference: 'telephone'
  };

  onSubmit() {
    console.log('Formulaire soumis:', this.formData);
    alert('Merci pour votre intérêt! Nous vous contacterons dans les plus brefs délais.');
  }
}
