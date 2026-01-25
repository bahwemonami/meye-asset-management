import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'MEYE Asset Management | Home'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us | MEYE Asset Management'
  },
  {
    path: 'team',
    loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent),
    title: 'Our Team | MEYE Asset Management'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'Private Wealth Management | MEYE Asset Management'
  },
  {
    path: 'performance',
    loadComponent: () => import('./pages/performance/performance.component').then(m => m.PerformanceComponent),
    title: 'Performance | MEYE Asset Management'
  },
  {
    path: 'digital-proof',
    loadComponent: () => import('./pages/nft/nft.component').then(m => m.NftComponent),
    title: 'Digital Proof of Control | MEYE Asset Management'
  },
  {
    path: 'digital-proof/news',
    loadComponent: () => import('./pages/nft-news/nft-news.component').then(m => m.NftNewsComponent),
    title: 'Digital Proof News | MEYE Asset Management'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us | MEYE Asset Management'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
