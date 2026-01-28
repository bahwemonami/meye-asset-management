import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alternative-funds',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section - Identique à Rivemont -->
    <section class="template-part-hero">
      <div class="content">
        <h1 class="title">Fonds alternatifs</h1>
      </div>
    </section>

    <!-- Funds Grid Section -->
    <section class="content-section">
      <div class="content-container">
        <div class="funds-grid">
          @for (fund of funds; track fund.slug) {
            <a [routerLink]="['/alternative-funds', fund.slug]" class="fund-card">
              <div class="fund-icon">
                <span>{{ fund.icon }}</span>
              </div>
              <div class="fund-info">
                <h3>{{ fund.name }}</h3>
                <p>{{ fund.description }}</p>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .funds-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      
      @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      @media (max-width: 568px) {
        grid-template-columns: 1fr;
      }
    }
    
    .fund-card {
      background: var(--meye-white);
      border-radius: 12px;
      overflow: hidden;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        
        h3 {
          color: var(--meye-accent);
        }
      }
    }
    
    .fund-icon {
      background: var(--meye-primary-dark);
      padding: 60px;
      text-align: center;
      
      span {
        font-size: 4rem;
      }
    }
    
    .fund-info {
      padding: 30px;
      
      h3 {
        font-family: 'Georgia', serif;
        font-size: 1.4rem;
        color: var(--meye-primary);
        margin-bottom: 12px;
        transition: color 0.3s ease;
      }
      
      p {
        font-size: 0.95rem;
        color: var(--meye-text-light);
        line-height: 1.6;
      }
    }
  `]
})
export class AlternativeFundsComponent {
  funds = [
    {
      slug: 'long-short',
      name: 'Fonds MEYE Long Short',
      description: 'Une stratégie neutre au marché visant des rendements positifs dans toutes les conditions de marché.',
      icon: '📈'
    },
    {
      slug: 'crypto',
      name: 'Fonds MEYE Crypto',
      description: 'Exposition aux actifs numériques avec une gestion professionnelle des risques.',
      icon: '₿'
    },
    {
      slug: 'microcap',
      name: 'Fonds MEYE MicroCap',
      description: 'Investissement dans des sociétés à petite capitalisation à fort potentiel.',
      icon: '💎'
    }
  ];
}
