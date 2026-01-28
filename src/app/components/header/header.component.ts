import { Component, HostListener, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Banner / Header MEYE ASSET MANAGER -->
    <header 
      id="site-header"
      class="site-header"
      js-site-header="container"
      [class.scrolled]="isScrolled()">
      <div class="content">
        <div class="col col-1">
          <!-- Logo -->
          <a routerLink="/" class="logo-holder" aria-label="MEYE ASSET MANAGER - Retour à l'accueil">
            <img [src]="isScrolled() ? imageService.getImage('logo-dark') : imageService.getImage('logo-light')" alt="MEYE ASSET MANAGER" />
          </a>
        </div>
        <div class="col col-2">
          <!-- Navigation Desktop -->
          <nav js-site-nav="container" aria-label="Navigation principale">
            <ul id="menu-header" class="menu" role="menubar">
              <li>
                <a routerLink="/private-management">Gestion privée</a>
              </li>
              <li>
                <a routerLink="/performance">Rendements</a>
              </li>
              <li>
                <a routerLink="/financial-planning">Planification financière</a>
              </li>
              <li>
                <a routerLink="/contact">Contact</a>
              </li>
              <li>
                <a href="https://rivemont.ca/en/" title="Switch to En" aria-label="Switch to En" role="menuitem">
                  <span>En</span>
                </a>
              </li>
            </ul>
          </nav>
          
          <!-- Menu Toggle Hamburger -->
          <button 
            class="hamburger"
            [class.active]="isMenuOpen()"
            type="button"
            js-site-nav-mobile="opener"
            (click)="toggleMenu()"
            [attr.aria-expanded]="isMenuOpen()"
            [attr.aria-label]="isMenuOpen() ? 'Fermer le menu' : 'Ouvrir le menu'"
            aria-controls="site-mobile-nav">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- Bouton "Passez à l'action" -->
    <a
      id="site-button"
      class="gl-button gl-button--blue-light"
      routerLink="/become-client"
      target="_self"
      aria-label="Passez à l'action - Devenir client">
      Passez à l'action
    </a>

    <!-- Menu Mobile Full Screen -->
    <div 
      class="site-mobile-nav site-mobile-nav--cta-header"
      id="site-mobile-nav"
      js-site-nav-mobile="container"
      [class.active]="isMenuOpen()"
      (click)="closeMenu()">
      <div class="content" (click)="$event.stopPropagation()">
        <!-- Row 1: Logo + Accès client + Hamburger -->
        <div class="row row-1">
          <div class="col col-1">
            <a routerLink="/" class="logo-holder" (click)="closeMenu()">
              <img [src]="imageService.getImage('logo-light-png')" alt="" />
            </a>
            <a href="https://monportefeuilleplus.ca/login" class="gl-button gl-button--blue-dark" target="_blank">
              <img [src]="imageService.getImage('user-icon')" alt="" width="300" height="150" />
              Accès client
            </a>
          </div>
          <div class="col col-2">
            <button 
              class="hamburger"
              [class.active]="isMenuOpen()"
              type="button"
              js-site-nav-mobile="opener"
              (click)="toggleMenu()"
              aria-label="Close menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <!-- Row 2: Navigation en 3 colonnes -->
        <div class="row row-2">
          <div class="col col-1">
            <nav>
              <ul id="menu-big-menu-col-1" class="menu">
                <li>
                  <a routerLink="/firm-profile" (click)="closeMenu()">La firme</a>
                  <ul class="sub-menu">
                    <li>
                      <a routerLink="/firm-profile" (click)="closeMenu()">Profil de la firme</a>
                    </li>
                    <li>
                      <a routerLink="/our-team" (click)="closeMenu()">Notre équipe</a>
                    </li>
                    <li>
                      <a routerLink="/governance" (click)="closeMenu()">Gouvernance</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col col-2">
            <nav>
              <ul id="menu-big-menu-col-2" class="menu">
                <li>
                  <a routerLink="/private-management" (click)="closeMenu()">Gestion privée</a>
                  <ul class="sub-menu">
                    <li>
                      <a routerLink="/private-management" (click)="closeMenu()">À qui s’adresse la gestion privée</a>
                    </li>
                    <li>
                      <a routerLink="/private-management" [queryParams]="{section: 'cycle'}" (click)="closeMenu()">Le cycle de gestion</a>
                    </li>
                    <li>
                      <a routerLink="/private-management" [queryParams]="{section: 'philosophy'}" (click)="closeMenu()">Notre philosophie de gestion</a>
                    </li>
                    <li>
                      <a routerLink="/private-management" [queryParams]="{section: 'methodology'}" (click)="closeMenu()">La méthodologie de gestion</a>
                    </li>
                    <li>
                      <a routerLink="/private-management" [queryParams]="{section: 'strategies'}" (click)="closeMenu()">Les stratégies de placement</a>
                    </li>
                    <li>
                      <a routerLink="/private-management" [queryParams]="{section: 'why'}" (click)="closeMenu()">Pourquoi Rivemont ?</a>
                    </li>
                    <li>
                      <a routerLink="/private-management" [queryParams]="{section: 'cfa'}" (click)="closeMenu()">Pourquoi choisir un conseiller détenteur du titre CFA* ?</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col col-3">
            <nav js-site-nav="container">
              <ul id="menu-big-menu-col-4" class="menu">
                <li>
                  <a routerLink="/performance" (click)="closeMenu()">Rendements</a>
                </li>
                <li>
                  <a routerLink="/communications" (click)="closeMenu()">Communications</a>
                </li>
                <li>
                  <a routerLink="/alternative-funds" (click)="closeMenu()">Fonds alternatifs</a>
                </li>
                <li>
                  <a routerLink="/contact" (click)="closeMenu()">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- Row 3: CTA -->
        <div class="row row-3">
          <p>Passez à l’action, devenez client.</p>
          <a routerLink="/become-client" class="gl-button" target="_self" (click)="closeMenu()">
            En savoir plus
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .site-header {
      background: transparent;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .site-header.scrolled {
      background: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
    }

    .logo-link img {
      height: 40px;
      width: auto;
    }

    .header-nav {
      display: flex;
      align-items: center;
      gap: 30px;
    }

    .nav-menu {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 25px;
    }

    .nav-menu a {
      color: #1a1a1a;
      text-decoration: none;
      font-size: 17px;
      font-weight: 400;
      transition: color 0.3s ease;
    }

    .site-header:not(.scrolled) .nav-menu a {
      color: #ffffff;
    }

    .nav-menu a:hover,
    .nav-menu a.active {
      color: #c9a961;
    }

    .client-access-link {
      color: #1a1a1a;
      text-decoration: none;
      font-size: 18px;
      font-weight: 400;
      transition: color 0.3s ease;
    }

    .site-header:not(.scrolled) .client-access-link {
      color: #ffffff;
    }

    .client-access-link:hover {
      color: #c9a961;
    }

    .language-toggle {
      background: none;
      border: none;
      color: #1a1a1a;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 400;
    }

    .site-header:not(.scrolled) .language-toggle {
      color: #ffffff;
    }

    .menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
      color: #1a1a1a;
    }

    .site-header:not(.scrolled) .menu-toggle {
      color: #ffffff;
    }

    .menu-toggle svg {
      width: 24px;
      height: 24px;
    }

    @media (max-width: 1024px) {
      .header-nav {
        gap: 15px;
      }

      .nav-menu {
        display: none;
      }

      .menu-toggle {
        display: block;
      }
    }

    .action-button {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 999;
      background: #c9a961;
      color: #ffffff;
      padding: 15px 8px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      letter-spacing: 0.1em;
      transition: background-color 0.3s ease;
      border-radius: 4px 0 0 4px;
      box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    }

    .action-button:hover {
      background: #b89955;
    }

    @media (max-width: 768px) {
      .action-button {
        display: none;
      }
    }

    .menu-overlay {
      position: fixed;
      inset: 0;
      z-index: 2000;
      background: #0a0a0a;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }

    .menu-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .menu-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      height: 100%;
      overflow-y: auto;
    }

    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 30px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 40px;
    }

    .menu-logo img {
      height: 40px;
      width: auto;
    }

    .menu-header-actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .menu-client-access {
      color: #ffffff;
      text-decoration: none;
      font-size: 18px;
      font-weight: 400;
      transition: color 0.3s ease;
    }

    .menu-client-access:hover {
      color: #c9a961;
    }

    .menu-close {
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
      padding: 10px;
    }

    .menu-close svg {
      width: 24px;
      height: 24px;
    }

    .menu-navigation {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 60px;
      margin-bottom: 60px;
    }

    @media (max-width: 968px) {
      .menu-navigation {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }

    .menu-section-title a {
      color: #ffffff;
      font-size: 1.1rem;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .menu-section-title a:hover {
      color: #c9a961;
    }

    .menu-section-links {
      list-style: none;
      margin: 20px 0 0 0;
      padding: 0;
    }

    .menu-section-links li {
      margin-bottom: 15px;
    }

    .menu-section-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 0.95rem;
      transition: color 0.3s ease;
    }

    .menu-section-links a:hover {
      color: #ffffff;
    }

    .menu-section-main-links {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .menu-section-main-links li {
      margin-bottom: 20px;
    }

    .menu-section-main-links a {
      color: #ffffff;
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .menu-section-main-links a:hover {
      color: #c9a961;
    }

    .menu-cta {
      padding-top: 40px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .menu-cta-text {
      color: #ffffff;
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .menu-cta-link {
      display: inline-flex;
      align-items: center;
      color: #c9a961;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .menu-cta-link:hover {
      color: #b89955;
    }

    .menu-cta-link svg {
      margin-left: 10px;
      width: 20px;
      height: 20px;
    }
  `]
})
export class HeaderComponent {
  imageService = inject(ImageMappingService);
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
