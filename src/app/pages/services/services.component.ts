import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
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
          <span class="inline-block text-accent-400 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4 animate-fade-in">Our Services</span>
          <h1 class="text-white mb-4 xs:mb-6 animate-fade-in-up">Private Wealth <span class="text-accent-400">Management</span></h1>
          <p class="text-base xs:text-lg md:text-xl text-primary-200 animate-fade-in-up animate-delay-200">
            Comprehensive investment solutions tailored to your unique financial goals and risk profile.
          </p>
        </div>
      </div>
    </section>

    <!-- Who We Serve -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div class="reveal">
            <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Who We Serve</span>
            <h2 class="section-title">Designed for <span class="gradient-text">Discerning Investors</span></h2>
            <p class="text-dark-600 text-sm xs:text-base md:text-lg mb-4 xs:mb-6">
              Our private wealth management services are designed for high-net-worth individuals, families, and institutions who demand excellence in portfolio management.
            </p>
            <div class="space-y-3 xs:space-y-4">
              @for (client of clientTypes; track client.title) {
                <div class="flex items-start space-x-3 xs:space-x-4">
                  <div class="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span [innerHTML]="client.icon" class="text-primary-600 [&>svg]:w-4 [&>svg]:h-4 xs:[&>svg]:w-5 xs:[&>svg]:h-5"></span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-primary-900 text-sm xs:text-base">{{ client.title }}</h4>
                    <p class="text-dark-500 text-xs xs:text-sm">{{ client.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
          
          <div class="reveal-right">
            <img src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Wealth Management" class="rounded-xl xs:rounded-2xl shadow-elegant">
          </div>
        </div>
      </div>
    </section>

    <!-- Management Cycle -->
    <section class="section-padding bg-primary-50/50">
      <div class="container-custom">
        <div class="text-center mb-8 xs:mb-12 md:mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Our Process</span>
          <h2 class="section-title">The Management <span class="gradient-text">Cycle</span></h2>
          <p class="section-subtitle mx-auto">
            A disciplined, systematic approach to managing your wealth through every market condition.
          </p>
        </div>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-8">
          @for (step of managementCycle; track step.title; let i = $index) {
            <div class="relative reveal" [style.animation-delay.ms]="i * 100">
              @if (i < managementCycle.length - 1) {
                <div class="hidden lg:block absolute top-10 xs:top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-primary-200 -z-10"></div>
              }
              <div class="card p-4 xs:p-5 md:p-6 text-center h-full">
                <div class="w-10 h-10 xs:w-12 xs:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center mx-auto mb-3 xs:mb-4 text-white font-bold text-sm xs:text-base md:text-lg shadow-lg">
                  {{ i + 1 }}
                </div>
                <h3 class="text-sm xs:text-base md:text-lg font-semibold text-primary-900 mb-1 xs:mb-2">{{ step.title }}</h3>
                <p class="text-dark-500 text-xs xs:text-sm">{{ step.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Investment Philosophy -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div class="order-2 lg:order-1 reveal-left">
            <div class="grid grid-cols-2 gap-3 xs:gap-4">
              @for (stat of philosophyStats; track stat.label; let i = $index) {
                <div class="card p-4 xs:p-5 md:p-6 text-center" [class.mt-6]="i % 2 === 1" [class.xs:mt-8]="i % 2 === 1">
                  <div class="text-xl xs:text-2xl md:text-3xl font-bold text-primary-900 mb-0.5 xs:mb-1">{{ stat.value }}</div>
                  <div class="text-dark-500 text-xs xs:text-sm">{{ stat.label }}</div>
                </div>
              }
            </div>
          </div>
          
          <div class="order-1 lg:order-2 reveal">
            <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Philosophy</span>
            <h2 class="section-title">Our Investment <span class="gradient-text">Philosophy</span></h2>
            <p class="text-dark-600 text-sm xs:text-base md:text-lg mb-4 xs:mb-6">
              We favor active, disciplined management with the objectives of optimizing performance and minimizing risks.
            </p>
            <div class="space-y-3 xs:space-y-4">
              @for (principle of principles; track principle) {
                <div class="flex items-center space-x-2 xs:space-x-3">
                  <div class="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 xs:w-4 xs:h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-dark-700 text-xs xs:text-sm md:text-base">{{ principle }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Strategies -->
    <section class="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-48 h-48 xs:w-64 xs:h-64 md:w-96 md:h-96 bg-accent-500 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 xs:w-64 xs:h-64 md:w-96 md:h-96 bg-primary-500 rounded-full blur-3xl"></div>
      </div>
      
      <div class="container-custom relative z-10">
        <div class="text-center mb-8 xs:mb-12 md:mb-16 reveal">
          <span class="inline-block text-accent-400 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Strategies</span>
          <h2 class="text-white mb-3 xs:mb-4">Investment <span class="text-accent-400">Strategies</span></h2>
          <p class="text-primary-200 text-sm xs:text-base md:text-lg max-w-2xl mx-auto">
            Tailored strategies to match your investment objectives and risk tolerance.
          </p>
        </div>
        
        <div class="grid xs:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-6 md:gap-8">
          @for (strategy of strategies; track strategy.title; let i = $index) {
            <div class="bg-white/10 backdrop-blur-lg rounded-xl xs:rounded-2xl p-5 xs:p-6 md:p-8 border border-white/10 hover:-translate-y-1 transition-all duration-300 reveal" 
                 [style.animation-delay.ms]="i * 100">
              <div class="w-10 h-10 xs:w-12 xs:h-12 rounded-lg xs:rounded-xl bg-accent-500/20 flex items-center justify-center mb-4 xs:mb-5 md:mb-6">
                <span [innerHTML]="strategy.icon" class="text-accent-400 [&>svg]:w-5 [&>svg]:h-5 xs:[&>svg]:w-6 xs:[&>svg]:h-6"></span>
              </div>
              <h3 class="text-base xs:text-lg md:text-xl font-semibold text-white mb-2 xs:mb-3">{{ strategy.title }}</h3>
              <p class="text-primary-200 text-xs xs:text-sm mb-3 xs:mb-4">{{ strategy.description }}</p>
              <div class="flex items-center justify-between text-xs xs:text-sm">
                <span class="text-primary-300">Risk Level</span>
                <span class="text-accent-400 font-medium">{{ strategy.riskLevel }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-8 xs:mb-12 md:mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Advantages</span>
          <h2 class="section-title">Why Choose <span class="gradient-text">MEYE?</span></h2>
        </div>
        
        <div class="grid xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 md:gap-8">
          @for (advantage of advantages; track advantage.title; let i = $index) {
            <div class="card-bordered p-5 xs:p-6 md:p-8 hover:-translate-y-1 transition-all duration-300 reveal" 
                 [style.animation-delay.ms]="i * 100">
              <div class="w-10 h-10 xs:w-12 xs:h-12 rounded-lg xs:rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-4 xs:mb-5 md:mb-6">
                <span [innerHTML]="advantage.icon" class="text-primary-600 [&>svg]:w-5 [&>svg]:h-5 xs:[&>svg]:w-6 xs:[&>svg]:h-6"></span>
              </div>
              <h3 class="text-sm xs:text-base md:text-lg font-semibold text-primary-900 mb-2 xs:mb-3">{{ advantage.title }}</h3>
              <p class="text-dark-500 text-xs xs:text-sm">{{ advantage.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-primary-50/50">
      <div class="container-custom">
        <div class="relative bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl xs:rounded-3xl p-6 xs:p-8 md:p-12 lg:p-16 overflow-hidden text-center reveal-scale">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:16px_16px] xs:bg-[length:20px_20px]"></div>
          </div>
          
          <div class="relative z-10 max-w-2xl mx-auto">
            <h2 class="text-white mb-4 xs:mb-6">Ready to <span class="text-accent-400">Get Started?</span></h2>
            <p class="text-primary-200 text-sm xs:text-base md:text-lg mb-6 xs:mb-8">
              Schedule a consultation with our team to discuss how we can help you achieve your financial goals.
            </p>
            <a routerLink="/contact" class="btn-accent !px-6 !py-3 xs:!px-8 xs:!py-4">
              Schedule Consultation
              <svg class="w-4 h-4 xs:w-5 xs:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class ServicesComponent implements AfterViewInit {
  clientTypes = [
    {
      title: 'High-Net-Worth Individuals',
      description: 'Sophisticated investors seeking personalized portfolio management.',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>'
    },
    {
      title: 'Family Offices',
      description: 'Multi-generational wealth management and succession planning.',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
    },
    {
      title: 'Institutional Investors',
      description: 'Comprehensive solutions for foundations, endowments, and corporations.',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>'
    }
  ];

  managementCycle = [
    { title: 'Assessment', description: 'Understand your goals, risk tolerance, and investment horizon.' },
    { title: 'Strategy', description: 'Develop a customized investment strategy aligned with your objectives.' },
    { title: 'Implementation', description: 'Execute the strategy with precision and discipline.' },
    { title: 'Monitoring', description: 'Continuous oversight and rebalancing to optimize performance.' }
  ];

  philosophyStats = [
    { value: '18.4%', label: 'Avg. Annual Return' },
    { value: '0.8', label: 'Sharpe Ratio' },
    { value: '12%', label: 'Max Drawdown' },
    { value: '98.7%', label: 'Client Retention' }
  ];

  principles = [
    'Long-term value creation over short-term gains',
    'Rigorous fundamental analysis and due diligence',
    'Diversification across asset classes and geographies',
    'Active risk management and downside protection',
    'Transparent communication and reporting'
  ];

  strategies = [
    {
      title: 'Conservative Growth',
      description: 'Focused on capital preservation with moderate growth potential through high-quality bonds and dividend stocks.',
      riskLevel: 'Low',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
    },
    {
      title: 'Balanced Portfolio',
      description: 'Optimal blend of equities and fixed income for steady growth with manageable volatility.',
      riskLevel: 'Medium',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>'
    },
    {
      title: 'Aggressive Growth',
      description: 'Maximum capital appreciation through concentrated equity positions and alternative investments.',
      riskLevel: 'High',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>'
    }
  ];

  advantages = [
    {
      title: 'CFA Certified Advisors',
      description: 'Our team holds the highest professional certifications in the industry.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>'
    },
    {
      title: 'Personalized Approach',
      description: 'Every portfolio is tailored to your unique objectives and circumstances.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    },
    {
      title: 'Transparent Fees',
      description: 'Clear, competitive fee structure with no hidden charges.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'
    },
    {
      title: 'Advanced Technology',
      description: 'Cutting-edge tools for portfolio analysis and risk management.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'
    },
    {
      title: 'Direct Access',
      description: 'Direct communication with your dedicated portfolio manager.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>'
    },
    {
      title: 'Comprehensive Reporting',
      description: 'Detailed performance reports and market insights delivered regularly.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>'
    }
  ];

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
