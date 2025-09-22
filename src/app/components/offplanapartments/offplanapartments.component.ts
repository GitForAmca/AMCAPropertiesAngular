import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PropertieslistComponent } from '../propertieslist/propertieslist.component';

@Component({
  selector: 'app-offplanapartments',
  standalone: true,
  imports: [CommonModule, PropertieslistComponent],
  templateUrl: './offplanapartments.component.html',
  styleUrl: './offplanapartments.component.scss',
})
export class OffplanapartmentsComponent {
  faqs = [
    {
      question: 'What is the process involved in buying off-plan apartments?',
      answer: `<p class="text-muted mb-4">
                        <strong>The step-by-step process involved in buying off-plan apartments are listed below</strong>
                    </p>
                    <ul class="text-muted mb-4">
                        <li>Research the Market</li>
                        <li>Choose a Developer</li>
                        <li>Set a budget</li>
                        <li>Review Contracts</li>
                        <li>Make a Reservation</li>
                        <li>Finalize Financing</li>
                        <li>Monitor the Development Progress</li>
                    </ul>`,
      open: false,
    },
    {
      question: 'Can foreigners buy off-plan property in Dubai?',
      answer: `<p class="text-muted mb-4">Yes off-plan property is designated in freehold areas, any foreigner can buy off-plan property, and no local sponsor is needed.</p>`,
      open: false,
    },
    {
      question: 'What’s the usual down payment?',
      answer: `<p class="text-muted mb-4">Every project is different, most developers ask for 10% to 20% upfront, followed by milestone payments.</p>`,
      open: false,
    },
    {
      question: 'Is off plan cheaper than ready property?',
      answer: `<p class="text-muted mb-4">Yes, off-plan projects are cheaper than ready projects. Off-plan launches often offer lower entry prices and extended payment schedules.</p>`,
      open: false,
    },
    {
      question: 'What’s the process of buying off-plan property?',
      answer: `<p class="text-muted mb-4">
                        <strong>The buying of off-plan property in Dubai typically includes:</strong>
                    </p>
                    <ul class="text-muted mb-4">
                        <li>Choosing a unit</li>
                        <li>Paying a booking fee</li>
                        <li>Signing the SPA</li>
                        <li>Making payments overtime</li>
                    </ul>`,
      open: false,
    },
    {
      question:
        'What are the Benefits of Purchasing Off-Plan Property in Dubai?',
      answer: `<p class="text-muted mb-4">Buying off-plan property offers many benefits, including lower prices, early discounts,
and flexible payment plans. This reduces the financial burden for buyers and allows
them to plan payments over the construction period. Off-plan properties also have
strong potential for capital appreciation as the project progresses, especially in high-
demand areas. Buyers can often choose prime units and sometimes customize aspects
of the property.</p>`,
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
