import { Component, signal, inject, ChangeDetectionStrategy, DestroyRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Banner / Header MEYE ASSET MANAGER - Structure identique à Rivemont -->
    <header 
      id="site-header"
      class="site-header"
      [class.site-header--cta-header]="isHome()"
      [class.site-header--hero]="isHeroPage()"
      [class.site-header--dark]="!isHeroPage() && !isLightBackgroundPage()"
      [class.site-header--light-background]="isLightBackgroundPage()"
      [class.site-header--contact]="isContact()"
      [class.site-header--firm-profile]="isFirmProfile()"
      [class.site-header--governance]="isGovernance()"
      [class.site-header--private-management]="isPrivateManagement()"
      [class.site-header--performance]="isPerformance()"
      [class.site-header--financial-planning]="isFinancialPlanning()"
      js-site-header="container">
      <div class="content">
        <div class="col col-1">
          <!-- Logo -->
          <a [routerLink]="langService.buildUrl('')" class="logo-holder" aria-label="MEYE ASSET MANAGER - Retour à l'accueil">
            <img [src]="imageService.getImage(isLightBackgroundPage() ? 'logo-dark' : 'logo-light')" alt="MEYE ASSET MANAGER" />
          </a>
        </div>
        <div class="col col-2">
          <a
            *ngIf="isHome()"
            href="https://monportefeuilleplus.ca/login"
            class="gl-button gl-button--blue-dark"
            target="_blank">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNC4zNyIgaGVpZ2h0PSIxOC40NzUiIHZpZXdCb3g9IjAgMCAxNC4zNyAxOC40NzUiPgogIDxnIGlkPSJucF9hY2NvdW50XzQ0MDcxNTlfMDAwMDAwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAuODMyIC0xMi41KSI+CiAgICA8cGF0aCBpZD0iUGF0aF8xIiBkYXRhLW5hbWU9IlBhdGggMSIgZD0iTTM3LjQzOCwyMC43MTFhNC4xLDQuMSwwLDEsMSwyLjktMS4yQTQuMSw0LjEsMCwwLDEsMzcuNDM4LDIwLjcxMVptMC02LjE1OGEyLjA1MywyLjA1MywwLDEsMCwxLjQ1MS42QTIuMDUzLDIuMDUzLDAsMCwwLDM3LjQzOCwxNC41NTNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOS40MjEgMCkiIGZpbGw9IiNmZmYiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzIiIGRhdGEtbmFtZT0iUGF0aCAyIiBkPSJNMzQuMTc1LDU5LjIzN2ExLjAyNywxLjAyNywwLDAsMS0xLjAyNy0xLjAyN1Y1NS4xMzFhMy4wNzksMy4wNzksMCwwLDAtMy4wNzktMy4wNzloLTQuMWEzLjA3OSwzLjA3OSwwLDAsMC0zLjA3OSwzLjA3OVY1OC4yMWExLjAyNywxLjAyNywwLDEsMS0yLjA1MywwVjU1LjEzMUE1LjEzOCw1LjEzOCwwLDAsMSwyNS45NjUsNTBoNC4xQTUuMTM4LDUuMTM4LDAsMCwxLDM1LjIsNTUuMTMxVjU4LjIxYTEuMDI3LDEuMDI3LDAsMCwxLTEuMDI3LDEuMDI3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMjguMjYyKSIgZmlsbD0iI2ZmZiIvPgogIDwvZz4KPC9zdmc+Cg==" alt="" />
            {{ t.get('common.clientAccess') }}
          </a>
          <!-- Navigation Desktop -->
          <nav js-site-nav="container" aria-label="Navigation principale">
            <ul id="menu-header" class="menu" role="menubar">
              <li>
                <a [routerLink]="langService.buildUrl('private-management')">{{ t.get('header.privateManagement') }}</a>
              </li>
              <li>
                <a [routerLink]="langService.buildUrl('performance')">{{ t.get('header.performance') }}</a>
              </li>
              <li>
                <a [routerLink]="langService.buildUrl('financial-planning')">{{ t.get('header.financialPlanning') }}</a>
              </li>
              <li>
                <a [routerLink]="langService.buildUrl('contact')">{{ t.get('header.contact') }}</a>
              </li>
              <li>
                <a 
                  (click)="switchLanguage()" 
                  [title]="currentLanguage() === 'fr' ? t.get('header.switchToEn') : t.get('header.switchToFr')" 
                  [attr.aria-label]="currentLanguage() === 'fr' ? t.get('header.switchToEn') : t.get('header.switchToFr')" 
                  role="menuitem"
                  style="cursor: pointer;">
                  <span>{{ currentLanguage() === 'fr' ? 'En' : 'Fr' }}</span>
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
            [attr.aria-label]="isMenuOpen() ? t.get('header.closeMenu') : t.get('header.openMenu')"
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
      [routerLink]="langService.buildUrl('become-client')"
      target="_self"
      [attr.aria-label]="t.get('header.takeAction') + ' - ' + t.get('header.becomeClient')">
      {{ t.get('header.takeAction') }}
    </a>

    <!-- Menu Mobile Full Screen -->
    <div 
      class="site-mobile-nav site-mobile-nav--cta-header"
      id="site-mobile-nav"
      js-site-nav-mobile="container"
      [style.display]="isMenuOpen() ? 'block' : 'none'"
      (click)="closeMenu()">
      <div class="content" (click)="$event.stopPropagation()">
        <!-- Row 1: Logo + Accès client + Hamburger -->
        <div class="row row-1">
          <div class="col col-1">
            <a [routerLink]="langService.buildUrl('')" class="logo-holder" (click)="closeMenu()">
              <img [src]="imageService.getImage('logo-light-png')" alt="" />
            </a>
            <a *ngIf="isHome()" href="https://monportefeuilleplus.ca/login" class="gl-button gl-button--blue-dark" target="_blank">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNC4zNyIgaGVpZ2h0PSIxOC40NzUiIHZpZXdCb3g9IjAgMCAxNC4zNyAxOC40NzUiPgogIDxnIGlkPSJucF9hY2NvdW50XzQ0MDcxNTlfMDAwMDAwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAuODMyIC0xMi41KSI+CiAgICA8cGF0aCBpZD0iUGF0aF8xIiBkYXRhLW5hbWU9IlBhdGggMSIgZD0iTTM3LjQzOCwyMC43MTFhNC4xLDQuMSwwLDEsMSwyLjktMS4yQTQuMSw0LjEsMCwwLDEsMzcuNDM4LDIwLjcxMVptMC02LjE1OGEyLjA1MywyLjA1MywwLDEsMCwxLjQ1MS42QTIuMDUzLDIuMDUzLDAsMCwwLDM3LjQzOCwxNC41NTNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOS40MjEgMCkiIGZpbGw9IiNmZmYiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzIiIGRhdGEtbmFtZT0iUGF0aCAyIiBkPSJNMzQuMTc1LDU5LjIzN2ExLjAyNywxLjAyNywwLDAsMS0xLjAyNy0xLjAyN1Y1NS4xMzFhMy4wNzksMy4wNzksMCwwLDAtMy4wNzktMy4wNzloLTQuMWEzLjA3OSwzLjA3OSwwLDAsMC0zLjA3OSwzLjA3OVY1OC4yMWExLjAyNywxLjAyNywwLDEsMS0yLjA1MywwVjU1LjEzMUE1LjEzOCw1LjEzOCwwLDAsMSwyNS45NjUsNTBoNC4xQTUuMTM4LDUuMTM4LDAsMCwxLDM1LjIsNTUuMTMxVjU4LjIxYTEuMDI3LDEuMDI3LDAsMCwxLTEuMDI3LDEuMDI3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMjguMjYyKSIgZmlsbD0iI2ZmZiIvPgogIDwvZz4KPC9zdmc+Cg==" alt="" />
              {{ t.get('common.clientAccess') }}
            </a>
          </div>
          <div class="col col-2">
            <button 
              class="hamburger"
              [class.hamburger--active]="isMenuOpen()"
              type="button"
              js-site-nav-mobile="opener"
              (click)="toggleMenu()"
              [attr.aria-label]="t.get('header.closeMenu')">
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
                  <a href="#" (click)="closeMenu(); $event.preventDefault()">{{ t.get('header.about') }}</a>
                  <ul class="sub-menu">
                    <li>
                      <a [routerLink]="langService.buildUrl('firm-profile')" (click)="closeMenu()">{{ t.get('header.firmProfile') }}</a>
                    </li>
                    <li>
                      <a [routerLink]="langService.buildUrl('our-team')" (click)="closeMenu()">{{ t.get('header.ourTeam') }}</a>
                    </li>
                    <li>
                      <a [routerLink]="langService.buildUrl('governance')" (click)="closeMenu()">{{ t.get('header.governance') }}</a>
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
                  <a [routerLink]="langService.buildUrl('private-management')" (click)="closeMenu()">{{ t.get('header.privateManagement') }}</a>
                  <ul class="sub-menu">
                    <li>
                      <a [routerLink]="langService.buildUrl('private-management')" (click)="closeMenu()">{{ t.get('privateManagement.who.title') }}</a>
                    </li>
                    <li>
                      <a [routerLink]="langService.buildUrl('private-management')" [queryParams]="{section: 'cycle'}" (click)="closeMenu()">{{ t.get('privateManagement.cycle.title') }}</a>
                    </li>
                    <li>
                      <a [routerLink]="langService.buildUrl('private-management')" [queryParams]="{section: 'philosophy'}" (click)="closeMenu()">{{ t.get('privateManagement.philosophy.title') }}</a>
                    </li>
                    <li>
                      <a [routerLink]="langService.buildUrl('private-management')" [queryParams]="{section: 'methodology'}" (click)="closeMenu()">{{ t.get('privateManagement.methodology.title') }}</a>
                    </li>
                    <li>
                      <a [routerLink]="langService.buildUrl('private-management')" [queryParams]="{section: 'strategies'}" (click)="closeMenu()">{{ t.get('privateManagement.strategies.title') }}</a>
                    </li>
                    <li>
                      <a [routerLink]="langService.buildUrl('private-management')" [queryParams]="{section: 'why'}" (click)="closeMenu()">{{ t.get('privateManagement.why.title') }}</a>
                    </li>
                    <li>
                      <a [routerLink]="langService.buildUrl('private-management')" [queryParams]="{section: 'cfa'}" (click)="closeMenu()">{{ t.get('privateManagement.cfa.title') }}</a>
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
                  <a [routerLink]="langService.buildUrl('performance')" (click)="closeMenu()">{{ t.get('header.performance') }}</a>
                </li>
                <li>
                  <a [routerLink]="langService.buildUrl('communications')" (click)="closeMenu()">{{ t.get('header.communications') }}</a>
                </li>
                <li>
                  <a [routerLink]="langService.buildUrl('alternative-funds')" (click)="closeMenu()">{{ t.get('header.alternativeFunds') }}</a>
                </li>
                <li>
                  <a [routerLink]="langService.buildUrl('contact')" (click)="closeMenu()">{{ t.get('header.contact') }}</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- Row 3: CTA -->
        <div class="row row-3">
          <p>{{ t.get('header.takeActionBecomeClient') }}</p>
          <a [routerLink]="langService.buildUrl('become-client')" class="gl-button" target="_self" (click)="closeMenu()">
            {{ t.get('common.learnMore') }}
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Styles spécifiques au composant - Overrides uniquement si nécessaire */
    /* Les styles principaux sont dans src/styles.scss */
    
    /* FORCER la transparence du header sur toutes les pages SAUF gouvernance */
    #site-header:not(.site-header--governance) {
      background-color: transparent !important;
      background: transparent !important;
    }
    
    /* Les styles de position sont gérés dans src/styles.scss */
    /* Pas besoin de styles inline ici, le SCSS global gère tout */
    
    /* Logo visible sur toutes les pages */
    #site-header .content .col.col-1 .logo-holder {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
    }
    
    #site-header .content .col.col-1 .logo-holder img {
      opacity: 1 !important;
      visibility: visible !important;
      display: inline !important;
      filter: none !important;
      width: 100% !important;
      height: auto !important;
    }
    
    /* Menu Mobile - Styles exacts depuis menu-hamburguer.html */
    /* Les styles de base sont dans src/styles.scss avec .site-mobile-nav */
    /* On ajoute seulement les styles spécifiques qui doivent override */
    #site-mobile-nav {
      background-color: rgb(15 33 64/.96);
      z-index: 11;
    }

    #site-mobile-nav.site-mobile-nav--cta-header .content {
      padding-top: 16px;
    }

    @media only screen and (min-width: 1024px) {
      #site-mobile-nav.site-mobile-nav--cta-header .content {
        padding-top: max(84px, 5.2083333333vw);
      }
    }

    #site-mobile-nav .content {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
      padding-left: 14px;
      padding-right: 14px;
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content {
        padding-left: 35px;
        padding-right: 35px;
      }
    }

    @media only screen and (min-width: 1280px) {
      #site-mobile-nav .content {
        padding-left: 80px;
        padding-right: 80px;
      }
    }

    @media only screen and (min-width: 1600px) {
      #site-mobile-nav .content {
        padding-left: 8.59375vw;
        padding-right: 8.59375vw;
      }
    }

    #site-mobile-nav .content .row.row-1 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-1 {
        margin-bottom: 70px;
      }
    }

    @media only screen and (min-width: 1024px) {
      #site-mobile-nav .content .row.row-1 {
        align-items: center;
        margin-bottom: max(100px, 8.3333333333vw);
      }
    }

    #site-mobile-nav .content .row.row-1 .col.col-1 {
      position: relative;
      border-right: none !important;
    }

    #site-mobile-nav .content .row.row-1 .col.col-2 {
      border-right: none !important;
    }

    #site-mobile-nav .content .row.row-1 .col {
      border-right: none !important;
    }

    #site-mobile-nav .content .row.row-1 .col.col-1 .logo-holder {
      display: block;
      width: 164px;
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-1 .col.col-1 .logo-holder {
        width: max(200px, 14.7916666667vw);
      }
    }

    #site-mobile-nav .content .row.row-1 .col.col-1 .logo-holder img {
      height: auto;
      width: 100%;
    }

    #site-mobile-nav .content .row.row-1 .col.col-1 .gl-button {
      margin-top: 30px;
      min-width: max(200px, 14.375vw);
    }

    @media only screen and (min-width: 1024px) {
      #site-mobile-nav .content .row.row-1 .col.col-1 .gl-button {
        left: 100%;
        margin-left: 4.6875vw;
        margin-top: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    #site-mobile-nav .content .row.row-1 .col.col-1 .gl-button:after {
      content: none;
    }

    #site-mobile-nav .content .row.row-1 .col.col-1 .gl-button img {
      margin-right: max(12px, .78125vw);
      position: relative;
      top: 2px;
      width: 10px;
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-1 .col.col-1 .gl-button img {
        top: 0;
        width: max(12px, .78125vw);
      }
    }

    #site-mobile-nav .content .row.row-1 .col.col-2 .hamburger {
      background-color: #fff0;
      border: none;
      cursor: pointer;
      display: block;
      margin-left: max(64px, 3.3333333333vw);
      padding: 0;
      position: relative;
      right: 4px;
      top: 3px;
      width: max(29px, 1.5104166667vw);
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-1 .col.col-2 .hamburger {
        top: 0;
      }
    }

    #site-mobile-nav .content .row.row-1 .col.col-2 .hamburger span {
      background-color: #fff;
      display: block;
      height: max(2px, .1041666667vw);
      margin-bottom: max(8px, .4166666667vw);
      width: 100%;
    }

    #site-mobile-nav .content .row.row-1 .col.col-2 .hamburger span:last-child {
      margin-bottom: 0;
    }

    #site-mobile-nav .content .row.row-1 .col.col-2 .hamburger.hamburger--active span:first-child {
      transform: rotate(-45deg);
      transform-origin: top right;
    }

    #site-mobile-nav .content .row.row-1 .col.col-2 .hamburger.hamburger--active span:nth-child(2) {
      width: 0;
    }

    #site-mobile-nav .content .row.row-1 .col.col-2 .hamburger.hamburger--active span:nth-child(3) {
      transform: rotate(45deg);
      transform-origin: bottom right;
    }

    #site-mobile-nav .content .row.row-2 {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: -50px;
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-2 {
        margin-bottom: -70px;
      }
    }

    @media only screen and (min-width: 1024px) {
      #site-mobile-nav .content .row.row-2 {
        flex-wrap: nowrap;
        margin-bottom: 0;
      }
    }

    #site-mobile-nav .content .row.row-2 .col {
      box-sizing: border-box;
      margin-bottom: 50px;
      width: 100%;
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-2 .col {
        margin-bottom: 70px;
        width: 45%;
      }
    }

    @media only screen and (min-width: 1024px) {
      #site-mobile-nav .content .row.row-2 .col {
        margin-bottom: 0;
        width: auto;
      }
    }

    #site-mobile-nav .content .row.row-2 .col.col-1 {
      padding-left: 0;
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-2 .col.col-1 {
        border-right: 1px solid #fff;
      }
    }

    @media only screen and (min-width: 1024px) {
      #site-mobile-nav .content .row.row-2 .col.col-2 {
        border-right: 1px solid #fff;
      }
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-2 .col.col-3 {
        border-right: none !important;
      }
    }

    @media only screen and (max-width: 1023px) {
      #site-mobile-nav .content .row.row-2 .col.col-3 {
        padding-left: 0;
      }
    }

    @media only screen and (min-width: 1024px) {
      #site-mobile-nav .content .row.row-2 .col nav {
        max-width: max(350px, 19.53125vw);
      }
    }

    #site-mobile-nav .content .row.row-2 .col nav .menu>li {
      border-top: 1px solid #fff;
      box-sizing: border-box;
      margin-top: max(25px, 1.8229166667vw);
      padding-top: max(25px, 1.8229166667vw);
    }

    #site-mobile-nav .content .row.row-2 .col nav .menu>li:first-child {
      border-top: 0;
      margin-top: 0;
      padding-top: 0;
    }

    #site-mobile-nav .content .row.row-2 .col nav .menu>li>a {
      color: #fff;
      font-family: peridot-pe-variable, sans-serif;
      font-size: 21px;
      font-style: normal;
      font-weight: 600;
      line-height: 1.3em;
      text-decoration: none;
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-2 .col nav .menu>li>a {
        font-size: max(25px, 1.5625vw);
      }
    }

    #site-mobile-nav .content .row.row-2 .col nav .menu>li .sub-menu {
      margin-top: max(18px, 1.1458333333vw);
      list-style: none;
      padding: 0;
    }

    #site-mobile-nav .content .row.row-2 .col nav .menu>li .sub-menu li {
      margin-bottom: max(18px, 1.1458333333vw);
    }

    #site-mobile-nav .content .row.row-2 .col nav .menu>li .sub-menu li:last-child {
      margin-bottom: 0;
    }

    #site-mobile-nav .content .row.row-2 .col nav .menu>li .sub-menu li a {
      color: #fff;
      font-family: peridot-pe-variable, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0;
      line-height: 1.3em;
      text-decoration: none;
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-2 .col nav .menu>li .sub-menu li a {
        font-size: max(17px, 1.0416666667vw);
      }
    }

    #site-mobile-nav .content .row.row-3 {
      border-top: 1px solid #fff;
      box-sizing: border-box;
      margin-top: 25px;
      padding: max(40px, 3.125vw) 0;
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-3 {
        align-items: center;
        display: flex;
        margin-top: max(70px, 5.2083333333vw);
      }
    }

    @media only screen and (min-width: 1024px) {
      #site-mobile-nav .content .row.row-3 {
        justify-content: flex-end;
      }
    }

    #site-mobile-nav .content .row.row-3 p {
      color: #fff;
      font-family: peridot-pe-variable, sans-serif;
      font-size: max(25px, 2.34375vw);
      font-style: normal;
      font-weight: 600;
      line-height: 1.25;
      margin: 0;
    }

    #site-mobile-nav .content .row.row-3 .gl-button {
      margin-top: 40px;
      min-width: max(200px, 14.375vw);
    }

    @media only screen and (min-width: 768px) {
      #site-mobile-nav .content .row.row-3 .gl-button {
        margin-left: max(40px, 3.6458333333vw);
        margin-top: 0;
      }
    }
  `]
})
export class HeaderComponent {
  imageService = inject(ImageMappingService);
  t = inject(TranslationService);
  langService = inject(LanguageService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  isMenuOpen = signal(false);
  isHome = signal(this.isHomeUrl(this.router.url));
  isFirmProfile = signal(this.isFirmProfileUrl(this.router.url));
  isContact = signal(this.isContactUrl(this.router.url));
  isGovernance = signal(this.isGovernanceUrl(this.router.url));
  isPrivateManagement = signal(this.isPrivateManagementUrl(this.router.url));
  isPerformance = signal(this.isPerformanceUrl(this.router.url));
  isFinancialPlanning = signal(this.isFinancialPlanningUrl(this.router.url));
  currentLanguage = computed(() => this.langService.currentLanguage());

  // Signaux directs pour le type de page (remplace les computed pour meilleure réactivité avec OnPush)
  isHeroPage = signal(false);
  isLightBackgroundPage = signal(false);

  // Méthode pour mettre à jour les signaux de type de page
  private updatePageTypeSignals(url: string): void {
    const isHero = this.isHomeUrl(url) || this.isPrivateManagementUrl(url) ||
      this.isPerformanceUrl(url) || this.isFinancialPlanningUrl(url);
    const isLight = this.isFirmProfileUrl(url) || this.isContactUrl(url) ||
      this.isGovernanceUrl(url);

    this.isHeroPage.set(isHero);
    this.isLightBackgroundPage.set(isLight);
  }

  constructor() {
    // Initialiser les valeurs au chargement
    const currentUrl = this.router.url;
    this.isHome.set(this.isHomeUrl(currentUrl));
    this.isFirmProfile.set(this.isFirmProfileUrl(currentUrl));
    this.isContact.set(this.isContactUrl(currentUrl));
    this.isGovernance.set(this.isGovernanceUrl(currentUrl));
    this.isPrivateManagement.set(this.isPrivateManagementUrl(currentUrl));
    this.isPerformance.set(this.isPerformanceUrl(currentUrl));
    this.isFinancialPlanning.set(this.isFinancialPlanningUrl(currentUrl));

    // Mettre à jour les signaux de type de page au chargement initial
    this.updatePageTypeSignals(currentUrl);

    // Écouter les changements de route
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        this.isHome.set(this.isHomeUrl(event.urlAfterRedirects));
        this.isFirmProfile.set(this.isFirmProfileUrl(event.urlAfterRedirects));
        this.isContact.set(this.isContactUrl(event.urlAfterRedirects));
        this.isGovernance.set(this.isGovernanceUrl(event.urlAfterRedirects));
        this.isPrivateManagement.set(this.isPrivateManagementUrl(event.urlAfterRedirects));
        this.isPerformance.set(this.isPerformanceUrl(event.urlAfterRedirects));
        this.isFinancialPlanning.set(this.isFinancialPlanningUrl(event.urlAfterRedirects));

        // Mettre à jour les signaux de type de page à chaque changement de route
        this.updatePageTypeSignals(event.urlAfterRedirects);
      });
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

  switchLanguage() {
    const newLang = this.currentLanguage() === 'fr' ? 'en' : 'fr';
    this.langService.setLanguage(newLang);
  }

  private isHomeUrl(url: string): boolean {
    const pathWithoutLang = this.langService.getPathWithoutLanguage(url);
    return pathWithoutLang === '/' || pathWithoutLang === '' || pathWithoutLang === '/fr' || pathWithoutLang === '/en' || pathWithoutLang.startsWith('/?');
  }

  private isFirmProfileUrl(url: string): boolean {
    const pathWithoutLang = this.langService.getPathWithoutLanguage(url);
    return pathWithoutLang === '/firm-profile' || pathWithoutLang.startsWith('/firm-profile');
  }

  private isContactUrl(url: string): boolean {
    const pathWithoutLang = this.langService.getPathWithoutLanguage(url);
    return pathWithoutLang === '/contact' || pathWithoutLang.startsWith('/contact');
  }

  private isGovernanceUrl(url: string): boolean {
    const pathWithoutLang = this.langService.getPathWithoutLanguage(url);
    return pathWithoutLang === '/governance' || pathWithoutLang.startsWith('/governance');
  }

  private isPrivateManagementUrl(url: string): boolean {
    const pathWithoutLang = this.langService.getPathWithoutLanguage(url);
    return pathWithoutLang === '/private-management' || pathWithoutLang.startsWith('/private-management');
  }

  private isPerformanceUrl(url: string): boolean {
    const pathWithoutLang = this.langService.getPathWithoutLanguage(url);
    return pathWithoutLang === '/performance' || pathWithoutLang.startsWith('/performance');
  }

  private isFinancialPlanningUrl(url: string): boolean {
    const pathWithoutLang = this.langService.getPathWithoutLanguage(url);
    return pathWithoutLang === '/financial-planning' || pathWithoutLang.startsWith('/financial-planning');
  }
}
