import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:24px_24px] xs:bg-[length:32px_32px] md:bg-[length:40px_40px]"></div>
      </div>
      
      <!-- Animated Gradient Orbs - Hidden on mobile for performance -->
      <div class="hidden sm:block absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="hidden sm:block absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow animate-delay-500"></div>
      
      <div class="container-custom relative z-10 pt-24 pb-12 xs:pt-28 sm:pt-20">
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <!-- Hero Content -->
          <div class="text-center lg:text-left">
            <div class="inline-flex items-center px-3 py-1.5 xs:px-4 xs:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 xs:mb-8 animate-fade-in">
              <span class="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-accent-400 rounded-full animate-pulse mr-2 xs:mr-3"></span>
              <span class="text-primary-200 text-xs xs:text-sm font-medium">Trusted by Institutional Investors</span>
            </div>
            
            <h1 class="text-white mb-4 xs:mb-6 animate-fade-in-up">
              <span class="block">Passion.</span>
              <span class="block">Rigor.</span>
              <span class="block text-accent-400">Results.</span>
            </h1>
            
            <p class="text-base xs:text-lg md:text-xl text-primary-200 mb-6 xs:mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animate-delay-200 px-2 xs:px-0">
              Personalized and innovative portfolio management, aligned with each investor's unique objectives. We favor active, disciplined management.
            </p>
            
            <div class="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center lg:justify-start animate-fade-in-up animate-delay-300 px-4 xs:px-0">
              <a routerLink="/contact" class="btn-accent !px-6 !py-3 xs:!px-8 xs:!py-4">
                Become a Client
                <svg class="w-4 h-4 xs:w-5 xs:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a routerLink="/services" class="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20 !px-6 !py-3 xs:!px-8 xs:!py-4">
                Learn More
              </a>
            </div>
          </div>
          
          <!-- Hero Visual - Hidden on mobile, shown on lg -->
          <div class="hidden lg:block relative animate-fade-in animate-delay-400">
            <div class="relative">
              <!-- Main Card -->
              <div class="bg-white/10 backdrop-blur-xl rounded-2xl xl:rounded-3xl p-6 xl:p-8 border border-white/20 shadow-2xl">
                <div class="flex items-center justify-between mb-4 xl:mb-6">
                  <div>
                    <p class="text-primary-300 text-xs xl:text-sm">Total Portfolio Value</p>
                    <p class="text-2xl xl:text-3xl font-bold text-white">$12.4M</p>
                  </div>
                  <div class="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5 xl:w-6 xl:h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                </div>
                
                <!-- Chart Placeholder -->
                <div class="h-36 xl:h-48 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-xl flex items-end justify-around p-3 xl:p-4">
                  @for (bar of chartBars; track bar.height) {
                    <div class="w-6 xl:w-8 bg-gradient-to-t from-accent-500 to-accent-400 rounded-t-lg transition-all duration-500"
                         [style.height.%]="bar.height"></div>
                  }
                </div>
                
                <div class="flex justify-between mt-3 xl:mt-4 text-xs xl:text-sm text-primary-300">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Sep</span>
                  <span>Nov</span>
                </div>
              </div>
              
              <!-- Floating Stats Cards -->
              <div class="absolute -top-4 -right-4 xl:-top-6 xl:-right-6 bg-white rounded-lg xl:rounded-xl p-3 xl:p-4 shadow-elegant animate-float">
                <div class="flex items-center space-x-2 xl:space-x-3">
                  <div class="w-8 h-8 xl:w-10 xl:h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg class="w-4 h-4 xl:w-5 xl:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xxs xl:text-xs text-dark-500">Annual Return</p>
                    <p class="font-bold text-green-600 text-sm xl:text-base">+18.4%</p>
                  </div>
                </div>
              </div>
              
              <div class="absolute -bottom-4 -left-4 xl:-bottom-6 xl:-left-6 bg-white rounded-lg xl:rounded-xl p-3 xl:p-4 shadow-elegant animate-float animate-delay-300">
                <div class="flex items-center space-x-2 xl:space-x-3">
                  <div class="w-8 h-8 xl:w-10 xl:h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg class="w-4 h-4 xl:w-5 xl:h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xxs xl:text-xs text-dark-500">Active Clients</p>
                    <p class="font-bold text-primary-800 text-sm xl:text-base">240+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-4 xs:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-5 h-5 xs:w-6 xs:h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="section-padding bg-white" #revealSection>
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div class="reveal order-2 lg:order-1">
            <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Our Mission</span>
            <h2 class="section-title">Building Wealth with <span class="gradient-text">Purpose & Precision</span></h2>
            <p class="section-subtitle mb-6 xs:mb-8">
              MEYE Asset Management's mission is to provide personalized and innovative portfolio management, aligned with each investor's unique objectives.
            </p>
            <div class="space-y-3 xs:space-y-4">
              @for (point of missionPoints; track point.title) {
                <div class="flex items-start space-x-3 xs:space-x-4">
                  <div class="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5 xs:mt-1">
                    <svg class="w-4 h-4 xs:w-5 xs:h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-primary-900 mb-0.5 xs:mb-1 text-sm xs:text-base">{{ point.title }}</h4>
                    <p class="text-dark-500 text-xs xs:text-sm">{{ point.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
          
          <div class="reveal-right order-1 lg:order-2">
            <div class="relative">
              <div class="aspect-square rounded-2xl xs:rounded-3xl bg-gradient-to-br from-primary-100 to-primary-50 p-4 xs:p-6 md:p-8">
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="Professional wealth management"
                     class="w-full h-full object-cover rounded-xl xs:rounded-2xl shadow-elegant">
              </div>
              <div class="absolute -bottom-4 -left-4 xs:-bottom-6 xs:-left-6 md:-bottom-8 md:-left-8 bg-white rounded-xl xs:rounded-2xl p-4 xs:p-5 md:p-6 shadow-elegant max-w-[200px] xs:max-w-xs">
                <div class="flex items-center space-x-3 xs:space-x-4 mb-2 xs:mb-3">
                  <div class="w-10 h-10 xs:w-12 xs:h-12 rounded-lg xs:rounded-xl bg-accent-100 flex items-center justify-center">
                    <svg class="w-5 h-5 xs:w-6 xs:h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xxs xs:text-xs text-dark-500">Trust Score</p>
                    <p class="font-bold text-primary-900 text-lg xs:text-xl">98.7%</p>
                  </div>
                </div>
                <p class="text-xs xs:text-sm text-dark-600 hidden xs:block">Based on client satisfaction and verification rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-10 xs:py-12 sm:py-16 bg-primary-900">
      <div class="container-custom">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
          @for (stat of stats; track stat.label; let i = $index) {
            <div class="text-center reveal" [style.animation-delay.ms]="i * 100">
              <div class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 xs:mb-2">{{ stat.value }}</div>
              <div class="text-primary-300 text-xs xs:text-sm">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section-padding bg-primary-50/50">
      <div class="container-custom">
        <div class="text-center mb-8 xs:mb-12 md:mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Our Services</span>
          <h2 class="section-title">Comprehensive <span class="gradient-text">Wealth Solutions</span></h2>
          <p class="section-subtitle mx-auto">
            Tailored investment strategies designed to meet your financial goals with discipline and expertise.
          </p>
        </div>
        
        <div class="grid xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 md:gap-8">
          @for (service of services; track service.title; let i = $index) {
            <div class="card p-5 xs:p-6 md:p-8 group hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500 reveal" 
                 [style.animation-delay.ms]="i * 100">
              <div class="w-11 h-11 xs:w-12 xs:h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-4 xs:mb-5 md:mb-6 group-hover:from-accent-100 group-hover:to-accent-50 transition-colors duration-300">
                <span [innerHTML]="service.icon" class="text-primary-600 group-hover:text-accent-600 transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5 xs:[&>svg]:w-6 xs:[&>svg]:h-6 md:[&>svg]:w-7 md:[&>svg]:h-7"></span>
              </div>
              <h3 class="text-base xs:text-lg md:text-xl font-semibold text-primary-900 mb-2 xs:mb-3">{{ service.title }}</h3>
              <p class="text-dark-500 mb-4 xs:mb-5 md:mb-6 text-xs xs:text-sm">{{ service.description }}</p>
              <a [routerLink]="service.link" class="inline-flex items-center text-primary-700 font-medium text-xs xs:text-sm group-hover:text-accent-600 transition-colors duration-300">
                Learn more
                <svg class="w-3.5 h-3.5 xs:w-4 xs:h-4 ml-1.5 xs:ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Digital Proof Section -->
    <section class="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-48 h-48 xs:w-64 xs:h-64 md:w-96 md:h-96 bg-accent-500 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 xs:w-64 xs:h-64 md:w-96 md:h-96 bg-primary-500 rounded-full blur-3xl"></div>
      </div>
      
      <div class="container-custom relative z-10">
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div class="reveal">
            <span class="inline-block text-accent-400 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Innovation</span>
            <h2 class="text-white mb-4 xs:mb-6">Digital Proof <span class="text-accent-400">of Control</span></h2>
            <p class="text-primary-200 text-sm xs:text-base md:text-lg mb-6 xs:mb-8">
              A modern documentation tool for compliance and transparency. Generate secure, auditable digital records for institutional and legal requirements.
            </p>
            
            <div class="space-y-3 xs:space-y-4 mb-6 xs:mb-8">
              @for (feature of digitalProofFeatures; track feature) {
                <div class="flex items-center space-x-2 xs:space-x-3">
                  <div class="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 xs:w-4 xs:h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-primary-100 text-xs xs:text-sm md:text-base">{{ feature }}</span>
                </div>
              }
            </div>
            
            <div class="flex flex-col xs:flex-row gap-3 xs:gap-4">
              <a routerLink="/digital-proof" class="btn-accent">
                Learn More
                <svg class="w-4 h-4 xs:w-5 xs:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a routerLink="/contact" class="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20">
                Request Demo
              </a>
            </div>
          </div>
          
          <div class="reveal-right">
            <!-- Digital Certificate Preview -->
            <div class="bg-white/10 backdrop-blur-xl rounded-2xl xs:rounded-3xl p-5 xs:p-6 md:p-8 border border-white/20">
              <div class="flex items-center justify-between mb-5 xs:mb-6 md:mb-8">
                <div class="flex items-center space-x-2 xs:space-x-3">
                  <div class="w-10 h-10 xs:w-12 xs:h-12 rounded-lg xs:rounded-xl bg-accent-500 flex items-center justify-center">
                    <svg class="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-white font-semibold text-sm xs:text-base">Digital Certificate</p>
                    <p class="text-primary-300 text-xs xs:text-sm">Proof of Control</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 xs:px-3 xs:py-1 bg-green-500/20 text-green-400 text-xs xs:text-sm font-medium rounded-full">Verified</span>
              </div>
              
              <div class="space-y-3 xs:space-y-4 text-xs xs:text-sm">
                <div class="flex justify-between py-2 xs:py-3 border-b border-white/10">
                  <span class="text-primary-300">Certificate ID</span>
                  <span class="text-white font-mono text-xs">MEYE-2026-001</span>
                </div>
                <div class="flex justify-between py-2 xs:py-3 border-b border-white/10">
                  <span class="text-primary-300">Issue Date</span>
                  <span class="text-white text-xs xs:text-sm">January 26, 2026</span>
                </div>
                <div class="flex justify-between py-2 xs:py-3 border-b border-white/10">
                  <span class="text-primary-300">Status</span>
                  <span class="text-green-400">Active</span>
                </div>
                <div class="flex justify-between py-2 xs:py-3">
                  <span class="text-primary-300">Validation Hash</span>
                  <span class="text-white font-mono text-xxs xs:text-xs">0x8f7...3a2b</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="relative bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl xs:rounded-3xl p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 overflow-hidden reveal-scale">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:16px_16px] xs:bg-[length:20px_20px]"></div>
          </div>
          
          <div class="relative z-10 text-center max-w-3xl mx-auto">
            <h2 class="text-white mb-4 xs:mb-6">Ready to <span class="text-accent-400">Take Action?</span></h2>
            <p class="text-primary-200 text-sm xs:text-base md:text-lg mb-6 xs:mb-8 px-2 xs:px-0">
              Join our community of sophisticated investors and experience world-class portfolio management tailored to your unique needs.
            </p>
            <div class="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center">
              <a routerLink="/contact" class="btn-accent !px-6 !py-3 xs:!px-8 xs:!py-4">
                Become a Client
                <svg class="w-4 h-4 xs:w-5 xs:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a routerLink="/services" class="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20 !px-6 !py-3 xs:!px-8 xs:!py-4">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef>;

  chartBars = [
    { height: 60 },
    { height: 45 },
    { height: 75 },
    { height: 55 },
    { height: 85 },
    { height: 70 }
  ];

  missionPoints = [
    {
      title: 'Active & Disciplined Management',
      description: 'We optimize performance and minimize risks through rigorous, data-driven strategies.'
    },
    {
      title: 'Long-term Partnership',
      description: 'Building lasting, fruitful relationships based on integrity, ethics, and transparency.'
    },
    {
      title: 'Personalized Approach',
      description: 'Each portfolio is tailored to meet your specific financial objectives and risk tolerance.'
    }
  ];

  stats = [
    { value: '$2.4B+', label: 'Assets Under Management' },
    { value: '15+', label: 'Years of Excellence' },
    { value: '240+', label: 'Satisfied Clients' },
    { value: '98.7%', label: 'Client Retention Rate' }
  ];

  services = [
    {
      title: 'Private Wealth Management',
      description: 'Comprehensive portfolio management tailored to high-net-worth individuals and families.',
      link: '/services',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    },
    {
      title: 'Investment Strategy',
      description: 'Data-driven investment strategies designed to maximize returns while managing risk.',
      link: '/services',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>'
    },
    {
      title: 'Financial Planning',
      description: 'Holistic financial planning to secure your future and achieve your life goals.',
      link: '/services',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>'
    },
    {
      title: 'Digital Proof of Control',
      description: 'Modern documentation tool for compliance, providing secure audit-ready digital records.',
      link: '/digital-proof',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
    },
    {
      title: 'Risk Management',
      description: 'Sophisticated risk assessment and mitigation strategies to protect your assets.',
      link: '/services',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"/></svg>'
    },
    {
      title: 'Compliance Solutions',
      description: 'Comprehensive compliance documentation and reporting for institutional clients.',
      link: '/digital-proof',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>'
    }
  ];

  digitalProofFeatures = [
    'Audit-ready documentation for compliance teams',
    'Secure cryptographic proof generation',
    'No custody of funds - complete security',
    'Institutional-grade verification standards',
    'Real-time status tracking and updates'
  ];

  ngOnInit() {}

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

    // Observe all elements with reveal classes
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });
  }
}
