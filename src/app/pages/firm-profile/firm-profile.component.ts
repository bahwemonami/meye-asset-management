import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-firm-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <h1>Profil de la firme</h1>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="content-container">
        <div class="profile-content">
          <div class="profile-text">
            <p>
              Fondée en 2010, MEYE Asset Management est une firme de gestion de portefeuille offrant des stratégies de placement à la fois traditionnelles et novatrices aux investisseurs.
            </p>
            <p>
              Notre objectif est de maximiser le rendement potentiel selon le profil de risque de chaque client, tout en gardant une attention particulière à la gestion efficace de la volatilité des marchés.
            </p>
            <p>
              Nous offrons également un service complet de planification financière afin d'assurer l'atteinte des objectifs ainsi que la protection du patrimoine.
            </p>
            <p>
              Contactez-nous afin de profitez pleinement d'une réelle gestion active de vos placements.
            </p>
          </div>
          <div class="profile-cta">
            <a routerLink="/contact" class="link-with-arrow">
              Contactez-nous
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Preview Section -->
    <section class="team-preview-section">
      <a routerLink="/our-team" class="team-preview-link">
        <img [src]="imageService.getImage('team-preview')" alt="Notre équipe" />
        <div class="team-preview-overlay">
          <span class="team-preview-text">Découvrez l'équipe</span>
        </div>
      </a>
    </section>
  `,
  styles: [`
    .profile-content {
      max-width: 800px;
    }
    
    .profile-text {
      p {
        font-size: 1.15rem;
        line-height: 1.9;
        margin-bottom: 25px;
        color: var(--meye-text);
      }
    }
    
    .profile-cta {
      margin-top: 50px;
    }
  `]
})
export class FirmProfileComponent {
  imageService = inject(ImageMappingService);
}
