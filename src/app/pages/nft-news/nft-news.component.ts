import { Component, AfterViewInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

@Component({
  selector: 'app-nft-news',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <!-- Hero Section -->
    <section class="relative py-32 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>
      
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <a routerLink="/digital-proof" class="inline-flex items-center text-primary-300 hover:text-accent-400 transition-colors mb-6">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Digital Proof
          </a>
          <h1 class="text-white mb-6 animate-fade-in-up">News & <span class="text-accent-400">Updates</span></h1>
          <p class="text-xl text-primary-200 animate-fade-in-up animate-delay-200">
            Stay informed with the latest product updates, compliance insights, and case studies from MEYE Asset Management.
          </p>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="py-8 bg-white border-b border-primary-100 sticky top-20 z-40">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <!-- Category Filters -->
          <div class="flex flex-wrap gap-2">
            @for (category of categories; track category.value) {
              <button 
                (click)="setActiveCategory(category.value)"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                [class.bg-primary-800]="activeCategory() === category.value"
                [class.text-white]="activeCategory() === category.value"
                [class.bg-primary-50]="activeCategory() !== category.value"
                [class.text-dark-700]="activeCategory() !== category.value"
                [class.hover:bg-primary-100]="activeCategory() !== category.value">
                {{ category.label }}
              </button>
            }
          </div>
          
          <!-- Search -->
          <div class="relative">
            <input 
              type="text" 
              placeholder="Search articles..."
              [(ngModel)]="searchQuery"
              class="w-full md:w-64 pl-10 pr-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Article -->
    @if (featuredArticle(); as featured) {
      <section class="section-padding bg-primary-50/30">
        <div class="container-custom">
          <div class="grid lg:grid-cols-2 gap-8 items-center">
            <div class="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden reveal">
              <img [src]="featured.image" [alt]="featured.title" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
              <span class="absolute top-4 left-4 px-3 py-1 bg-accent-500 text-white text-xs font-medium rounded-full">Featured</span>
            </div>
            <div class="reveal-right">
              <span class="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4">
                {{ featured.category }}
              </span>
              <h2 class="text-3xl font-semibold text-primary-900 mb-4">{{ featured.title }}</h2>
              <p class="text-dark-600 mb-6">{{ featured.excerpt }}</p>
              <div class="flex items-center text-sm text-dark-500 mb-6">
                <span>{{ featured.date }}</span>
                <span class="mx-3">•</span>
                <span>{{ featured.readTime }} read</span>
              </div>
              <a href="#" class="btn-primary">
                Read Article
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    }

    <!-- Articles Grid -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        @if (filteredArticles().length > 0) {
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (article of filteredArticles(); track article.id; let i = $index) {
              <article class="card overflow-hidden group hover:-translate-y-1 transition-all duration-300 reveal" 
                       [style.animation-delay.ms]="i * 100">
                <div class="relative aspect-video overflow-hidden">
                  <img [src]="article.image" [alt]="article.title" 
                       class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                  <div class="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="p-6">
                  <span class="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded mb-3">
                    {{ article.category }}
                  </span>
                  <h3 class="text-lg font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors duration-300">
                    {{ article.title }}
                  </h3>
                  <p class="text-dark-500 text-sm mb-4 line-clamp-2">{{ article.excerpt }}</p>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-dark-400">{{ article.date }}</span>
                    <span class="text-dark-400">{{ article.readTime }} read</span>
                  </div>
                </div>
              </article>
            }
          </div>
          
          <!-- Load More -->
          <div class="text-center mt-12">
            <button class="btn-secondary">
              Load More Articles
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </button>
          </div>
        } @else {
          <div class="text-center py-16">
            <svg class="w-16 h-16 text-dark-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 class="text-xl font-semibold text-dark-700 mb-2">No articles found</h3>
            <p class="text-dark-500">Try adjusting your search or filter criteria.</p>
          </div>
        }
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
      <div class="container-custom">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-white mb-4">Subscribe to Our <span class="text-accent-400">Newsletter</span></h2>
          <p class="text-primary-200 mb-8">
            Get the latest compliance updates, product news, and insights delivered directly to your inbox.
          </p>
          <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" (submit)="onNewsletterSubmit($event)">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent">
            <button type="submit" class="btn-accent !py-3 whitespace-nowrap">
              Subscribe
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </form>
          <p class="text-primary-400 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class NftNewsComponent implements AfterViewInit {
  searchQuery = '';
  activeCategory = signal('all');

  categories = [
    { label: 'All', value: 'all' },
    { label: 'Product Updates', value: 'product' },
    { label: 'Compliance & Security', value: 'compliance' },
    { label: 'Case Studies', value: 'case-study' },
    { label: 'Industry News', value: 'industry' }
  ];

  articles: Article[] = [
    {
      id: 1,
      title: 'Introducing Enhanced Security Features for Digital Proof',
      excerpt: 'We are excited to announce new security enhancements that further protect your digital certificates and verification processes.',
      category: 'Product Updates',
      date: 'Jan 25, 2026',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Understanding AML Compliance in Digital Asset Management',
      excerpt: 'A comprehensive guide to anti-money laundering requirements and how Digital Proof of Control supports your compliance needs.',
      category: 'Compliance & Security',
      date: 'Jan 20, 2026',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Case Study: How XYZ Capital Streamlined Their Audit Process',
      excerpt: 'Learn how a leading investment firm reduced audit preparation time by 60% using Digital Proof of Control.',
      category: 'Case Studies',
      date: 'Jan 15, 2026',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'New Regulatory Framework: What It Means for Digital Assets',
      excerpt: 'An analysis of the latest regulatory developments and their implications for institutional investors.',
      category: 'Industry News',
      date: 'Jan 10, 2026',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Multi-Signature Verification: A Deep Dive',
      excerpt: 'Technical overview of our multi-signature verification process and how it enhances security.',
      category: 'Product Updates',
      date: 'Jan 5, 2026',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Best Practices for Institutional Compliance Documentation',
      excerpt: 'Essential guidelines for maintaining comprehensive compliance documentation in the digital age.',
      category: 'Compliance & Security',
      date: 'Dec 28, 2025',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  featuredArticle = computed(() => {
    return this.articles.find(a => a.featured);
  });

  filteredArticles = computed(() => {
    let filtered = this.articles.filter(a => !a.featured);
    
    if (this.activeCategory() !== 'all') {
      const categoryMap: Record<string, string> = {
        'product': 'Product Updates',
        'compliance': 'Compliance & Security',
        'case-study': 'Case Studies',
        'industry': 'Industry News'
      };
      filtered = filtered.filter(a => a.category === categoryMap[this.activeCategory()]);
    }
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.excerpt.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  });

  setActiveCategory(category: string) {
    this.activeCategory.set(category);
  }

  onNewsletterSubmit(event: Event) {
    event.preventDefault();
    console.log('Newsletter subscription submitted');
  }

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

  private setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });
  }
}
