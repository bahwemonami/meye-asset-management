import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-private-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Private Management</h1>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Selector -->
        <div class="mb-12">
          <select 
            (change)="onSectionChange($event)"
            [value]="currentSection()"
            class="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg text-primary-900 font-medium focus:ring-2 focus:ring-accent-500 focus:border-accent-500">
            @for (section of sections; track section.id) {
              <option [value]="section.id">{{ section.title }}</option>
            }
          </select>
        </div>

        <!-- Dynamic Content -->
        <div class="grid lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2">
            <h2 class="text-2xl font-serif font-bold text-primary-900 mb-6">{{ getCurrentSectionTitle() }}</h2>
            
            @switch (currentSection()) {
              @case ('who') {
                <div class="space-y-6 text-gray-600">
                  <p>Private management is for clients with assets of more than $250,000 to invest who are looking for a complete and high-performance solution.</p>
                  
                  <h4 class="text-lg font-semibold text-primary-900 mt-8">Our clients include:</h4>
                  <ul class="list-disc list-inside space-y-2">
                    <li>Entrepreneurs and business executives</li>
                    <li>Professionals, artists, or athletes</li>
                    <li>Second-generation wealth holders</li>
                    <li>Institutions and private companies</li>
                    <li>Efficient savers</li>
                  </ul>

                  <h4 class="text-lg font-semibold text-primary-900 mt-8">Private management at MEYE offers you:</h4>
                  <ul class="list-disc list-inside space-y-2">
                    <li>Professional management</li>
                    <li>Alignment with a precise investment policy</li>
                    <li>Tax optimization</li>
                    <li>Detailed monthly reports</li>
                    <li>Advantageous management fees</li>
                    <li>Access to an external multidisciplinary team that can meet all your financial needs, including taxation and accounting</li>
                  </ul>

                  <p class="mt-8">Do not hesitate to contact us so that we can assess your financial situation and recommend a personalized solution that reflects your needs and investment objectives.</p>
                </div>
              }
              @case ('cycle') {
                <div class="space-y-6 text-gray-600">
                  <p>Our management cycle is a structured approach designed to optimize your investment experience:</p>
                  <ol class="list-decimal list-inside space-y-4">
                    <li><strong>Initial Assessment:</strong> Understanding your financial goals, risk tolerance, and investment horizon</li>
                    <li><strong>Strategy Development:</strong> Creating a customized investment policy aligned with your objectives</li>
                    <li><strong>Implementation:</strong> Executing the investment strategy with precision and care</li>
                    <li><strong>Monitoring:</strong> Continuous tracking of portfolio performance and market conditions</li>
                    <li><strong>Rebalancing:</strong> Regular adjustments to maintain optimal asset allocation</li>
                    <li><strong>Reporting:</strong> Detailed monthly statements and performance reviews</li>
                  </ol>
                </div>
              }
              @case ('philosophy') {
                <div class="space-y-6 text-gray-600">
                  <p>At MEYE Asset Management, we believe that the price of an asset is not always equal to its intrinsic value and that it is influenced by a multitude of factors, including investors' cognitive biases.</p>
                  <p>Since these biases are known and repeat over time, it is possible to make investment decisions based on these recurring behaviors.</p>
                  <p>We rely on strategies based on the momentum effect, including technical analysis and trend following. The manager uses a top-down approach by first establishing the sectors with the greatest upside potential and then selecting specific securities from these sectors.</p>
                </div>
              }
              @case ('methodology') {
                <div class="space-y-6 text-gray-600">
                  <p>Our investment methodology combines rigorous analysis with disciplined execution:</p>
                  <ul class="list-disc list-inside space-y-2">
                    <li>Macro-economic analysis to identify market trends</li>
                    <li>Sector rotation based on momentum indicators</li>
                    <li>Technical analysis for entry and exit points</li>
                    <li>Risk management through diversification and position sizing</li>
                    <li>Regular portfolio rebalancing</li>
                  </ul>
                </div>
              }
              @case ('strategies') {
                <div class="space-y-6 text-gray-600">
                  <p>We offer various investment strategies tailored to different client profiles:</p>
                  <ul class="list-disc list-inside space-y-2">
                    <li><strong>Growth Strategy:</strong> Focus on capital appreciation through equity investments</li>
                    <li><strong>Balanced Strategy:</strong> Mix of growth and income-producing assets</li>
                    <li><strong>Conservative Strategy:</strong> Emphasis on capital preservation with modest growth</li>
                    <li><strong>Alternative Strategies:</strong> Access to our specialized funds for qualified investors</li>
                  </ul>
                </div>
              }
              @case ('why') {
                <div class="space-y-6 text-gray-600">
                  <p>Why choose MEYE Asset Management?</p>
                  <ul class="list-disc list-inside space-y-2">
                    <li>Over 15 years of proven track record</li>
                    <li>Personalized service with direct access to portfolio managers</li>
                    <li>Transparent fee structure</li>
                    <li>Active management that adapts to market conditions</li>
                    <li>Comprehensive financial planning services</li>
                    <li>Strong focus on risk management</li>
                  </ul>
                </div>
              }
              @case ('cfa') {
                <div class="space-y-6 text-gray-600">
                  <p>The CFA (Chartered Financial Analyst) designation is the gold standard in investment management. Here's why choosing a CFA advisor matters:</p>
                  <ul class="list-disc list-inside space-y-2">
                    <li>Rigorous education covering investment analysis, portfolio management, and ethics</li>
                    <li>Commitment to the highest professional standards</li>
                    <li>Adherence to a strict code of ethics and professional conduct</li>
                    <li>Continuous professional development requirements</li>
                    <li>Global recognition of expertise</li>
                  </ul>
                </div>
              }
            }
          </div>

          <!-- Contact CTA -->
          <div>
            <div class="bg-gray-50 rounded-lg p-6 sticky top-32">
              <h3 class="text-lg font-semibold text-primary-900 mb-4">Ready to Get Started?</h3>
              <p class="text-gray-600 mb-6">Contact us to discuss how private management can work for you.</p>
              <a routerLink="/contact" class="inline-flex items-center bg-primary-900 text-white px-6 py-3 rounded hover:bg-primary-800 transition-colors w-full justify-center">
                Contact Us
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class PrivateManagementComponent implements OnInit {
  currentSection = signal('who');

  sections = [
    { id: 'who', title: 'Who Is Private Management For' },
    { id: 'cycle', title: 'Management Cycle' },
    { id: 'philosophy', title: 'Investment Philosophy' },
    { id: 'methodology', title: 'Management Methodology' },
    { id: 'strategies', title: 'Investment Strategies' },
    { id: 'why', title: 'Why MEYE?' },
    { id: 'cfa', title: 'Why Choose a CFA Advisor?' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['section']) {
        this.currentSection.set(params['section']);
      }
    });
  }

  onSectionChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.currentSection.set(select.value);
  }

  getCurrentSectionTitle(): string {
    return this.sections.find(s => s.id === this.currentSection())?.title || '';
  }
}
