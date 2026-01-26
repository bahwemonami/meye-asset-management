import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
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
          <span class="inline-block text-accent-400 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4 animate-fade-in">About Us</span>
          <h1 class="text-white mb-4 xs:mb-6 animate-fade-in-up">Building Trust Through <span class="text-accent-400">Excellence</span></h1>
          <p class="text-base xs:text-lg md:text-xl text-primary-200 animate-fade-in-up animate-delay-200">
            For over 15 years, MEYE Asset Management has been delivering exceptional investment solutions to discerning clients worldwide.
          </p>
        </div>
      </div>
    </section>

    <!-- Company Profile -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div class="reveal order-2 lg:order-1">
            <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Our Story</span>
            <h2 class="section-title">A Legacy of <span class="gradient-text">Financial Excellence</span></h2>
            <p class="text-dark-600 text-sm xs:text-base md:text-lg mb-4 xs:mb-6">
              Founded in 2010, MEYE Asset Management emerged from a vision to provide personalized, innovative portfolio management that truly serves the unique objectives of each investor.
            </p>
            <p class="text-dark-500 text-sm xs:text-base mb-4 xs:mb-6">
              Our founders, seasoned financial professionals with decades of combined experience, recognized the need for a more client-centric approach to wealth management. Today, we continue that mission with unwavering dedication.
            </p>
            <p class="text-dark-500 text-sm xs:text-base">
              We believe in building lasting relationships based on trust, transparency, and mutual success. Every decision we make is guided by our commitment to your financial well-being.
            </p>
          </div>
          
          <div class="reveal-right order-1 lg:order-2">
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="MEYE Asset Management Office"
                   class="rounded-xl xs:rounded-2xl shadow-elegant">
              <div class="absolute -bottom-4 -left-4 xs:-bottom-6 xs:-left-6 md:-bottom-8 md:-left-8 bg-white rounded-lg xs:rounded-xl p-4 xs:p-5 md:p-6 shadow-elegant">
                <div class="flex items-center space-x-3 xs:space-x-4">
                  <div class="text-2xl xs:text-3xl font-bold text-primary-900">15+</div>
                  <div class="text-dark-600 text-xs xs:text-sm">Years of<br>Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section-padding bg-primary-50/50">
      <div class="container-custom">
        <div class="text-center mb-8 xs:mb-12 md:mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Our Journey</span>
          <h2 class="section-title">Key <span class="gradient-text">Milestones</span></h2>
        </div>
        
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-4 xs:left-6 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-primary-200"></div>
          
          <div class="space-y-6 xs:space-y-8 md:space-y-12">
            @for (milestone of milestones; track milestone.year; let i = $index; let odd = $odd) {
              <div class="relative reveal" [style.animation-delay.ms]="i * 150">
                <div class="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div class="pl-10 xs:pl-14 md:pl-0" [class.md:text-right]="!odd" [class.md:order-2]="odd">
                    <div class="bg-white rounded-xl xs:rounded-2xl p-4 xs:p-5 md:p-6 shadow-card inline-block" [class.md:ml-auto]="!odd">
                      <span class="text-accent-500 font-bold text-base xs:text-lg">{{ milestone.year }}</span>
                      <h4 class="font-semibold text-primary-900 mt-1 xs:mt-2 mb-1 xs:mb-2 text-sm xs:text-base">{{ milestone.title }}</h4>
                      <p class="text-dark-500 text-xs xs:text-sm">{{ milestone.description }}</p>
                    </div>
                  </div>
                  <div class="hidden md:block" [class.md:order-1]="odd"></div>
                </div>
                <!-- Timeline Dot -->
                <div class="absolute left-2.5 xs:left-4.5 md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 xs:w-4 xs:h-4 bg-accent-500 rounded-full border-2 xs:border-4 border-white shadow" style="top: 50%; transform: translateY(-50%);"></div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-8 xs:mb-12 md:mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-xs xs:text-sm tracking-wider uppercase mb-3 xs:mb-4">Our Foundation</span>
          <h2 class="section-title">Core <span class="gradient-text">Values</span></h2>
          <p class="section-subtitle mx-auto">
            The principles that guide every decision we make and every relationship we build.
          </p>
        </div>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
          @for (value of values; track value.title; let i = $index) {
            <div class="text-center reveal" [style.animation-delay.ms]="i * 100">
              <div class="w-12 h-12 xs:w-14 xs:h-14 md:w-16 md:h-16 rounded-xl xs:rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mx-auto mb-4 xs:mb-5 md:mb-6">
                <span [innerHTML]="value.icon" class="text-primary-600 [&>svg]:w-6 [&>svg]:h-6 xs:[&>svg]:w-7 xs:[&>svg]:h-7 md:[&>svg]:w-8 md:[&>svg]:h-8"></span>
              </div>
              <h3 class="text-sm xs:text-base md:text-lg font-semibold text-primary-900 mb-2 xs:mb-3">{{ value.title }}</h3>
              <p class="text-dark-500 text-xs xs:text-sm">{{ value.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-gradient-to-br from-primary-900 to-primary-950">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto reveal">
          <h2 class="text-white mb-4 xs:mb-6">Ready to Start Your <span class="text-accent-400">Journey?</span></h2>
          <p class="text-primary-200 text-sm xs:text-base md:text-lg mb-6 xs:mb-8">
            Discover how MEYE Asset Management can help you achieve your financial goals.
          </p>
          <div class="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center">
            <a routerLink="/contact" class="btn-accent !px-6 !py-3 xs:!px-8 xs:!py-4">
              Contact Us
              <svg class="w-4 h-4 xs:w-5 xs:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a routerLink="/team" class="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20 !px-6 !py-3 xs:!px-8 xs:!py-4">
              Meet Our Team
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class AboutComponent implements AfterViewInit {
  milestones = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'MEYE Asset Management was founded with a vision to provide personalized wealth management solutions.'
    },
    {
      year: '2013',
      title: 'First $100M AUM',
      description: 'Reached our first major milestone of $100 million in assets under management.'
    },
    {
      year: '2016',
      title: 'Expansion',
      description: 'Expanded our team and opened new offices to serve a growing client base.'
    },
    {
      year: '2019',
      title: 'Digital Innovation',
      description: 'Launched our digital platform for enhanced client experience and reporting.'
    },
    {
      year: '2022',
      title: '$1B AUM',
      description: 'Celebrated reaching $1 billion in assets under management.'
    },
    {
      year: '2025',
      title: 'Digital Proof Launch',
      description: 'Introduced Digital Proof of Control, our innovative compliance documentation solution.'
    }
  ];

  values = [
    {
      title: 'Integrity',
      description: 'We uphold the highest ethical standards in everything we do.',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service.',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>'
    },
    {
      title: 'Transparency',
      description: 'We believe in open, honest communication with our clients.',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>'
    },
    {
      title: 'Innovation',
      description: 'We continuously evolve to meet the changing needs of our clients.',
      icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>'
    }
  ];

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
