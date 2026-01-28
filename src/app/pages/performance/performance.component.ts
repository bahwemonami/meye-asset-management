import { Component, inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

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
      <div class="content">
        <h1 class="title">Rendements</h1>
        <img [src]="imageService.getImage('performance-hero')" alt="" class="gl-responsive-background gl-responsive-background--desktop gl-img-grey" />
      </div>
    </section>

    <!-- Intro Section - Identique à Rivemont -->
    <section class="section-intro">
      <div class="content">
        <h2>Actions</h2>
        <p class="date-info">Au 31 décembre 2025</p>
        <div class="image-holder">
          <img [src]="imageService.getImage('clipboard-1')" alt="" />
        </div>
      </div>
    </section>

    <!-- Description Section - Identique à Rivemont -->
    <section class="description-section">
      <div class="content">
        <div class="description gl-text-editor">
          <p>Chez MEYE ASSET MANAGER, nous croyons que le prix d'un actif n'est pas toujours égal à sa valeur intrinsèque et qu'il est influencé par une multitude de facteurs, notamment les biais cognitifs des investisseurs. Puisque ces biais sont connus et qu'ils se répètent dans le temps, il est possible de prendre des décisions d'investissement basées sur ces comportements récurrents. Nous nous appuyons sur des stratégies basées sur l'effet momentum, dont l'analyse technique et le suivi de tendance. Le gestionnaire utilise une approche de type descendante en établissant en premier lieu les secteurs dont le potentiel à la hausse est le plus important pour ensuite sélectionner les titres spécifiques parmi ces secteurs.</p>
        </div>
        <div class="objective">
          <h2>Objectif de placement</h2>
          <p>L'objectif de placement de la classe d'actifs Actions est de générer un rendement supérieur à son indice de référence.</p>
        </div>
      </div>
    </section>

    <!-- Table Section - Identique à Rivemont -->
    <section class="section-table">
      <div class="content">
        <h2>Rendements</h2>

        <!-- Strategy Description -->
        <div class="strategy-section">
          <div class="strategy-text">
            <p>
              Chez MEYE ASSET MANAGER, nous croyons que le prix d'un actif n'est pas toujours égal à sa valeur intrinsèque et qu'il est influencé par une multitude de facteurs, notamment les biais cognitifs des investisseurs. Puisque ces biais sont connus et qu'ils se répètent dans le temps, il est possible de prendre des décisions d'investissement basées sur ces comportements récurrents.
            </p>
          </div>
          <div class="strategy-objective">
            <h3>Objectif de placement</h3>
            <p>L'objectif de placement de la classe d'actifs Actions est de générer un rendement supérieur à son indice de référence.</p>
          </div>
        </div>

        <!-- Performance Tables -->
        <div class="tables-section">
          <h3>Rendements</h3>
          
          <!-- Period Returns Table -->
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th></th>
                  <th>1 mois</th>
                  <th>3 mois</th>
                  <th>6 mois</th>
                  <th>AAJ</th>
                  <th>1 an</th>
                  <th>2 ans</th>
                  <th>5 ans</th>
                  <th>10 ans</th>
                  <th>Début</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="row-label">Action</td>
                  <td>-1.9 %</td>
                  <td>-4.3 %</td>
                  <td>3.5 %</td>
                  <td>15.9 %</td>
                  <td>15.9 %</td>
                  <td>27.2 %</td>
                  <td>12.2 %</td>
                  <td>12.5 %</td>
                  <td>12.5 %</td>
                </tr>
                <tr class="benchmark-row">
                  <td class="row-label">Indice de reference</td>
                  <td>0.7 %</td>
                  <td>5.2 %</td>
                  <td>17.9 %</td>
                  <td>27.6 %</td>
                  <td>27.6 %</td>
                  <td>26.0 %</td>
                  <td>16.1 %</td>
                  <td>12.9 %</td>
                  <td>10.0 %</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Annual Returns 2012-2020 -->
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th></th>
                  <th>2012</th>
                  <th>2013</th>
                  <th>2014</th>
                  <th>2015</th>
                  <th>2016</th>
                  <th>2017</th>
                  <th>2018</th>
                  <th>2019</th>
                  <th>2020</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="row-label">Action</td>
                  <td>1.2%</td>
                  <td>32.0%</td>
                  <td>6.7%</td>
                  <td>12.7%</td>
                  <td>5.9%</td>
                  <td>13.1%</td>
                  <td>2.7%</td>
                  <td>23.1%</td>
                  <td>20.8</td>
                </tr>
                <tr class="benchmark-row">
                  <td class="row-label">Indice de reference</td>
                  <td>6.9%</td>
                  <td>12.7%</td>
                  <td>10.4%</td>
                  <td>-8.3%</td>
                  <td>21.1%</td>
                  <td>9.1%</td>
                  <td>-8.9%</td>
                  <td>23.2%</td>
                  <td>7.7%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Annual Returns 2021-2025 -->
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th></th>
                  <th>2021</th>
                  <th>2022</th>
                  <th>2023</th>
                  <th>2024</th>
                  <th>2025</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="row-label">Action</td>
                  <td>6.6%</td>
                  <td>-2.8%</td>
                  <td>6.2%</td>
                  <td>39.5%</td>
                  <td>15.9%</td>
                </tr>
                <tr class="benchmark-row">
                  <td class="row-label">Indice de reference</td>
                  <td>25.6</td>
                  <td>-7.2%</td>
                  <td>13.9%</td>
                  <td>24.4%</td>
                  <td>27.6%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Notes -->
        <div class="notes-section">
          <h4>Notes explicatives</h4>
          <p>
            Les rendements proviennent du composé de toutes les actions détenues par les clients de MEYE ASSET MANAGER en gestion privée sous le code de représentant Q2F2 et ils sont bruts des frais. Avant le 1 janvier 2019, l'indice de référence est composé à 100 % de l'indice S&P/TSX et, par la suite, à 80% de l'indice S&P/TSX et 20 % de l'indice S&P 500. Les résultats futurs vont différer de ceux du passé. Ce document ne constitue pas une recommandation ni un conseil lié à un investissement et est présenté à titre d'information seulement.
          </p>
        </div>
      </div>
    </section>

    <!-- Info Section - Identique à Rivemont -->
    <section class="section-info">
      <div class="content">
        <div>
          <h2>Aperçu</h2>
          <h3>Date de création</h3>
          <p>1 septembre 2010</p>
          <h3>Style de gestion</h3>
          <p>Technique et tendance</p>
          <h3>Actifs de la firme</h3>
          <p>153 millions $</p>
        </div>
        <div>
          <h2>Principaux titres individuels</h2>
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
        <h2>Secteurs d'activité</h2>
        <div class="sectors-grid">
          @for (sector of sectors; track sector.name) {
            <div class="sector-item">
              <span class="sector-name">{{ sector.name }}</span>
              <span class="sector-value">{{ sector.percentage }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Manager Section - Identique à Rivemont -->
    <section class="template-part-desc-image template-part-desc-image--reverse">
      <div class="content">
        <div class="col">
          <div class="description gl-text-editor">
            <h2>Gestionnaire</h2>
            <p>Martin Lalonde, MBA, CFA, est le gestionnaire de portefeuille responsable des décisions de placements. Il possède plusieurs années d'expérience comme intervenant sur les marchés financiers et a œuvré, avant de fonder MEYE ASSET MANAGER, comme analyste principal aux investissements et aux fusions et acquisitions pour un important organisme canadien.</p>
          </div>
          <div class="button-holder">
            <a routerLink="/team/martin-lalonde" class="gl-button" target="_self">En savoir plus</a>
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
    <section class="template-part-desc-image template-part-desc-image--reverse">
      <div class="content">
        <div class="col">
          <div class="description gl-text-editor">
            <h2>À propos de MEYE ASSET MANAGER</h2>
            <p>Fondée en 2010, MEYE ASSET MANAGER est une firme de gestion de portefeuille québécoise avec environ 153 millions $ en actifs sous gestion. La firme offre des stratégies de placement performantes à une clientèle de gestion privée, de conseillers, de courtiers et de planificateurs financiers.</p>
          </div>
          <div class="button-holder">
            <a routerLink="/firm-profile" class="gl-button" target="_self">En savoir plus</a>
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

  sectors = [
    { name: 'Biens de consommation de base', percentage: '0,0 %' },
    { name: 'Consommation discrétionnaire', percentage: '0,0 %' },
    { name: 'Énergie', percentage: '0,0 %' },
    { name: 'Finance', percentage: '18,0 %' },
    { name: 'Immobilier', percentage: '20,9 %' },
    { name: 'Industriel', percentage: '16,3 %' },
    { name: 'Matériaux', percentage: '32,2 %' },
    { name: 'Services de télécommunication', percentage: '0,0 %' },
    { name: 'Services publics', percentage: '0,0 %' },
    { name: 'Soins de la santé', percentage: '6,7 %' },
    { name: 'Technologies de l\'information', percentage: '5,8 %' }
  ];
}
