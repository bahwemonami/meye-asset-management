import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-access',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center bg-primary-950">
      <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Client Access</h1>
        <p class="text-xl text-primary-200 mb-8">
          Our secure client portal is coming soon. In the meantime, please contact us directly for account information.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/contact" 
             class="inline-flex items-center justify-center bg-accent-600 text-white px-6 py-3 rounded hover:bg-accent-700 transition-colors font-medium">
            Contact Us
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <a routerLink="/" 
             class="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded hover:bg-white hover:text-primary-900 transition-colors font-medium">
            Return Home
          </a>
        </div>
      </div>
    </section>
  `
})
export class ClientAccessComponent {}
