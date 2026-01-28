import { Component, OnInit, signal, inject, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageMappingService } from '../../services/image-mapping.service';
import { AosService } from '../../services/aos.service';

@Component({
  selector: 'app-private-management',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <!-- Hero Section - Identique à Rivemont -->
    <section class="template-part-hero">
      <div class="content">
        <h1 class="title">Gestion privée</h1>
        <img [src]="imageService.getImage('gestion-privee-hero')" alt="" class="gl-responsive-background gl-responsive-background--desktop gl-img-grey" />
      </div>
    </section>

    <!-- Page Content - Identique à Rivemont -->
    <div class="template-builder-page-container">
      <div class="page-content">
        <div class="page-content__builder">
        <!-- Page Filter (Select) -->
        <div class="page-filter">
          <select class="gl-select" [ngModel]="currentSection()" (ngModelChange)="onSectionChange($event)">
            @for (section of sections; track section.id) {
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
                    <p>La gestion privée s’adresse à une clientèle ayant des actifs de plus de 250 000 $ à investir et qui recherche une solution complète et performante.</p>
                    
                    <h4 class="text-color--blue text-color--light-blue">On compte parmi nos clients :</h4>
                    <ul>
                      <li>Des entrepreneurs et des dirigeants d’entreprises;</li>
                      <li>Des professionnels, des artistes ou des sportifs;</li>
                      <li>Des détenteurs de fortune de deuxième génération;</li>
                      <li>Des institutions et des entreprises privées.</li>
                      <li>Des épargnants efficaces.</li>
                    </ul>

                    <h4 class="text-color--light-blue">La gestion privée chez Rivemont vous offre :</h4>
                    <ul>
                      <li>Une gestion professionnelle</li>
                      <li>Un alignement sur une politique de placement précise</li>
                      <li>Une optimisation fiscale</li>
                      <li>Des rapports mensuels détaillés</li>
                      <li>Des frais de gestion avantageux</li>
                      <li>Un accès à une équipe externe multidisciplinaire pouvant répondre à tous vos besoins financiers, notamment la fiscalité et la comptabilité.</li>
                    </ul>

                    <p>N’hésitez pas à nous contacter afin que nous puissions évaluer votre situation financière et vous recommander une solution personnalisée qui reflète vos besoins et vos objectifs de placements.</p>
                  }
                  @case ('cycle') {
                    <p>Notre cycle de gestion est une approche structurée conçue pour optimiser votre expérience d’investissement :</p>
                    <ol>
                      <li><strong>Évaluation initiale :</strong> Comprendre vos objectifs financiers, votre tolérance au risque et votre horizon de placement</li>
                      <li><strong>Développement de stratégie :</strong> Création d’une politique d’investissement personnalisée</li>
                      <li><strong>Mise en œuvre :</strong> Exécution de la stratégie d’investissement avec précision</li>
                      <li><strong>Surveillance :</strong> Suivi continu de la performance du portefeuille</li>
                      <li><strong>Rééquilibrage :</strong> Ajustements réguliers pour maintenir l’allocation optimale</li>
                      <li><strong>Rapports :</strong> Relevés mensuels détaillés et revues de performance</li>
                    </ol>
                  }
                  @case ('philosophy') {
                    <p>Chez Rivemont, nous croyons que le prix d’un actif n’est pas toujours égal à sa valeur intrinsèque et qu’il est influencé par une multitude de facteurs, notamment les biais cognitifs des investisseurs.</p>
                    <p>Puisque ces biais sont connus et qu’ils se répètent dans le temps, il est possible de prendre des décisions d’investissement basées sur ces comportements récurrents.</p>
                    <p>Nous nous appuyons sur des stratégies basées sur l’effet momentum, dont l’analyse technique et le suivi de tendance. Le gestionnaire utilise une approche de type descendante en établissant en premier lieu les secteurs dont le potentiel à la hausse est le plus important.</p>
                  }
                  @case ('methodology') {
                    <p>Notre méthodologie d’investissement combine une analyse rigoureuse avec une exécution disciplinée :</p>
                    <ul>
                      <li>Analyse macro-économique pour identifier les tendances du marché</li>
                      <li>Rotation sectorielle basée sur les indicateurs de momentum</li>
                      <li>Analyse technique pour les points d’entrée et de sortie</li>
                      <li>Gestion des risques par la diversification</li>
                      <li>Rééquilibrage régulier du portefeuille</li>
                    </ul>
                  }
                  @case ('strategies') {
                    <p>Nous offrons diverses stratégies d’investissement adaptées à différents profils de clients :</p>
                    <ul>
                      <li><strong>Stratégie de croissance :</strong> Accent sur l'appréciation du capital</li>
                      <li><strong>Stratégie équilibrée :</strong> Mélange de croissance et d’actifs productifs de revenus</li>
                      <li><strong>Stratégie conservatrice :</strong> Accent sur la préservation du capital</li>
                      <li><strong>Stratégies alternatives :</strong> Accès à nos fonds spécialisés</li>
                    </ul>
                  }
                  @case ('why') {
                    <p>Pourquoi Rivemont ?</p>
                    <ul>
                      <li>Plus de 15 ans d’expérience éprouvée</li>
                      <li>Service personnalisé avec accès direct aux gestionnaires</li>
                      <li>Structure de frais transparente</li>
                      <li>Gestion active qui s’adapte aux conditions du marché</li>
                      <li>Services complets de planification financière</li>
                      <li>Forte attention à la gestion des risques</li>
                    </ul>
                  }
                  @case ('cfa') {
                    <p>Le titre CFA (Chartered Financial Analyst) est la référence en matière de gestion de placements. Voici pourquoi choisir un conseiller détenteur du titre CFA* est important :</p>
                    <ul>
                      <li>Formation rigoureuse en analyse d’investissement et gestion de portefeuille</li>
                      <li>Engagement envers les normes professionnelles les plus élevées</li>
                      <li>Adhésion à un code d’éthique strict</li>
                      <li>Exigences de formation continue</li>
                      <li>Reconnaissance mondiale de l’expertise</li>
                    </ul>
                  }
                }
              </div>
              <a routerLink="/contact" class="gl-button" target="_self">Contactez-nous</a>
            </div>
          </section>
        </div>
      </div>

      <!-- Sidebar - Identique à Rivemont -->
      <div class="page-content__sidebar">
        <section class="section-sidebar">
          <div class="content">
            <ul>
              @for (section of sections; track section.id) {
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  currentSection = signal('who');

  sections = [
    { id: 'who', title: 'À qui s’adresse la gestion privée' },
    { id: 'cycle', title: 'Cycle de gestion' },
    { id: 'philosophy', title: 'Philosophie de gestion' },
    { id: 'methodology', title: 'La méthodologie de gestion' },
    { id: 'strategies', title: 'Les stratégies de placement' },
    { id: 'why', title: 'Pourquoi Rivemont ?' },
    { id: 'cfa', title: 'Pourquoi choisir un conseiller détenteur du titre CFA* ?' }
  ];

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
    return this.sections.find(s => s.id === this.currentSection())?.title || '';
  }
}
