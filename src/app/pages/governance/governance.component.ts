import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-governance',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section - Identique à Rivemont -->
    <section class="template-part-hero">
      <div class="content">
        <h1 class="title">Gouvernance</h1>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="content-container">
        <!-- Registration with Authorities -->
        <div class="two-column-layout mb-16">
          <div>
            <h2>Inscription auprès des autorités</h2>
            <div class="prose-content">
              <p>
                MEYE ASSET MANAGER est inscrite à titre de gestionnaire de portefeuille au Québec, en Ontario, en Colombie-Britannique, en Alberta, en Saskatchewan, au Manitoba et au Nouveau-Brunswick, à titre de gestionnaire de fonds d'investissement au Québec et en Ontario, à titre de gestionnaire de portefeuille de produits dérivés au Québec, à titre de courtier sur marché hors cote au Québec, en Ontario, en Saskatchewan, au Manitoba et au Nouveau-Brunswick, et en planification financière au Québec.
              </p>
              <p>
                Vous pouvez consulter le registre des entreprises et des personnes autorisées à exercer par l'Autorité des marchés financiers en visitant le lien suivant : 
                <a href="#" class="link-with-arrow">Registre des entreprises et des personnes autorisées à exercer</a>
              </p>
            </div>
          </div>
          <div class="sidebar">
            <div class="sidebar-cta">
              <a href="#" class="link-with-arrow light">
                Cliquez ici
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Asset Protection -->
        <div class="info-card mb-16">
          <h3>Protection des actifs</h3>
          <div class="prose-content">
            <p>
              Les portefeuilles des clients sont gérés par MEYE ASSET MANAGER mais détenus principalement dans des comptes à la Banque Nationale du Canada, plus précisément sa division appelée Réseau indépendant de la Banque Nationale (RIBN). Certains comptes sont détenus chez Interactive Brokers Canada.
            </p>
            <p>
              RIBN est une société financière qui est membre du Fonds canadien de protection des épargnants. Ce dernier protège vos fonds jusqu'à 1 000 000 $ (et plus, dans certains cas), dans le cas très peu probable de l'insolvabilité de l'institution financière.
            </p>
            <p>
              Dans le cadre de son mandat, MEYE ASSET MANAGER transmet des instructions à RIBN, mais n'a en aucun cas accès aux actifs contenus dans votre compte.
            </p>
          </div>
        </div>

        <!-- Privacy Policy -->
        <div class="two-column-layout mb-16">
          <div>
            <h2>Politique de confidentialité</h2>
            <div class="prose-content">
              <p>
                Afin de se conformer à la Loi sur la protection des renseignements personnels et les documents électroniques (« LPRPDE ») et à la Loi sur la protection des renseignements personnels dans le secteur privé (Québec), MEYE ASSET MANAGER a mis en place une politique de confidentialité.
              </p>
              <p>
                Martin Lalonde, responsable de la conformité de MEYE ASSET MANAGER, est responsable de la confidentialité des renseignements personnels.
              </p>
            </div>
          </div>
          <div class="sidebar">
            <div class="sidebar-nav">
              <p class="mb-4">Politique de confidentialité</p>
              <a href="#" class="link-with-arrow">
                Télécharger
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Complaint Handling Policy -->
        <div class="two-column-layout">
          <div>
            <h2>Politique de traitement des plaintes</h2>
            <div class="prose-content">
              <p>
                Nous nous engageons à garantir que toutes les plaintes sont traitées rapidement, équitablement et de manière transparente. Notre objectif est de résoudre efficacement les situations qui sont à l'origine de vos préoccupations.
              </p>
            </div>
          </div>
          <div class="sidebar">
            <div class="sidebar-nav">
              <p class="mb-4">Résumé de la politique de traitement des plaintes</p>
              <a href="#" class="link-with-arrow">
                Télécharger
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class GovernanceComponent {}
