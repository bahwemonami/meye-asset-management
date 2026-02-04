import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-microcap-fund',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./microcap-fund.component.scss'],
  template: `
    <div class="template-builder-page-container">
      <!-- Hero Section -->
      <section class="template-part-hero hero-has-btn">
        <div class="content">
          <h1 class="title">{{ t.get('microcapFund.title') }}</h1>
          <img 
            [src]="imageService.getImage('image-3')" 
            alt="" 
            class="gl-responsive-background gl-responsive-background--desktop gl-img-grey"
          />
        </div>
      </section>

      <!-- Page Content -->
      <div class="page-content">
        <div class="page-content__builder">
          <!-- Page Filter Navigation (Mobile) -->
          <div class="page-filter">
            <select class="gl-select" [value]="currentSubPage()" (change)="onSubPageChange($event)">
              @for (page of subPages(); track page.slug) {
                <option [value]="page.slug" [selected]="currentSubPage() === page.slug">
                  {{ page.title }}
                </option>
              }
            </select>
          </div>

          <!-- Main Title -->
          <h2 class="title" data-aos="fade">{{ currentPageTitle() }}</h2>

          <!-- Builder Sections - Dynamic Content -->
          <div class="builder-sections">
            <!-- Meye MicroCap Fund (Main) -->
            @if (currentSubPage() === 'meye-microcap-fund') {
              <section class="section-description" data-aos="fade">
                <div class="content">
                  <div class="description gl-text-editor">
                    <p><em>{{ t.get('microcapFund.subPages.meye-microcap-fund.disclaimer') }}</em></p>
                    
                    <p>{{ t.get('microcapFund.subPages.meye-microcap-fund.paragraph1') }}</p>
                    
                    <p>{{ t.get('microcapFund.subPages.meye-microcap-fund.paragraph2') }}</p>
                  </div>
                </div>
              </section>
            }

            <!-- What are Micro-Caps? -->
            @if (currentSubPage() === 'what-are-micro-caps') {
              <section class="section-description" data-aos="fade">
                <div class="content">
                  <div class="description gl-text-editor">
                    <p>{{ t.get('microcapFund.subPages.what-are-micro-caps.paragraph1') }}</p>
                    
                    <p>{{ t.get('microcapFund.subPages.what-are-micro-caps.paragraph2') }}</p>
                    
                    <p>{{ t.get('microcapFund.subPages.what-are-micro-caps.paragraph3') }}</p>
                  </div>
                </div>
              </section>
            }

            <!-- How Do We Identify Attractive Opportunities? -->
            @if (currentSubPage() === 'how-do-we-identify-attractive-opportunities') {
              <section class="section-description" data-aos="fade">
                <div class="content">
                  <div class="description gl-text-editor">
                    <p>{{ t.get('microcapFund.subPages.how-do-we-identify-attractive-opportunities.paragraph1') }}</p>
                    
                    <p>{{ t.get('microcapFund.subPages.how-do-we-identify-attractive-opportunities.paragraph2') }}</p>
                    
                    <p>{{ t.get('microcapFund.subPages.how-do-we-identify-attractive-opportunities.paragraph3') }}</p>
                  </div>
                </div>
              </section>
            }

            <!-- Meye MicroCap Fund – Investment Philosophy -->
            @if (currentSubPage() === 'meye-microcap-fund-investment-philosophy') {
              <section class="section-description" data-aos="fade">
                <div class="content">
                  <div class="description gl-text-editor">
                    <p>{{ t.get('microcapFund.subPages.meye-microcap-fund-investment-philosophy.paragraph1') }}</p>
                    
                    <p>{{ t.get('microcapFund.subPages.meye-microcap-fund-investment-philosophy.paragraph2') }}</p>
                    
                    <p>{{ t.get('microcapFund.subPages.meye-microcap-fund-investment-philosophy.paragraph3') }}</p>
                  </div>
                </div>
              </section>
            }
          </div>
        </div>

        <!-- Sidebar -->
        <div class="page-content__sidebar">
          <section class="section-sidebar">
            <div class="content">
              <ul>
                @for (page of subPages(); track page.slug) {
                  <li [class.active]="currentSubPage() === page.slug">
                    @if (page.slug === 'meye-microcap-fund') {
                      <a [routerLink]="['/', langService.currentLanguage(), 'alternative-funds', 'fonds-meye-microcap']">
                        {{ page.title }}
                      </a>
                    } @else {
                      <a [routerLink]="['/', langService.currentLanguage(), 'alternative-funds', 'fonds-meye-microcap']" 
                         [queryParams]="{ 'sub-page': page.slug }">
                        {{ page.title }}
                      </a>
                    }
                  </li>
                }
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  `
})
export class MicrocapFundComponent implements OnInit, OnDestroy {
  imageService = inject(ImageMappingService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentSubPage = signal('meye-microcap-fund');
  private queryParamSub?: Subscription;

  subPages = computed(() => [
    { slug: 'meye-microcap-fund', title: this.t.get('microcapFund.subPages.meye-microcap-fund.title') as string },
    { slug: 'what-are-micro-caps', title: this.t.get('microcapFund.subPages.what-are-micro-caps.title') as string },
    { slug: 'how-do-we-identify-attractive-opportunities', title: this.t.get('microcapFund.subPages.how-do-we-identify-attractive-opportunities.title') as string },
    { slug: 'meye-microcap-fund-investment-philosophy', title: this.t.get('microcapFund.subPages.meye-microcap-fund-investment-philosophy.title') as string }
  ]);

  currentPageTitle = computed(() => {
    const page = this.subPages().find(p => p.slug === this.currentSubPage());
    return page?.title || (this.t.get('microcapFund.title') as string);
  });

  ngOnInit() {
    this.queryParamSub = this.route.queryParams.subscribe(params => {
      const subPage = params['sub-page'];
      if (subPage && this.subPages().some(p => p.slug === subPage)) {
        this.currentSubPage.set(subPage);
      } else {
        this.currentSubPage.set('meye-microcap-fund');
      }
    });
  }

  ngOnDestroy() {
    this.queryParamSub?.unsubscribe();
  }

  onSubPageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.navigateToSubPage(select.value);
  }

  navigateToSubPage(subPage: string) {
    if (subPage === 'meye-microcap-fund') {
      this.router.navigate(['/', this.langService.currentLanguage(), 'alternative-funds', 'fonds-meye-microcap']);
    } else {
      this.router.navigate(['/', this.langService.currentLanguage(), 'alternative-funds', 'fonds-meye-microcap'], {
        queryParams: { 'sub-page': subPage }
      });
    }
  }
}
