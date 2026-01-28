import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-financial-letter',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Back Link and Header - Identique à Rivemont -->
    <div class="content" style="padding: 0px 165px; margin-bottom: 40px;">
      <div class="post-header">
        <a routerLink="/communications" class="back-link">
          <img [src]="imageService.getImage('arrow-left-blue')" alt="" />
          Communications
        </a>
        <h1>{{ letter?.title }}</h1>
        <div class="post-category gl-pill">Lettre financière</div>
      </div>
    </div>

    <!-- Content Section - Identique à Rivemont -->
    @if (letter) {
      <section class="post-content">
        <div class="content">
          <div class="post-description gl-text-editor">
            @for (paragraph of letter.contentParagraphs; track $index) {
              <p>{{ paragraph }}</p>
            }
            
            @if (letter.pdfUrl) {
              <a [href]="letter.pdfUrl" target="_blank" class="gl-button" style="margin-top: 30px;">
                {{ letter.title }}
              </a>
            }
          </div>
        </div>
      </section>

      <!-- Related Posts - Identique à Rivemont -->
      <section class="section-related">
        <div class="content">
          <h2>Vous aimerez peut-être</h2>
          <div class="related-posts">
            @for (related of relatedLetters; track related.slug) {
              <a [routerLink]="['/communications', related.slug]" class="related-post">
                <div class="post-category gl-pill">Lettre financière</div>
                <h3>{{ related.title }}</h3>
                <p><strong>{{ related.date }} –</strong> {{ related.excerpt }}</p>
              </a>
            }
            <a routerLink="/communications" class="gl-button">Toutes les communications</a>
          </div>
        </div>
      </section>
    }
  `
})
export class FinancialLetterComponent implements OnInit {
  imageService = inject(ImageMappingService);
  letter: any;
  relatedLetters: any[] = [];

  private letters: any = {
    'volume-16-numero-3': {
      title: 'Volume 16 numéro 3',
      date: 'Q2 2025',
      pdfUrl: 'https://rivemont.ca/wp-content/uploads/2025/07/Lettre-financiere-Volume-16-numero-3-1.pdf',
      contentParagraphs: [
        'Bonjour à toutes et à tous,',
        'Le second trimestre de 2025 aura été, pour nous, l\'un des plus intéressants et divertissants des dernières années. Il faut savoir que lorsqu\'on fait de la gestion active, l\'objectif est d\'ajouter de la valeur aux portefeuilles. Plus il y a d\'événements externes et macroéconomiques, plus les occasions de se distinguer de l\'indice de référence et d\'améliorer la performance potentielle se multiplient. Et, disons-le franchement, il s\'en est passé des choses au cours des trois derniers mois. Nous allons d\'ailleurs en approfondir plusieurs dans la présente communication.',
        'Mais avant, j\'aimerais souhaiter la bienvenue à Julien-Carl Landry, qui se joint à notre organisation. Julien-Carl a œuvré comme planificateur financier à la Banque Nationale au cours des dernières années et représentera sans aucun doute un atout majeur pour notre clientèle. J\'en profiterai également pour vous expliquer le virage que MEYE ASSET MANAGER est en train d\'amorcer afin de mieux servir une clientèle de plus en plus sophistiquée.',
        'Comme à l\'habitude, nous conclurons en présentant nos perspectives sur les marchés et nos plus importantes positions.',
        'Bonne lecture !'
      ]
    },
    'volume-16-numero-2': {
      title: 'Volume 16 numéro 2',
      date: '24 avril 2025',
      contentParagraphs: [
        'Avant de plonger dans le vif du sujet, je suis heureux de vous annoncer que c\'est le 5 juin prochain qu\'aura lieu la première assemblée annuelle des investisseurs, pour la région de Montréal. Cet événement se déroulera au Club St-Denis.'
      ]
    },
    'volume-16-numero-1': {
      title: 'Volume 16 numéro 1',
      date: '3 février 2025',
      contentParagraphs: [
        'J\'ai retardé le plus possible la rédaction de cette communication afin d\'y inclure les tout derniers événements géopolitiques actuels (Mais avant les tarifs malheureusement). Au cours des prochaines années, ceux-ci auront des impacts majeurs sur les stratégies d\'investissement qui s\'avéreront optimales. En effet, depuis maintenant 15 ans, MEYE ASSET MANAGER a comme objectif de construire des portefeuilles dont le but premier est de maximiser le rendement pour un risque donné.'
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.letter = this.letters[slug];
      
      // Related letters (exclure la lettre actuelle)
      this.relatedLetters = Object.values(this.letters)
        .filter((l: any) => l.title !== this.letter?.title)
        .slice(0, 3)
        .map((l: any) => ({
          slug: Object.keys(this.letters).find(key => this.letters[key] === l),
          title: l.title,
          date: l.date,
          excerpt: l.contentParagraphs?.[0]?.substring(0, 150) + '...'
        }));
    });
  }
}
