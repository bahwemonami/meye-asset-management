import { Component, inject, ChangeDetectionStrategy, ViewEncapsulation, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./performance.component.scss'],
  template: `
    <div class="template-rendements-page-container">
    <!-- Hero Section - Identique à Rivemont -->
    <section class="template-part-hero">
      <img [src]="imageService.getImage('performance-hero')" alt="" class="gl-responsive-background gl-responsive-background--desktop gl-img-grey" />
      <div class="content">
        <h1 class="title">{{ t.get('performance.title') }}</h1>
      </div>
    </section>

    <!-- Description Section - Identique à Rivemont -->
    <section class="description-section">
      <div class="content">
        <div class="content-grid">
          <div class="col col-text">
            <div class="description">
              <h2>{{ t.get('performance.equities') }}</h2>
              <p class="date">{{ t.get('performance.asOf') }}</p>
              <p>{{ t.get('performance.descriptionText') }}</p>
            </div>
          </div>
          <div class="col col-banner">
            <div class="banner">
              <div class="banner-description">
                <h2>{{ t.get('performance.investmentObjective') }}</h2>
                <p>{{ t.get('performance.investmentObjectiveText') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Table Section - Identique à Rivemont -->
    <section class="section-table">
      <div class="content">
        <div class="description description--top">
          <h2>{{ t.get('performance.performanceTable') }}</h2>
        </div>
        <div class="table-holder">
          <div class="table">
            <div class="thead">
              <div class="row">
                <div class="col"></div>
                <div class="col">{{ t.get('performance.oneMonth') }}</div>
                <div class="col">{{ t.get('performance.threeMonths') }}</div>
                <div class="col">{{ t.get('performance.sixMonths') }}</div>
                <div class="col">{{ t.get('performance.ytd') }}</div>
                <div class="col">{{ t.get('performance.oneYear') }}</div>
                <div class="col">{{ t.get('performance.twoYears') }}</div>
                <div class="col">{{ t.get('performance.fiveYears') }}</div>
                <div class="col">{{ t.get('performance.tenYears') }}</div>
                <div class="col">{{ t.get('performance.inception') }}</div>
              </div>
            </div>
            <div class="tbody">
              <div class="row">
                <div class="col">{{ t.get('performance.equitiesLabel') }}</div>
                <div class="col">-1.9 %</div>
                <div class="col">-4.3 %</div>
                <div class="col">3.5 %</div>
                <div class="col">15.9 %</div>
                <div class="col">15.9 %</div>
                <div class="col">27.2 %</div>
                <div class="col">12.2 %</div>
                <div class="col">12.5 %</div>
                <div class="col">12.5 %</div>
              </div>
              <div class="row">
                <div class="col">{{ t.get('performance.benchmark') }}</div>
                <div class="col">0.7 %</div>
                <div class="col">5.2 %</div>
                <div class="col">17.9 %</div>
                <div class="col">27.6 %</div>
                <div class="col">27.6 %</div>
                <div class="col">26.0 %</div>
                <div class="col">16.1 %</div>
                <div class="col">12.9 %</div>
                <div class="col">10.0 %</div>
              </div>
            </div>
          </div>
          <div class="table">
            <div class="thead">
              <div class="row">
                <div class="col"></div>
                <div class="col">2012</div>
                <div class="col">2013</div>
                <div class="col">2014</div>
                <div class="col">2015</div>
                <div class="col">2016</div>
                <div class="col">2017</div>
                <div class="col">2018</div>
                <div class="col">2019</div>
                <div class="col">2020</div>
              </div>
            </div>
            <div class="tbody">
              <div class="row">
                <div class="col">{{ t.get('performance.equitiesLabel') }}</div>
                <div class="col">1.2%</div>
                <div class="col">32.0%</div>
                <div class="col">6.7%</div>
                <div class="col">12.7%</div>
                <div class="col">5.9%</div>
                <div class="col">13.1%</div>
                <div class="col">2.7%</div>
                <div class="col">23.1%</div>
                <div class="col">20.8%</div>
              </div>
              <div class="row">
                <div class="col">{{ t.get('performance.benchmark') }}</div>
                <div class="col">6.9%</div>
                <div class="col">12.7%</div>
                <div class="col">10.4%</div>
                <div class="col">-8.3%</div>
                <div class="col">21.1%</div>
                <div class="col">9.1%</div>
                <div class="col">-8.9%</div>
                <div class="col">23.2%</div>
                <div class="col">7.7%</div>
              </div>
            </div>
          </div>
          <div class="table">
            <div class="thead">
              <div class="row">
                <div class="col"></div>
                <div class="col">2021</div>
                <div class="col">2022</div>
                <div class="col">2023</div>
                <div class="col">2024</div>
                <div class="col">2025</div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
              </div>
            </div>
            <div class="tbody">
              <div class="row">
                <div class="col">{{ t.get('performance.equitiesLabel') }}</div>
                <div class="col">6.6%</div>
                <div class="col">-2.8%</div>
                <div class="col">6.2%</div>
                <div class="col">39.5%</div>
                <div class="col">15.9%</div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
              </div>
              <div class="row">
                <div class="col">{{ t.get('performance.benchmark') }}</div>
                <div class="col">25.6%</div>
                <div class="col">-7.2%</div>
                <div class="col">13.9%</div>
                <div class="col">24.4%</div>
                <div class="col">27.6%</div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="description description--bottom">
          <h4>{{ t.get('performance.explanatoryNotes') }}</h4>
          <p>{{ t.get('performance.explanatoryNotesText') }}</p>
        </div>
      </div>
    </section>

    <!-- Top Holdings Section -->
    <section class="section-holdings">
      <div class="content">
        <div class="description gl-text-editor">
          <h2>{{ t.get('performance.topHoldings') }}</h2>
          <ul>
            @for (holding of topHoldings; track holding) {
              <li>{{ holding }}</li>
            }
          </ul>
        </div>
      </div>
    </section>

    <!-- List Section - Identique à Rivemont -->
    <section class="section-list">
      <div class="content">
        <h2 class="title">{{ t.get('performance.activitySectors') }}</h2>
        <div class="list">
          @for (sector of sectors(); track sector.name) {
            <div class="row">
              <div class="col">{{ sector.name }}</div>
              <div class="col">{{ sector.percentage }}</div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Manager Section - Identique à Rivemont -->
    <section class="template-part-desc-image template-part-desc-image--1 template-part-desc-image--reverse">
      <div class="content">
        <div class="col">
          <div class="description gl-text-editor">
            <h2>{{ t.get('performance.manager') }}</h2>
            <p>{{ t.get('performance.managerText') }}</p>
          </div>
          <div class="button-holder">
            <a [routerLink]="langService.buildUrl('team/martin-lalonde-mba-cfa')" class="gl-button" target="_self">{{ t.get('common.learnMore') }}</a>
          </div>
        </div>
        <div class="col">
          <div class="image-holder">
            <img [src]="imageService.getImage('martin-lalonde-1')" alt="" />
          </div>
        </div>
      </div>
    </section>

    <!-- About Section - Identique à Rivemont -->
    <section class="template-part-desc-image template-part-desc-image--1 template-part-desc-image--reverse-order-mobile">
      <div class="content">
        <div class="col">
          <div class="description gl-text-editor">
            <div class="description description--title-size-normal">
              <h2>{{ t.get('performance.aboutRivemont') }}</h2>
              <p>{{ t.get('performance.aboutRivemontText') }}</p>
            </div>
          </div>
          <div class="button-holder">
            <a [routerLink]="langService.buildUrl('firm-profile')" class="gl-button" target="_self">{{ t.get('common.learnMore') }}</a>
          </div>
        </div>
        <div class="col">
          <div class="image-holder">
            <img [src]="imageService.getImage('image-4')" alt="" />
          </div>
        </div>
      </div>
    </section>
    </div>
  `,
  styles: [`
    .section-header {
      margin-bottom: 40px;
      
      h2 {
        font-size: 2rem;
        margin-bottom: 8px;
      }
      
      .date-info {
        color: var(--meye-text-light);
        font-size: 0.95rem;
      }
    }
    
    .strategy-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 40px;
      margin-bottom: 60px;
      
      @media (max-width: 968px) {
        grid-template-columns: 1fr;
      }
      
      .strategy-text p {
        line-height: 1.8;
        color: var(--meye-text);
      }
      
      .strategy-objective {
        background: var(--meye-gray-light);
        padding: 30px;
        border-radius: 8px;
        
        h3 {
          font-size: 1.1rem;
          margin-bottom: 15px;
        }
        
        p {
          color: var(--meye-text);
          line-height: 1.7;
        }
      }
    }
    
    .tables-section {
      margin-bottom: 50px;
      
      h3 {
        font-size: 1.5rem;
        margin-bottom: 25px;
      }
    }
    
    .table-wrapper {
      overflow-x: auto;
      margin-bottom: 30px;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: 12px 16px;
        text-align: center;
        border-bottom: 1px solid var(--meye-gray);
        font-size: 0.9rem;
      }
      
      th {
        background: var(--meye-primary-dark);
        color: var(--meye-white);
        font-weight: 500;
      }
      
      .row-label {
        text-align: left;
        font-weight: 600;
        color: var(--meye-primary);
      }
      
      .benchmark-row {
        background: var(--meye-gray-light);
      }
    }
    
    .notes-section {
      background: var(--meye-gray-light);
      padding: 25px 30px;
      border-radius: 8px;
      margin-bottom: 60px;
      
      h4 {
        font-size: 1rem;
        margin-bottom: 12px;
        color: var(--meye-primary);
      }
      
      p {
        font-size: 0.9rem;
        color: var(--meye-text-light);
        line-height: 1.7;
      }
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 60px;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
    
    .info-card {
      background: var(--meye-gray-light);
      padding: 35px;
      border-radius: 8px;
      
      &.dark {
        background: var(--meye-primary-dark);
        color: var(--meye-white);
        
        h3 {
          color: var(--meye-white);
        }
        
        p {
          color: rgba(255, 255, 255, 0.8);
        }
      }
      
      h3 {
        font-size: 1.3rem;
        margin-bottom: 20px;
      }
      
      p {
        line-height: 1.7;
        color: var(--meye-text);
        margin-bottom: 20px;
      }
      
      dl {
        .info-item {
          margin-bottom: 18px;
          
          dt {
            font-size: 0.85rem;
            color: var(--meye-text-light);
            margin-bottom: 4px;
          }
          
          dd {
            font-weight: 600;
            color: var(--meye-primary);
          }
        }
      }
      
      .holdings-list {
        list-style: none;
        padding: 0;
        
        li {
          padding: 8px 0;
          border-bottom: 1px solid var(--meye-gray);
          color: var(--meye-text);
          font-size: 0.95rem;
          
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
    
    .sectors-section {
      margin-bottom: 60px;
      
      h3 {
        font-size: 1.3rem;
        margin-bottom: 25px;
      }
    }
    
    .sectors-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      
      @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      @media (max-width: 568px) {
        grid-template-columns: 1fr;
      }
    }
    
    .sector-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      background: var(--meye-gray-light);
      border-radius: 6px;
      
      .sector-name {
        font-size: 0.9rem;
        color: var(--meye-text);
      }
      
      .sector-value {
        font-weight: 600;
        color: var(--meye-primary);
      }
    }
  `]
})
export class PerformanceComponent {
  imageService = inject(ImageMappingService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
  
  topHoldings = [
    'Chartwell Retirement Residential',
    'Global X Copper Miners',
    'Omega Healthcare Investors',
    'Fortuna Mining Corp',
    'Wheaton Precious Metal Corp',
    'Boston Scientific Corp',
    'Badger Infrastructure Solutions',
    'Intact Financial',
    'Agnico Eagle Mines Ltd',
    'Manulife Financial International'
  ];

  sectors = computed(() => {
    const translatedSectors = this.t.get('performance.sectors') as any[];
    if (!translatedSectors || !Array.isArray(translatedSectors)) {
      return [];
    }
    
    return translatedSectors.map(sector => ({
      name: sector.name,
      percentage: sector.percentage
    }));
  });
}
