import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-private-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <h1>Gestion privée</h1>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="content-container">
        <div class="two-column-layout">
          <!-- Main Content -->
          <div class="main-content">
            <h2>{{ getCurrentSectionTitle() }}</h2>
            
            @switch (currentSection()) {
              @case ('who') {
                <div class="prose-content">
                  <p>La gestion privée s'adresse à une clientèle ayant des actifs de plus de 250 000 $ à investir et qui recherche une solution complète et performante.</p>
                  
                  <h4>On compte parmi nos clients :</h4>
                  <ul>
                    <li>Des entrepreneurs et des dirigeants d'entreprises</li>
                    <li>Des professionnels, des artistes ou des sportifs</li>
                    <li>Des détenteurs de fortune de deuxième génération</li>
                    <li>Des institutions et des entreprises privées</li>
                    <li>Des épargnants efficaces</li>
                  </ul>

                  <h4>La gestion privée chez MEYE Asset Management vous offre :</h4>
                  <ul>
                    <li>Une gestion professionnelle</li>
                    <li>Un alignement sur une politique de placement précise</li>
                    <li>Une optimisation fiscale</li>
                    <li>Des rapports mensuels détaillés</li>
                    <li>Des frais de gestion avantageux</li>
                    <li>Un accès à une équipe externe multidisciplinaire pouvant répondre à tous vos besoins financiers</li>
                  </ul>

                  <p>N'hésitez pas à nous contacter afin que nous puissions évaluer votre situation financière et vous recommander une solution personnalisée.</p>
                </div>
              }
              @case ('cycle') {
                <div class="prose-content">
                  <p>Notre cycle de gestion est une approche structurée conçue pour optimiser votre expérience d'investissement :</p>
                  <ol>
                    <li><strong>Évaluation initiale :</strong> Comprendre vos objectifs financiers, votre tolérance au risque et votre horizon de placement</li>
                    <li><strong>Développement de stratégie :</strong> Création d'une politique d'investissement personnalisée</li>
                    <li><strong>Mise en œuvre :</strong> Exécution de la stratégie d'investissement avec précision</li>
                    <li><strong>Surveillance :</strong> Suivi continu de la performance du portefeuille</li>
                    <li><strong>Rééquilibrage :</strong> Ajustements réguliers pour maintenir l'allocation optimale</li>
                    <li><strong>Rapports :</strong> Relevés mensuels détaillés et revues de performance</li>
                  </ol>
                </div>
              }
              @case ('philosophy') {
                <div class="prose-content">
                  <p>Chez MEYE Asset Management, nous croyons que le prix d'un actif n'est pas toujours égal à sa valeur intrinsèque et qu'il est influencé par une multitude de facteurs, notamment les biais cognitifs des investisseurs.</p>
                  <p>Puisque ces biais sont connus et qu'ils se répètent dans le temps, il est possible de prendre des décisions d'investissement basées sur ces comportements récurrents.</p>
                  <p>Nous nous appuyons sur des stratégies basées sur l'effet momentum, dont l'analyse technique et le suivi de tendance. Le gestionnaire utilise une approche de type descendante en établissant en premier lieu les secteurs dont le potentiel à la hausse est le plus important.</p>
                </div>
              }
              @case ('methodology') {
                <div class="prose-content">
                  <p>Notre méthodologie d'investissement combine une analyse rigoureuse avec une exécution disciplinée :</p>
                  <ul>
                    <li>Analyse macro-économique pour identifier les tendances du marché</li>
                    <li>Rotation sectorielle basée sur les indicateurs de momentum</li>
                    <li>Analyse technique pour les points d'entrée et de sortie</li>
                    <li>Gestion des risques par la diversification</li>
                    <li>Rééquilibrage régulier du portefeuille</li>
                  </ul>
                </div>
              }
              @case ('strategies') {
                <div class="prose-content">
                  <p>Nous offrons diverses stratégies d'investissement adaptées à différents profils de clients :</p>
                  <ul>
                    <li><strong>Stratégie de croissance :</strong> Accent sur l'appréciation du capital</li>
                    <li><strong>Stratégie équilibrée :</strong> Mélange de croissance et d'actifs productifs de revenus</li>
                    <li><strong>Stratégie conservatrice :</strong> Accent sur la préservation du capital</li>
                    <li><strong>Stratégies alternatives :</strong> Accès à nos fonds spécialisés</li>
                  </ul>
                </div>
              }
              @case ('why') {
                <div class="prose-content">
                  <p>Pourquoi choisir MEYE Asset Management ?</p>
                  <ul>
                    <li>Plus de 15 ans d'expérience éprouvée</li>
                    <li>Service personnalisé avec accès direct aux gestionnaires</li>
                    <li>Structure de frais transparente</li>
                    <li>Gestion active qui s'adapte aux conditions du marché</li>
                    <li>Services complets de planification financière</li>
                    <li>Forte attention à la gestion des risques</li>
                  </ul>
                </div>
              }
              @case ('cfa') {
                <div class="prose-content">
                  <p>Le titre CFA (Chartered Financial Analyst) est la référence en matière de gestion de placements. Voici pourquoi choisir un conseiller CFA est important :</p>
                  <ul>
                    <li>Formation rigoureuse en analyse d'investissement et gestion de portefeuille</li>
                    <li>Engagement envers les normes professionnelles les plus élevées</li>
                    <li>Adhésion à un code d'éthique strict</li>
                    <li>Exigences de formation continue</li>
                    <li>Reconnaissance mondiale de l'expertise</li>
                  </ul>
                </div>
              }
            }
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <div class="sidebar-nav">
              <ul>
                @for (section of sections; track section.id) {
                  <li>
                    <a 
                      (click)="currentSection.set(section.id)"
                      [class.active]="currentSection() === section.id">
                      {{ section.title }}
                    </a>
                  </li>
                }
              </ul>
            </div>
            <div class="sidebar-cta">
              <a routerLink="/contact">Contactez-nous</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .prose-content {
      h4 {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--meye-primary);
        margin: 30px 0 15px;
      }
      
      p {
        margin-bottom: 20px;
        line-height: 1.8;
        color: var(--meye-text);
      }
      
      ul, ol {
        margin: 20px 0;
        padding-left: 25px;
        
        li {
          margin-bottom: 12px;
          line-height: 1.7;
          color: var(--meye-text);
        }
      }
      
      strong {
        color: var(--meye-primary);
      }
    }
    
    .main-content h2 {
      font-size: 2rem;
      margin-bottom: 30px;
      color: var(--meye-primary);
    }
  `]
})
export class PrivateManagementComponent implements OnInit {
  imageService = inject(ImageMappingService);
  currentSection = signal('who');

  sections = [
    { id: 'who', title: 'À qui s\'adresse la gestion privée' },
    { id: 'cycle', title: 'Cycle de gestion' },
    { id: 'philosophy', title: 'Philosophie de gestion' },
    { id: 'methodology', title: 'La méthodologie de gestion' },
    { id: 'strategies', title: 'Les stratégies de placement' },
    { id: 'why', title: 'Pourquoi MEYE Asset Management ?' },
    { id: 'cfa', title: 'Pourquoi choisir un conseiller CFA ?' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['section']) {
        this.currentSection.set(params['section']);
      }
    });
  }

  getCurrentSectionTitle(): string {
    return this.sections.find(s => s.id === this.currentSection())?.title || '';
  }
}
