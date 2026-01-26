import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-member',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a routerLink="/our-team" class="inline-flex items-center text-primary-300 hover:text-white mb-6 transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Team
        </a>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">{{ member?.name }}</h1>
        <p class="text-primary-300 text-xl mt-2">{{ member?.title }}</p>
      </div>
    </section>

    <!-- Content Section -->
    @if (member) {
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-3 gap-12">
            <div>
              <img [src]="member.image" 
                   [alt]="member.name"
                   class="w-full rounded-lg shadow-xl">
            </div>
            <div class="lg:col-span-2">
              <h2 class="text-2xl font-serif font-bold text-primary-900 mb-6">Biography</h2>
              <div class="prose prose-lg text-gray-600">
                <p>{{ member.bio }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    }
  `
})
export class TeamMemberComponent implements OnInit {
  member: any;

  private teamMembers: any = {
    'julien-carl-landry': {
      name: 'Julien-Carl Landry, Pl.Fin.',
      title: 'Financial Planner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      bio: 'Julien-Carl Landry is a certified Financial Planner with extensive experience in wealth management and financial planning. He specializes in helping clients achieve their long-term financial goals through comprehensive planning strategies.'
    },
    'martin-lalonde': {
      name: 'Martin Lalonde, MBA, CFA',
      title: 'President and Portfolio Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      bio: 'Martin Lalonde, MBA, CFA, is the portfolio manager responsible for investment decisions. He has several years of experience in financial markets and worked, before founding MEYE Asset Management, as a senior analyst in investments and mergers and acquisitions for a major Canadian organization.'
    },
    'jeffrey-veilleux': {
      name: 'Jeffrey Veilleux, M.Sc., CIM®',
      title: 'Portfolio Manager',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      bio: 'Jeffrey Veilleux holds a Master of Science degree and the CIM® designation. He brings analytical rigor and deep market knowledge to portfolio management, helping clients navigate complex investment landscapes.'
    },
    'david-blouin': {
      name: 'David Blouin',
      title: 'Director of Client Relations',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      bio: 'David Blouin leads client relations at MEYE Asset Management, ensuring that every client receives personalized attention and exceptional service. His focus is on building lasting relationships based on trust and transparency.'
    },
    'martin-piche': {
      name: 'Martin Piché',
      title: 'Analyst, Administration and Compliance',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      bio: 'Martin Piché oversees administration and compliance functions, ensuring that all operations meet regulatory requirements and industry best practices. His attention to detail helps maintain the highest standards of governance.'
    },
    'mathieu-martin': {
      name: 'Mathieu Martin, CFA',
      title: 'Portfolio Manager, MEYE MicroCap Fund',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      bio: 'Mathieu Martin, CFA, manages the MEYE MicroCap Fund, specializing in identifying high-potential small-cap investment opportunities. His deep research capabilities help uncover hidden value in the market.'
    },
    'philippe-jette': {
      name: 'Philippe Jetté',
      title: 'Senior Analyst, MEYE Crypto Fund',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      bio: 'Philippe Jetté is the senior analyst for the MEYE Crypto Fund, bringing expertise in digital assets and blockchain technology. He helps navigate the evolving cryptocurrency landscape for institutional investors.'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.member = this.teamMembers[slug];
    });
  }
}
