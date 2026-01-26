import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-primary-950 text-white">
      <!-- Main Footer -->
      <div class="container-custom section-padding">
        <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-8 xs:gap-10 lg:gap-8">
          <!-- Brand Column -->
          <div class="xs:col-span-2 lg:col-span-1">
            <a routerLink="/" class="flex items-center space-x-2 xs:space-x-3 mb-4 xs:mb-6">
              <div class="w-10 h-10 xs:w-12 xs:h-12 rounded-lg xs:rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                <span class="text-white font-heading font-bold text-lg xs:text-xl">M</span>
              </div>
              <div class="flex flex-col">
                <span class="font-heading font-bold text-lg xs:text-xl tracking-tight">MEYE</span>
                <span class="text-xxs xs:text-xs font-medium tracking-widest uppercase text-primary-400">Asset Management</span>
              </div>
            </a>
            <p class="text-primary-300 text-xs xs:text-sm leading-relaxed mb-4 xs:mb-6">
              Personalized and innovative portfolio management aligned with each investor's unique objectives.
            </p>
            <div class="flex space-x-3 xs:space-x-4">
              @for (social of socialLinks; track social.name) {
                <a [href]="social.url" 
                   target="_blank"
                   rel="noopener noreferrer"
                   class="w-9 h-9 xs:w-10 xs:h-10 rounded-lg bg-primary-800/50 flex items-center justify-center text-primary-400 hover:bg-accent-500 hover:text-white transition-all duration-300"
                   [attr.aria-label]="social.name">
                  <span [innerHTML]="social.icon" class="[&>svg]:w-4 [&>svg]:h-4 xs:[&>svg]:w-5 xs:[&>svg]:h-5"></span>
                </a>
              }
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-heading font-semibold text-base xs:text-lg mb-4 xs:mb-6">Quick Links</h4>
            <ul class="space-y-2 xs:space-y-3">
              @for (link of quickLinks; track link.path) {
                <li>
                  <a [routerLink]="link.path" 
                     class="text-primary-300 hover:text-accent-400 transition-colors duration-300 text-xs xs:text-sm">
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h4 class="font-heading font-semibold text-base xs:text-lg mb-4 xs:mb-6">Services</h4>
            <ul class="space-y-2 xs:space-y-3">
              @for (service of services; track service.label) {
                <li>
                  <a [routerLink]="service.path" 
                     class="text-primary-300 hover:text-accent-400 transition-colors duration-300 text-xs xs:text-sm">
                    {{ service.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="xs:col-span-2 lg:col-span-1">
            <h4 class="font-heading font-semibold text-base xs:text-lg mb-4 xs:mb-6">Newsletter</h4>
            <p class="text-primary-300 text-xs xs:text-sm mb-3 xs:mb-4">
              Subscribe to our newsletter for market insights and updates.
            </p>
            <form class="space-y-2 xs:space-y-3" (submit)="onNewsletterSubmit($event)">
              <div class="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  class="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-primary-800/50 border border-primary-700 rounded-lg text-white placeholder-primary-500 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all duration-300 text-xs xs:text-sm">
              </div>
              <button type="submit" class="btn-accent w-full !py-2.5 xs:!py-3 !text-xs xs:!text-sm">
                Subscribe
                <svg class="w-3.5 h-3.5 xs:w-4 xs:h-4 ml-1.5 xs:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-primary-800">
        <div class="container-custom py-4 xs:py-6">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-3 xs:space-y-4 md:space-y-0">
            <p class="text-primary-400 text-xs xs:text-sm text-center md:text-left">
              © {{ currentYear }} MEYE Asset Management. All rights reserved.
            </p>
            <div class="flex items-center flex-wrap justify-center gap-4 xs:gap-6">
              <a href="#" class="text-primary-400 hover:text-accent-400 text-xs xs:text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" class="text-primary-400 hover:text-accent-400 text-xs xs:text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" class="text-primary-400 hover:text-accent-400 text-xs xs:text-sm transition-colors duration-300">
                Legal Notice
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: ``
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Our Team', path: '/team' },
    { label: 'Performance', path: '/performance' },
    { label: 'Digital Proof', path: '/digital-proof' },
    { label: 'Contact', path: '/contact' }
  ];

  services = [
    { label: 'Private Wealth Management', path: '/services' },
    { label: 'Investment Philosophy', path: '/services' },
    { label: 'Portfolio Management', path: '/services' },
    { label: 'Digital Proof of Control', path: '/digital-proof' }
  ];

  socialLinks = [
    { 
      name: 'LinkedIn', 
      url: '#',
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
    },
    { 
      name: 'Twitter', 
      url: '#',
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
    },
    { 
      name: 'Email', 
      url: 'mailto:contact@meye-am.com',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'
    }
  ];

  onNewsletterSubmit(event: Event) {
    event.preventDefault();
    console.log('Newsletter subscription submitted');
  }
}
