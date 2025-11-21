import { Component } from '@angular/core';
import { PropertieslistComponent } from '../propertieslist/propertieslist.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-villasforrent',
  standalone: true,
  imports: [PropertieslistComponent, CommonModule, RouterLink],
  templateUrl: './villasforrent.component.html',
  styleUrl: './villasforrent.component.scss',
})
export class VillasforrentComponent {
  constructor() {}

  faqs = [
    {
      question: 'What are the benefits of renting a villa in Dubai? ',
      answer: `<p class="text-muted mb-4">The benefits of renting a villa in Dubai are: </p>
                        <ul class="text-muted mb-4">
                          <li>Villas in Dubai are popular for their space; they offer more living space than apartments or townhouses. These are perfect for families. </li>
                          <li>Villas provide more privacy compared to apartments and townhouses. </li>
                          <li>Villas are perfect for relaxing or hosting gatherings and they have outdoor areas, such as gardens or balconies. </li>
                      </ul>`,
      open: false,
    },
    {
      question: 'What is the average cost of renting a villa in Dubai?  ',
      answer: `<p class="text-muted mb-4">The average cost of renting a villa in Dubai varies depending on the location and size of the estate. However, the average price in Dubai is around AED 200,000 per year. </p>`,
      open: false,
    },
    {
      question: 'Do villas come furnished or unfurnished? ',
      answer: `<p class="text-muted mb-4">Villas come both as furnished and unfurnished, this depends on the owner’s preference. You need to clarify this before signing a rent agreement. </p>`,
      open: false,
    },
    {
      question: 'Can I negotiate the rent for a villa in Dubai? ',
      answer: `<p class="text-muted mb-4">Yes, it is possible to negotiate the rent for a villa, especially if you are willing to sign a long-term agreement. </p>`,
      open: false,
    },
    {
      question: 'What are the types of villas for rent in Dubai? ',
      answer: `<p class="text-muted mb-4">The types of villas for rent in Dubai are listed below: </p>
      <ul class="text-muted mb-4">
                        <li>Independent Villas </li>
                        <li>Compound Villas </li>
                        <li>Semi-detached Villas </li>
                    </ul>`,
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
