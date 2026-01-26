import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Contact</h1>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <h2 class="text-2xl font-serif font-bold text-primary-900 mb-6">Get in Touch</h2>
            <form (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    [(ngModel)]="formData.name"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    required>
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    [(ngModel)]="formData.email"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    required>
                </div>
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  [(ngModel)]="formData.phone"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500">
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  [(ngModel)]="formData.subject"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500">
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  [(ngModel)]="formData.message"
                  rows="5"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  required></textarea>
              </div>

              <button 
                type="submit"
                class="inline-flex items-center bg-primary-900 text-white px-8 py-3 rounded hover:bg-primary-800 transition-colors font-medium">
                Send Message
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div>
            <h2 class="text-2xl font-serif font-bold text-primary-900 mb-6">Contact Information</h2>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="font-semibold text-primary-900">Address</h3>
                  <p class="text-gray-600 mt-1">
                    1000 De La Gauchetière West<br>
                    Suite 2400<br>
                    Montreal, QC H3B 4W5
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="font-semibold text-primary-900">Phone</h3>
                  <p class="text-gray-600 mt-1">+1 (514) 555-0123</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="font-semibold text-primary-900">Email</h3>
                  <p class="text-gray-600 mt-1">info&#64;meye-am.com</p>
                </div>
              </div>
            </div>

            <!-- Map Placeholder -->
            <div class="mt-8 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p class="text-gray-500">Map Integration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    alert('Thank you for your message! We will get back to you shortly.');
  }
}
