import { Component } from '@angular/core';
import { PropertieslistComponent } from "../propertieslist/propertieslist.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-townhouseforrent',
  standalone: true,
  imports: [PropertieslistComponent,CommonModule],
  templateUrl: './townhouseforrent.component.html',
  styleUrl: './townhouseforrent.component.scss'
})
export class TownhouseforrentComponent {
  constructor(){

  }

  faqs = [
    {
      question: 'Why are Townhouses popular in Dubai? ',
      answer: `<p class="text-muted mb-4">
                        People living in townhouses experience luxury and privacy of the villa with comfort and affordability of an apartment. Townhouse living is suitable for people who wish to live a luxury lifestyle with affordable cost. This is a perfect blend of comfort, luxury and affordability. </p>`,
      open: false
    },
    {
      question: 'What is the average rent for a 2-bedroom townhouse in Dubai? ',
      answer: `<p class="text-muted mb-4">The average rent for a 2-bedroom townhouse is AED 148,056 per year in 2025. But the rental prices can vary depending on a few factors such as location, size and amenities. </p>`,
      open: false
    },
    {
      question: 'What is the average rent for a 3-bedroom townhouse in Dubai? ',
      answer: `<p class="text-muted mb-4">The average rent for a 3-bedroom townhouse is AED 157,095 per year in 2025. However, prices can vary based on location, amenities, and layout. </p>`,
      open: false
    },
    {
      question: 'Are townhouse rentals negotiable in Dubai? ',
      answer: `<p class="text-muted mb-4">Yes, many owners are open to negotiations, especially during off-peak seasons or in communities with higher supply, the rent can be negotiated. </p>`,
      open: false
    },
    {
      question: 'What documents are required to rent a townhouse in Dubai? ',
      answer: `<p class="text-muted mb-4">The documents required to rent a townhouse in Dubai are valid Emirates ID, residence visa, copy of passport and proof of income. If you rent through a company, trade license and authorization letters may also be required. </p>`,
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
