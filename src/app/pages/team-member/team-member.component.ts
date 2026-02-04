import { Component, OnInit, inject, ChangeDetectionStrategy, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-team-member',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Back Link - Identique à Rivemont -->
    <div class="content back-link-container">
      <a [routerLink]="langService.buildUrl('our-team')" class="back-link">
        <img [src]="imageService.getImage('arrow-left-dark')" alt="" />
        {{ t.get('teamMember.backToTeam') }}
      </a>
    </div>

    <!-- Content Section - Identique à Rivemont -->
    @if (member()) {
      <section class="template-part-desc-image template-part-desc-image--reverse">
        <div class="content">
          <div class="col">
            <div class="description gl-text-editor">
              <h1>{{ member()?.name }}</h1>
              <h2>{{ member()?.title }}</h2>
              @for (paragraph of member()?.bioParagraphs; track $index) {
                <p>{{ paragraph }}</p>
              }
            </div>
          </div>
          <div class="col">
            <div class="image-holder">
              <img [src]="imageService.getImage(member()?.imageKey)" [alt]="member()?.name" width="557" height="665" class="attachment-large size-large" />
            </div>
          </div>
        </div>
      </section>
    }
  `
})
export class TeamMemberComponent implements OnInit {
  imageService = inject(ImageMappingService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
  private route = inject(ActivatedRoute);
  
  private currentSlug = signal<string | null>(null);

  member = computed(() => {
    const slug = this.currentSlug();
    if (!slug) return null;
    const members = this.t.get('teamMember.members') as any;
    const memberData = members?.[slug];
    if (!memberData) return null;
    
    return {
      ...memberData,
      imageKey: this.getImageKeyForSlug(slug)
    };
  });

  private getImageKeyForSlug(slug: string): string {
    const imageKeyMap: { [key: string]: string } = {
      'julien-carl-landry': 'julien-carl',
      'martin-lalonde': 'martin-lalonde',
      'jeffrey-veilleux': 'jeffrey-veilleux',
      'david-blouin': 'david-blouin',
      'martin-piche': 'martin-piche',
      'mathieu-martin': 'mathieu-martin',
      'philippe-jette': 'philippe-jette'
    };
    return imageKeyMap[slug] || slug;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.currentSlug.set(slug);
    });
    
    // Recharger quand la langue change
    effect(() => {
      this.langService.currentLanguage();
      // Le computed member() se mettra à jour automatiquement
    });
  }
}
