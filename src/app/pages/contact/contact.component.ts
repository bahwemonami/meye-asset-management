import { Component, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <!-- Hero Section -->
    <section class="relative py-32 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>
      
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block text-accent-400 font-semibold text-sm tracking-wider uppercase mb-4 animate-fade-in">Contact Us</span>
          <h1 class="text-white mb-6 animate-fade-in-up">Let's Start a <span class="text-accent-400">Conversation</span></h1>
          <p class="text-xl text-primary-200 animate-fade-in-up animate-delay-200">
            Ready to take the next step? Our team is here to help you achieve your financial goals.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-3 gap-12">
          <!-- Contact Info -->
          <div class="lg:col-span-1 reveal">
            <h2 class="text-2xl font-semibold text-primary-900 mb-6">Get in Touch</h2>
            <p class="text-dark-600 mb-8">
              We'd love to hear from you. Reach out through any of the following channels.
            </p>
            
            <div class="space-y-6">
              @for (info of contactInfo; track info.title) {
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span [innerHTML]="info.icon" class="text-primary-600"></span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-primary-900 mb-1">{{ info.title }}</h4>
                    @if (info.link) {
                      <a [href]="info.link" class="text-dark-600 hover:text-accent-600 transition-colors">{{ info.value }}</a>
                    } @else {
                      <p class="text-dark-600">{{ info.value }}</p>
                    }
                  </div>
                </div>
              }
            </div>
            
            <!-- Office Hours -->
            <div class="mt-10 p-6 bg-primary-50 rounded-xl">
              <h4 class="font-semibold text-primary-900 mb-4">Office Hours</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-dark-600">Monday - Friday</span>
                  <span class="text-primary-900 font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-dark-600">Saturday</span>
                  <span class="text-primary-900 font-medium">By Appointment</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-dark-600">Sunday</span>
                  <span class="text-primary-900 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="lg:col-span-2 reveal-right">
            <div class="card p-8 lg:p-10">
              <h2 class="text-2xl font-semibold text-primary-900 mb-2">Send Us a Message</h2>
              <p class="text-dark-500 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
              
              <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
                <div class="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-dark-700 mb-2">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      [(ngModel)]="formData.firstName"
                      required
                      class="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="John">
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-dark-700 mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      [(ngModel)]="formData.lastName"
                      required
                      class="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Doe">
                  </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label for="email" class="block text-sm font-medium text-dark-700 mb-2">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      [(ngModel)]="formData.email"
                      required
                      class="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="john.doe@example.com">
                  </div>
                  <div>
                    <label for="phone" class="block text-sm font-medium text-dark-700 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      [(ngModel)]="formData.phone"
                      class="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="+1 (555) 000-0000">
                  </div>
                </div>
                
                <div class="mb-6">
                  <label for="subject" class="block text-sm font-medium text-dark-700 mb-2">Subject *</label>
                  <select 
                    id="subject" 
                    name="subject"
                    [(ngModel)]="formData.subject"
                    required
                    class="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="services">Investment Services</option>
                    <option value="digital-proof">Digital Proof of Control</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div class="mb-6">
                  <label for="message" class="block text-sm font-medium text-dark-700 mb-2">Message *</label>
                  <textarea 
                    id="message" 
                    name="message"
                    [(ngModel)]="formData.message"
                    required
                    rows="5"
                    class="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."></textarea>
                </div>
                
                <div class="mb-8">
                  <label class="flex items-start space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="consent"
                      [(ngModel)]="formData.consent"
                      class="mt-1 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500">
                    <span class="text-sm text-dark-600">
                      I agree to the <a href="#" class="text-primary-600 hover:text-accent-600">Privacy Policy</a> and consent to being contacted regarding my inquiry.
                    </span>
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  class="btn-primary w-full md:w-auto"
                  [disabled]="!contactForm.valid || isSubmitting()">
                  @if (isSubmitting()) {
                    <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  } @else {
                    Send Message
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  }
                </button>
              </form>
              
              @if (submitSuccess()) {
                <div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span class="text-green-800 font-medium">Message sent successfully! We'll be in touch soon.</span>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="h-96 bg-primary-100 relative">
      <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
        <div class="text-center">
          <div class="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-primary-900 mb-2">Visit Our Office</h3>
          <p class="text-dark-600">350 Fifth Avenue, Suite 7820<br>New York, NY 10118</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding bg-primary-50/50">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-12 reveal">
            <h2 class="section-title">Frequently Asked <span class="gradient-text">Questions</span></h2>
          </div>
          
          <div class="space-y-4">
            @for (faq of faqs; track faq.question; let i = $index) {
              <div class="card overflow-hidden reveal" [style.animation-delay.ms]="i * 50">
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
  `,
  styles: ``
})
export class ContactComponent implements AfterViewInit {
  isSubmitting = signal(false);
  submitSuccess = signal(false);

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  };

  contactInfo = [
    {
      title: 'Email',
      value: 'contact@meye-am.com',
      link: 'mailto:contact@meye-am.com',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'
    },
    {
      title: 'Phone',
      value: '+1 (212) 555-0123',
      link: 'tel:+12125550123',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>'
    },
    {
      title: 'Address',
      value: '350 Fifth Avenue, Suite 7820, New York, NY 10118',
      link: null,
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'
    }
  ];

  faqs = [
    {
      question: 'What is the minimum investment amount?',
      answer: 'Our minimum investment amount for private wealth management services is $500,000. However, we offer consultation services for all potential clients to discuss their financial goals.',
      isOpen: false
    },
    {
      question: 'How are fees structured?',
      answer: 'We charge a transparent management fee based on assets under management, typically ranging from 0.75% to 1.25% annually depending on portfolio size. There are no hidden fees or commissions.',
      isOpen: false
    },
    {
      question: 'How often will I receive reports?',
      answer: 'Clients receive comprehensive quarterly reports detailing portfolio performance, market outlook, and strategic recommendations. Monthly statements are also available upon request.',
      isOpen: false
    },
    {
      question: 'Can I meet my portfolio manager in person?',
      answer: 'Absolutely. We encourage regular in-person meetings with your dedicated portfolio manager. We can arrange meetings at our office or via secure video conference.',
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  onSubmit() {
    if (this.formData.firstName && this.formData.lastName && this.formData.email && this.formData.subject && this.formData.message) {
      this.isSubmitting.set(true);
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        
        // Reset form
        this.formData = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          consent: false
        };
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess.set(false);
        }, 5000);
      }, 1500);
    }
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
