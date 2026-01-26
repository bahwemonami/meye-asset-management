import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <h1>Rendements</h1>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="content-container">
        <!-- Actions Section Header -->
        <div class="section-header">
          <h2>Actions</h2>
          <p class="date-info">Au 30 novembre 2025</p>
        </div>

        <!-- Strategy Description -->
        <div class="strategy-section">
          <div class="strategy-text">
            <p>
              Chez MEYE Asset Management, nous croyons que le prix d'un actif n'est pas toujours égal à sa valeur intrinsèque et qu'il est influencé par une multitude de facteurs, notamment les biais cognitifs des investisseurs. Puisque ces biais sont connus et qu'ils se répètent dans le temps, il est possible de prendre des décisions d'investissement basées sur ces comportements récurrents.
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
                  <td>0,3 %</td>
                  <td>2,7 %</td>
                  <td>8,0 %</td>
                  <td>18,2 %</td>
                  <td>14,9 %</td>
                  <td>30,4 %</td>
                  <td>14,1 %</td>
                  <td>12,6 %</td>
                  <td>12,8 %</td>
                </tr>
                <tr class="benchmark-row">
                  <td class="row-label">Indice de référence</td>
                  <td>3,0 %</td>
                  <td>10,0 %</td>
                  <td>20,7 %</td>
                  <td>26,6 %</td>
                  <td>23,4 %</td>
                  <td>27,7 %</td>
                  <td>16,3 %</td>
                  <td>12,5 %</td>
                  <td>10,6 %</td>
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
                  <td>1,2 %</td>
                  <td>32,0 %</td>
                  <td>6,7 %</td>
                  <td>12,7 %</td>
                  <td>5,9 %</td>
                  <td>13,1 %</td>
                  <td>2,7 %</td>
                  <td>23,1 %</td>
                  <td>20,8 %</td>
                </tr>
                <tr class="benchmark-row">
                  <td class="row-label">Indice de référence</td>
                  <td>6,9 %</td>
                  <td>12,7 %</td>
                  <td>10,4 %</td>
                  <td>-8,3 %</td>
                  <td>21,1 %</td>
                  <td>9,1 %</td>
                  <td>-8,9 %</td>
                  <td>23,2 %</td>
                  <td>7,7 %</td>
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
                  <td>6,6 %</td>
                  <td>-2,8 %</td>
                  <td>6,2 %</td>
                  <td>39,5 %</td>
                  <td>18,2 %</td>
                </tr>
                <tr class="benchmark-row">
                  <td class="row-label">Indice de référence</td>
                  <td>25,6 %</td>
                  <td>-7,2 %</td>
                  <td>13,9 %</td>
                  <td>24,4 %</td>
                  <td>26,6 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Notes -->
        <div class="notes-section">
          <h4>Notes explicatives</h4>
          <p>
            Les rendements proviennent du composé de toutes les actions détenues par les clients de MEYE Asset Management en gestion privée et ils sont bruts des frais. Les résultats futurs vont différer de ceux du passé. Ce document ne constitue pas une recommandation ni un conseil lié à un investissement et est présenté à titre d'information seulement.
          </p>
        </div>

        <!-- Overview and Holdings -->
        <div class="info-grid">
          <div class="info-card">
            <h3>Aperçu</h3>
            <dl>
              <div class="info-item">
                <dt>Date de création</dt>
                <dd>1 septembre 2010</dd>
              </div>
              <div class="info-item">
                <dt>Style de gestion</dt>
                <dd>Technique et tendance</dd>
              </div>
              <div class="info-item">
                <dt>Actifs de la firme</dt>
                <dd>155 millions $</dd>
              </div>
            </dl>
          </div>

          <div class="info-card">
            <h3>Principaux titres individuels</h3>
            <ul class="holdings-list">
              @for (holding of topHoldings; track holding) {
                <li>{{ holding }}</li>
              }
            </ul>
          </div>
        </div>

        <!-- Sectors -->
        <div class="sectors-section">
          <h3>Secteurs d'activité</h3>
          <div class="sectors-grid">
            @for (sector of sectors; track sector.name) {
              <div class="sector-item">
                <span class="sector-name">{{ sector.name }}</span>
                <span class="sector-value">{{ sector.percentage }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Manager and About -->
        <div class="info-grid">
          <div class="info-card dark">
            <h3>Gestionnaire</h3>
            <p>Martin Lalonde, MBA, CFA, est le gestionnaire de portefeuille responsable des décisions de placements. Il possède plusieurs années d'expérience comme intervenant sur les marchés financiers.</p>
            <a routerLink="/our-team" class="link-with-arrow light">
              En savoir plus
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div class="info-card">
            <h3>À propos de MEYE Asset Management</h3>
            <p>Fondée en 2010, MEYE Asset Management est une firme de gestion de portefeuille avec environ 155 millions $ en actifs sous gestion. La firme offre des stratégies de placement performantes.</p>
            <a routerLink="/firm-profile" class="link-with-arrow">
              En savoir plus
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
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
    'Omega Healthcare Investors',
    'Fortuna Mining Corp',
    'Boston Scientific Corp',
    'Wheaton Precious Metal Corp',
    'Agnico Eagle Mines Ltd',
    'Badger Infrastructure Solutions',
    'Intact Financial',
    'Manulife Financial International',
    'Business Machines Corp'
  ];
  
  sectors = [
    { name: 'Finance', percentage: '20,7 %' },
    { name: 'Immobilier', percentage: '24,4 %' },
    { name: 'Industriel', percentage: '13,7 %' },
    { name: 'Matériaux', percentage: '25,8 %' },
    { name: 'Soins de la santé', percentage: '8,3 %' },
    { name: 'Technologies', percentage: '7,1 %' },
    { name: 'Énergie', percentage: '0,0 %' },
    { name: 'Autres', percentage: '0,0 %' }
  ];
}
