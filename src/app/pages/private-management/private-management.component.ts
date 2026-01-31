import { Component, OnInit, signal, inject, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageMappingService } from '../../services/image-mapping.service';
import { AosService } from '../../services/aos.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-private-management',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <!-- Hero Section - Identique à Rivemont -->
    <section class="template-part-hero">
      <img [src]="imageService.getImage('gestion-privee-hero')" alt="" class="gl-responsive-background gl-responsive-background--desktop gl-img-grey" />
      <div class="content">
        <h1 class="title">{{ t.get('privateManagement.title') }}</h1>
      </div>
    </section>

    <!-- Page Content - Identique à Rivemont -->
    <div class="template-builder-page-container">
      <div class="page-content">
        <div class="page-content__builder">
        <!-- Page Filter (Select) -->
        <div class="page-filter">
          <select class="gl-select" [ngModel]="currentSection()" (ngModelChange)="onSectionChange($event)">
            @for (section of sections(); track section.id) {
              <option [value]="section.id">{{ section.title }}</option>
            }
          </select>
        </div>

        <!-- Section Title -->
        <h2 class="title" data-aos="fade">{{ getCurrentSectionTitle() }}</h2>

        <!-- Builder Sections -->
        <div class="builder-sections">
          <section class="section-description" data-aos="fade">
            <div class="content">
              <div class="description gl-text-editor">
                @switch (currentSection()) {
                  @case ('who') {
                    <p>{{ t.get('privateManagement.who.text1') }}</p>
                    
                    <h4 class="text-color--blue text-color--light-blue">{{ t.get('privateManagement.who.clientsTitle') }}</h4>
                    <ul>
                      @for (client of getArray('privateManagement.who.clients'); track $index) {
                        <li>{{ client }}</li>
                      }
                    </ul>

                    <h4 class="text-color--light-blue">{{ t.get('privateManagement.who.offeringTitle') }}</h4>
                    <ul>
                      @for (offering of getArray('privateManagement.who.offering'); track $index) {
                        <li>{{ offering }}</li>
                      }
                    </ul>

                    <p>{{ t.get('privateManagement.who.text2') }}</p>
                  }
                  @case ('cycle') {
                    <p>{{ t.get('privateManagement.cycle.text') }}</p>
                    <ol>
                      @for (step of getArray('privateManagement.cycle.steps'); track $index) {
                        <li>{{ step }}</li>
                      }
                    </ol>
                  }
                  @case ('philosophy') {
                    <p>{{ t.get('privateManagement.philosophy.text1') }}</p>
                    <p>{{ t.get('privateManagement.philosophy.text2') }}</p>
                    <p>{{ t.get('privateManagement.philosophy.text3') }}</p>
                  }
                  @case ('methodology') {
                    <p>{{ t.get('privateManagement.methodology.text') }}</p>
                    <ul>
                      @for (point of getArray('privateManagement.methodology.points'); track $index) {
                        <li>{{ point }}</li>
                      }
                    </ul>
                  }
                  @case ('strategies') {
                    <p>{{ t.get('privateManagement.strategies.text') }}</p>
                    <ul>
                      @for (strategy of getArray('privateManagement.strategies.list'); track $index) {
                        <li>{{ strategy }}</li>
                      }
                    </ul>
                  }
                  @case ('why') {
                    <p>{{ t.get('privateManagement.why.text') }}</p>
                    <ul>
                      @for (point of getArray('privateManagement.why.points'); track $index) {
                        <li>{{ point }}</li>
                      }
                    </ul>
                  }
                  @case ('cfa') {
                    <p>{{ t.get('privateManagement.cfa.text') }}</p>
                    <ul>
                      @for (point of getArray('privateManagement.cfa.points'); track $index) {
                        <li>{{ point }}</li>
                      }
                    </ul>
                  }
                }
              </div>
              <a [routerLink]="langService.buildUrl('contact')" class="gl-button" target="_self">{{ t.get('common.contactUs') }}</a>
            </div>
          </section>
        </div>
      </div>

      <!-- Sidebar - Identique à Rivemont -->
      <div class="page-content__sidebar">
        <section class="section-sidebar">
          <div class="content">
            <ul>
              @for (section of sections(); track section.id) {
                <li [class.active]="currentSection() === section.id">
                  <a (click)="onSectionChange(section.id)" [routerLink]="[]" [queryParams]="getQueryParams(section.id)">
                    {{ section.title }}
                  </a>
                </li>
              }
            </ul>
          </div>
        </section>
      </div>
      </div>
    </div>
  `,
  styleUrls: ['./private-management.component.scss']
})
export class PrivateManagementComponent implements OnInit, AfterViewInit {
  imageService = inject(ImageMappingService);
  aosService = inject(AosService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  currentSection = signal('who');

  sections = computed(() => [
    { id: 'who', title: this.t.get('privateManagement.who.title') },
    { id: 'cycle', title: this.t.get('privateManagement.cycle.title') },
    { id: 'philosophy', title: this.t.get('privateManagement.philosophy.title') },
    { id: 'methodology', title: this.t.get('privateManagement.methodology.title') },
    { id: 'strategies', title: this.t.get('privateManagement.strategies.title') },
    { id: 'why', title: this.t.get('privateManagement.why.title') },
    { id: 'cfa', title: this.t.get('privateManagement.cfa.title') }
  ]);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const sectionParam = this.getSectionFromQuery(params['sub-page'] || params['section']);
      if (sectionParam) {
        this.currentSection.set(sectionParam);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.aosService.refresh();
    }, 100);
  }

  onSectionChange(sectionId: string) {
    this.currentSection.set(sectionId);
    const queryParams = this.getQueryParams(sectionId);
    this.router.navigate([], { queryParams, relativeTo: this.route });
  }

  getQueryParams(sectionId: string): any {
    if (sectionId === 'who') {
      return {};
    }
    const subPageMap: Record<string, string> = {
      'cycle': 'cycle-de-gestion',
      'philosophy': 'philosophie-de-gestion',
      'methodology': 'la-methodologie-de-gestion',
      'strategies': 'les-strategies-de-placement',
      'why': 'pourquoi-rivemont',
      'cfa': 'pourquoi-choisir-un-conseiller-detenteur-du-titre-cfa'
    };
    return { 'sub-page': subPageMap[sectionId] || sectionId };
  }

  getSectionFromQuery(query: string): string | null {
    if (!query) return 'who';
    const subPageMap: Record<string, string> = {
      'cycle-de-gestion': 'cycle',
      'philosophie-de-gestion': 'philosophy',
      'la-methodologie-de-gestion': 'methodology',
      'les-strategies-de-placement': 'strategies',
      'pourquoi-rivemont': 'why',
      'pourquoi-choisir-un-conseiller-detenteur-du-titre-cfa': 'cfa'
    };
    return subPageMap[query] || query || 'who';
  }

  getCurrentSectionTitle(): string {
    const section = this.sections().find(s => s.id === this.currentSection());
    return typeof section?.title === 'string' ? section.title : '';
  }

  getArray(key: string): string[] {
    const value = this.t.get(key);
    return Array.isArray(value) ? value : [];
  }
}
