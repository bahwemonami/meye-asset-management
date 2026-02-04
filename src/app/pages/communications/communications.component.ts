import { Component, signal, ChangeDetectionStrategy, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-communications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section - Identique à Rivemont -->
    <section class="template-part-hero">
      <div class="content">
        <h1 class="title">{{ t.get('communications.title') }}</h1>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="content-container">
        <!-- Filters -->
        <div class="filters">
          @for (filter of filters(); track filter.id) {
            <button 
              (click)="currentFilter.set(filter.id)"
              [class.active]="currentFilter() === filter.id"
              class="filter-btn">
              {{ filter.label }}
            </button>
          }
        </div>

        <!-- Articles Grid -->
        <div class="articles-list">
          @for (article of filteredArticles(); track article.slug) {
            <a [routerLink]="article.slug ? [langService.buildUrl('communications'), article.slug] : null"
               [href]="article.externalUrl || null"
               [target]="article.externalUrl ? '_blank' : '_self'"
               class="article-card">
              <span class="article-category">{{ article.category }}</span>
              <h3 class="article-title">{{ article.title }}</h3>
              @if (article.excerpt) {
                <p class="article-excerpt">{{ article.excerpt }}</p>
              }
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .filters {
      display: flex;
      gap: 15px;
      margin-bottom: 50px;
      flex-wrap: wrap;
      
      @media (max-width: 768px) {
        gap: 10px;
        margin-bottom: 40px;
      }
      
      @media (max-width: 568px) {
        gap: 8px;
        margin-bottom: 30px;
      }
    }
    
    .filter-btn {
      padding: 12px 25px;
      background: var(--meye-gray-light);
      border: none;
      border-radius: 50px;
      font-size: 0.95rem;
      color: var(--meye-text);
      cursor: pointer;
      transition: all 0.3s ease;
      
      @media (max-width: 768px) {
        padding: 10px 20px;
        font-size: 0.9rem;
      }
      
      @media (max-width: 568px) {
        padding: 8px 16px;
        font-size: 0.85rem;
      }
      
      &:hover,
      &.active {
        background: var(--meye-accent);
        color: var(--meye-white);
      }
    }
    
    .articles-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      
      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
      }
      
      @media (max-width: 768px) {
        gap: 20px;
      }
      
      @media (max-width: 568px) {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
    
    .article-card {
      background: var(--meye-white);
      padding: 35px;
      border-radius: 8px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      
      @media (max-width: 768px) {
        padding: 25px;
        gap: 10px;
      }
      
      @media (max-width: 568px) {
        padding: 20px;
        gap: 8px;
      }
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        
        .article-title {
          color: var(--meye-accent);
        }
      }
    }
    
    .article-category {
      font-size: 0.85rem;
      color: var(--meye-accent);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      
      @media (max-width: 568px) {
        font-size: 0.75rem;
      }
    }
    
    .article-title {
      font-family: 'Georgia', serif;
      font-size: 1.3rem;
      color: var(--meye-primary);
      transition: color 0.3s ease;
      
      @media (max-width: 768px) {
        font-size: 1.2rem;
      }
      
      @media (max-width: 568px) {
        font-size: 1.1rem;
      }
    }
    
    .article-excerpt {
      font-size: 0.95rem;
      color: var(--meye-text-light);
      line-height: 1.6;
      
      @media (max-width: 568px) {
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  `]
})
export class CommunicationsComponent {
  t = inject(TranslationService);
  langService = inject(LanguageService);
  currentFilter = signal('all');

  filters = computed(() => [
    { id: 'all', label: this.t.get('communications.all') },
    { id: 'journal', label: this.t.get('communications.journal') },
    { id: 'letter', label: this.t.get('communications.letter') },
    { id: 'media', label: this.t.get('communications.media') }
  ]);

  articles = computed(() => {
    const articlesData = this.t.get('communications.articles') as any;
    if (!articlesData) return [];
    
    return Object.keys(articlesData).map(slug => ({
      slug,
      category: articlesData[slug].category,
      title: articlesData[slug].title,
      excerpt: articlesData[slug].excerpt,
      type: articlesData[slug].type,
      externalUrl: articlesData[slug].externalUrl || ''
    }));
  });

  filteredArticles = computed(() => {
    const articles = this.articles();
    if (this.currentFilter() === 'all') {
      return articles;
    }
    return articles.filter(article => article.type === this.currentFilter());
  });
}
