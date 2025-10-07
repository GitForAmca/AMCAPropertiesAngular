import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PropertieslistComponent } from '../propertieslist/propertieslist.component';

@Component({
  selector: 'app-townhouseforsale',
  standalone: true,
  imports: [CommonModule, PropertieslistComponent],
  templateUrl: './townhouseforsale.component.html',
  styleUrl: './townhouseforsale.component.scss',
})
export class TownhouseforsaleComponent {
  faqs = [
    {
      question: 'Why Choose a Townhouse in Dubai?',
      answer: `<p class="text-muted mb-4">
        Buying a townhouse in Dubai is a smart move, especially in a city where lifestyle and amenities continue to evolve. Townhouses offer unique space, comfort and luxury living, making it appealing for families and investors.
      </p>`,
      open: false,
    },
    {
      question: 'What are the steps involved in buying a townhouse in Dubai?',
      answer: `<p class="text-muted mb-4"><strong>The steps involved in buying a townhouse are listed below:</strong></p>
                    <ul class="text-muted mb-4">
                        <li>Define Your Requirements</li>
                        <li>Set a Budget</li>
                        <li>Research the Market</li>
                        <li>Engage with a Real Estate Agent</li>
                        <li>Visit Properties</li>
                        <li>Make an offer</li>
                        <li>Review of legal documents</li>
                        <li>Close the deal</li>
                    </ul>`,
      open: false,
    },
    {
      question: 'How to Buy a Townhouse in Dubai?',
      answer: `<p class="text-muted mb-4">First investigate different projects and areas. Use websites and online resources like Top Luxury Property, check property exhibitions, and talk to real estate agents to buy a townhouse that suits your lifestyle.</p>
                    <ul class="text-muted mb-4">
                        <li>Legal and Financial Due Diligence</li>
                        <li>Negotiation and Booking</li>
                        <li>Mortgage Arrangement (if needed)</li>
                        <li>Sale Agreement and Transfer</li>
                    </ul>`,
      open: false,
    },
    {
      question: 'What makes Dubai land a popular investment destination?',
      answer: `<p class="text-muted mb-4">Dubai land offers themed residential districts and attractions like the IMG Worlds of Adventure Theme Park; this makes townhouses an attractive investment with reasonable prices.</p>`,
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
