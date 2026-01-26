import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="relative py-24 xs:py-28 sm:py-32 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:24px_24px] xs:bg-[length:32px_32px] md:bg-[length:40px_40px]"></div>
      </div>
      
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block text-accent-400 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4 animate-fade-in">Performance</span>
          <h1 class="text-white mb-4 xs:mb-6 animate-fade-in-up">Our <span class="text-accent-400">Returns</span></h1>
          <p class="text-base xs:text-lg md:text-xl text-primary-200 animate-fade-in-up animate-delay-200">
            Track record of consistent performance across market cycles.
          </p>
        </div>
      </div>
    </section>

    <!-- Key Metrics -->
    <section class="py-10 xs:py-12 sm:py-16 bg-white border-b border-primary-100">
      <div class="container-custom">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
          @for (metric of keyMetrics; track metric.label; let i = $index) {
            <div class="text-center reveal" [style.animation-delay.ms]="i * 100">
              <div class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-1 xs:mb-2" [class]="metric.color">{{ metric.value }}</div>
              <div class="text-dark-500 text-xs xs:text-sm">{{ metric.label }}</div>
              @if (metric.subtext) {
                <div class="text-xxs xs:text-xs text-dark-400 mt-0.5 xs:mt-1">{{ metric.subtext }}</div>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Performance Chart -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-3 gap-6 xs:gap-8">
          <div class="lg:col-span-2 reveal">
            <h2 class="section-title mb-6 xs:mb-8">Historical <span class="gradient-text">Performance</span></h2>
            
            <!-- Chart Placeholder -->
            <div class="bg-primary-50 rounded-xl xs:rounded-2xl p-4 xs:p-6 md:p-8 h-64 xs:h-80 md:h-96 flex items-end">
              <div class="w-full flex items-end justify-between gap-1.5 xs:gap-2 md:gap-4 h-full">
                @for (bar of performanceData; track bar.year) {
                  <div class="flex-1 flex flex-col items-center">
                    <div class="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-md xs:rounded-t-lg transition-all duration-500 hover:from-accent-500 hover:to-accent-400"
                         [style.height.%]="bar.value * 3">
                    </div>
                    <div class="mt-2 xs:mt-3 text-xs xs:text-sm text-dark-600 font-medium">{{ bar.year }}</div>
                    <div class="text-xxs xs:text-xs text-dark-400">{{ bar.value }}%</div>
                  </div>
                }
              </div>
            </div>
            
            <p class="text-xs xs:text-sm text-dark-500 mt-3 xs:mt-4 italic">
              * Past performance is not indicative of future results. All returns shown are net of fees.
            </p>
          </div>
          
          <div class="reveal-right space-y-4 xs:space-y-6">
            <div class="card p-4 xs:p-5 md:p-6">
              <h3 class="text-base xs:text-lg font-semibold text-primary-900 mb-3 xs:mb-4">Performance Summary</h3>
              <div class="space-y-3 xs:space-y-4">
                @for (summary of performanceSummary; track summary.label) {
                  <div class="flex justify-between items-center py-1.5 xs:py-2 border-b border-primary-50 last:border-0">
                    <span class="text-dark-600 text-xs xs:text-sm">{{ summary.label }}</span>
                    <span class="font-semibold text-sm xs:text-base" [class]="summary.positive ? 'text-green-600' : 'text-primary-900'">{{ summary.value }}</span>
                  </div>
                }
              </div>
            </div>
            
            <div class="card-bordered p-4 xs:p-5 md:p-6">
              <h3 class="text-base xs:text-lg font-semibold text-primary-900 mb-3 xs:mb-4">Risk Metrics</h3>
              <div class="space-y-3 xs:space-y-4">
                @for (risk of riskMetrics; track risk.label) {
                  <div>
                    <div class="flex justify-between text-xs xs:text-sm mb-1">
                      <span class="text-dark-600">{{ risk.label }}</span>
                      <span class="font-medium text-primary-900">{{ risk.value }}</span>
                    </div>
                    <div class="h-1.5 xs:h-2 bg-primary-100 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                           [style.width.%]="risk.percentage"></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Strategy Performance -->
    <section class="section-padding bg-primary-50/50">
      <div class="container-custom">
        <div class="text-center mb-8 xs:mb-12 md:mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">By Strategy</span>
          <h2 class="section-title">Strategy <span class="gradient-text">Returns</span></h2>
          <p class="section-subtitle mx-auto">
            Performance breakdown by investment strategy.
          </p>
        </div>
        
        <div class="grid xs:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-6 md:gap-8">
          @for (strategy of strategyPerformance; track strategy.name; let i = $index) {
            <div class="card p-5 xs:p-6 md:p-8 reveal" [style.animation-delay.ms]="i * 100">
              <div class="flex items-center justify-between mb-4 xs:mb-6">
                <h3 class="text-base xs:text-lg font-semibold text-primary-900">{{ strategy.name }}</h3>
                <span class="px-2 py-0.5 xs:px-3 xs:py-1 rounded-full text-xxs xs:text-xs font-medium"
                      [class.bg-green-100]="strategy.risk === 'Low'"
                      [class.text-green-700]="strategy.risk === 'Low'"
                      [class.bg-yellow-100]="strategy.risk === 'Medium'"
                      [class.text-yellow-700]="strategy.risk === 'Medium'"
                      [class.bg-red-100]="strategy.risk === 'High'"
                      [class.text-red-700]="strategy.risk === 'High'">
                  {{ strategy.risk }}
                </span>
              </div>
              
              <div class="text-2xl xs:text-3xl md:text-4xl font-bold text-green-600 mb-1 xs:mb-2">{{ strategy.ytd }}</div>
              <div class="text-xs xs:text-sm text-dark-500 mb-4 xs:mb-6">YTD Return</div>
              
              <div class="space-y-2 xs:space-y-3">
                <div class="flex justify-between text-xs xs:text-sm">
                  <span class="text-dark-500">1 Year</span>
                  <span class="font-medium text-primary-900">{{ strategy.oneYear }}</span>
                </div>
                <div class="flex justify-between text-xs xs:text-sm">
                  <span class="text-dark-500">3 Year Ann.</span>
                  <span class="font-medium text-primary-900">{{ strategy.threeYear }}</span>
                </div>
                <div class="flex justify-between text-xs xs:text-sm">
                  <span class="text-dark-500">5 Year Ann.</span>
                  <span class="font-medium text-primary-900">{{ strategy.fiveYear }}</span>
                </div>
                <div class="flex justify-between text-xs xs:text-sm">
                  <span class="text-dark-500">Inception</span>
                  <span class="font-medium text-primary-900">{{ strategy.inception }}</span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Benchmarks -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-8 xs:mb-12 md:mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Comparison</span>
          <h2 class="section-title">Benchmark <span class="gradient-text">Comparison</span></h2>
        </div>
        
        <div class="overflow-x-auto reveal -mx-4 xs:mx-0">
          <div class="min-w-[600px] px-4 xs:px-0">
            <table class="w-full">
              <thead>
                <tr class="border-b-2 border-primary-100">
                  <th class="text-left py-3 xs:py-4 px-2 xs:px-4 font-semibold text-primary-900 text-xs xs:text-sm">Strategy/Index</th>
                  <th class="text-right py-3 xs:py-4 px-2 xs:px-4 font-semibold text-primary-900 text-xs xs:text-sm">YTD</th>
                  <th class="text-right py-3 xs:py-4 px-2 xs:px-4 font-semibold text-primary-900 text-xs xs:text-sm">1 Year</th>
                  <th class="text-right py-3 xs:py-4 px-2 xs:px-4 font-semibold text-primary-900 text-xs xs:text-sm">3 Year</th>
                  <th class="text-right py-3 xs:py-4 px-2 xs:px-4 font-semibold text-primary-900 text-xs xs:text-sm">5 Year</th>
                </tr>
              </thead>
              <tbody>
                @for (benchmark of benchmarks; track benchmark.name; let odd = $odd) {
                  <tr class="border-b border-primary-50" [class.bg-primary-50/50]="benchmark.isMeye">
                    <td class="py-3 xs:py-4 px-2 xs:px-4">
                      <span class="text-xs xs:text-sm" [class.font-semibold]="benchmark.isMeye" [class.text-primary-800]="benchmark.isMeye">
                        {{ benchmark.name }}
                      </span>
                      @if (benchmark.isMeye) {
                        <span class="ml-1 xs:ml-2 px-1.5 py-0.5 xs:px-2 bg-accent-100 text-accent-700 text-xxs xs:text-xs rounded">MEYE</span>
                      }
                    </td>
                    <td class="text-right py-3 xs:py-4 px-2 xs:px-4 text-xs xs:text-sm" [class.text-green-600]="isPositive(benchmark.ytd)">{{ benchmark.ytd }}</td>
                    <td class="text-right py-3 xs:py-4 px-2 xs:px-4 text-xs xs:text-sm" [class.text-green-600]="isPositive(benchmark.oneYear)">{{ benchmark.oneYear }}</td>
                    <td class="text-right py-3 xs:py-4 px-2 xs:px-4 text-xs xs:text-sm" [class.text-green-600]="isPositive(benchmark.threeYear)">{{ benchmark.threeYear }}</td>
                    <td class="text-right py-3 xs:py-4 px-2 xs:px-4 text-xs xs:text-sm" [class.text-green-600]="isPositive(benchmark.fiveYear)">{{ benchmark.fiveYear }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
        
        <p class="text-xs xs:text-sm text-dark-500 mt-4 xs:mt-6 text-center italic">
          Data as of December 31, 2025. Past performance does not guarantee future results.
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-gradient-to-br from-primary-900 to-primary-950">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto reveal">
          <h2 class="text-white mb-4 xs:mb-6">Ready to <span class="text-accent-400">Invest?</span></h2>
          <p class="text-primary-200 text-sm xs:text-base md:text-lg mb-6 xs:mb-8">
            Contact us to learn how MEYE can help you achieve superior returns.
          </p>
          <div class="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center">
            <a routerLink="/contact" class="btn-accent !px-6 !py-3 xs:!px-8 xs:!py-4">
              Schedule Consultation
              <svg class="w-4 h-4 xs:w-5 xs:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a routerLink="/services" class="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20 !px-6 !py-3 xs:!px-8 xs:!py-4">
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class PerformanceComponent implements AfterViewInit {
  keyMetrics = [
    { value: '+18.4%', label: '2025 Return', subtext: 'Net of fees', color: 'text-green-600' },
    { value: '+12.7%', label: 'Annualized Return', subtext: 'Since inception', color: 'text-green-600' },
    { value: '0.82', label: 'Sharpe Ratio', subtext: '5-year average', color: 'text-primary-900' },
    { value: '-11.2%', label: 'Max Drawdown', subtext: 'Since inception', color: 'text-primary-900' }
  ];

  performanceData = [
    { year: '2020', value: 14.2 },
    { year: '2021', value: 22.8 },
    { year: '2022', value: -8.4 },
    { year: '2023', value: 16.5 },
    { year: '2024', value: 19.2 },
    { year: '2025', value: 18.4 }
  ];

  performanceSummary = [
    { label: 'YTD Return', value: '+18.4%', positive: true },
    { label: '1 Year', value: '+18.4%', positive: true },
    { label: '3 Year Annualized', value: '+14.2%', positive: true },
    { label: '5 Year Annualized', value: '+12.7%', positive: true },
    { label: 'Since Inception', value: '+11.8%', positive: true }
  ];

  riskMetrics = [
    { label: 'Volatility', value: '12.4%', percentage: 62 },
    { label: 'Beta', value: '0.85', percentage: 85 },
    { label: 'Alpha', value: '3.2%', percentage: 80 },
    { label: 'Information Ratio', value: '0.72', percentage: 72 }
  ];

  strategyPerformance = [
    {
      name: 'Conservative',
      risk: 'Low',
      ytd: '+8.6%',
      oneYear: '+8.6%',
      threeYear: '+6.4%',
      fiveYear: '+5.8%',
      inception: '+6.2%'
    },
    {
      name: 'Balanced',
      risk: 'Medium',
      ytd: '+14.2%',
      oneYear: '+14.2%',
      threeYear: '+11.8%',
      fiveYear: '+10.4%',
      inception: '+9.8%'
    },
    {
      name: 'Aggressive',
      risk: 'High',
      ytd: '+22.8%',
      oneYear: '+22.8%',
      threeYear: '+18.6%',
      fiveYear: '+15.2%',
      inception: '+14.6%'
    }
  ];

  benchmarks = [
    { name: 'MEYE Balanced', ytd: '+14.2%', oneYear: '+14.2%', threeYear: '+11.8%', fiveYear: '+10.4%', isMeye: true },
    { name: 'S&P 500', ytd: '+12.4%', oneYear: '+12.4%', threeYear: '+9.2%', fiveYear: '+8.8%', isMeye: false },
    { name: 'MSCI World', ytd: '+11.8%', oneYear: '+11.8%', threeYear: '+8.6%', fiveYear: '+7.9%', isMeye: false },
    { name: '60/40 Portfolio', ytd: '+9.6%', oneYear: '+9.6%', threeYear: '+6.8%', fiveYear: '+6.2%', isMeye: false },
    { name: 'Bloomberg Agg', ytd: '+2.4%', oneYear: '+2.4%', threeYear: '+1.8%', fiveYear: '+2.1%', isMeye: false }
  ];

  isPositive(value: string): boolean {
    return value.startsWith('+');
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => observer.observe(el));
  }
}
