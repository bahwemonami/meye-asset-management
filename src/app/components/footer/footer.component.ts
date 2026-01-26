import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <!-- Newsletter Section -->
    <section class="relative py-20 bg-primary-900">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
             alt="Financial district" 
             class="w-full h-full object-cover opacity-20">
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-2xl md:text-3xl font-serif font-bold text-white mb-6">
              Subscribe to Our Financial Letter
            </h2>
            <form (ngSubmit)="onNewsletterSubmit()" class="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                [(ngModel)]="newsletterEmail"
                name="email"
                placeholder="Email Address"
                class="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-accent-500"
                required>
              <button 
                type="submit"
                class="bg-accent-600 text-white px-6 py-3 rounded-lg hover:bg-accent-700 transition-colors font-medium whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
          <div class="text-center lg:text-right">
            <h3 class="text-2xl font-serif font-bold text-white mb-4">
              Take action, become a client.
            </h3>
            <a routerLink="/become-client" 
               class="inline-flex items-center text-white border-b-2 border-white pb-1 hover:border-accent-400 hover:text-accent-400 transition-colors font-medium">
              Learn More
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Links -->
    <footer class="bg-primary-950 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
          <!-- Logo -->
          <a routerLink="/" class="font-serif text-2xl font-bold text-white">
            MEYE
          </a>

          <!-- Navigation -->
          <nav class="flex flex-wrap justify-center gap-6">
            <a routerLink="/private-management" class="text-primary-300 hover:text-white transition-colors">
              Private Management
            </a>
            <a routerLink="/performance" class="text-primary-300 hover:text-white transition-colors">
              Performance
            </a>
            <a routerLink="/alternative-funds" class="text-primary-300 hover:text-white transition-colors">
              Alternative Funds
            </a>
            <a routerLink="/contact" class="text-primary-300 hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          <!-- Social & Login -->
          <div class="flex items-center gap-4">
            <!-- Social Links -->
            <a href="#" class="text-primary-400 hover:text-white transition-colors" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="text-primary-400 hover:text-white transition-colors" aria-label="YouTube">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" class="text-primary-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <!-- Login Button -->
            <a href="#" class="text-primary-300 hover:text-white transition-colors ml-4">
              Login
            </a>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-8 pt-8 border-t border-primary-800 text-center">
          <p class="text-primary-400 text-sm">
            © {{ currentYear }}, MEYE Asset Management. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  newsletterEmail = '';

  onNewsletterSubmit() {
    console.log('Newsletter subscription:', this.newsletterEmail);
    alert('Thank you for subscribing to our financial letter!');
    this.newsletterEmail = '';
  }
}
