import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <h1>Notre équipe</h1>
    </section>

    <!-- Team Grid Section -->
    <section class="content-section">
      <div class="content-container">
        <div class="team-grid">
          @for (member of teamMembers; track member.slug) {
            <a [routerLink]="['/team', member.slug]" class="team-card">
              <div class="team-card-image">
                <img [src]="imageService.getImage(member.imageKey)" [alt]="member.name" />
              </div>
              <div class="team-card-info">
                <p class="team-name">{{ member.name }}</p>
                <p class="team-role">{{ member.title }}</p>
              </div>
            </a>
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
      title: 'Gestionnaire de portefeuille, Fonds MicroCap',
      imageKey: 'mathieu-martin'
    },
    {
      slug: 'philippe-jette',
      name: 'Philippe Jetté',
      title: 'Analyste principal, Fonds Crypto',
      imageKey: 'philippe-jette'
    }
  ];
}
