import { Component } from '@angular/core';
import { PropertieslistComponent } from '../propertieslist/propertieslist.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-penthouseforsale',
  standalone: true,
  imports: [PropertieslistComponent, CommonModule],
  templateUrl: './penthouseforsale.component.html',
  styleUrl: './penthouseforsale.component.scss',
})
export class PenthouseforsaleComponent {
  faqs = [
    {
      question: 'Why Choose a Penthouse in Dubai?',
      answer: `<p class="text-muted mb-4">
        Penthouses are more than just a home – they are a definition of perfect living. They offer unmatched elegance, privacy, and security and each unit is designed to deliver perfect lifestyle. Choosing a penthouse is a personal decision, but if you are willing to live with comfort and luxury – investing in penthouse is one of the best options.
      </p>`,
      open: false,
    },
    {
      question: 'Are penthouses in Dubai a good investment?',
      answer: `<p class="text-muted mb-4">Penthouses in Dubai offer comfort and luxurious lifestyles. With their unique features and high demand, they are the best choice for profitable investment. They allow investors to enjoy a luxurious lifestyle while generating significant ROI.</p>
                    `,
      open: false,
    },
    {
      question:
        'What are the most popular areas for buying luxury penthouses in Dubai?',
      answer: `<p class="text-muted mb-4">Palm Jumeirah, Dubai Marina, Downtown Dubai, Dubai Hills Estate, Business Bay and JVC are some of the most popular areas to consider buying luxury penthouses in Dubai.</p>`,
      open: false,
    },
    {
      question: 'Can foreigners buy penthouses in Dubai?',
      answer: `<p class="text-muted mb-4">Yes, foreigners can purchase freehold properties in Dubai in few designated areas. They can also buy and own luxury penthouses if they are in freehold communities such as Downtown Dubai, Palm Jumeirah, etc.</p>`,
      open: false,
    },
    {
      question: 'Is penthouse living suitable for families?',
      answer: `<p class="text-muted mb-4">Yes, penthouses offer spacious layouts with multiple bedrooms and a range of family-friendly facilities, making them suitable living conditions for families.</p>`,
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
