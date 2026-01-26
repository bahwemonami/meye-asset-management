import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alternative-funds',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Alternative Funds</h1>
      </div>
    </section>

    <!-- Funds Grid Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-8">
          @for (fund of funds; track fund.slug) {
            <a [routerLink]="['/alternative-funds', fund.slug]" 
               class="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="aspect-video bg-primary-900 flex items-center justify-center">
                <span class="text-6xl">{{ fund.icon }}</span>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-serif font-bold text-primary-900 group-hover:text-accent-600 transition-colors">
                  {{ fund.name }}
                </h3>
                <p class="text-gray-600 mt-2 text-sm">{{ fund.description }}</p>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `
})
export class AlternativeFundsComponent {
  funds = [
    {
      slug: 'long-short',
      name: 'MEYE Long Short Fund',
      description: 'A market-neutral strategy seeking positive returns in all market conditions.',
      icon: '📈'
    },
    {
      slug: 'crypto',
      name: 'MEYE Crypto Fund',
      description: 'Exposure to digital assets with professional risk management.',
      icon: '₿'
    },
    {
      slug: 'microcap',
      name: 'MEYE MicroCap Fund',
      description: 'Investing in high-potential small-cap companies.',
      icon: '💎'
    }
  ];
}
