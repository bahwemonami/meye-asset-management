import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'MEYE ASSET MANAGER | Home'
  },
  {
    path: 'firm-profile',
    loadComponent: () => import('./pages/firm-profile/firm-profile.component').then(m => m.FirmProfileComponent),
    title: 'Firm Profile | MEYE ASSET MANAGER'
  },
  {
    path: 'our-team',
    loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent),
    title: 'Our Team | MEYE ASSET MANAGER'
  },
  {
    path: 'team/:slug',
    loadComponent: () => import('./pages/team-member/team-member.component').then(m => m.TeamMemberComponent),
    title: 'Team Member | MEYE ASSET MANAGER'
  },
  {
    path: 'governance',
    loadComponent: () => import('./pages/governance/governance.component').then(m => m.GovernanceComponent),
    title: 'Governance | MEYE ASSET MANAGER'
  },
  {
    path: 'private-management',
    loadComponent: () => import('./pages/private-management/private-management.component').then(m => m.PrivateManagementComponent),
    title: 'Private Management | MEYE ASSET MANAGER'
  },
  {
    path: 'performance',
    loadComponent: () => import('./pages/performance/performance.component').then(m => m.PerformanceComponent),
    title: 'Performance | MEYE ASSET MANAGER'
  },
  {
    path: 'communications',
    loadComponent: () => import('./pages/communications/communications.component').then(m => m.CommunicationsComponent),
    title: 'Communications | MEYE ASSET MANAGER'
  },
  {
    path: 'communications/:slug',
    loadComponent: () => import('./pages/financial-letter/financial-letter.component').then(m => m.FinancialLetterComponent),
    title: 'Financial Letter | MEYE ASSET MANAGER'
  },
  {
    path: 'alternative-funds',
    loadComponent: () => import('./pages/alternative-funds/alternative-funds.component').then(m => m.AlternativeFundsComponent),
    title: 'Alternative Funds | MEYE ASSET MANAGER'
  },
  {
    path: 'alternative-funds/:slug',
    loadComponent: () => import('./pages/alternative-fund-detail/alternative-fund-detail.component').then(m => m.AlternativeFundDetailComponent),
    title: 'Fund Details | MEYE ASSET MANAGER'
  },
  {
    path: 'financial-planning',
    loadComponent: () => import('./pages/financial-planning/financial-planning.component').then(m => m.FinancialPlanningComponent),
    title: 'Financial Planning | MEYE ASSET MANAGER'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact | MEYE ASSET MANAGER'
  },
  {
    path: 'become-client',
    loadComponent: () => import('./pages/become-client/become-client.component').then(m => m.BecomeClientComponent),
    title: 'Become a Client | MEYE ASSET MANAGER'
  },
  {
    path: 'client-access',
    loadComponent: () => import('./pages/client-access/client-access.component').then(m => m.ClientAccessComponent),
    title: 'Client Access | MEYE ASSET MANAGER'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
