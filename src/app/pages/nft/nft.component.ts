import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nft',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-20">
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>
      
      <div class="absolute top-20 right-10 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow animate-delay-500"></div>
      
      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
            <svg class="w-5 h-5 text-accent-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span class="text-primary-200 text-sm font-medium">Institutional-Grade Security</span>
          </div>
          
          <h1 class="text-white mb-6 animate-fade-in-up">
            Digital Proof <span class="text-accent-400">of Control</span>
          </h1>
          
          <p class="text-xl text-primary-200 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            A modern documentation tool for compliance and transparency. Generate secure, auditable digital records for institutional and legal requirements.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
            <a routerLink="/contact" class="btn-accent !px-8 !py-4">
              Request a Demo
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a routerLink="/digital-proof/news" class="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20 !px-8 !py-4">
              View News & Updates
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- What It Is Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="reveal">
            <span class="inline-block text-accent-500 font-semibold text-sm tracking-wider uppercase mb-4">What It Is</span>
            <h2 class="section-title">Secure Digital <span class="gradient-text">Documentation</span></h2>
            <p class="text-dark-600 text-lg mb-6">
              Digital Proof of Control is an optional verification layer designed for institutions, legal firms, and compliance teams who need a modern way to document asset control.
            </p>
            <p class="text-dark-500 mb-8">
              This is NOT an investment product. It is a compliance-grade digital certificate that provides audit-ready proof for regulatory and internal review purposes.
            </p>
            
            <div class="bg-primary-50 rounded-xl p-6 border-l-4 border-accent-500">
              <h4 class="font-semibold text-primary-900 mb-2">Important Notice</h4>
              <p class="text-dark-600 text-sm">
                This tool is designed for compliance documentation only. It does not guarantee returns, does not represent an investment, and is not legal advice.
              </p>
            </div>
          </div>
          
          <div class="reveal-right">
            <div class="bg-gradient-to-br from-primary-100 to-primary-50 rounded-3xl p-8">
              <div class="bg-white rounded-2xl p-6 shadow-elegant">
                <div class="flex items-center justify-between mb-6 pb-6 border-b border-primary-100">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold text-primary-900">Digital Certificate</p>
                      <p class="text-dark-500 text-sm">Proof of Control</p>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">Verified</span>
                </div>
                
                <div class="space-y-4">
                  @for (field of certificateFields; track field.label) {
                    <div class="flex justify-between items-center">
                      <span class="text-dark-500 text-sm">{{ field.label }}</span>
                      <span class="font-medium text-primary-900 text-sm" [class.font-mono]="field.mono">{{ field.value }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="section-padding bg-primary-50/50">
      <div class="container-custom">
        <div class="text-center mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-sm tracking-wider uppercase mb-4">Process</span>
          <h2 class="section-title">How It <span class="gradient-text">Works</span></h2>
          <p class="section-subtitle mx-auto">
            A simple, secure three-step process designed for institutional compliance requirements.
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          @for (step of processSteps; track step.number; let i = $index) {
            <div class="relative reveal" [style.animation-delay.ms]="i * 150">
              <!-- Connector Line -->
              @if (i < processSteps.length - 1) {
                <div class="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-200 to-primary-300"></div>
              }
              
              <div class="relative bg-white rounded-2xl p-8 shadow-card text-center">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span class="text-2xl font-bold text-white">{{ step.number }}</span>
                </div>
                <h3 class="text-xl font-semibold text-primary-900 mb-3">{{ step.title }}</h3>
                <p class="text-dark-500">{{ step.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Use Cases Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-16 reveal">
          <span class="inline-block text-accent-500 font-semibold text-sm tracking-wider uppercase mb-4">Applications</span>
          <h2 class="section-title">Use <span class="gradient-text">Cases</span></h2>
          <p class="section-subtitle mx-auto">
            Designed for institutions, legal teams, and regulated environments.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (useCase of useCases; track useCase.title; let i = $index) {
            <div class="card-bordered p-8 group hover:-translate-y-1 transition-all duration-300 reveal" 
                 [style.animation-delay.ms]="i * 100">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-6 group-hover:from-accent-100 group-hover:to-accent-50 transition-colors duration-300">
                <span [innerHTML]="useCase.icon" class="text-primary-600 group-hover:text-accent-600 transition-colors duration-300"></span>
              </div>
              <h3 class="text-lg font-semibold text-primary-900 mb-3">{{ useCase.title }}</h3>
              <p class="text-dark-500 text-sm">{{ useCase.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Security & Privacy Section -->
    <section class="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
      </div>
      
      <div class="container-custom relative z-10">
        <div class="text-center mb-16 reveal">
          <span class="inline-block text-accent-400 font-semibold text-sm tracking-wider uppercase mb-4">Your Protection</span>
          <h2 class="text-white mb-4">Security & <span class="text-accent-400">Privacy</span></h2>
          <p class="text-primary-200 text-lg max-w-2xl mx-auto">
            Your security is our top priority. Here's how we protect your information.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (security of securityFeatures; track security.title; let i = $index) {
            <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 reveal" 
                 [style.animation-delay.ms]="i * 100">
              <div class="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center mb-4">
                <span [innerHTML]="security.icon" class="text-accent-400"></span>
              </div>
              <h4 class="font-semibold text-white mb-2">{{ security.title }}</h4>
              <p class="text-primary-300 text-sm">{{ security.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-12 reveal">
            <span class="inline-block text-accent-500 font-semibold text-sm tracking-wider uppercase mb-4">FAQ</span>
            <h2 class="section-title">Frequently Asked <span class="gradient-text">Questions</span></h2>
          </div>
          
          <div class="space-y-4">
            @for (faq of faqs; track faq.question; let i = $index) {
              <div class="card-bordered overflow-hidden reveal" [style.animation-delay.ms]="i * 50">
                <button 
                  (click)="toggleFaq(i)"
                  class="w-full flex items-center justify-between p-6 text-left hover:bg-primary-50/50 transition-colors duration-300">
                  <span class="font-semibold text-primary-900 pr-4">{{ faq.question }}</span>
                  <svg class="w-5 h-5 text-primary-600 flex-shrink-0 transition-transform duration-300"
                       [class.rotate-180]="faq.isOpen"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div class="overflow-hidden transition-all duration-300"
                     [class.max-h-0]="!faq.isOpen"
                     [class.max-h-96]="faq.isOpen">
                  <div class="px-6 pb-6 text-dark-600">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-primary-50/50">
      <div class="container-custom">
        <div class="relative bg-gradient-to-br from-primary-800 to-primary-900 rounded-3xl p-12 lg:p-16 overflow-hidden reveal-scale">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]"></div>
          </div>
          
          <div class="relative z-10 text-center max-w-3xl mx-auto">
            <h2 class="text-white mb-6">Ready to Get <span class="text-accent-400">Started?</span></h2>
            <p class="text-primary-200 text-lg mb-8">
              Contact our compliance team to learn how Digital Proof of Control can support your documentation needs.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a routerLink="/contact" class="btn-accent !px-8 !py-4">
                Request a Demo
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a routerLink="/contact" class="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20 !px-8 !py-4">
                Contact Compliance Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class NftComponent implements AfterViewInit {
  certificateFields = [
    { label: 'Certificate ID', value: 'MEYE-2026-001', mono: true },
    { label: 'Issue Date', value: 'January 26, 2026', mono: false },
    { label: 'Expiration', value: 'January 26, 2027', mono: false },
    { label: 'Status', value: 'Active', mono: false },
    { label: 'Hash', value: '0x8f7d...3a2b', mono: true }
  ];

  processSteps = [
    {
      number: '01',
      title: 'Initiate Verification',
      description: 'Connect securely through our compliance portal to begin the verification process.'
    },
    {
      number: '02',
      title: 'Generate Proof',
      description: 'Secure cryptographic proof is generated without accessing or storing your private keys.'
    },
    {
      number: '03',
      title: 'Receive Certificate',
      description: 'A digital certificate is issued for your records, ready for audit and compliance review.'
    }
  ];

  useCases = [
    {
      title: 'Legal & Compliance',
      description: 'Provide audit-ready documentation for legal proceedings and regulatory compliance reviews.',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>'
    },
    {
      title: 'Risk Management',
      description: 'Enhanced due diligence and internal risk assessment for asset verification.',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
    },
    {
      title: 'Institutional Clients',
      description: 'Professional documentation for family offices, wealth managers, and financial advisors.',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>'
    },
    {
      title: 'Audit Trail',
      description: 'Create verifiable audit trails for internal reviews and external audits.',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>'
    },
    {
      title: 'Regulatory Reporting',
      description: 'Support compliance with regulatory requirements and reporting obligations.',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>'
    },
    {
      title: 'Transaction Verification',
      description: 'Document and verify control for high-value transactions and transfers.',
      icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>'
    }
  ];

  securityFeatures = [
    {
      title: 'No Private Keys',
      description: 'We never access, store, or request your private keys.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>'
    },
    {
      title: 'No Fund Access',
      description: 'Zero custody means we have no ability to move your assets.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>'
    },
    {
      title: 'Data Protection',
      description: 'Your personal data is encrypted and protected at all times.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
    },
    {
      title: 'Independent Audit',
      description: 'Our processes are regularly audited by independent security firms.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>'
    }
  ];

  faqs = [
    {
      question: 'What is Digital Proof of Control?',
      answer: 'Digital Proof of Control is a compliance-grade documentation tool that creates secure, auditable digital records. It provides institutional clients with verifiable proof of asset control for regulatory and audit purposes.',
      isOpen: false
    },
    {
      question: 'Is this an investment product?',
      answer: 'No. Digital Proof of Control is NOT an investment product. It does not guarantee returns and should not be considered financial advice. It is purely a documentation and compliance tool.',
      isOpen: false
    },
    {
      question: 'Do you have access to my funds?',
      answer: 'No. We operate with zero custody, meaning we never have access to your funds, private keys, or the ability to move your assets. The verification process is cryptographic and non-custodial.',
      isOpen: false
    },
    {
      question: 'Who is this service designed for?',
      answer: 'Digital Proof of Control is designed for institutional investors, legal firms, compliance teams, family offices, and regulated entities who require formal documentation of asset control for audit or regulatory purposes.',
      isOpen: false
    },
    {
      question: 'How long is a certificate valid?',
      answer: 'Certificates are typically valid for 12 months from the date of issue. Renewal processes are straightforward and can be completed through our compliance portal.',
      isOpen: false
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We employ industry-leading security practices including encryption, secure data handling, and regular independent security audits. Your personal information is protected at all times.',
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });
  }
}
