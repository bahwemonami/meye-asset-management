import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-financial-planning',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./financial-planning.component.scss'],
  template: `
    <div class="template-builder-page-container">
      <section class="template-part-hero">
        <div class="content">
          <h1 class="title">Planification financière</h1>
          <img
            [src]="imageService.getImage('financial-planning-hero')"
            alt=""
            class="gl-responsive-background gl-responsive-background--desktop gl-img-grey"
          />
        </div>
      </section>

      <div class="page-content">
        <div class="page-content__builder">
          <div class="page-filter">
            <select class="gl-select">
              <option selected>Un outil essentiel pour bâtir votre avenir</option>
              <option>Planification fiscale</option>
              <option>Planification pour les propriétaires d’entreprises</option>
              <option>Planification successorale</option>
            </select>
          </div>

          <h2 class="title" data-aos="fade">Un outil essentiel pour bâtir votre avenir</h2>

          <div class="builder-sections">
            <section class="section-description" data-aos="fade">
              <div class="content">
                <div class="description gl-text-editor">
                  <p>
                    Chez <strong>Les Investissements Rivemont</strong>, nous considérons la
                    planification financière comme un prolongement naturel de notre rôle de
                    gestionnaire de portefeuille. Elle nous permet de vous accompagner dans vos
                    décisions financières importantes.
                  </p>
                  <p>Notre rôle consiste alors à&nbsp;:</p>
                  <ul>
                    <li>Définir avec vous vos priorités et vos objectifs.</li>
                    <li>Identifier les stratégies les plus appropriées pour les réaliser.</li>
                    <li>Adapter votre plan au fil du temps, selon vos besoins et l’évolution des marchés.</li>
                  </ul>
                  <h4>Des solutions concrètes</h4>
                  <p>Nous couvrons l’ensemble des aspects nécessaires à une solide planification financière :</p>
                  <ul>
                    <li>Optimisation fiscale.</li>
                    <li>Planification successorale.</li>
                    <li>Préparation à la retraite.</li>
                    <li>Stratégie de décaissement.</li>
                    <li>Gestion des risques et assurances.</li>
                  </ul>
                  <p>&nbsp;</p>
                  <p>
                    N’hésitez pas à nous contacter afin que nous puissions évaluer votre situation
                    financière et vous recommander une solution personnalisée qui reflète vos besoins
                    et vos objectifs de placements.
                  </p>
                </div>
                <a class="gl-button" href="/contact">Contactez-nous</a>
              </div>
            </section>
          </div>
        </div>

        <div class="page-content__sidebar">
          <section class="section-sidebar">
            <div class="content">
              <ul>
                <li class="active">
                  <a href="/financial-planning">Un outil essentiel pour bâtir votre avenir</a>
                </li>
                <li>
                  <a href="/financial-planning">Planification fiscale</a>
                </li>
                <li>
                  <a href="/financial-planning">Planification pour les propriétaires d’entreprises</a>
                </li>
                <li>
                  <a href="/financial-planning">Planification successorale</a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
})
export class FinancialPlanningComponent {
  imageService = inject(ImageMappingService);
}
