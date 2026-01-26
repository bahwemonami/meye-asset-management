import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      [class.bg-white]="isScrolled()"
      [class.shadow-soft]="isScrolled()"
      [class.bg-transparent]="!isScrolled()">
      <nav class="container-custom">
        <div class="flex items-center justify-between h-16 xs:h-18 sm:h-20">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center space-x-2 xs:space-x-3 group">
            <div class="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg xs:rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span class="text-white font-heading font-bold text-base xs:text-lg">M</span>
            </div>
            <div class="flex flex-col">
              <span class="font-heading font-bold text-base xs:text-lg tracking-tight"
                    [class.text-white]="!isScrolled()"
                    [class.text-primary-900]="isScrolled()">MEYE</span>
              <span class="text-xxs xs:text-xs font-medium tracking-widest uppercase hidden xs:block"
                    [class.text-primary-200]="!isScrolled()"
                    [class.text-primary-600]="isScrolled()">Asset Management</span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            @for (item of navItems; track item.path) {
              <a [routerLink]="item.path"
                 routerLinkActive="!text-accent-500"
                 [routerLinkActiveOptions]="{exact: item.path === '/'}"
                 class="px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium transition-colors duration-300 rounded-lg hover:bg-white/10"
                 [class.text-white]="!isScrolled()"
                 [class.hover:text-accent-400]="!isScrolled()"
                 [class.text-dark-700]="isScrolled()"
                 [class.hover:text-primary-800]="isScrolled()"
                 [class.hover:bg-primary-50]="isScrolled()">
                {{ item.label }}
              </a>
            }
          </div>

          <!-- CTA Button -->
          <div class="hidden lg:flex items-center space-x-4">
            <a routerLink="/contact" 
               class="btn-primary !py-2 !px-4 xl:!py-2.5 xl:!px-5 !text-xs xl:!text-sm">
              Get Started
              <svg class="w-3.5 h-3.5 xl:w-4 xl:h-4 ml-1.5 xl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            (click)="toggleMobileMenu()"
            class="lg:hidden p-1.5 xs:p-2 rounded-lg transition-colors duration-300"
            [class.text-white]="!isScrolled()"
            [class.text-primary-900]="isScrolled()"
            [class.hover:bg-white/10]="!isScrolled()"
            [class.hover:bg-primary-50]="isScrolled()"
            aria-label="Toggle menu">
            <svg class="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (!isMobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              }
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div 
        class="lg:hidden overflow-hidden transition-all duration-500 ease-in-out"
        [class.max-h-0]="!isMobileMenuOpen()"
        [class.max-h-screen]="isMobileMenuOpen()"
        [class.bg-white]="isMobileMenuOpen()">
        <div class="container-custom py-3 xs:py-4 space-y-1">
          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path"
               routerLinkActive="bg-primary-50 text-primary-800"
               [routerLinkActiveOptions]="{exact: item.path === '/'}"
               (click)="closeMobileMenu()"
               class="block px-3 xs:px-4 py-2.5 xs:py-3 text-dark-700 font-medium rounded-lg hover:bg-primary-50 transition-colors duration-300 text-sm xs:text-base">
              {{ item.label }}
            </a>
          }
          <div class="pt-3 xs:pt-4 border-t border-primary-100">
            <a routerLink="/contact" 
               (click)="closeMobileMenu()"
               class="btn-primary w-full justify-center !text-sm">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: ``
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Team', path: '/team' },
    { label: 'Services', path: '/services' },
    { label: 'Performance', path: '/performance' },
    { label: 'Digital Proof', path: '/digital-proof' },
    { label: 'Contact', path: '/contact' }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
