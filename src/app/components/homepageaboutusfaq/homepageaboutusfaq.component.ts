import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-homepageaboutusfaq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepageaboutusfaq.component.html',
  styleUrl: './homepageaboutusfaq.component.scss',
})
export class HomepageaboutusfaqComponent {
  faqs = [
    {
      question: 'Why choose AMCA Properties?',
      answer: `<ul class="text-muted mb-4">
                        <li>AMCA Properties provide end-to-end real estate services for buying, selling, and renting in Dubai.</li>
                        <li>With deep expertise in Dubai’s real estate market, AMCA Properties helps clients in discovering properties perfectly positioned with their goals and lifestyle.</li>
                        <li>AMCA Properties offers a full suite of services from property buying and selling to rental and property management.</li>
                        <li>AMCA Properties aims to build long-term relationships with clients. </li>
                    </ul>`,
      open: false,
    },
    {
      question: 'Why work with real estate company?',
      answer: `<p class="text-muted mb-4">Working with the best real estate company in Dubai offers many benefits while searching for property, including access to a booming real estate market, tax reductions, adaptable working hours, rewarding commission rates, and significant compensation. Real estate specialists in Dubai can profit from the city’s outstanding ascent in the real estate market, which can prompt significant financial achievement.</p>`,
      open: false,
    },

    {
      question: 'What is the vision of AMCA Properties?',
      answer: `<p class="text-muted mb-4">AMCA Properties was founded with a vision to review real estate service standards, we
believe that the right property can unlock long-term value and lifestyle benefits in Dubai.
We specialize in residential, commercial, and investment properties across the city’s
most sought-after communities.</p>`,
      open: false,
    },

    {
      question: 'How long does it take to purchase property in Dubai?',
      answer: `<p class="text-muted mb-4">The process of buying a property in Dubai usually takes 30 days, after signing the Memorandum of Understanding. The process can be faster for off-plan properties, that is 1-3 days.</p>`,
      open: false,
    },
    {
      question:
        'What are the key considerations when buying property in Dubai?',
      answer: `<p class="text-muted mb-4">The important factors to consider while working with a registered real estate company are involving the potential return on investment and understanding the ownership laws. Foreigners can own freehold properties in areas like Dubai Marina, JVC and Palm Jumeirah. Also, consider the location's amenities, such as schools and healthcare facilities, to make sure your lifestyle needs are meant.</p>`,
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
