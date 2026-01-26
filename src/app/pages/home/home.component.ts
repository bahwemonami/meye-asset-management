import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center bg-primary-950">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
             alt="Financial district" 
             class="w-full h-full object-cover opacity-40">
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="max-w-3xl">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8">
            Passion.<br>
            Rigor.<br>
            Results.
          </h1>
          <a routerLink="/firm-profile" 
             class="inline-flex items-center text-white border-b-2 border-white pb-1 hover:border-accent-400 hover:text-accent-400 transition-colors">
            Learn More
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 lg:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-8">Our Mission</h2>
            <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                MEYE Asset Management's mission is to offer personalized and innovative portfolio management, aligned with each investor's unique objectives.
              </p>
              <p>
                We favor active and disciplined management, with objectives to optimize performance and minimize risks.
              </p>
              <p>
                Making each relationship a lasting and fruitful partnership, prioritizing rigor, ethics, and transparency.
              </p>
            </div>
            <a routerLink="/firm-profile" 
               class="inline-flex items-center mt-8 text-primary-900 border-b-2 border-primary-900 pb-1 hover:border-accent-600 hover:text-accent-600 transition-colors font-medium">
              Learn More
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
          <div class="relative">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Professional team meeting" 
                 class="w-full rounded-lg shadow-xl">
          </div>
        </div>
      </div>
    </section>

    <!-- Team Preview Section -->
    <section class="relative">
      <a routerLink="/our-team" class="block relative group overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
             alt="Our team" 
             class="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105">
        <div class="absolute inset-0 bg-primary-950/60 flex items-center justify-center">
          <span class="text-white text-2xl md:text-3xl font-serif font-bold border-b-2 border-white pb-2 group-hover:border-accent-400 transition-colors">
            Discover the Team
          </span>
        </div>
      </a>
    </section>

    <!-- Performance Section -->
    <section class="py-20 lg:py-32 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-12">Performance</h2>
        <div class="bg-white/5 backdrop-blur rounded-lg p-8 md:p-12">
          <div class="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p class="text-4xl md:text-5xl font-bold text-accent-400 mb-2">18.2%</p>
              <p class="text-primary-300">YTD Return</p>
            </div>
            <div>
              <p class="text-4xl md:text-5xl font-bold text-accent-400 mb-2">14.1%</p>
              <p class="text-primary-300">5 Year Avg</p>
            </div>
            <div>
              <p class="text-4xl md:text-5xl font-bold text-accent-400 mb-2">12.8%</p>
              <p class="text-primary-300">Since Inception</p>
            </div>
            <div>
              <p class="text-4xl md:text-5xl font-bold text-accent-400 mb-2">$155M</p>
              <p class="text-primary-300">Assets Managed</p>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <a routerLink="/performance" 
             class="inline-flex items-center text-white border-b-2 border-white pb-1 hover:border-accent-400 hover:text-accent-400 transition-colors font-medium">
            Our Performance
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Communications Section -->
    <section class="py-20 lg:py-32 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-12">Communications</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          @for (letter of financialLetters; track letter.slug) {
            <a [routerLink]="['/communications', letter.slug]" 
               class="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div class="p-6">
                <span class="text-sm text-accent-600 font-medium">Financial Letter</span>
                <h3 class="text-xl font-serif font-bold text-primary-900 mt-2 group-hover:text-accent-600 transition-colors">
                  {{ letter.title }}
                </h3>
                <p class="text-gray-600 mt-3 text-sm line-clamp-3">{{ letter.excerpt }}</p>
              </div>
            </a>
          }
        </div>

        <div class="mt-10">
          <a routerLink="/communications" 
             class="inline-flex items-center text-primary-900 border-b-2 border-primary-900 pb-1 hover:border-accent-600 hover:text-accent-600 transition-colors font-medium">
            All Articles
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {
  financialLetters = [
    {
      slug: 'volume-16-number-3',
      title: 'Volume 16 Number 3',
      excerpt: 'The second quarter of 2025 was, for us, one of the most interesting and entertaining in recent years. In active management, the goal is to add value to portfolios.'
    },
    {
      slug: 'volume-16-number-2',
      title: 'Volume 16 Number 2',
      excerpt: 'Before diving into the main topic, I am pleased to announce that the first annual investor meeting for the Montreal region will take place on June 5th.'
    },
    {
      slug: 'volume-16-number-1',
      title: 'Volume 16 Number 1',
      excerpt: 'I delayed writing this communication as long as possible to include the very latest geopolitical events. Over the coming years, these will have major impacts on investment strategies.'
    }
  ];
}
