import { Component } from '@angular/core';
import { PropertieslistComponent } from "../propertieslist/propertieslist.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apartmentsforrent',
  standalone: true,
  imports: [PropertieslistComponent,CommonModule],
  templateUrl: './apartmentsforrent.component.html',
  styleUrl: './apartmentsforrent.component.scss'
})
export class ApartmentsforrentComponent {
  constructor(){

  }

  faqs = [
    {
      question: 'How much does it cost to rent an apartment in Dubai?',
      answer: `<p class="text-muted mb-4">
                        The cost to rent an apartment in Dubai in central locations can be significantly high, prices vary from EUR 25 000 - 40 000 per year for apartments with a high standard in Dubai Marina. </p>`,
      open: false
    },
    {
      question: 'Is it worth renting an apartment in Dubai? ',
      answer: `<p class="text-muted mb-4">Renting an apartment in Dubai is the best solution for foreigners and people planning for a longer stay in the United Arab Emirates. The cost of renting apartments in Dubai varies depending on the location, size and standard of living. The cost can also be adjusted according to your financial possibilities. </p>`,
      open: false
    },
    {
      question: 'What are the popular locations to rent an apartment in Dubai? ',
      answer: `<p class="text-muted mb-4">The most popular locations to rent an apartment in Dubai are Dubai Marina, Business Bay, Jumeirah Lake Towers (JLT), and Jumeirah Village Circle (JVC). </p>`,
      open: false
    },
    {
      question: 'How much does it cost to rent a studio apartment in Dubai? ',
      answer: `<p class="text-muted mb-4">For those looking to rent a studio apartment in Dubai, the cost can start from AED 42000 per year in less popular locations such as Dubai Sports City, Al Barsha or Jumeirah Village Circle. </p>`,
      open: false
    },
    {
      question: 'Is renting an apartment in Dubai affordable for foreigners? ',
      answer: `<p class="text-muted mb-4">Renting an apartment is affordable for foreigners, and the procedures to rent are usually simple and direct.  </p>`,
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
