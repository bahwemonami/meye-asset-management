import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crypto-fund',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./crypto-fund.component.scss'],
  template: `
    <div class="template-builder-page-container">
      <!-- Hero Section -->
      <section class="template-part-hero hero-has-btn">
        <div class="content">
          <h1 class="title">{{ t.get('cryptoFund.title') }}</h1>
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
            <!-- Meye Crypto Assets Fund (Main) -->
            @if (currentSubPage() === 'meye-crypto-fund') {
              <section class="section-description" data-aos="fade">
                <div class="content">
                  <div class="description gl-text-editor">
                    <p><em>{{ t.get('cryptoFund.subPages.meye-crypto-fund.disclaimer') }}</em></p>
                    
                    <p>{{ t.get('cryptoFund.subPages.meye-crypto-fund.paragraph1') }}</p>
                    
                    <p>{{ t.get('cryptoFund.subPages.meye-crypto-fund.paragraph2') }}</p>
                    
                    <p>{{ t.get('cryptoFund.subPages.meye-crypto-fund.paragraph3') }}</p>
                    
                    <p>{{ t.get('cryptoFund.subPages.meye-crypto-fund.paragraph4') }}</p>
                  </div>
                </div>
              </section>
            }

            <!-- Advantages of Investing in Cryptocurrencies -->
            @if (currentSubPage() === 'advantages-of-investing-in-cryptocurrencies') {
              <section class="section-description" data-aos="fade">
                <div class="content">
                  <div class="description gl-text-editor">
                    <p>{{ t.get('cryptoFund.subPages.advantages-of-investing-in-cryptocurrencies.paragraph1') }}</p>
                    
                    <p>{{ t.get('cryptoFund.subPages.advantages-of-investing-in-cryptocurrencies.paragraph2') }}</p>
                  </div>
                </div>
              </section>
            }

            <!-- The Meye Crypto Assets Fund Philosophy -->
            @if (currentSubPage() === 'the-meye-crypto-fund-philosophy') {
              <section class="section-description" data-aos="fade">
                <div class="content">
                  <div class="description gl-text-editor">
                    <p>{{ t.get('cryptoFund.subPages.the-meye-crypto-fund-philosophy.paragraph1') }}</p>
                    
                    <p>{{ t.get('cryptoFund.subPages.the-meye-crypto-fund-philosophy.paragraph2') }}</p>
                  </div>
                </div>
              </section>
            }
          </div>

          <!-- Crypto Bulletins Section -->
          <div id="crypto-items-wrapper" class="template-part-post-communication">
            <div class="template-communications-page-container">
              <div class="section-posts">
                <div class="content">
                  <div class="posts">
                    @for (bulletin of displayedBulletins(); track bulletin.week) {
                      <div class="communication-item template-part-post-communication" [class.hidden-post]="bulletin.hidden && !showAllBulletins()" data-aos="fade-up">
                        <a [href]="bulletin.url" class="post-image-holder" target="_blank">
                          @if (bulletin.image) {
                            <img 
                              [src]="bulletin.image" 
                              class="post-image" 
                              [alt]="bulletin.title"
                              width="583"
                              height="399"
                            />
                          }
                          <div class="post-info">
                            <div class="post-category gl-pill">{{ t.get('cryptoFund.category') }}</div>
                            <h3 class="post-title">{{ bulletin.title }}</h3>
                            <div class="post-excerpt">
                              <strong>{{ bulletin.date }} –</strong> {{ bulletin.excerpt }}
                            </div>
                          </div>
                        </a>
                      </div>
                    }
                    <div class="button-holder" data-aos="fade-up">
                      <a id="show-more" class="gl-button gl-button--blue-dark" href="#" (click)="toggleShowMore(); $event.preventDefault()" target="_self">
                        {{ showAllBulletins() ? t.get('cryptoFund.showLess') : t.get('cryptoFund.seeMore') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="page-content__sidebar">
          <section class="section-sidebar">
            <div class="content">
              <ul>
                @for (page of subPages(); track page.slug) {
                  <li [class.active]="currentSubPage() === page.slug">
                    @if (page.slug === 'meye-crypto-fund') {
                      <a [routerLink]="['/', langService.currentLanguage(), 'alternative-funds', 'fonds-meye-crypto']">
                        {{ page.title }}
                      </a>
                    } @else {
                      <a [routerLink]="['/', langService.currentLanguage(), 'alternative-funds', 'fonds-meye-crypto']" 
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
export class CryptoFundComponent implements OnInit, OnDestroy {
  imageService = inject(ImageMappingService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentSubPage = signal('meye-crypto-fund');
  showAllBulletins = signal(false);
  private queryParamSub?: Subscription;

  subPages = computed(() => [
    { slug: 'meye-crypto-fund', title: this.t.get('cryptoFund.subPages.meye-crypto-fund.title') as string },
    { slug: 'advantages-of-investing-in-cryptocurrencies', title: this.t.get('cryptoFund.subPages.advantages-of-investing-in-cryptocurrencies.title') as string },
    { slug: 'the-meye-crypto-fund-philosophy', title: this.t.get('cryptoFund.subPages.the-meye-crypto-fund-philosophy.title') as string }
  ]);

  currentPageTitle = computed(() => {
    const page = this.subPages().find(p => p.slug === this.currentSubPage());
    return page?.title || (this.t.get('cryptoFund.title') as string);
  });

  ngOnInit() {
    this.queryParamSub = this.route.queryParams.subscribe(params => {
      const subPage = params['sub-page'];
      if (subPage && this.subPages().some(p => p.slug === subPage)) {
        this.currentSubPage.set(subPage);
      } else {
        this.currentSubPage.set('meye-crypto-fund');
      }
    });
  }

  ngOnDestroy() {
    this.queryParamSub?.unsubscribe();
  }

  cryptoBulletins = computed(() => {
    const bulletins = this.t.get('cryptoBulletins') as any;
    if (!bulletins) return [];
    
    return Object.keys(bulletins).map(key => ({
      week: parseInt(key),
      title: bulletins[key].title,
      date: bulletins[key].date,
      excerpt: bulletins[key].excerpt,
      url: bulletins[key].url,
      image: bulletins[key].image,
      hidden: bulletins[key].hidden || false
    })).sort((a, b) => b.week - a.week);
  });

  onSubPageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.navigateToSubPage(select.value);
  }

  navigateToSubPage(subPage: string) {
    if (subPage === 'meye-crypto-fund') {
      this.router.navigate(['/', this.langService.currentLanguage(), 'alternative-funds', 'fonds-meye-crypto']);
    } else {
      this.router.navigate(['/', this.langService.currentLanguage(), 'alternative-funds', 'fonds-meye-crypto'], {
        queryParams: { 'sub-page': subPage }
      });
    }
  }

  displayedBulletins = computed(() => {
    const bulletins = this.cryptoBulletins();
    if (this.showAllBulletins()) {
      return bulletins;
    }
    return bulletins.slice(0, 4);
  });

  toggleShowMore() {
    this.showAllBulletins.set(!this.showAllBulletins());
  }
}