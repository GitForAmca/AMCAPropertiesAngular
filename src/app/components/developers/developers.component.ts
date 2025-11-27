import { Component } from '@angular/core';
import { DevelopersService } from '../../service/developers.service';
import { Router, RouterLink } from '@angular/router';
import { IActiveDeveloper } from '../../model/interface/IActiveDeveloper';
import { ActiveDeveloper } from '../../model/class/ActiveDeveloper';
import { CommonModule } from '@angular/common';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [CommonModule, RouterLink, SkeletonloaderComponent],
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.scss',
})
export class DevelopersComponent {
  ngOnInit(): void {
    this.GetAtiveDevelopersList();
  }
  skeletonArray = Array(6);
  constructor(
    private developersList: DevelopersService,
    private router: Router
  ) {}

  activeDeveloper: IActiveDeveloper[] = [];
  activeDeveloperobj: ActiveDeveloper = new ActiveDeveloper();
  isLoading: boolean = true;

  GetAtiveDevelopersList() {
    this.developersList
      .GetActiveDevelopers(this.activeDeveloperobj)
      .subscribe((result: any) => {
        this.activeDeveloper = result;
        this.isLoading = false;
      });
  }

  FilterPropertiesByDeveloper(developerId: number) {
    this.router.navigate(['/property-list'], { queryParams: { developerId } });
  }

  faqs = [
    {
      question: 'Who are the top real estate developers in the UAE?',
      answer: `<p class="text-muted mb-4">
                       The UAE has many renowned developers, including<strong> Emaar, Damac, Nakheel, Azizi, Danube, Sobha, Arada, and Imtiaz.</strong> Each developer has its own signature projects, ranging from luxury apartments to commercial properties and villas. 
                    </p>`,
      open: false,
    },
    {
      question: 'How do I choose a reliable developer?',
      answer: `<p class="text-muted mb-4">
                       Look for developers with a strong track record of completing projects on time, high-quality construction, transparent payment plans, and positive customer reviews. Regulatory approvals from <strong> RERA (Real Estate Regulatory Authority)</strong> are also essential. 
                    </p>`,
      open: false,
    },
    {
      question: 'Are new projects from developers in UAE safe to invest in?',
      answer: `<p class="text-muted mb-4">
                       Yes, if the developer is reputable and the project is RERA-approved. However, always conduct due diligence, review the master plan, check construction timelines, and read customer feedback before investing. 
                    </p>`,
      open: false,
    },
    {
      question: 'What types of properties do UAE developers offer?',
      answer: `<p class="text-muted mb-4">
                       Developers offer a wide range of options: 
                    </p>
                      <ul class="text-muted mb-4">
                    <li>Residential: Apartments, villas, townhouses, and penthouses</li>
                     <li>Commercial: Office spaces, retail shops, and business centers</li>
                      <li>Mixed-use projects: Integrated communities with amenities</li>
                   
                    </ul>
                    `,
      open: false,
    },

    {
      question: 'How do payment plans work with UAE developers?',
      answer: `<p class="text-muted mb-4">
                      Developers usually offer <strong> flexible payment plans </strong>, such as: 
                    </p>
                      <ul class="text-muted mb-4">
                    <li>10–20% down payment</li>
                     <li>Installments during construction</li>
                      <li>Post-handover payment options (in some cases)Always read the contract carefully to understand all terms.</li>
                   
                    </ul>
                    `,
      open: false,
    },
    {
      question: 'Are there any additional fees besides the property price?',
      answer: `<p class="text-muted mb-4">
                       Yes, buyers may need to pay: 
                    </p>
                    <ul class="text-muted mb-4">
                    <li>DLD (Dubai Land Department) registration fees</li>
                     <li>Service charges/maintenance fees</li>
                      <li>Mortgage or bank processing fees</li>
                   
                    </ul>
                    `,
      open: false,
    },
    {
      question: 'Can foreigners invest in UAE properties?',
      answer: `<p class="text-muted mb-4">
                       Absolutely. The UAE allows <strong> foreign ownership in freehold areas</strong>, meaning non-residents can fully own property in designated zones, such as Dubai Marina, Downtown Dubai, and Palm Jumeirah. 
                    </p>`,
      open: false,
    },
    {
      question: 'How do I know if a developer is credible?',
      answer: `  <ul class="text-muted mb-4">
                    <li>Check the developer’s website and portfolio</li>
                     <li>Look for <strong>completed projects and delivery timelines</strong></li>
                      <li>Verify approvals from <strong>RERA and the Dubai Land Department</strong></li>
                      <li>Read customer testimonials and online reviews</li>
                   
                    </ul>`,
      open: false,
    },
    {
      question: 'What is the role of Amca Properties?',
      answer: `<p class="text-muted mb-4">
                       At <strong>Amca Properties</strong>, we guide investors in selecting the right developers and projects. We provide expert advice, portfolio management, and investment strategies tailored to your goals in UAE real estate. 
                    </p>`,
      open: false,
    },
    {
      question: 'How can I contact a developer for inquiries?',
      answer: `<p class="text-muted mb-4">
                       Most developers have official websites with contact forms, sales offices, or hotline numbers. Working with a trusted agency like <strong>Amca Properties</strong> can streamline communication and ensure you get the best deals. 
                    </p>`,
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
