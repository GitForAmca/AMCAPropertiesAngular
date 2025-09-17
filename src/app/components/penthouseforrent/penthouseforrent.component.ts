import { Component } from '@angular/core';
import { PropertieslistComponent } from "../propertieslist/propertieslist.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-penthouseforrent',
  standalone: true,
  imports: [PropertieslistComponent,CommonModule],
  templateUrl: './penthouseforrent.component.html',
  styleUrl: './penthouseforrent.component.scss'
})
export class PenthouseforrentComponent {
  constructor(){

  }

  faqs = [
    {
      question: 'What types of penthouses are available for rent in Dubai?',
      answer: `<p class="text-muted mb-4">
                        Dubai offers many penthouses like contemporary, modern, and traditional styles. These properties have multiple bedrooms, private pools, Jacuzzis, and expansive terraces with beautiful views. </p>`,
      open: false
    },
    {
      question: 'What are the current rental prices for penthouses in Dubai? ',
      answer: `<p class="text-muted mb-4">Rental prices for penthouses in Dubai range from AED 300,000 to AED 2,000,000 per year, these prices depend on location, amenities and size. </p>`,
      open: false
    },
    {
      question: 'Are there furnished penthouses available for rent in Dubai? ',
      answer: `<p class="text-muted mb-4">Yes, many penthouses are fully furnished, they offer complete interiors and ready-to-move facilities. These furnished options are suitable for foreigners and people looking for hassle-free rental experience. </p>`,
      open: false
    },
    {
      question: 'What are the best areas to rent a penthouse in Dubai? ',
      answer: `<p class="text-muted mb-4">Top areas to rent a penthouse in Dubai are: </p>
      <ul class="text-muted mb-4">
                        <li>Downtown Dubai</li>
                        <li>Palm Jumeirah</li>
                        <li>Dubai Marina</li>
                        <li>Emirates Hills</li>
                        <li>Al Barari</li>
                        <li>Jumeirah Beach Residence </li>
                    </ul>`,
      open: false
    },
    {
      question: 'What is included in rental agreement for penthouse?',
      answer: `<p class="text-muted mb-4">A rental agreement for a penthouse includes terms related to the rental period, monthly rent, maintenance responsibilities, security deposit, and use of amenities.</p>`,
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
