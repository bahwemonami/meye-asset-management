import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-alternative-fund-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Back Link - Identique à Rivemont -->
    <div class="content" style="padding: 0px 165px; margin-bottom: 40px;">
      <a routerLink="/alternative-funds" class="back-link">
        <img [src]="imageService.getImage('arrow-left-dark')" alt="" />
        Fonds alternatifs
      </a>
    </div>

    <!-- Content Section - Identique à Rivemont -->
    @if (fund) {
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

              <h3>Gestionnaire de portefeuille</h3>
              <p>{{ fund.manager }}</p>
            </div>
          </div>

          <div class="page-content__sidebar">
            <div class="section-sidebar">
              <div class="content">
                <h3>Détails du fonds</h3>
                <dl>
                  <div>
                    <dt>Investissement minimum</dt>
                    <dd>{{ fund.minimumInvestment }}</dd>
                  </div>
                  <div>
                    <dt>Frais de gestion</dt>
                    <dd>{{ fund.managementFee }}</dd>
                  </div>
                  <div>
                    <dt>Liquidité</dt>
                    <dd>{{ fund.liquidity }}</dd>
                  </div>
                </dl>

                <a routerLink="/contact" class="gl-button">Demander des renseignements</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    }
  `
})
export class AlternativeFundDetailComponent implements OnInit {
  imageService = inject(ImageMappingService);
  fund: any;

  private funds: any = {
    'long-short': {
      name: 'Fonds MEYE Long Short',
      overview: 'Le Fonds MEYE Long Short est conçu pour générer des rendements positifs indépendamment de la direction du marché. En prenant à la fois des positions longues et courtes, le fonds vise à capturer de l\'alpha tout en minimisant l\'exposition au marché.',
      objective: 'Générer des rendements positifs constants avec une faible corrélation aux marchés boursiers traditionnels.',
      strategy: 'Le fonds emploie une stratégie neutre au marché, prenant des positions longues sur des titres sous-évalués tout en vendant à découvert ceux qui sont surévalués. Cette approche cherche à profiter à la fois des hausses et des baisses des prix des actions.',
      manager: 'Martin Lalonde, MBA, CFA, supervise la stratégie du fonds avec le soutien de l\'équipe d\'investissement.',
      minimumInvestment: '100 000 $',
      managementFee: '1,5 %',
      liquidity: 'Mensuelle'
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.fund = this.funds[slug];
    });
  }
}
