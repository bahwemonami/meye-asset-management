import { Component, inject, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'page-team bg-primary'
  },
  template: `
    <!-- Section Team - Identique à Rivemont -->
    <section class="section-team">
      <div class="content">
        <h1 class="title" data-aos="fade">Notre équipe</h1>
        <div class="members">
          @for (member of teamMembers; track member.slug) {
            <div class="member-holder" data-aos="fade-up">
              <a [routerLink]="['/team', member.slug]" [title]="member.name" class="member">
                <img [src]="imageService.getImage(member.imageKey)" class="member-photo" [alt]="member.name" loading="lazy" />
                <div class="member-overlay">
                  <div class="member-info">
                    <p class="member-name">{{ member.name }}</p>
                    <p class="member-title">{{ member.title }}</p>
                  </div>
                </div>
              </a>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class TeamComponent {
  imageService = inject(ImageMappingService);
  
  teamMembers = [
    {
      slug: 'julien-carl-landry',
      name: 'Julien-Carl Landry, Pl.Fin.',
      title: 'Planificateur financier',
      imageKey: 'julien-carl'
    },
    {
      slug: 'martin-lalonde',
      name: 'Martin Lalonde, MBA, CFA',
      title: 'Président et gestionnaire de portefeuille',
      imageKey: 'martin-lalonde'
    },
    {
      slug: 'jeffrey-veilleux',
      name: 'Jeffrey Veilleux, M.Sc., CIM®',
      title: 'Gestionnaire de portefeuille',
      imageKey: 'jeffrey-veilleux'
    },
    {
      slug: 'david-blouin',
      name: 'David Blouin',
      title: 'Directeur des relations aux clients',
      imageKey: 'david-blouin'
    },
    {
      slug: 'martin-piche',
      name: 'Martin Piché',
      title: 'Analyste, administration et conformité',
      imageKey: 'martin-piche'
    },
    {
      slug: 'mathieu-martin',
      name: 'Mathieu Martin, CFA',
      title: 'Gestionnaire de portefeuille, Fonds MEYE MicroCap',
      imageKey: 'mathieu-martin'
    },
    {
      slug: 'philippe-jette',
      name: 'Philippe Jetté',
      title: 'Analyste principal, Fonds MEYE Crypto',
      imageKey: 'philippe-jette'
    }
  ];
}
