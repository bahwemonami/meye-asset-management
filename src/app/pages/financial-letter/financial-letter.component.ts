import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-financial-letter',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a routerLink="/communications" class="inline-flex items-center text-primary-300 hover:text-white mb-6 transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Communications
        </a>
        <span class="block text-accent-400 font-medium mb-2">Financial Letter</span>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">{{ letter?.title }}</h1>
        @if (letter?.date) {
          <p class="text-primary-300 mt-4">{{ letter.date }}</p>
        }
      </div>
    </section>

    <!-- Content Section -->
    @if (letter) {
      <section class="py-20 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="prose prose-lg max-w-none text-gray-600">
            <p>{{ letter.content }}</p>
          </div>

          <!-- CTA -->
          <div class="mt-16 bg-primary-950 rounded-lg p-8 text-center">
            <h3 class="text-xl font-serif font-bold text-white mb-4">Want to learn more?</h3>
            <p class="text-primary-200 mb-6">Contact us to discuss how we can help you achieve your financial goals.</p>
            <a routerLink="/contact" class="inline-flex items-center bg-accent-600 text-white px-6 py-3 rounded hover:bg-accent-700 transition-colors">
              Contact Us
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    }
  `
})
export class FinancialLetterComponent implements OnInit {
  letter: any;

  private letters: any = {
    'volume-16-number-3': {
      title: 'Volume 16 Number 3',
      date: 'Q2 2025',
      content: 'The second quarter of 2025 was, for us, one of the most interesting and entertaining in recent years. In active management, the goal is to add value to portfolios. The more external and macroeconomic events there are, the more opportunities to distinguish ourselves from the benchmark index and improve potential performance multiply. This quarter has been particularly eventful with significant market movements that required careful navigation and strategic positioning. Our team has worked diligently to capitalize on opportunities while managing risk appropriately for our clients.'
    },
    'volume-16-number-2': {
      title: 'Volume 16 Number 2',
      date: 'April 24, 2025',
      content: 'Before diving into the main topic, I am pleased to announce that the first annual investor meeting for the Montreal region will take place on June 5th. This event will be held at the Club St-Denis. We look forward to meeting with our valued clients and discussing our investment outlook, portfolio strategies, and answering any questions you may have. These meetings are an important part of maintaining the strong relationships we have built with our clients over the years.'
    },
    'volume-16-number-1': {
      title: 'Volume 16 Number 1',
      date: 'February 3, 2025',
      content: 'I delayed writing this communication as long as possible to include the very latest geopolitical events (but before the tariffs unfortunately). Over the coming years, these will have major impacts on investment strategies that will prove optimal. Indeed, for now 15 years, MEYE Asset Management has as its objective to build portfolios whose primary goal is to maximize return for a given risk. The current environment requires careful consideration of global factors and their potential impact on various asset classes.'
    },
    'volume-15-number-4': {
      title: 'Volume 15 Number 4',
      date: 'October 20, 2024',
      content: 'As I write these lines on October 20, 2024, the major indexes are at their historic highs, and gold is surpassing its highest peaks. We are in what is called a bull market for all assets. These periods are relatively rare, and one of the objectives of a portfolio manager like MEYE Asset Management is to take full advantage of them. Our positioning has allowed us to participate in this market rally while maintaining appropriate risk controls.'
    },
    'volume-15-number-3': {
      title: 'Volume 15 Number 3',
      date: 'July 2024',
      content: 'Sailing enthusiasts know very well: it is always easier to sail when the wind is at your back. This is exactly what happened this year. A strong tailwind that pushed most equity assets to unprecedented highs. In North America, for more than 200 years now, the stock market has offered its participants an average annual return of nearly 10%. When it comes to wealth building, this is the most powerful and constant trade wind there is.'
    },
    'volume-15-number-2': {
      title: 'Volume 15 Number 2',
      date: 'April 29, 2024',
      content: 'As I write these lines, the government has just announced a considerable increase in capital gains taxation in the country, without an income floor for corporations and trusts. This decision is, in my opinion, extremely bad for investment and risk-taking in Canada, and will have negative long-term consequences on the vigor and health of the economy in the country. We continue to monitor regulatory changes and adjust our strategies accordingly to best serve our clients.'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.letter = this.letters[slug];
    });
  }
}
