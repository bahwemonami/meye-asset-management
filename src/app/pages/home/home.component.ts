import { Component, inject, AfterViewInit, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ViewEncapsulation, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { AosService } from '../../services/aos.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';
import { register } from 'swiper/element/bundle';

// Enregistrer les éléments Swiper
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss'],
  template: `
    <div class="template-home-page-container">
    <!-- Hero Section -->
    <section class="section-hero">
      <img [src]="imageService.getImage('home-hero')" alt="" class="gl-responsive-background gl-responsive-background--desktop gl-img-grey" loading="eager" fetchpriority="high" />
      <div class="content">
        <div class="title-holder">
          <h1>{{ t.get('home.heroTitle') }}</h1>
        </div>
            <a [routerLink]="langService.buildUrl('firm-profile')" class="gl-button" target="_self" [attr.aria-label]="t.get('common.learnMore')">
              {{ t.get('common.learnMore') }}
            </a>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="template-part-desc-image">
      <div class="content">
        <div class="col">
          <div class="description gl-text-editor" data-aos="fade">
            <h2>{{ t.get('home.mission') }}</h2>
            <p>
              {{ t.get('home.missionText1') }}
            </p>
            <p>
              {{ t.get('home.missionText2') }}
            </p>
            <p>
              {{ t.get('home.missionText3') }}
            </p>
          </div>
          <div class="button-holder" data-aos="fade-up">
            <a [routerLink]="langService.buildUrl('firm-profile')" class="gl-button gl-button--blue-dark" target="_self">
              {{ t.get('common.learnMore') }}
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
        <a [routerLink]="langService.buildUrl('our-team')" class="gl-button gl-button--team-preview" target="_self">
          {{ t.get('home.discoverTeam') }}
          <span class="gl-button__arrow" aria-hidden="true"></span>
        </a>
      </div>
    </section>

    <!-- Performance Section -->
    <section class="section-chart">
      <div class="content">
        <div class="description" data-aos="fade">
          <h2>{{ t.get('home.performance') }}</h2>
        </div>
        <div class="image-holder" data-aos="fade">
          <img [src]="imageService.getImage('performance-chart')" [alt]="t.get('home.performance')" class="attachment-large size-large" width="729" height="403" loading="eager" />
        </div>
        <div class="button-holder" data-aos="fade-up">
          <a [routerLink]="langService.buildUrl('performance')" class="gl-button gl-button--blue-dark" target="_self">
            {{ t.get('home.ourPerformance') }}
          </a>
        </div>
      </div>
    </section>

    <!-- Communications Section -->
    <section class="section-posts" #communicationsSection>
      <div class="content">
        <h2 class="title" [class.visible]="isCommunicationsVisible" data-aos="fade">{{ t.get('home.communications') }}</h2>
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
            [attr.aria-label]="t.get('home.communications')">
            @for (letter of financialLetters(); track letter.slug) {
              <swiper-slide class="swiper-slide" role="group" [attr.aria-label]="t.get('common.learnMore') + ' - ' + letter.title">
                <a [routerLink]="[langService.buildUrl('communications'), letter.slug]" class="post" [title]="letter.title" [attr.aria-label]="t.get('common.learnMore') + ' - ' + letter.title">
                  <div class="post-background">
                    <img class="post-image" [src]="imageService.getImage('home-hero')" alt="" loading="lazy" />
                  </div>
                  <div class="post-content">
                    <div class="post-info">
                      <div class="post-categories">
                        <div class="post-category gl-pill">{{ t.get('home.financialLetter') }}</div>
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
          <a [routerLink]="langService.buildUrl('communications')" class="gl-button gl-button--blue-dark">{{ t.get('home.allArticles') }}</a>
        </div>
      </div>
    </section>
    </div>
  `
})
export class HomeComponent implements AfterViewInit {
  imageService = inject(ImageMappingService);
  aosService = inject(AosService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
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
  
  financialLetters = computed(() => {
    const letters = this.t.get('financialLetter.letters') as any;
    if (!letters) return [];
    
    return Object.keys(letters).map(slug => ({
      slug,
      title: letters[slug].title
    }));
  });
}
