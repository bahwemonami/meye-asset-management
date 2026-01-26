import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alternative-fund-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a routerLink="/alternative-funds" class="inline-flex items-center text-primary-300 hover:text-white mb-6 transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Alternative Funds
        </a>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">{{ fund?.name }}</h1>
      </div>
    </section>

    <!-- Content Section -->
    @if (fund) {
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2">
              <h2 class="text-2xl font-serif font-bold text-primary-900 mb-6">Overview</h2>
              <p class="text-gray-600 text-lg leading-relaxed mb-8">{{ fund.overview }}</p>

              <h3 class="text-xl font-serif font-bold text-primary-900 mb-4">Investment Objective</h3>
              <p class="text-gray-600 mb-8">{{ fund.objective }}</p>

              <h3 class="text-xl font-serif font-bold text-primary-900 mb-4">Strategy</h3>
              <p class="text-gray-600 mb-8">{{ fund.strategy }}</p>

              <h3 class="text-xl font-serif font-bold text-primary-900 mb-4">Portfolio Manager</h3>
              <p class="text-gray-600">{{ fund.manager }}</p>
            </div>

            <div>
              <div class="bg-gray-50 rounded-lg p-6 sticky top-32">
                <h3 class="text-lg font-semibold text-primary-900 mb-6">Fund Details</h3>
                <dl class="space-y-4">
                  <div>
                    <dt class="text-gray-500 text-sm">Minimum Investment</dt>
                    <dd class="text-primary-900 font-medium">{{ fund.minimumInvestment }}</dd>
                  </div>
                  <div>
                    <dt class="text-gray-500 text-sm">Management Fee</dt>
                    <dd class="text-primary-900 font-medium">{{ fund.managementFee }}</dd>
                  </div>
                  <div>
                    <dt class="text-gray-500 text-sm">Liquidity</dt>
                    <dd class="text-primary-900 font-medium">{{ fund.liquidity }}</dd>
                  </div>
                </dl>

                <hr class="my-6">

                <a routerLink="/contact" class="inline-flex items-center bg-primary-900 text-white px-6 py-3 rounded hover:bg-primary-800 transition-colors w-full justify-center">
                  Request Information
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    }
  `
})
export class AlternativeFundDetailComponent implements OnInit {
  fund: any;

  private funds: any = {
    'long-short': {
      name: 'MEYE Long Short Fund',
      overview: 'The MEYE Long Short Fund is designed to generate positive returns regardless of market direction. By taking both long and short positions, the fund aims to capture alpha while minimizing market exposure.',
      objective: 'To generate consistent positive returns with low correlation to traditional equity markets.',
      strategy: 'The fund employs a market-neutral strategy, taking long positions in undervalued securities while shorting overvalued ones. This approach seeks to profit from both rising and falling stock prices.',
      manager: 'Martin Lalonde, MBA, CFA, oversees the fund strategy with support from the investment team.',
      minimumInvestment: '$100,000',
      managementFee: '1.5%',
      liquidity: 'Monthly'
    },
    'crypto': {
      name: 'MEYE Crypto Fund',
      overview: 'The MEYE Crypto Fund provides institutional-grade exposure to digital assets. The fund is actively managed to navigate the volatile cryptocurrency markets while implementing robust risk management.',
      objective: 'To provide exposure to the cryptocurrency market with professional risk management and custody solutions.',
      strategy: 'Active management across major cryptocurrencies with dynamic allocation based on market conditions, technical analysis, and fundamental research.',
      manager: 'Philippe Jetté leads the crypto fund as Senior Analyst, bringing deep expertise in digital assets and blockchain technology.',
      minimumInvestment: '$50,000',
      managementFee: '2.0%',
      liquidity: 'Monthly'
    },
    'microcap': {
      name: 'MEYE MicroCap Fund',
      overview: 'The MEYE MicroCap Fund focuses on identifying high-potential small-cap companies before they are discovered by mainstream investors. Through rigorous research, the fund seeks to uncover hidden value.',
      objective: 'To achieve superior long-term capital appreciation by investing in undervalued micro-cap companies with strong growth potential.',
      strategy: 'Bottom-up stock selection with emphasis on companies with strong fundamentals, capable management teams, and significant growth catalysts.',
      manager: 'Mathieu Martin, CFA, manages the MicroCap Fund, bringing specialized expertise in small-cap research and analysis.',
      minimumInvestment: '$100,000',
      managementFee: '1.75%',
      liquidity: 'Quarterly'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.fund = this.funds[slug];
    });
  }
}
