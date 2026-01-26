import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <footer class="site-footer">
      <!-- Newsletter Section -->
      <section class="newsletter-section">
        <div class="newsletter-background">
          <img [src]="imageService.getImage('newsletter-bg')" alt="Newsletter background" />
        </div>
        <div class="newsletter-container">
          <div>
            <img [src]="imageService.getImage('newsletter-bg')" alt="" style="display: none;" />
            <h2>Inscrivez-vous à notre lettre financière</h2>
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
          <div class="cta-section">
            <h3>Passez à l'action, devenez client.</h3>
            <a routerLink="/become-client" class="cta-link">
              En savoir plus
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Footer Links -->
      <div class="footer-links">
        <div class="footer-container">
          <a routerLink="/" class="footer-logo">
            <img src="/assets/images/meye-logo.svg" alt="MEYE Asset Management" />
          </a>

          <nav class="footer-nav">
            <ul>
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

          <div class="footer-social">
            <ul class="social-links">
              <li>
                <a href="https://www.facebook.com/profile.php?id=100063975098177" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCJADkkF5DoZC17lm3S0jMqw" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/les-investissements-rivemont/?originalSubdomain=fr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </li>
            </ul>
            <a href="https://monportefeuilleplus.ca/login" class="login-link" target="_blank" rel="noopener noreferrer">
              Connexion
            </a>
          </div>
        </div>

        <div class="footer-copyright">
          <p>© {{ currentYear }}, MEYE Asset Management. Tous droits réservés.</p>
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
