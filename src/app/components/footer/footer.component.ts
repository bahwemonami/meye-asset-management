import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer id="site-footer" class="site-footer">
      <div class="content">
        <!-- CTA Section (Newsletter + Become Client) -->
        <div class="cta">
          <!-- Newsletter Column -->
          <div class="cta-col">
            <div class="cta-background">
              <img [src]="imageService.getImage('newsletter-bg')" alt="" loading="lazy" />
            </div>
            <div class="cta-col-content">
              <h2 class="cta-title">Inscrivez-vous à notre lettre financière</h2>
              <div class="cta-form-holder">
                <form (ngSubmit)="onNewsletterSubmit()" class="newsletter-form">
                  <input 
                    type="email" 
                    [(ngModel)]="newsletterEmail"
                    name="email"
                    placeholder="Adresse courriel"
                    required
                    aria-label="Adresse courriel">
                  <button type="submit">Inscription</button>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Become Client Column -->
          <div class="cta-col">
            <div class="cta-col-content">
              <h2 class="cta-title">Passez à l’action, devenez client.</h2>
              <div class="cta-button">
                <a routerLink="/become-client" class="gl-button" target="_self">En savoir plus</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Links (4 Columns) -->
        <div class="cols">
          <!-- Column 1: Logo -->
          <div class="col col-1">
            <a routerLink="/" class="logo-holder" aria-label="MEYE ASSET MANAGER - Retour à l'accueil">
              <img [src]="imageService.getImage('logo-light')" alt="MEYE ASSET MANAGER" />
            </a>
          </div>

          <!-- Column 2: Navigation -->
          <div class="col col-2">
            <nav aria-label="Navigation pied de page">
              <ul id="menu-footer" class="menu" role="list">
                <li>
                  <a routerLink="/private-management">Gestion privée</a>
                </li>
                <li>
                  <a routerLink="/performance">Rendements</a>
                </li>
                <li>
                  <a routerLink="/alternative-funds">Fonds alternatifs</a>
                </li>
                <li>
                  <a routerLink="/contact">Contact</a>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Column 3: Social Media -->
          <div class="col col-3">
            <nav class="social-media" aria-label="Réseaux sociaux">
              <ul role="list">
                <li>
                  <a class="facebook" href="https://www.facebook.com/profile.php?id=100063975098177" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.28" height="36" viewBox="0 0 19.28 36">
                      <path id="Icon_corebrands-facebook-f" data-name="Icon corebrands-facebook-f" d="M26.377,20.25l1-6.515H21.125V9.507c0-1.782.873-3.52,3.673-3.52H27.64V.441A34.667,34.667,0,0,0,22.6,0c-5.148,0-8.513,3.121-8.513,8.769v4.966H8.36v6.515h5.723V36h7.042V20.251Z" transform="translate(-8.36)" fill="currentColor"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a class="youtube" href="https://www.youtube.com/channel/UCJADkkF5DoZC17lm3S0jMqw" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                      <path id="Icon_awesome-youtube" data-name="Icon awesome-youtube" d="M35.338,9.375a4.5,4.5,0,0,0-3.169-3.169C28.5,5.625,18,5.625,18,5.625S7.5,5.625,3.831,6.206A4.5,4.5,0,0,0,.662,9.375C0,13.125,0,18,0,18s0,4.875.662,8.625a4.5,4.5,0,0,0,3.169,3.169C7.5,30.375,18,30.375,18,30.375s10.5,0,14.169-.581a4.5,4.5,0,0,0,3.169-3.169C36,22.875,36,18,36,18S36,13.125,35.338,9.375ZM14.318,23.344V12.656L23.625,18Z" fill="currentColor"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a class="linkedin" href="https://www.linkedin.com/company/les-investissements-rivemont/?originalSubdomain=fr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                      <path id="Icon_awesome-linkedin-in" data-name="Icon awesome-linkedin-in" d="M8.051,36H.622V11.97H8.051ZM4.336,8.7A4.336,4.336,0,1,1,8.672,4.336,4.336,4.336,0,0,1,4.336,8.7ZM36,36H28.584V25.425c0-2.7-.054-6.165-3.758-6.165-3.762,0-4.339,2.94-4.339,5.97V36H13.323V11.97h6.9v3.15h.1c.945-1.8,3.258-3.7,6.711-3.7,7.182,0,8.511,4.725,8.511,10.875V36Z" transform="translate(0 0)" fill="currentColor"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Column 4: Login Button -->
          <div class="col col-4">
            <a class="gl-button gl-button--blue-light" href="https://monportefeuilleplus.ca/login" target="_blank" rel="noopener noreferrer">
              <img [src]="imageService.getImage('user-icon')" alt="" />
              Connexion
            </a>
          </div>
        </div>

        <!-- Copyright -->
        <div class="copyright">
          <p>© {{ currentYear }}, Les investissements Rivemont. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  imageService = inject(ImageMappingService);
  currentYear = new Date().getFullYear();
  newsletterEmail = '';

  onNewsletterSubmit() {
    console.log('Newsletter subscription:', this.newsletterEmail);
    alert('Merci de vous être abonné à notre lettre financière !');
    this.newsletterEmail = '';
  }
}
