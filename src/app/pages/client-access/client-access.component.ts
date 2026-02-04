import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-access',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./client-access.component.scss'],
  template: `
    <!-- Hero Section -->
    <section class="client-access-hero">
      <div class="content">
        <div class="icon-container">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h1>Client Access</h1>
        <p>
          Our secure client portal is coming soon. In the meantime, please contact us directly for account information.
        </p>
        <div class="buttons">
          <a routerLink="/contact" class="btn-primary">
            Contact Us
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <a routerLink="/" class="btn-secondary">
            Return Home
          </a>
        </div>
      </div>
    </section>
  `
})
export class ClientAccessComponent {}
