import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-team-member',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Back Link - Identique à Rivemont -->
    <div class="content" style="padding: 0px 165px; margin-bottom: 40px;">
      <a routerLink="/our-team" class="back-link">
        <img [src]="imageService.getImage('arrow-left-dark')" alt="" />
        Toute l'équipe
      </a>
    </div>

    <!-- Content Section - Identique à Rivemont -->
    @if (member) {
      <section class="template-part-desc-image template-part-desc-image--reverse">
        <div class="content">
          <div class="col">
            <div class="description gl-text-editor">
              <h1>{{ member.name }}</h1>
              <h2>{{ member.title }}</h2>
              @for (paragraph of member.bioParagraphs; track $index) {
                <p>{{ paragraph }}</p>
              }
            </div>
          </div>
          <div class="col">
            <div class="image-holder">
              <img [src]="imageService.getImage(member.imageKey)" [alt]="member.name" width="557" height="665" class="attachment-large size-large" />
            </div>
          </div>
        </div>
      </section>
    }
  `
})
export class TeamMemberComponent implements OnInit {
  imageService = inject(ImageMappingService);
  member: any;

  private teamMembers: any = {
    'julien-carl-landry': {
      name: 'Julien-Carl Landry, Pl.Fin.',
      title: 'Planificateur financier',
      imageKey: 'julien-carl',
      bioParagraphs: [
        'Julien-Carl Landry est planificateur financier chez MEYE ASSET MANAGER. Il a œuvré comme planificateur financier à la Banque Nationale au cours des dernières années et représente un atout majeur pour notre clientèle.'
      ]
    },
    'martin-lalonde': {
      name: 'Martin Lalonde, MBA, CFA',
      title: 'Président et gestionnaire de portefeuille',
      imageKey: 'martin-lalonde',
      bioParagraphs: [
        'Martin Lalonde est le président-fondateur de MEYE ASSET MANAGER et gestionnaire de portefeuille. Il possède plusieurs années d\'expérience comme intervenant sur les marchés financiers et a œuvré, avant de fonder MEYE ASSET MANAGER, comme analyste principal aux investissements et aux fusions et acquisitions pour un important organisme canadien.',
        'En tant que gestionnaire de portefeuille, M. Lalonde est responsable de l\'ensemble des stratégies de la firme. Dans ce rôle, il est responsable de bâtir les portefeuilles incluant la supervision des pondérations parmi les différentes catégories d\'actifs ainsi que le choix des titres.',
        'M. Lalonde est titulaire d\'une maitrise en administration des affaires (MBA) de l\'Université d\'Ottawa et d\'une spécialisation en commerce international de l\'École supérieure de commerce de Reims, en France. Il détient le titre de CFA (Chartered Financial Analyst).'
      ]
    },
    'jeffrey-veilleux': {
      name: 'Jeffrey Veilleux, M.Sc., CIM®',
      title: 'Gestionnaire de portefeuille',
      imageKey: 'jeffrey-veilleux',
      bioParagraphs: [
        'Jeffrey Veilleux, M.Sc., CIM®, est gestionnaire de portefeuille chez MEYE ASSET MANAGER. Il apporte une rigueur analytique et une connaissance approfondie des marchés à la gestion de portefeuille.'
      ]
    },
    'david-blouin': {
      name: 'David Blouin',
      title: 'Directeur des relations aux clients',
      imageKey: 'david-blouin',
      bioParagraphs: [
        'David Blouin dirige les relations aux clients chez MEYE ASSET MANAGER, veillant à ce que chaque client reçoive une attention personnalisée et un service exceptionnel.'
      ]
    },
    'martin-piche': {
      name: 'Martin Piché',
      title: 'Analyste, administration et conformité',
      imageKey: 'martin-piche',
      bioParagraphs: [
        'Martin Piché supervise les fonctions d\'administration et de conformité, veillant à ce que toutes les opérations respectent les exigences réglementaires et les meilleures pratiques de l\'industrie.'
      ]
    },
    'mathieu-martin': {
      name: 'Mathieu Martin, CFA',
      title: 'Gestionnaire de portefeuille, Fonds Rivemont MicroCap',
      imageKey: 'mathieu-martin',
      bioParagraphs: [
        'Mathieu Martin, CFA, gère le Fonds Rivemont MicroCap, spécialisé dans l\'identification d\'opportunités d\'investissement à petite capitalisation à fort potentiel.'
      ]
    },
    'philippe-jette': {
      name: 'Philippe Jetté',
      title: 'Analyste principal, Fonds Rivemont Crypto',
      imageKey: 'philippe-jette',
      bioParagraphs: [
        'Philippe Jetté est l\'analyste principal du Fonds Rivemont Crypto, apportant son expertise en actifs numériques et en technologie blockchain.'
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.member = this.teamMembers[slug];
    });
  }
}
