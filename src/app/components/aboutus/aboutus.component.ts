import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
  faqs = [
    {
      question: 'What services do AMCA Properties offer?',
      answer: `<p class="text-muted mb-4">
                  AMCA Properties offers services like buying, renting, and selling property, mortgages, and property management.
              </p>`,
      open: false
    },
    {
      question: 'What makes AMCA Properties the best among other real estate broker companies?',
      answer: `<p class="text-muted mb-4">We are one of the best real estate brokerages in Dubai because the core principle of our company is reliability and honesty. Our AMCA team offers complete guidance, market insights, and end-to-end support to local and international clients.</p>`,
      open: false
    },
    {
      question: 'Does AMCA Properties help me find my dream home?',
      answer: `<p class="text-muted mb-4">Yes, we help you find your ideal home. Our dedicated team will work closely with you to find the best home that suits your lifestyle.</p>`,
      open: false
    },
    {
      question: 'What are the benefits of buying property for sale in Dubai?',
      answer: `<p class="text-muted mb-4">Buying property for sale in Dubai offers many benefits such as high rental yields, tax-free environment and a growing economy. Dubai continues to attract its investors and residents with its prime location and modern infrastructure.</p>`,
      open: false
    },
    {
      question: 'Can AMCA Properties assist with property investment?',
      answer: `<p class="text-muted mb-4">Yes, AMCA Properties offers expert guidance on property investments by helping you discover the best opportunities for long-term growth. Whether you're a first-time investor or an experienced investor, we provide personalized solutions to achieve the highest possible return on your investment.</p>`,
      open: false
    },
    {
      question: 'Does AMCA Properties handle both commercial and residential properties?',
      answer: `<p class="text-muted mb-4">AMCA Properties provides a well-rounded portfolio that is designed for families, entrepreneurs, and investors.</p>`,
      open: false
    },
    {
      question: 'How do AMCA Properties ensure client satisfaction?',
      answer: `<p class="text-muted mb-4">AMCA Properties will first listen to your needs, offer selected options, and then provide proper advice. We provide our clients with services even after-sales.</p>`,
      open: false
    },
    {
      question: 'How do I ensure a smooth property transaction in Dubai?',
      answer: `<p class="text-muted mb-4">To ensure a smooth property transaction in Dubai, you need to select one real estate agent who is a licensed real estate agent and is familiar with local laws and regulations. They should be able to handle all the paperwork, negotiations, and legal requirements, ensuring a transparent and efficient process from start to end.</p>`,
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
