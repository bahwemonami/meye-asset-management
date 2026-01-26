import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img [src]="imageService.getImage('home-hero')" alt="MEYE Asset Management" />
      </div>
      <div class="hero-content">
        <h1>Passion.<br>Rigueur.<br>Résultats.</h1>
        <a routerLink="/firm-profile" class="hero-cta-btn">
          En savoir plus
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="mission-container">
        <div class="mission-text">
          <h2>Notre mission</h2>
          <p>
            MEYE Asset Management a comme mission d'offrir une gestion de portefeuille personnalisée et innovante, alignée sur les objectifs uniques de chaque investisseur.
          </p>
          <p>
            Nous favorisons une gestion active et disciplinée, avec comme objectifs d'optimiser la performance et minimiser les risques.
          </p>
          <p>
            Faire de chaque relation un partenariat durable et fructueux, en privilégiant la rigueur, l'éthique et la transparence.
          </p>
        </div>
        <div class="mission-cta">
          <a routerLink="/firm-profile" class="link-with-arrow">
            En savoir plus
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
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

    <!-- Performance Section -->
    <section class="performance-section">
      <div class="performance-container">
        <h2>Rendements</h2>
        <a routerLink="/performance" class="link-with-arrow light">
          Notre rendement
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </section>

    <!-- Communications Section -->
    <section class="communications-section">
      <div class="communications-container">
        <h2>Communications</h2>
        <div class="communications-grid">
          @for (letter of financialLetters; track letter.slug) {
            <a [routerLink]="['/communications', letter.slug]" class="communication-card">
              <span class="card-category">Lettre financière</span>
              <span class="card-title">{{ letter.title }}</span>
            </a>
          }
        </div>
        <a routerLink="/communications" class="link-with-arrow">
          Tous les articles
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </section>
  `
})
export class HomeComponent {
  imageService = inject(ImageMappingService);
  
  financialLetters = [
    {
      slug: 'volume-16-numero-3',
      title: 'Volume 16 numéro 3'
    },
    {
      slug: 'volume-16-numero-2',
      title: 'Volume 16 numéro 2'
    },
    {
      slug: 'volume-16-numero-1',
      title: 'Volume 16 numéro 1'
    }
  ];
}
