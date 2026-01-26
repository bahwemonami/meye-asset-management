import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Fixed Header -->
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.bg-white]="isScrolled()"
      [class.shadow-md]="isScrolled()"
      [class.bg-transparent]="!isScrolled()">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center">
            <span class="font-serif text-2xl font-bold tracking-tight"
                  [class.text-white]="!isScrolled()"
                  [class.text-primary-900]="isScrolled()">
              MEYE
            </span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-1">
            <!-- Language Toggle -->
            <button class="px-3 py-2 text-sm font-medium transition-colors"
                    [class.text-white]="!isScrolled()"
                    [class.text-primary-700]="isScrolled()">
              En
            </button>

            <!-- Menu Button -->
            <button 
              (click)="toggleMenu()"
              class="p-2 transition-colors"
              [class.text-white]="!isScrolled()"
              [class.text-primary-900]="isScrolled()">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                @if (!isMenuOpen()) {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                } @else {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                }
              </svg>
            </button>
          </nav>

          <!-- Mobile Menu Button -->
          <button 
            (click)="toggleMenu()"
            class="lg:hidden p-2"
            [class.text-white]="!isScrolled()"
            [class.text-primary-900]="isScrolled()">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (!isMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              }
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Floating CTA Button -->
    <a routerLink="/become-client" 
       class="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-accent-600 hover:bg-accent-700 text-white px-4 py-3 rounded-l-lg shadow-lg transition-all duration-300 writing-mode-vertical hidden md:flex items-center"
       style="writing-mode: vertical-rl; text-orientation: mixed;">
      <span class="text-sm font-medium tracking-wider">Take Action</span>
    </a>

    <!-- Full Screen Menu Overlay -->
    <div 
      class="fixed inset-0 z-40 bg-primary-950 transition-all duration-500"
      [class.opacity-100]="isMenuOpen()"
      [class.visible]="isMenuOpen()"
      [class.opacity-0]="!isMenuOpen()"
      [class.invisible]="!isMenuOpen()">
      
      <!-- Menu Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <a routerLink="/" (click)="closeMenu()" class="flex items-center">
            <span class="font-serif text-2xl font-bold tracking-tight text-white">MEYE</span>
          </a>
          <div class="flex items-center space-x-4">
            <a href="#" class="text-white text-sm font-medium hover:text-accent-400 transition-colors">
              Client Access
            </a>
            <button (click)="closeMenu()" class="p-2 text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Menu Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          <!-- The Firm -->
          <div>
            <h3 class="text-white text-lg font-medium mb-4">
              <a routerLink="/firm-profile" (click)="closeMenu()" class="hover:text-accent-400 transition-colors">The Firm</a>
            </h3>
            <ul class="space-y-3">
              <li>
                <a routerLink="/firm-profile" (click)="closeMenu()" class="text-primary-300 hover:text-white transition-colors">
                  Firm Profile
                </a>
              </li>
              <li>
                <a routerLink="/our-team" (click)="closeMenu()" class="text-primary-300 hover:text-white transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a routerLink="/governance" (click)="closeMenu()" class="text-primary-300 hover:text-white transition-colors">
                  Governance
                </a>
              </li>
            </ul>
          </div>

          <!-- Private Management -->
          <div>
            <h3 class="text-white text-lg font-medium mb-4">
              <a routerLink="/private-management" (click)="closeMenu()" class="hover:text-accent-400 transition-colors">Private Management</a>
            </h3>
            <ul class="space-y-3">
              <li>
                <a routerLink="/private-management" [queryParams]="{section: 'who'}" (click)="closeMenu()" class="text-primary-300 hover:text-white transition-colors">
                  Who Is Private Management For
                </a>
              </li>
              <li>
                <a routerLink="/private-management" [queryParams]="{section: 'cycle'}" (click)="closeMenu()" class="text-primary-300 hover:text-white transition-colors">
                  The Management Cycle
                </a>
              </li>
              <li>
                <a routerLink="/private-management" [queryParams]="{section: 'philosophy'}" (click)="closeMenu()" class="text-primary-300 hover:text-white transition-colors">
                  Our Investment Philosophy
                </a>
              </li>
              <li>
                <a routerLink="/private-management" [queryParams]="{section: 'methodology'}" (click)="closeMenu()" class="text-primary-300 hover:text-white transition-colors">
                  Management Methodology
                </a>
              </li>
              <li>
                <a routerLink="/private-management" [queryParams]="{section: 'strategies'}" (click)="closeMenu()" class="text-primary-300 hover:text-white transition-colors">
                  Investment Strategies
                </a>
              </li>
              <li>
                <a routerLink="/private-management" [queryParams]="{section: 'why'}" (click)="closeMenu()" class="text-primary-300 hover:text-white transition-colors">
                  Why MEYE?
                </a>
              </li>
              <li>
                <a routerLink="/private-management" [queryParams]="{section: 'cfa'}" (click)="closeMenu()" class="text-primary-300 hover:text-white transition-colors">
                  Why Choose a CFA Advisor?
                </a>
              </li>
            </ul>
          </div>

          <!-- Other Links -->
          <div>
            <ul class="space-y-3">
              <li>
                <a routerLink="/performance" (click)="closeMenu()" class="text-white text-lg font-medium hover:text-accent-400 transition-colors">
                  Performance
                </a>
              </li>
              <li>
                <a routerLink="/communications" (click)="closeMenu()" class="text-white text-lg font-medium hover:text-accent-400 transition-colors">
                  Communications
                </a>
              </li>
              <li>
                <a routerLink="/alternative-funds" (click)="closeMenu()" class="text-white text-lg font-medium hover:text-accent-400 transition-colors">
                  Alternative Funds
                </a>
              </li>
              <li>
                <a routerLink="/contact" (click)="closeMenu()" class="text-white text-lg font-medium hover:text-accent-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="mt-16 pt-8 border-t border-primary-800">
          <p class="text-white text-xl font-medium mb-4">Take action, become a client.</p>
          <a routerLink="/become-client" (click)="closeMenu()" 
             class="inline-flex items-center text-accent-400 hover:text-accent-300 font-medium transition-colors">
            Learn More
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .writing-mode-vertical {
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }
  `]
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    document.body.style.overflow = '';
  }
}
