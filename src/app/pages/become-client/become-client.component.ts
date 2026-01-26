import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-become-client',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Take Action, Become a Client.</h1>
      </div>
    </section>

    <!-- Form Section -->
    <section class="py-20 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-serif font-bold text-primary-900 mb-8">Become a Client</h2>
        
        <form (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Name Row -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName"
                [(ngModel)]="formData.firstName"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                required>
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName"
                [(ngModel)]="formData.lastName"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                required>
            </div>
          </div>

          <!-- Contact Row -->
          <div class="grid md:grid-cols-3 gap-6">
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
              <label for="postalCode" class="block text-sm font-medium text-gray-700 mb-2">3 characters of postal code*</label>
              <input 
                type="text" 
                id="postalCode" 
                name="postalCode"
                [(ngModel)]="formData.postalCode"
                maxlength="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                required>
            </div>
          </div>

          <!-- Assets -->
          <div>
            <label for="assets" class="block text-sm font-medium text-gray-700 mb-2">Approximate value of assets to manage*</label>
            <input 
              type="text" 
              id="assets" 
              name="assets"
              [(ngModel)]="formData.assets"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
              required>
          </div>

          <!-- How did you hear -->
          <div>
            <label for="source" class="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
            <input 
              type="text" 
              id="source" 
              name="source"
              [(ngModel)]="formData.source"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500">
          </div>

          <!-- Need -->
          <div>
            <label for="need" class="block text-sm font-medium text-gray-700 mb-2">What need are you looking to address?</label>
            <textarea 
              id="need" 
              name="need"
              [(ngModel)]="formData.need"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"></textarea>
          </div>

          <!-- Contact Preference -->
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-3">Contact Preference</span>
            <div class="flex gap-6">
              <label class="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="contactPreference" 
                  value="phone"
                  [(ngModel)]="formData.contactPreference"
                  class="w-4 h-4 text-accent-600 border-gray-300 focus:ring-accent-500">
                <span class="ml-2 text-gray-700">Phone</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="contactPreference" 
                  value="email"
                  [(ngModel)]="formData.contactPreference"
                  class="w-4 h-4 text-accent-600 border-gray-300 focus:ring-accent-500">
                <span class="ml-2 text-gray-700">Email</span>
              </label>
            </div>
          </div>

          <!-- Submit -->
          <div>
            <button 
              type="submit"
              class="inline-flex items-center bg-primary-900 text-white px-8 py-3 rounded hover:bg-primary-800 transition-colors font-medium">
              Send
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  `
})
export class BecomeClientComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postalCode: '',
    assets: '',
    source: '',
    need: '',
    contactPreference: 'phone'
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    alert('Thank you for your interest! We will contact you shortly.');
  }
}
