import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-communications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section - Identique à Rivemont -->
    <section class="template-part-hero">
      <div class="content">
        <h1 class="title">Communications</h1>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="content-container">
        <!-- Filters -->
        <div class="filters">
          @for (filter of filters; track filter.id) {
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
            <a [routerLink]="article.slug ? ['/communications', article.slug] : null"
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
      
      @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      @media (max-width: 568px) {
        grid-template-columns: 1fr;
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
    }
    
    .article-title {
      font-family: 'Georgia', serif;
      font-size: 1.3rem;
      color: var(--meye-primary);
      transition: color 0.3s ease;
    }
    
    .article-excerpt {
      font-size: 0.95rem;
      color: var(--meye-text-light);
      line-height: 1.6;
    }
  `]
})
export class CommunicationsComponent {
  currentFilter = signal('all');

  filters = [
    { id: 'all', label: 'Tous' },
    { id: 'journal', label: 'Journal Les Affaires' },
    { id: 'letter', label: 'Lettre financière' },
    { id: 'media', label: 'MEYE dans les médias' }
  ];

  articles = [
    {
      slug: 'volume-16-numero-3',
      category: 'Lettre financière',
      title: 'Volume 16 numéro 3',
      excerpt: 'Le deuxième trimestre de 2025 a été, pour nous, l\'un des plus intéressants et divertissants des dernières années.',
      type: 'letter',
      externalUrl: ''
    },
    {
      slug: 'volume-16-numero-2',
      category: 'Lettre financière',
      title: 'Volume 16 numéro 2',
      excerpt: 'La première rencontre annuelle des investisseurs pour la région de Montréal aura lieu le 5 juin.',
      type: 'letter',
      externalUrl: ''
    },
    {
      slug: 'volume-16-numero-1',
      category: 'Lettre financière',
      title: 'Volume 16 numéro 1',
      excerpt: 'Les événements géopolitiques auront des impacts majeurs sur les stratégies de placement.',
      type: 'letter',
      externalUrl: ''
    }
  ];

  filteredArticles() {
    if (this.currentFilter() === 'all') {
      return this.articles;
    }
    return this.articles.filter(article => article.type === this.currentFilter());
  }
}
