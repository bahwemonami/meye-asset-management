import { Component, inject, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { AosService } from '../../services/aos.service';

@Component({
  selector: 'app-firm-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Main Content Section - Identique à Rivemont -->
    <section class="template-part-desc-image template-part-desc-image--reverse">
      <div class="content">
        <div class="col">
          <div class="description gl-text-editor" data-aos="fade">
            <h1>Profil de la firme</h1>
            <p>
              Fondé en 2010, MEYE ASSET MANAGER est une firme de gestion de portefeuille offrant des stratégies<br>
              de placement à la fois traditionnelles et novatrices aux investisseurs.
            </p>
            <p>
              Notre objectif est de maximiser le rendement potentiel selon le profil de risque de<br>
              chaque client, tout en gardant une attention particulière à la gestion efficace de la<br>
              volatilité des marchés.
            </p>
            <p>
              Nous offrons également un service complet de planification financière afin d'assurer<br>
              l'atteinte des objectifs ainsi que la protection du patrimoine.
            </p>
            <p>
              Contactez-nous afin de profitez pleinement d'une réelle gestion active de vos<br>
              placements.
            </p>
          </div>
          <div class="button-holder" data-aos="fade-up">
            <a routerLink="/contact" class="gl-button" target="_self">
              Contactez-nous
            </a>
          </div>
        </div>
        <div class="col">
          <div class="image-holder" data-aos="fade-up">
            <img [src]="imageService.getImage('image-2')" alt="" width="557" height="665" class="attachment-large size-large" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- Team CTA Section - Identique à Rivemont -->
    <section class="section-cta">
      <div class="content">
        <div class="image-holder">
          <img [src]="imageService.getImage('team-2')" alt="" class="background" loading="lazy" />
        </div>
        <div class="button-holder">
          <a routerLink="/our-team" class="gl-button" target="_self">
            Découvrez l'équipe
          </a>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class FirmProfileComponent implements AfterViewInit {
  imageService = inject(ImageMappingService);
  aosService = inject(AosService);

  ngAfterViewInit() {
    // Rafraîchir AOS après le chargement de la vue
    setTimeout(() => {
      this.aosService.refresh();
    }, 100);
  }
}
