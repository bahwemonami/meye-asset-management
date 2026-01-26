import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Performance</h1>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Equities Section -->
        <div class="mb-16">
          <h2 class="text-2xl font-serif font-bold text-primary-900 mb-2">Equities</h2>
          <p class="text-gray-500 mb-8">As of November 30, 2025</p>
        </div>

        <!-- Strategy Description -->
        <div class="grid lg:grid-cols-3 gap-12 mb-16">
          <div class="lg:col-span-2">
            <p class="text-gray-600 leading-relaxed">
              At MEYE Asset Management, we believe that the price of an asset is not always equal to its intrinsic value and that it is influenced by a multitude of factors, including investors' cognitive biases. Since these biases are known and repeat over time, it is possible to make investment decisions based on these recurring behaviors. We rely on strategies based on the momentum effect, including technical analysis and trend following. The manager uses a top-down approach by first establishing the sectors with the greatest upside potential and then selecting specific securities from these sectors.
            </p>
          </div>
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-primary-900 mb-4">Investment Objective</h3>
            <p class="text-gray-600">The investment objective of the Equities asset class is to generate a return superior to its benchmark index.</p>
          </div>
        </div>

        <!-- Performance Tables -->
        <div class="mb-16">
          <h3 class="text-xl font-serif font-bold text-primary-900 mb-6">Returns</h3>
          
          <!-- Period Returns -->
          <div class="overflow-x-auto mb-8">
            <table class="w-full">
              <thead>
                <tr class="bg-primary-900 text-white">
                  <th class="px-4 py-3 text-left"></th>
                  <th class="px-4 py-3 text-center">1 month</th>
                  <th class="px-4 py-3 text-center">3 months</th>
                  <th class="px-4 py-3 text-center">6 months</th>
                  <th class="px-4 py-3 text-center">YTD</th>
                  <th class="px-4 py-3 text-center">1 year</th>
                  <th class="px-4 py-3 text-center">2 years</th>
                  <th class="px-4 py-3 text-center">5 years</th>
                  <th class="px-4 py-3 text-center">10 years</th>
                  <th class="px-4 py-3 text-center">Since Inception</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="px-4 py-3 font-medium">Equities</td>
                  <td class="px-4 py-3 text-center">0.3%</td>
                  <td class="px-4 py-3 text-center">2.7%</td>
                  <td class="px-4 py-3 text-center">8.0%</td>
                  <td class="px-4 py-3 text-center">18.2%</td>
                  <td class="px-4 py-3 text-center">14.9%</td>
                  <td class="px-4 py-3 text-center">30.4%</td>
                  <td class="px-4 py-3 text-center">14.1%</td>
                  <td class="px-4 py-3 text-center">12.6%</td>
                  <td class="px-4 py-3 text-center">12.8%</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-4 py-3 font-medium">Benchmark Index</td>
                  <td class="px-4 py-3 text-center">3.0%</td>
                  <td class="px-4 py-3 text-center">10.0%</td>
                  <td class="px-4 py-3 text-center">20.7%</td>
                  <td class="px-4 py-3 text-center">26.6%</td>
                  <td class="px-4 py-3 text-center">23.4%</td>
                  <td class="px-4 py-3 text-center">27.7%</td>
                  <td class="px-4 py-3 text-center">16.3%</td>
                  <td class="px-4 py-3 text-center">12.5%</td>
                  <td class="px-4 py-3 text-center">10.6%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Annual Returns 2012-2020 -->
          <div class="overflow-x-auto mb-8">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-4 py-3 text-left"></th>
                  <th class="px-4 py-3 text-center">2012</th>
                  <th class="px-4 py-3 text-center">2013</th>
                  <th class="px-4 py-3 text-center">2014</th>
                  <th class="px-4 py-3 text-center">2015</th>
                  <th class="px-4 py-3 text-center">2016</th>
                  <th class="px-4 py-3 text-center">2017</th>
                  <th class="px-4 py-3 text-center">2018</th>
                  <th class="px-4 py-3 text-center">2019</th>
                  <th class="px-4 py-3 text-center">2020</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="px-4 py-3 font-medium">Equities</td>
                  <td class="px-4 py-3 text-center">1.2%</td>
                  <td class="px-4 py-3 text-center">32.0%</td>
                  <td class="px-4 py-3 text-center">6.7%</td>
                  <td class="px-4 py-3 text-center">12.7%</td>
                  <td class="px-4 py-3 text-center">5.9%</td>
                  <td class="px-4 py-3 text-center">13.1%</td>
                  <td class="px-4 py-3 text-center">2.7%</td>
                  <td class="px-4 py-3 text-center">23.1%</td>
                  <td class="px-4 py-3 text-center">20.8%</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-4 py-3 font-medium">Benchmark</td>
                  <td class="px-4 py-3 text-center">6.9%</td>
                  <td class="px-4 py-3 text-center">12.7%</td>
                  <td class="px-4 py-3 text-center">10.4%</td>
                  <td class="px-4 py-3 text-center">-8.3%</td>
                  <td class="px-4 py-3 text-center">21.1%</td>
                  <td class="px-4 py-3 text-center">9.1%</td>
                  <td class="px-4 py-3 text-center">-8.9%</td>
                  <td class="px-4 py-3 text-center">23.2%</td>
                  <td class="px-4 py-3 text-center">7.7%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Annual Returns 2021-2025 -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-4 py-3 text-left"></th>
                  <th class="px-4 py-3 text-center">2021</th>
                  <th class="px-4 py-3 text-center">2022</th>
                  <th class="px-4 py-3 text-center">2023</th>
                  <th class="px-4 py-3 text-center">2024</th>
                  <th class="px-4 py-3 text-center">2025</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="px-4 py-3 font-medium">Equities</td>
                  <td class="px-4 py-3 text-center">6.6%</td>
                  <td class="px-4 py-3 text-center">-2.8%</td>
                  <td class="px-4 py-3 text-center">6.2%</td>
                  <td class="px-4 py-3 text-center">39.5%</td>
                  <td class="px-4 py-3 text-center">18.2%</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-4 py-3 font-medium">Benchmark</td>
                  <td class="px-4 py-3 text-center">25.6%</td>
                  <td class="px-4 py-3 text-center">-7.2%</td>
                  <td class="px-4 py-3 text-center">13.9%</td>
                  <td class="px-4 py-3 text-center">24.4%</td>
                  <td class="px-4 py-3 text-center">26.6%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Notes -->
        <div class="bg-gray-50 rounded-lg p-6 mb-16">
          <h4 class="font-semibold text-primary-900 mb-3">Explanatory Notes</h4>
          <p class="text-sm text-gray-600">
            Returns are from the composite of all equities held by MEYE Asset Management private management clients under representative code Q2F2 and are gross of fees. Before January 1, 2019, the benchmark index is composed of 100% S&P/TSX index and thereafter 80% S&P/TSX index and 20% S&P 500 index. Future results will differ from past results. This document does not constitute a recommendation or investment advice and is presented for informational purposes only.
          </p>
        </div>

        <!-- Overview and Holdings Grid -->
        <div class="grid lg:grid-cols-2 gap-12 mb-16">
          <!-- Overview -->
          <div>
            <h3 class="text-xl font-serif font-bold text-primary-900 mb-6">Overview</h3>
            <dl class="space-y-4">
              <div>
                <dt class="text-gray-500 text-sm">Creation Date</dt>
                <dd class="text-primary-900 font-medium">September 1, 2010</dd>
              </div>
              <div>
                <dt class="text-gray-500 text-sm">Management Style</dt>
                <dd class="text-primary-900 font-medium">Technical and Trend</dd>
              </div>
              <div>
                <dt class="text-gray-500 text-sm">Firm Assets</dt>
                <dd class="text-primary-900 font-medium">$155 million</dd>
              </div>
            </dl>
          </div>

          <!-- Top Holdings -->
          <div>
            <h3 class="text-xl font-serif font-bold text-primary-900 mb-6">Top Individual Holdings</h3>
            <ul class="space-y-2 text-gray-600">
              <li>Chartwell Retirement Residential</li>
              <li>Omega Healthcare Investors</li>
              <li>Fortuna Mining Corp</li>
              <li>Boston Scientific Corp</li>
              <li>Wheaton Precious Metal Corp</li>
              <li>Agnico Eagle Mines Ltd</li>
              <li>Badger Infrastructure Solutions</li>
              <li>Intact Financial</li>
              <li>Manulife Financial International</li>
              <li>Business Machines Corp</li>
            </ul>
          </div>
        </div>

        <!-- Sectors -->
        <div class="mb-16">
          <h3 class="text-xl font-serif font-bold text-primary-900 mb-6">Sectors</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            @for (sector of sectors; track sector.name) {
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-gray-600 text-sm">{{ sector.name }}</p>
                <p class="text-primary-900 font-bold text-lg">{{ sector.percentage }}</p>
              </div>
            }
          </div>
        </div>

        <!-- Manager and About Grid -->
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Portfolio Manager -->
          <div class="bg-primary-950 rounded-lg p-8 text-white">
            <h3 class="text-xl font-serif font-bold mb-6">Portfolio Manager</h3>
            <p class="text-primary-200 leading-relaxed">
              Martin Lalonde, MBA, CFA, is the portfolio manager responsible for investment decisions. He has several years of experience in financial markets and worked, before founding MEYE Asset Management, as a senior analyst in investments and mergers and acquisitions for a major Canadian organization.
            </p>
            <a routerLink="/team/martin-lalonde" class="inline-flex items-center mt-6 text-accent-400 hover:text-accent-300 font-medium transition-colors">
              Learn More
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>

          <!-- About -->
          <div class="bg-gray-50 rounded-lg p-8">
            <h3 class="text-xl font-serif font-bold text-primary-900 mb-6">About MEYE Asset Management</h3>
            <p class="text-gray-600 leading-relaxed">
              Founded in 2010, MEYE Asset Management is a Quebec-based portfolio management firm with approximately $155 million in assets under management. The firm offers high-performing investment strategies to private management clients, advisors, brokers, and financial planners.
            </p>
            <a routerLink="/firm-profile" class="inline-flex items-center mt-6 text-primary-900 hover:text-accent-600 font-medium transition-colors">
              Learn More
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class PerformanceComponent {
  sectors = [
    { name: 'Consumer Staples', percentage: '0.0%' },
    { name: 'Consumer Discretionary', percentage: '0.0%' },
    { name: 'Energy', percentage: '0.0%' },
    { name: 'Financials', percentage: '20.7%' },
    { name: 'Real Estate', percentage: '24.4%' },
    { name: 'Industrials', percentage: '13.7%' },
    { name: 'Materials', percentage: '25.8%' },
    { name: 'Telecom Services', percentage: '0.0%' },
    { name: 'Utilities', percentage: '0.0%' },
    { name: 'Healthcare', percentage: '8.3%' },
    { name: 'Information Technology', percentage: '7.1%' }
  ];
}
