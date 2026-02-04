import { Component, OnInit, inject, ChangeDetectionStrategy, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-financial-letter',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Back Link and Header - Identique à Rivemont -->
    <div class="content post-header-container">
      <div class="post-header">
        <a [routerLink]="langService.buildUrl('communications')" class="back-link">
          <img [src]="imageService.getImage('arrow-left-blue')" alt="" />
          {{ t.get('financialLetter.backToCommunications') }}
        </a>
        <h1>{{ letter()?.title }}</h1>
        <div class="post-category gl-pill">{{ t.get('financialLetter.category') }}</div>
      </div>
    </div>

    <!-- Content Section - Identique à Rivemont -->
    @if (letter()) {
      <section class="post-content">
        <div class="content">
          <div class="post-description gl-text-editor">
            @for (paragraph of letter()?.contentParagraphs; track $index) {
              <p>{{ paragraph }}</p>
            }
            
            @if (letter()?.pdfUrl) {
              <a [href]="letter()?.pdfUrl" target="_blank" class="gl-button" style="margin-top: 30px;">
                {{ letter()?.title }}
              </a>
            }
          </div>
        </div>
      </section>

      <!-- Related Posts - Identique à Rivemont -->
      <section class="section-related">
        <div class="content">
          <h2>{{ t.get('financialLetter.relatedTitle') }}</h2>
          <div class="related-posts">
            @for (related of relatedLetters(); track related.slug) {
              <a [routerLink]="[langService.buildUrl('communications'), related.slug]" class="related-post">
                <div class="post-category gl-pill">{{ t.get('financialLetter.category') }}</div>
                <h3>{{ related.title }}</h3>
                <p><strong>{{ related.date }} –</strong> {{ related.excerpt }}</p>
              </a>
            }
            <a [routerLink]="langService.buildUrl('communications')" class="gl-button">{{ t.get('financialLetter.allCommunications') }}</a>
          </div>
        </div>
      </section>
    }
  `
})
export class FinancialLetterComponent implements OnInit {
  imageService = inject(ImageMappingService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
  private route = inject(ActivatedRoute);
  
  private currentSlug = signal<string | null>(null);

  letter = computed(() => {
    const slug = this.currentSlug();
    if (!slug) return null;
    const letters = this.t.get('financialLetter.letters') as any;
    return letters?.[slug] || null;
  });

  relatedLetters = computed(() => {
    const currentLetter = this.letter();
    if (!currentLetter) return [];
    
    const letters = this.t.get('financialLetter.letters') as any;
    if (!letters) return [];
    
    return Object.keys(letters)
      .filter(key => letters[key].title !== currentLetter.title)
      .slice(0, 3)
      .map(key => ({
        slug: key,
        title: letters[key].title,
        date: letters[key].date,
        excerpt: letters[key].contentParagraphs?.[0]?.substring(0, 150) + '...'
      }));
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.currentSlug.set(slug);
    });
    
    // Recharger quand la langue change
    effect(() => {
      this.langService.currentLanguage();
      // Le computed letter() se mettra à jour automatiquement
    });
  }
}
