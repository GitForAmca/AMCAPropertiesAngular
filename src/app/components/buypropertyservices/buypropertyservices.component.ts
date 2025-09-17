import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buypropertyservices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buypropertyservices.component.html',
  styleUrl: './buypropertyservices.component.scss'
})
export class BuypropertyservicesComponent {
  faqs = [
    {
      question: 'What are the steps involved in buying a property in Dubai?',
      answer: `<p class="text-muted mb-4">
                  The steps to buying property in Dubai include defining your budget, applying for pre-approval, finding the best agent, preparing documents, making an offer, signing the MOU, and transferring the property.  
              </p>`,
      open: false
    },
    {
      question: 'What documents are required to buy property in Dubai?',
      answer: `<p class="text-muted mb-4 fw-bold">Required documents for a mortgage may include </p>
      <ol class="text-muted mb-4">
                        <li>Passport</li>
                        <li>Visa</li>
                        <li>Emirates ID (if a resident)</li>
                        <li>Pre-approval of a mortgage</li>
                        <li>Financial documents</li>
                    </ol>`,
      open: false
    },
    {
      question: 'Can foreigners buy a property in Dubai?',
      answer: `<p class="text-muted mb-4 fw-bold">The emirate’s law allows non-resident foreign property ownership in Dubai. Residents and non-residents from foreign countries can buy properties only in the designated freehold areas in Dubai. Some designated freehold areas in Dubai are listed below:</p>
      <ol class="text-muted mb-4">
                        <li>Dubai Marina</li>
                        <li>Palm Jumeirah</li>
                        <li>Downtown Dubai</li>
                        <li>Arabian Ranches</li>
                        <li>Jumeirah Village Circle</li>
                    </ol>`,
      open: false
    },
    {
      question: 'How long does it take to buy a property in Dubai?',
      answer: `<p class="text-muted mb-4">
                  The process of buying a property in Dubai can take 30-60 days, depending on factors like financing and legal procedures. The process will be quick and can be completed within a few weeks, if you are a cash seller and cash buyer, whereas a mortgage buyer or mortgage seller will lead to the process taking slightly longer. 
              </p>`,
      open: false
    },
    {
      question: 'How much does it cost to buy a property in Dubai?',
      answer: `<p class="text-muted mb-4 fw-bold">There are a few additional costs with the sales price that every buyer must know when buying a property in Dubai. Additional costs include:</p>
      <ol class="text-muted mb-4">
                        <li>DLD Transfer Fee: 4% of the purchase price</li>
                        <li>Agency commission: 2% of the purchase price</li>
                        <li>Mortgage registration fee: 0.25% of the loan amount</li>
                        <li>Loan establishment fee varies by bank</li>
                        <li>Conveyancing fee: varies based on provider and property type</li>
                    </ol>`,
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
