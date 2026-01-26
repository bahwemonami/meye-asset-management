import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-primary-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Our Team</h1>
      </div>
    </section>

    <!-- Team Grid Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (member of teamMembers; track member.slug) {
            <a [routerLink]="['/team', member.slug]" 
               class="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
              <div class="aspect-[3/4] overflow-hidden">
                <img [src]="member.image" 
                     [alt]="member.name"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              </div>
              <div class="p-4">
                <h3 class="font-serif font-bold text-primary-900 group-hover:text-accent-600 transition-colors">
                  {{ member.name }}
                </h3>
                <p class="text-gray-600 text-sm mt-1">{{ member.title }}</p>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `
})
export class TeamComponent {
  teamMembers = [
    {
      slug: 'julien-carl-landry',
      name: 'Julien-Carl Landry, Pl.Fin.',
      title: 'Financial Planner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      slug: 'martin-lalonde',
      name: 'Martin Lalonde, MBA, CFA',
      title: 'President and Portfolio Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      slug: 'jeffrey-veilleux',
      name: 'Jeffrey Veilleux, M.Sc., CIM®',
      title: 'Portfolio Manager',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      slug: 'david-blouin',
      name: 'David Blouin',
      title: 'Director of Client Relations',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      slug: 'martin-piche',
      name: 'Martin Piché',
      title: 'Analyst, Administration and Compliance',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      slug: 'mathieu-martin',
      name: 'Mathieu Martin, CFA',
      title: 'Portfolio Manager, MEYE MicroCap Fund',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      slug: 'philippe-jette',
      name: 'Philippe Jetté',
      title: 'Senior Analyst, MEYE Crypto Fund',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];
}
