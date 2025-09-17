import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PropertieslistComponent } from "../propertieslist/propertieslist.component";

@Component({
  selector: 'app-villasforsale',
  standalone: true,
  imports: [CommonModule, PropertieslistComponent],
  templateUrl: './villasforsale.component.html',
  styleUrl: './villasforsale.component.scss'
})
export class VillasforsaleComponent {
  
  faqs = [
    {
      question: 'Why Invest in Villas in Dubai?',
      answer: `<p class="text-muted mb-4">
        Villas in Dubai are highly sought-after as they offer the perfect blend of comfort, privacy and luxury. Villas are the best option in Dubai's real estate market because they have access to beach views, beautiful gardens, and convenient access to first-rate services. Foreigners and investors looking for high rental yield will love these villas.
      </p>`,
      open: false
    },
    {
      question: 'What are the key benefits of buying a villa in Dubai?',
      answer: `<p class="text-muted mb-4"><strong>The key benefits of buying a villa in Dubai are listed below:</strong></p>
                    <ul class="text-muted mb-4">
                        <li>Diverse Property Options</li>
                        <li>High Rental Yields</li>
                        <li>World-Class Infrastructure</li>
                        <li>Tax-Free Benefits</li>
                    </ul>`,
      open: false
    },
    {
      question: 'Explain the process of buying a villa in Dubai?',
      answer: `<p class="text-muted mb-4"><strong>The step-by-step process of buying a villa in Dubai is:</strong></p>
                    <ul class="text-muted mb-4">
                        <li>Set a Budget</li>
                        <li>Research Properties</li>
                        <li>Hire a Real Estate Agent</li>
                        <li>Inspect the Property</li>
                        <li>Sign a Sales Agreement</li>
                        <li>Secure Financing</li>
                        <li>Complete Legal Formalities</li>
                    </ul>`,
      open: false
    },
    {
      question: 'Why is a luxury villa in Dubai considered the best investment option?',
      answer: `<p class="text-muted mb-4">There are plenty of options available in Dubai for investment, but investing in villas in Dubai is considered the best option as some beautiful areas and developments have many villas for investment. Investors can generate high ROI with a luxury villa in Dubai.</p>`,
      open: false
    },
    {
      question: 'Why are villas in Dubai a cheap alternative to real estate investment?',
      answer: `<p class="text-muted mb-4">The competitive market plays an important role in Dubai’s reducing property prices. The availability of off-plan properties has made top real estate developers compete in Dubai, this has resulted in lowering property prices of villas in Dubai.</p>`,
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
