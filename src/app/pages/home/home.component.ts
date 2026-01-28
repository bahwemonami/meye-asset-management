import { Component, inject, AfterViewInit, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { AosService } from '../../services/aos.service';
import { register } from 'swiper/element/bundle';

// Enregistrer les éléments Swiper
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section -->
    <section class="hero-section section-hero">
      <img [src]="imageService.getImage('home-hero')" alt="" class="gl-responsive-background gl-responsive-background--desktop gl-img-grey" loading="eager" fetchpriority="high" />
      <div class="hero-content content">
        <div class="title-holder">
          <h1>Passion. Rigueur. Résultats.</h1>
        </div>
        <a routerLink="/firm-profile" class="hero-cta-btn gl-button" target="_self" aria-label="En savoir plus sur MEYE ASSET MANAGER">
          En savoir plus
        </a>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="template-part-desc-image">
      <div class="content">
        <div class="col">
          <div class="description gl-text-editor" data-aos="fade">
            <h2>Notre mission</h2>
            <p>
              MEYE ASSET MANAGER a comme mission d'offrir une gestion de portefeuille personnalisée et innovante, alignée sur les objectifs uniques de chaque investisseur.
            </p>
            <p>
              Nous favorisons une gestion active et disciplinée, avec comme objectifs d'optimiser la performance et minimiser les risques.
            </p>
            <p>
              Faire de chaque relation un partenariat durable et fructueux, en privilégiant la rigueur, l'éthique et la transparence.
            </p>
          </div>
          <div class="button-holder" data-aos="fade-up">
            <a routerLink="/firm-profile" class="gl-button gl-button--blue-dark" target="_self">
              En savoir plus
            </a>
          </div>
        </div>
        <div class="col">
          <div class="image-holder" data-aos="fade-up">
            <img [src]="imageService.getImage('image-1')" alt="Mission Image" width="557" height="665" class="attachment-large size-large" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- Team Preview Section -->
    <section class="section-info">
      <div class="content">
        <div class="image-holder">
          <img [src]="imageService.getImage('team-preview')" alt="Notre équipe" class="attachment-full size-full" loading="lazy" />
        </div>
        <a routerLink="/our-team" class="gl-button" target="_self">
          Découvrez l'équipe
        </a>
      </div>
    </section>

    <!-- Performance Section -->
    <section class="section-chart">
      <div class="content">
        <div class="description" data-aos="fade">
          <h2>Rendements</h2>
        </div>
        <div class="image-holder" data-aos="fade">
          <img [src]="imageService.getImage('performance-chart')" alt="Rendements" class="attachment-large size-large" loading="lazy" />
        </div>
        <div class="button-holder" data-aos="fade-up">
          <a routerLink="/performance" class="gl-button gl-button--blue-dark" target="_self">
            Notre rendement
          </a>
        </div>
      </div>
    </section>

    <!-- Communications Section -->
    <section class="section-posts" #communicationsSection>
      <div class="content">
        <h2 class="title" [class.visible]="isCommunicationsVisible" data-aos="fade">Communications</h2>
        <div class="slider" js-slider-posts="container" data-aos="fade-up">
          <swiper-container 
            class="swiper" 
            js-slider-posts="slider" 
            slides-per-view="1" 
            space-between="30" 
            pagination="true" 
            pagination-clickable="true" 
            navigation="true"
            loop="true" 
            centered-slides="true"
            aria-label="Carrousel des communications">
            @for (letter of financialLetters; track letter.slug) {
              <swiper-slide class="swiper-slide" role="group" [attr.aria-label]="'Slide ' + ($index + 1) + ' sur ' + financialLetters.length">
                <a [routerLink]="['/communications', letter.slug]" class="post" [title]="letter.title" [attr.aria-label]="'Lire ' + letter.title">
                  <div class="post-background">
                    <img class="post-image" [src]="imageService.getImage('home-hero')" alt="" loading="lazy" />
                  </div>
                  <div class="post-content">
                    <div class="post-info">
                      <div class="post-categories">
                        <div class="post-category gl-pill">Lettre financière</div>
                      </div>
                      <div class="post-title">{{ letter.title }}</div>
                    </div>
                    <div class="post-arrow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25.243" viewBox="0 0 27 25.243">
                        <path d="M6,18H30M19.5,7.5,30,18,19.5,28.5" transform="translate(-4.5 -5.379)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                      </svg>
                    </div>
                  </div>
                </a>
              </swiper-slide>
            }
          </swiper-container>
        </div>
        <div class="button-holder" data-aos="fade-up">
          <a routerLink="/communications" class="gl-button gl-button--blue-dark">Tous les articles</a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements AfterViewInit {
  imageService = inject(ImageMappingService);
  aosService = inject(AosService);
  isCommunicationsVisible = false;
  
  @ViewChild('communicationsSection', { static: false }) communicationsSection?: ElementRef;
  
  ngAfterViewInit() {
    // Initialiser AOS si ce n'est pas déjà fait
    this.aosService.init();
    
    // Rafraîchir AOS après le chargement de la vue pour détecter les nouveaux éléments
    setTimeout(() => {
      this.aosService.refresh();
    }, 100);
    
    // Observer pour animer le h2 de communications au scroll (fallback si AOS ne fonctionne pas)
    if (typeof IntersectionObserver !== 'undefined' && this.communicationsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.isCommunicationsVisible = true;
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(this.communicationsSection.nativeElement);
    } else {
      // Fallback si IntersectionObserver n'est pas disponible
      setTimeout(() => {
        this.isCommunicationsVisible = true;
      }, 500);
    }
  }
  
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
