import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-communications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Communications</h1>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filter -->
        <div class="mb-12">
          <select 
            (change)="onFilterChange($event)"
            [value]="currentFilter()"
            class="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg text-primary-900 font-medium focus:ring-2 focus:ring-accent-500 focus:border-accent-500">
            <option value="all">All</option>
            <option value="journal">Les Affaires Journal</option>
            <option value="letter">Financial Letter</option>
            <option value="media">MEYE in the Media</option>
          </select>
        </div>

        <!-- Articles Grid -->
        <div class="space-y-6">
          @for (article of filteredArticles(); track article.slug) {
            <a [href]="article.externalUrl || '/communications/' + article.slug" 
               [target]="article.externalUrl ? '_blank' : '_self'"
               class="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
              <div class="flex flex-col md:flex-row md:items-start gap-4">
                <div class="flex-1">
                  <span class="text-sm text-accent-600 font-medium">{{ article.category }}</span>
                  <h3 class="text-xl font-serif font-bold text-primary-900 mt-2 group-hover:text-accent-600 transition-colors">
                    {{ article.title }}
                  </h3>
                  <p class="text-gray-600 mt-3">
                    @if (article.date) {
                      <strong>{{ article.date }} – </strong>
                    }
                    {{ article.excerpt }}
                  </p>
                </div>
                @if (article.externalUrl) {
                  <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                }
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `
})
export class CommunicationsComponent {
  currentFilter = signal('all');

  articles = [
    {
      slug: '',
      category: 'MEYE in the Media',
      title: 'The federal budget "Nothing to be alarmed about, nothing to rejoice about" - Martin Lalonde',
      date: 'November 5, 2025',
      excerpt: 'Listen to the column by the president and portfolio manager at MEYE Asset Management, Martin Lalonde, on the federal budget with host Michel Langevin.',
      type: 'media',
      externalUrl: '#'
    },
    {
      slug: '',
      category: 'Les Affaires Journal',
      title: 'With this favorable wind, should we buy small caps?',
      date: 'October 15, 2025',
      excerpt: 'Small-cap stocks have been underperforming for several years now. Sector valuation is also low. This situation leads some investors to wonder: is this the right time to buy?',
      type: 'journal',
      externalUrl: '#'
    },
    {
      slug: '',
      category: 'Les Affaires Journal',
      title: 'Jean-François Bilodeau\'s TFSA: building a balanced and realistic budget above all',
      date: 'October 23, 2025',
      excerpt: 'SPOTLIGHT ON MY TFSA. Before even thinking about investing his money, this thirty-something working in the dental sector was more concerned with maintaining a balanced budget.',
      type: 'journal',
      externalUrl: '#'
    },
    {
      slug: '',
      category: 'MEYE in the Media',
      title: 'Gold price has risen 60% since the start of 2025',
      date: 'October 18, 2025',
      excerpt: 'The price of gold is exploding and has just reached a new record of $4,300 US per ounce, an increase of 14% in one month. This precious metal is therefore, more than ever, playing its role as a safe haven.',
      type: 'media',
      externalUrl: '#'
    },
    {
      slug: '',
      category: 'Les Affaires Journal',
      title: 'Gold, essential in 2025',
      date: 'September 26, 2025',
      excerpt: 'GUEST EXPERT. After a decade marked by hyper-growth of large American technology caps, gold has established itself over the past two years as one of the drivers of diversified portfolio performance.',
      type: 'journal',
      externalUrl: '#'
    },
    {
      slug: 'volume-16-number-3',
      category: 'Financial Letter',
      title: 'Volume 16 Number 3',
      date: '',
      excerpt: 'The second quarter of 2025 was, for us, one of the most interesting and entertaining in recent years. In active management, the goal is to add value to portfolios. The more external and macroeconomic events there are, the more opportunities to distinguish ourselves from the benchmark index and improve potential performance multiply.',
      type: 'letter',
      externalUrl: ''
    },
    {
      slug: '',
      category: 'MEYE in the Media',
      title: 'Time is running out for cryptocurrency investors',
      date: '',
      excerpt: '',
      type: 'media',
      externalUrl: '#'
    },
    {
      slug: 'volume-16-number-2',
      category: 'Financial Letter',
      title: 'Volume 16 Number 2',
      date: 'April 24, 2025',
      excerpt: 'Before diving into the main topic, I am pleased to announce that the first annual investor meeting for the Montreal region will take place on June 5th. This event will be held at the Club St-Denis.',
      type: 'letter',
      externalUrl: ''
    },
    {
      slug: 'volume-16-number-1',
      category: 'Financial Letter',
      title: 'Volume 16 Number 1',
      date: 'February 3, 2025',
      excerpt: 'I delayed writing this communication as long as possible to include the very latest geopolitical events (but before the tariffs unfortunately). Over the coming years, these will have major impacts on investment strategies that will prove optimal.',
      type: 'letter',
      externalUrl: ''
    },
    {
      slug: 'volume-15-number-4',
      category: 'Financial Letter',
      title: 'Volume 15 Number 4',
      date: 'October 20, 2024',
      excerpt: 'As I write these lines on October 20, 2024, the major indexes are at their historic highs, and gold is surpassing its highest peaks. We are in what is called a bull market for all assets.',
      type: 'letter',
      externalUrl: ''
    },
    {
      slug: 'volume-15-number-3',
      category: 'Financial Letter',
      title: 'Volume 15 Number 3',
      date: 'July 2024',
      excerpt: 'Sailing enthusiasts know very well: it is always easier to sail when the wind is at your back. This is exactly what happened this year. A strong tailwind that pushed most equity assets to unprecedented highs.',
      type: 'letter',
      externalUrl: ''
    },
    {
      slug: 'volume-15-number-2',
      category: 'Financial Letter',
      title: 'Volume 15 Number 2',
      date: 'April 29, 2024',
      excerpt: 'As I write these lines, the Trudeau government has just announced a considerable increase in capital gains taxation in the country, without an income floor for corporations and trusts.',
      type: 'letter',
      externalUrl: ''
    }
  ];

  onFilterChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.currentFilter.set(select.value);
  }

  filteredArticles() {
    if (this.currentFilter() === 'all') {
      return this.articles;
    }
    return this.articles.filter(article => article.type === this.currentFilter());
  }
}
