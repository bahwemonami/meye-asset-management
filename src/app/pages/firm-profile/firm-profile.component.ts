import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-firm-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Firm Profile</h1>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded in 2010, MEYE Asset Management is a portfolio management firm offering both traditional and innovative investment strategies to investors.
              </p>
              <p>
                Our objective is to maximize potential returns according to each client's risk profile, while maintaining particular attention to effective volatility management.
              </p>
              <p>
                We also offer comprehensive financial planning services to ensure goal achievement and wealth protection.
              </p>
              <p>
                Contact us to fully benefit from truly active management of your investments.
              </p>
            </div>
            <a routerLink="/contact" 
               class="inline-flex items-center mt-8 bg-primary-900 text-white px-6 py-3 rounded hover:bg-primary-800 transition-colors font-medium">
              Contact Us
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Modern office building" 
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
  `
})
export class FirmProfileComponent {}
