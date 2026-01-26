import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-governance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Governance</h1>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Registration with Authorities -->
        <div class="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 class="text-2xl font-serif font-bold text-primary-900 mb-6">Registration with Authorities</h2>
            <div class="space-y-4 text-gray-600">
              <p>
                MEYE Asset Management is registered as a portfolio manager in Quebec, Ontario, British Columbia, Alberta, Saskatchewan, Manitoba and New Brunswick, as an investment fund manager in Quebec and Ontario, as a derivatives portfolio manager in Quebec, as an exempt market dealer in Quebec, Ontario, Saskatchewan, Manitoba and New Brunswick, and in financial planning in Quebec.
              </p>
              <p>
                You can consult the register of companies and individuals authorized to practice by the Autorité des marchés financiers by visiting the following link: 
                <a href="#" class="text-accent-600 hover:text-accent-700 underline">Register of companies and individuals authorized to practice.</a>
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <a href="#" class="inline-flex items-center bg-primary-900 text-white px-6 py-3 rounded hover:bg-primary-800 transition-colors">
              Click Here
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Asset Protection -->
        <div class="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 class="text-2xl font-serif font-bold text-primary-900 mb-6">Asset Protection</h2>
          <div class="space-y-4 text-gray-600">
            <p>
              Client portfolios are managed by MEYE Asset Management but held primarily in accounts at the National Bank of Canada, specifically its division called National Bank Independent Network (NBIN). Some accounts are held at Interactive Brokers Canada.
            </p>
            <p>
              NBIN is a financial company that is a member of the Canadian Investor Protection Fund. The latter protects your funds up to $1,000,000 (and more, in certain cases), in the very unlikely event of the insolvency of the financial institution.
            </p>
            <p>
              Under its mandate, MEYE Asset Management transmits instructions to NBIN, but in no case has access to the assets contained in your account.
            </p>
          </div>
        </div>

        <!-- Privacy Policy -->
        <div class="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 class="text-2xl font-serif font-bold text-primary-900 mb-6">Privacy Policy</h2>
            <div class="space-y-4 text-gray-600">
              <p>
                In order to comply with the Personal Information Protection and Electronic Documents Act ("PIPEDA") and the Act respecting the protection of personal information in the private sector (Quebec), MEYE Asset Management has implemented a privacy policy.
              </p>
              <p>
                Martin Lalonde, Chief Compliance Officer of MEYE Asset Management, is responsible for the confidentiality of personal information.
              </p>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-6">
            <p class="text-primary-900 font-medium mb-4">Privacy Policy</p>
            <a href="#" class="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium">
              Download
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Complaint Handling Policy -->
        <div class="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-2xl font-serif font-bold text-primary-900 mb-6">Complaint Handling Policy</h2>
            <div class="space-y-4 text-gray-600">
              <p>
                We are committed to ensuring that all complaints are handled promptly, fairly and transparently. Our goal is to effectively resolve situations that are the source of your concerns.
              </p>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-6">
            <p class="text-primary-900 font-medium mb-4">Summary of Complaint Handling Policy</p>
            <a href="#" class="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium">
              Download
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class GovernanceComponent {}
