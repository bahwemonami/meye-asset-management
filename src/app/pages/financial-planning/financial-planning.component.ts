import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageMappingService } from '../../services/image-mapping.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-financial-planning',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./financial-planning.component.scss'],
  template: `
    <div class="template-builder-page-container">
      <section class="template-part-hero">
        <img
          [src]="imageService.getImage('financial-planning-hero')"
          alt=""
          class="gl-responsive-background gl-responsive-background--desktop gl-img-grey"
        />
        <div class="content">
          <h1 class="title">{{ t.get('financialPlanning.title') }}</h1>
        </div>
      </section>

      <div class="page-content">
        <div class="page-content__builder">
          <div class="page-filter">
            <select class="gl-select">
              <option selected>{{ t.get('financialPlanning.essentialTool') }}</option>
              <option>{{ t.get('financialPlanning.taxPlanning') }}</option>
              <option>{{ t.get('financialPlanning.businessOwners') }}</option>
              <option>{{ t.get('financialPlanning.estatePlanning') }}</option>
            </select>
          </div>

          <h2 class="title" data-aos="fade">{{ t.get('financialPlanning.essentialTool') }}</h2>

          <div class="builder-sections">
            <section class="section-description" data-aos="fade">
              <div class="content">
                <div class="description gl-text-editor">
                  <p>
                    {{ t.get('financialPlanning.text1') }}
                  </p>
                  <p>{{ t.get('financialPlanning.text1b') }}</p>
                  <p>{{ t.get('financialPlanning.ourRole') }}</p>
                  <ul>
                    @for (role of getArray('financialPlanning.rolePoints'); track $index) {
                      <li>{{ role }}</li>
                    }
                  </ul>
                  <h4>{{ t.get('financialPlanning.concreteSolutions') }}</h4>
                  <p>{{ t.get('financialPlanning.solutionsText') }}</p>
                  <ul>
                    @for (solution of getArray('financialPlanning.solutionsPoints'); track $index) {
                      <li>{{ solution }}</li>
                    }
                  </ul>
                  <p>&nbsp;</p>
                  <p>
                    {{ t.get('financialPlanning.text2') }}
                  </p>
                </div>
                <a class="gl-button" [routerLink]="langService.buildUrl('contact')">{{ t.get('common.contactUs') }}</a>
              </div>
            </section>
          </div>
        </div>

        <div class="page-content__sidebar">
          <section class="section-sidebar">
            <div class="content">
              <ul>
                <li class="active">
                  <a [routerLink]="langService.buildUrl('financial-planning')">{{ t.get('financialPlanning.essentialTool') }}</a>
                </li>
                <li>
                  <a [routerLink]="langService.buildUrl('financial-planning')">{{ t.get('financialPlanning.taxPlanning') }}</a>
                </li>
                <li>
                  <a [routerLink]="langService.buildUrl('financial-planning')">{{ t.get('financialPlanning.businessOwners') }}</a>
                </li>
                <li>
                  <a [routerLink]="langService.buildUrl('financial-planning')">{{ t.get('financialPlanning.estatePlanning') }}</a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
})
export class FinancialPlanningComponent {
  imageService = inject(ImageMappingService);
  t = inject(TranslationService);
  langService = inject(LanguageService);

  getArray(key: string): string[] {
    const value = this.t.get(key);
    return Array.isArray(value) ? value : [];
  }
}
