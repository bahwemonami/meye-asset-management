import { Component, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin?: string;
  expertise: string[];
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="relative py-24 xs:py-28 sm:py-32 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:24px_24px] xs:bg-[length:32px_32px] md:bg-[length:40px_40px]"></div>
      </div>
      
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block text-accent-400 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4 animate-fade-in">Our Team</span>
          <h1 class="text-white mb-4 xs:mb-6 animate-fade-in-up">Meet the <span class="text-accent-400">Experts</span></h1>
          <p class="text-base xs:text-lg md:text-xl text-primary-200 animate-fade-in-up animate-delay-200">
            Our team of experienced professionals is dedicated to delivering exceptional results for our clients.
          </p>
        </div>
      </div>
    </section>

    <!-- Leadership -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-8 xs:mb-12 md:mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Leadership</span>
          <h2 class="section-title">Executive <span class="gradient-text">Team</span></h2>
          <p class="section-subtitle mx-auto">
            Visionary leaders guiding our strategic direction and ensuring excellence in every endeavor.
          </p>
        </div>
        
        <div class="grid xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 md:gap-8">
          @for (member of leadership; track member.id; let i = $index) {
            <div class="card overflow-hidden group reveal" [style.animation-delay.ms]="i * 100">
              <div class="relative aspect-[4/5] overflow-hidden">
                <img [src]="member.image" [alt]="member.name" 
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4 xs:p-5 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div class="flex space-x-2 xs:space-x-3">
                    @if (member.linkedin) {
                      <a [href]="member.linkedin" target="_blank" class="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <svg class="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    }
                    <button (click)="openMemberModal(member)" class="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <svg class="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-4 xs:p-5 md:p-6">
                <h3 class="text-base xs:text-lg md:text-xl font-semibold text-primary-900 mb-0.5 xs:mb-1">{{ member.name }}</h3>
                <p class="text-accent-600 font-medium text-xs xs:text-sm mb-2 xs:mb-3">{{ member.title }}</p>
                <div class="flex flex-wrap gap-1 xs:gap-2">
                  @for (skill of member.expertise.slice(0, 3); track skill) {
                    <span class="px-1.5 py-0.5 xs:px-2 xs:py-1 bg-primary-50 text-primary-700 text-xxs xs:text-xs rounded">{{ skill }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Investment Team -->
    <section class="section-padding bg-primary-50/50">
      <div class="container-custom">
        <div class="text-center mb-8 xs:mb-12 md:mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Specialists</span>
          <h2 class="section-title">Investment <span class="gradient-text">Professionals</span></h2>
          <p class="section-subtitle mx-auto">
            Expert analysts and portfolio managers dedicated to maximizing your returns.
          </p>
        </div>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-6">
          @for (member of investmentTeam; track member.id; let i = $index) {
            <div class="card-bordered p-3 xs:p-4 md:p-6 text-center group hover:-translate-y-1 transition-all duration-300 reveal" 
                 [style.animation-delay.ms]="i * 100">
              <div class="w-16 h-16 xs:w-20 xs:h-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto mb-3 xs:mb-4 ring-2 xs:ring-4 ring-primary-100 group-hover:ring-accent-200 transition-all duration-300">
                <img [src]="member.image" [alt]="member.name" class="w-full h-full object-cover">
              </div>
              <h4 class="font-semibold text-primary-900 mb-0.5 xs:mb-1 text-sm xs:text-base">{{ member.name }}</h4>
              <p class="text-dark-500 text-xs xs:text-sm mb-2 xs:mb-3">{{ member.title }}</p>
              <button (click)="openMemberModal(member)" class="text-accent-600 text-xs xs:text-sm font-medium hover:text-accent-700 transition-colors">
                View Profile →
              </button>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Join Our Team -->
    <section class="section-padding bg-gradient-to-br from-primary-900 to-primary-950">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div class="reveal">
            <span class="inline-block text-accent-400 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Careers</span>
            <h2 class="text-white mb-4 xs:mb-6">Join Our <span class="text-accent-400">Team</span></h2>
            <p class="text-primary-200 text-sm xs:text-base md:text-lg mb-6 xs:mb-8">
              We're always looking for talented individuals who share our passion for excellence in wealth management.
            </p>
            <ul class="space-y-3 xs:space-y-4 mb-6 xs:mb-8">
              @for (benefit of careerBenefits; track benefit) {
                <li class="flex items-center space-x-2 xs:space-x-3">
                  <div class="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 xs:w-4 xs:h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-primary-100 text-xs xs:text-sm md:text-base">{{ benefit }}</span>
                </li>
              }
            </ul>
            <a routerLink="/contact" class="btn-accent !px-6 !py-3 xs:!px-8 xs:!py-4">
              View Open Positions
              <svg class="w-4 h-4 xs:w-5 xs:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
          
          <div class="reveal-right">
            <div class="grid grid-cols-2 gap-3 xs:gap-4">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                   alt="Team collaboration" class="rounded-xl xs:rounded-2xl">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                   alt="Office environment" class="rounded-xl xs:rounded-2xl mt-6 xs:mt-8">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Member Modal -->
    @if (selectedMember()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 bg-black/50 backdrop-blur-sm" (click)="closeMemberModal()">
        <div class="bg-white rounded-xl xs:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" (click)="$event.stopPropagation()">
          <div class="relative">
            <img [src]="selectedMember()!.image" [alt]="selectedMember()!.name" class="w-full h-48 xs:h-56 md:h-64 object-cover">
            <button (click)="closeMemberModal()" class="absolute top-3 right-3 xs:top-4 xs:right-4 w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
              <svg class="w-4 h-4 xs:w-5 xs:h-5 text-dark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="p-5 xs:p-6 md:p-8">
            <h3 class="text-xl xs:text-2xl font-semibold text-primary-900 mb-0.5 xs:mb-1">{{ selectedMember()!.name }}</h3>
            <p class="text-accent-600 font-medium text-sm xs:text-base mb-3 xs:mb-4">{{ selectedMember()!.title }}</p>
            <p class="text-dark-600 mb-4 xs:mb-6 text-sm xs:text-base">{{ selectedMember()!.bio }}</p>
            <div class="mb-4 xs:mb-6">
              <h4 class="font-semibold text-primary-900 mb-2 xs:mb-3 text-sm xs:text-base">Areas of Expertise</h4>
              <div class="flex flex-wrap gap-1.5 xs:gap-2">
                @for (skill of selectedMember()!.expertise; track skill) {
                  <span class="px-2 py-0.5 xs:px-3 xs:py-1 bg-primary-50 text-primary-700 text-xs xs:text-sm rounded-full">{{ skill }}</span>
                }
              </div>
            </div>
            @if (selectedMember()!.linkedin) {
              <a [href]="selectedMember()!.linkedin" target="_blank" class="btn-primary">
                Connect on LinkedIn
                <svg class="w-3.5 h-3.5 xs:w-4 xs:h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: ``
})
export class TeamComponent implements AfterViewInit {
  selectedMember = signal<TeamMember | null>(null);

  leadership: TeamMember[] = [
    {
      id: 1,
      name: 'Alexander Sterling',
      title: 'Chief Executive Officer',
      bio: 'Alexander brings over 25 years of experience in wealth management and institutional investing. He founded MEYE Asset Management with a vision to provide truly personalized investment solutions.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      linkedin: '#',
      expertise: ['Strategic Leadership', 'Investment Strategy', 'Client Relations', 'Risk Management']
    },
    {
      id: 2,
      name: 'Victoria Chen',
      title: 'Chief Investment Officer',
      bio: 'Victoria oversees all investment activities and portfolio management strategies. Her data-driven approach and keen market insights have consistently delivered superior returns.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      linkedin: '#',
      expertise: ['Portfolio Management', 'Quantitative Analysis', 'Market Research', 'Asset Allocation']
    },
    {
      id: 3,
      name: 'Marcus Thompson',
      title: 'Chief Operating Officer',
      bio: 'Marcus ensures operational excellence across all business functions. His focus on innovation and efficiency has been instrumental in scaling our services.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      linkedin: '#',
      expertise: ['Operations Management', 'Digital Transformation', 'Process Optimization', 'Compliance']
    }
  ];

  investmentTeam: TeamMember[] = [
    {
      id: 4,
      name: 'Sarah Mitchell',
      title: 'Senior Portfolio Manager',
      bio: 'Sarah specializes in equity portfolio management with a focus on growth strategies.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      linkedin: '#',
      expertise: ['Equity Analysis', 'Growth Investing', 'Sector Analysis']
    },
    {
      id: 5,
      name: 'David Park',
      title: 'Fixed Income Specialist',
      bio: 'David manages fixed income portfolios with expertise in sovereign and corporate bonds.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      linkedin: '#',
      expertise: ['Fixed Income', 'Credit Analysis', 'Bond Trading']
    },
    {
      id: 6,
      name: 'Emma Rodriguez',
      title: 'Research Analyst',
      bio: 'Emma provides deep fundamental analysis and market insights to inform investment decisions.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      linkedin: '#',
      expertise: ['Fundamental Analysis', 'Valuation', 'Industry Research']
    },
    {
      id: 7,
      name: 'James Wilson',
      title: 'Risk Analyst',
      bio: 'James monitors portfolio risk metrics and implements risk management strategies.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      linkedin: '#',
      expertise: ['Risk Analytics', 'Derivatives', 'Hedging Strategies']
    }
  ];

  careerBenefits = [
    'Competitive compensation and benefits',
    'Professional development opportunities',
    'Collaborative and innovative culture',
    'Work-life balance commitment',
    'Opportunity to work with industry leaders'
  ];

  openMemberModal(member: TeamMember) {
    this.selectedMember.set(member);
    document.body.style.overflow = 'hidden';
  }

  closeMemberModal() {
    this.selectedMember.set(null);
    document.body.style.overflow = '';
  }

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

  private setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => observer.observe(el));
  }
}
