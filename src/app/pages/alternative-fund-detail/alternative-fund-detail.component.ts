import { Component, OnInit, inject, ChangeDetectionStrategy, AfterViewInit, ViewEncapsulation, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageMappingService } from '../../services/image-mapping.service';
import { AosService } from '../../services/aos.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alternative-fund-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./alternative-fund-detail.component.scss'],
  template: `
    <div class="template-builder-page-container">
      <!-- Hero Section - Structure identique à crypto fund -->
      @if (fund && fund.name === 'Meye Long/Short Fund') {
        <section class="template-part-hero hero-has-btn">
          <div class="content">
            <h1 class="title">{{ fund.name }}</h1>
            <img 
              [src]="imageService.getImage('image-3')" 
              alt="" 
              class="gl-responsive-background gl-responsive-background--desktop gl-img-grey"
            />
          </div>
        </section>

        <!-- Page Content - Structure identique à crypto fund -->
        <div class="page-content">
          <div class="page-content__builder">
            <!-- Page Filter Navigation (Mobile) -->
            <div class="page-filter">
              <select class="gl-select" [value]="currentSection()" (change)="onSubPageChange($event)">
                @for (section of sections(); track section.id) {
                  <option [value]="section.id" [selected]="currentSection() === section.id">
                    {{ section.title }}
                  </option>
                }
              </select>
            </div>

            <!-- Main Title -->
            <h2 class="title" data-aos="fade">{{ getCurrentSectionTitle() }}</h2>

            <!-- Builder Sections - Dynamic Content -->
            <div class="builder-sections">
              @if (currentSection() === 'to-whom') {
                <section class="section-description" data-aos="fade">
                  <div class="content">
                    <div class="description gl-text-editor">
                      <p><em>Units of the Fund are available exclusively under exemptions from public offering requirements, in accordance with the Swiss Financial Services Act (FinSA) and the Swiss Financial Institutions Act (FinIA), and are therefore only available to qualified and professional investors as defined under Swiss law.</em></p>
                      <p>The Meye Long/Short Fund is an alternative investment strategy designed to seek positive returns across varying market environments while maintaining a low correlation with traditional asset classes, such as equities and bonds. The Fund is available to clients of Meye Asset Management and to eligible investors through approved intermediaries, advisors, or private arrangements.</p>
                      <p>The Fund's portfolio consists primarily of equity securities traded on developed international markets, including U.S. and European exchanges. The strategy follows a long/short approach, whereby the manager establishes long positions in securities deemed to have attractive upside potential and short positions in securities assessed to present downside risk.</p>
                      <p>The Fund is particularly well suited for affluent and sophisticated investors seeking portfolio diversification and downside resilience. By allocating to the Fund within a diversified or equity-focused portfolio, investors may benefit from improved risk-adjusted returns over time and enhanced robustness during periods of market volatility, stress, or crisis.</p>
                      <p>The Meye Long/Short Fund is accessible to qualified investors and professional counterparties through private placement arrangements and approved advisory channels, in accordance with applicable Swiss regulations.</p>
                    </div>
                  </div>
                </section>
              }
              
              @if (currentSection() === 'philosophy') {
                <section class="section-description" data-aos="fade">
                  <div class="content">
                    <div class="description gl-text-editor">
                      <p>We believe that the stock price does not always reflect its intrinsic value: it is influenced by a number of factors, including several cognitive biases on the part of investors.</p>
                      <p>It is possible to make investment decisions based on these recurring behaviors.</p>
                      <ol>
                        <li>The markets are not efficient.</li>
                        <li>The trend of stock price last longer than we might think.</li>
                        <li>It is important to maintain an healthy diversification.</li>
                        <li>It is essential to pre-establish sound constraints in order to properly manage risk.</li>
                      </ol>
                    </div>
                  </div>
                </section>
              }
              
              @if (currentSection() === 'methodology') {
                <section class="section-description" data-aos="fade">
                  <div class="content">
                    <div class="description gl-text-editor">
                      <p>Our investment methodology for stock selection and portfolio construction is entirely top-down. As a first step, we will analyze the market as a whole, then the behavior of the activity sectors and finally we will settle our choice on the most attractive securities. We use a set of well-defined rules for the purchase and sale of securities, which enables us to eliminate all cognitive and emotional biases from the management of your portfolio.</p>
                      <p>One of the great advantage of our methodology is that it enables the Fund to be heavily underweighted and likely negatively exposed to equities when the stock market drop or crash, which can not only prevent significant losses but also provide an opportunity for positive returns in a challenging market environment.</p>
                      <h3>Markets Analysis</h3>
                      <p>Bullish or bearish markets? Since when?</p>
                      <h3>Sectors Analysis</h3>
                      <p>Which sectors display the greatest upward or downward potential?</p>
                      <h3>Securities Analysis</h3>
                      <p>Which securities are prone to have the best return?</p>
                    </div>
                  </div>
                </section>
              }
              
              @if (currentSection() === 'why') {
                <section class="section-description" data-aos="fade">
                  <div class="content">
                    <div class="description gl-text-editor">
                      <p>The Rivemont Absolute Return Fund contributes in five ways to a diversified or stock portfolio.</p>
                      <h3>Absolute Return</h3>
                      <p>Absolute return: The strategy offers the potential for positive returns in both bull and bear markets.</p>
                      <p>Target positive returns in bear markets.</p>
                      <p><strong>Positive monthly return when the S&P/TSX Composite Index is down.</strong></p>
                      <h3>Diversification</h3>
                      <p>Low correlation to traditional asset classes.</p>
                      <p><strong>Negative correlation against the S&P/TSX Composite Index.</strong></p>
                      <h3>Risk/return Profile</h3>
                      <p>Its characteristics make it possible to increase a portfolio's total return while maintaining the same level of risk.</p>
                      <h3>Flexibility</h3>
                      <p>Dynamic adjustment of the net exposure to the markets based on their attractiveness.</p>
                      <h3>Complementarity</h3>
                      <p>The methodology used is complementary to the one used by most investment managers.</p>
                    </div>
                  </div>
                </section>
              }
              
              @if (currentSection() === 'structure') {
                <section class="section-description" data-aos="fade">
                  <div class="content">
                    <div class="description gl-text-editor">
                      <dl>
                        <div>
                          <dt>Structure</dt>
                          <dd>Private investment vehicle</dd>
                        </div>
                        <div>
                          <dt>Units</dt>
                          <dd>Private placements, available to qualified and professional investors only</dd>
                        </div>
                        <div>
                          <dt>Investment Fund Manager</dt>
                          <dd>Meye Asset Management (Switzerland)</dd>
                        </div>
                        <div>
                          <dt>Investment Advisor</dt>
                          <dd>Meye Asset Management (Switzerland)</dd>
                        </div>
                        <div>
                          <dt>Eligible for tax-advantaged accounts</dt>
                          <dd>Subject to investor jurisdiction and applicable Swiss regulations</dd>
                        </div>
                        <div>
                          <dt>Valuation / subscriptions / redemptions</dt>
                          <dd>Periodic valuation (weekly)</dd>
                        </div>
                        <div>
                          <dt>High Water Mark</dt>
                          <dd>Yes</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </section>
              }
            </div>
          </div>

          <!-- Sidebar - Structure identique à crypto fund -->
          <div class="page-content__sidebar">
            <section class="section-sidebar">
              <div class="content">
                <ul>
                  @for (section of sections(); track section.id) {
                    <li [class.active]="currentSection() === section.id">
                      @if (section.id === 'to-whom') {
                        <a [routerLink]="['/', langService.currentLanguage(), 'alternative-funds', 'long-short']">
                          {{ section.title }}
                        </a>
                      } @else {
                        <a [routerLink]="['/', langService.currentLanguage(), 'alternative-funds', 'long-short']" 
                           [queryParams]="{ 'sub-page': getQueryParamForSection(section.id) }">
                          {{ section.title }}
                        </a>
                      }
                    </li>
                  }
                </ul>
              </div>
            </section>
          </div>
        </div>
      } @else if (fund) {
      <!-- Structure pour les autres fonds (crypto, microcap) -->
      <section class="page-content">
        <div class="content">
          <h1>{{ fund.name }}</h1>
          
          <div class="page-content__builder">
            <div class="description gl-text-editor">
              <h2>Vue d'ensemble</h2>
              <p>{{ fund.overview }}</p>

              <h3>Objectif de placement</h3>
              <p>{{ fund.objective }}</p>

              <h3>Stratégie</h3>
              <p>{{ fund.strategy }}</p>

              @if (fund.manager) {
                <h3>Gestionnaire de portefeuille</h3>
                <p>{{ fund.manager }}</p>
              }
            </div>
          </div>

          @if (fund.minimumInvestment || fund.managementFee || fund.liquidity) {
            <div class="page-content__sidebar">
              <div class="section-sidebar">
                <div class="content">
                  <h3>Détails du fonds</h3>
                  <dl>
                    @if (fund.minimumInvestment) {
                      <div>
                        <dt>Investissement minimum</dt>
                        <dd>{{ fund.minimumInvestment }}</dd>
                      </div>
                    }
                    @if (fund.managementFee) {
                      <div>
                        <dt>Frais de gestion</dt>
                        <dd>{{ fund.managementFee }}</dd>
                      </div>
                    }
                    @if (fund.liquidity) {
                      <div>
                        <dt>Liquidité</dt>
                        <dd>{{ fund.liquidity }}</dd>
                      </div>
                    }
                  </dl>

                  <a [routerLink]="langService.buildUrl('contact')" class="gl-button">{{ t.get('common.contactUs') }}</a>
                </div>
              </div>
            </div>
          } @else {
            <div class="page-content__sidebar">
              <div class="section-sidebar">
                <div class="content">
                  <a [routerLink]="langService.buildUrl('contact')" class="gl-button">{{ t.get('common.contactUs') }}</a>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
      }
    </div>
  `
})
export class AlternativeFundDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  imageService = inject(ImageMappingService);
  aosService = inject(AosService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  fund: any;
  currentSection = signal('to-whom');
  private queryParamSub?: Subscription;

  sections = computed(() => [
    { id: 'to-whom', title: 'To whom is the Meye Long/Short Fund appropriate for?' },
    { id: 'philosophy', title: 'Our Investment Philosophy' },
    { id: 'methodology', title: 'Our Investment Methodology' },
    { id: 'why', title: 'Why this strategy?' },
    { id: 'structure', title: 'Structure' },
  ]);

  private funds: any = {
    'long-short': {
      name: 'Meye Long/Short Fund',
      overview: 'To whom is the Meye Long/Short Fund appropriate for?',
      objective: '',
      strategy: '',
      manager: '',
      minimumInvestment: '',
      managementFee: '',
      liquidity: ''
    },
    'crypto': {
      name: 'Fonds MEYE Crypto',
      overview: 'Le Fonds MEYE Crypto offre une exposition de niveau institutionnel aux actifs numériques. Le fonds est géré activement pour naviguer dans les marchés de cryptomonnaies volatils tout en mettant en œuvre une gestion des risques robuste.',
      objective: 'Offrir une exposition au marché des cryptomonnaies avec une gestion professionnelle des risques et des solutions de garde.',
      strategy: 'Gestion active sur les principales cryptomonnaies avec allocation dynamique basée sur les conditions du marché, l\'analyse technique et la recherche fondamentale.',
      manager: 'Philippe Jetté dirige le fonds crypto en tant qu\'analyste principal, apportant une expertise approfondie en actifs numériques et en technologie blockchain.',
      minimumInvestment: '50 000 $',
      managementFee: '2,0 %',
      liquidity: 'Mensuelle'
    },
    'microcap': {
      name: 'Fonds MEYE MicroCap',
      overview: 'Le Fonds MEYE MicroCap se concentre sur l\'identification de sociétés à petite capitalisation à fort potentiel avant qu\'elles ne soient découvertes par les investisseurs grand public. Grâce à une recherche rigoureuse, le fonds cherche à découvrir de la valeur cachée.',
      objective: 'Atteindre une appréciation du capital à long terme supérieure en investissant dans des sociétés micro-cap sous-évaluées avec un fort potentiel de croissance.',
      strategy: 'Sélection d\'actions de bas en haut avec accent sur les sociétés ayant des fondamentaux solides, des équipes de gestion compétentes et des catalyseurs de croissance significatifs.',
      manager: 'Mathieu Martin, CFA, gère le Fonds MicroCap, apportant une expertise spécialisée en recherche et analyse de petites capitalisations.',
      minimumInvestment: '100 000 $',
      managementFee: '1,75 %',
      liquidity: 'Trimestrielle'
    }
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.fund = this.funds[slug];
    });
    
    this.queryParamSub = this.route.queryParams.subscribe(params => {
      const subPage = params['sub-page'];
      if (subPage && this.sections().some(s => this.getSectionFromQuery(subPage) === s.id)) {
        const sectionId = this.getSectionFromQuery(subPage);
        if (sectionId) {
          this.currentSection.set(sectionId);
        }
      } else {
        this.currentSection.set('to-whom');
      }
    });
  }

  ngOnDestroy() {
    this.queryParamSub?.unsubscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.aosService.refresh();
    }, 100);
  }

  onSubPageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.navigateToSubPage(select.value);
  }

  navigateToSubPage(sectionId: string) {
    if (sectionId === 'to-whom') {
      this.router.navigate(['/', this.langService.currentLanguage(), 'alternative-funds', 'long-short']);
    } else {
      this.router.navigate(['/', this.langService.currentLanguage(), 'alternative-funds', 'long-short'], {
        queryParams: { 'sub-page': this.getQueryParamForSection(sectionId) }
      });
    }
  }

  getQueryParamForSection(sectionId: string): string {
    const subPageMap: Record<string, string> = {
      'to-whom': 'to-whom-is-the-meye-long-short-fund-appropriate-for',
      'philosophy': 'our-investment-philosophy',
      'methodology': 'our-investment-methodology',
      'why': 'why-this-strategy',
      'structure': 'structure'
    };
    return subPageMap[sectionId] || sectionId;
  }

  getQueryParams(sectionId: string): any {
    if (sectionId === 'to-whom') {
      return {};
    }
    const subPageMap: Record<string, string> = {
      'to-whom': 'to-whom-is-the-meye-long-short-fund-appropriate-for',
      'philosophy': 'our-investment-philosophy',
      'methodology': 'our-investment-methodology',
      'why': 'why-this-strategy',
      'structure': 'structure'
    };
    return { 'sub-page': subPageMap[sectionId] || sectionId };
  }

  getSectionFromQuery(query: string): string | null {
    if (!query) return 'to-whom';
    const subPageMap: Record<string, string> = {
      'to-whom-is-the-meye-long-short-fund-appropriate-for': 'to-whom',
      'our-investment-philosophy': 'philosophy',
      'our-investment-methodology': 'methodology',
      'why-this-strategy': 'why',
      'structure': 'structure'
    };
    return subPageMap[query] || query || 'to-whom';
  }

  getCurrentSectionTitle(): string {
    const section = this.sections().find(s => s.id === this.currentSection());
    return section?.title || '';
  }
}
