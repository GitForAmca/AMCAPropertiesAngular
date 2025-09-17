import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rentpropertyservices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rentpropertyservices.component.html',
  styleUrl: './rentpropertyservices.component.scss'
})
export class RentpropertyservicesComponent {
  faqs = [
    {
      question: 'How long does renting a property in Dubai take place?',
      answer: `<p class="text-muted mb-4">
                  Renting a property in Dubai depends on several factors like your timeline, documentation, and whether you’re being supported by a reputable real estate agency. AMCA Properties has helped many clients to find their rental property. After you’ve found your rental property, note that the easiest possible date to move in will be approximately five days from the date you sign the contract – By this time you need to register your Ejari, activate electricity and water services. 
              </p>`,
      open: true
    },
    {
      question: 'What is Ejari?',
      answer: `<p class="text-muted mb-4">Ejari is a process that all tenants require to complete to register their tenancy contract. After signing the agreement, you’ll have to take it to an Ejari center with documents provided by your property consultant and there you need to pay a minimum fee of AED 215 + 5% VAT.</p>`,
      open: false
    },
    {
      question: 'What about water and electricity?',
      answer: `<p class="text-muted mb-4">Once Ejari is completed, DEWA (Dubai Electricity and Water Authority) will send you a welcome SMS and email with your account and premises number, and a link to pay the security deposit. Once the security deposit is paid, electricity and water services will be activated within 24 hours.</p>`,
      open: false
    },
    {
      question: 'What are the documents required for renting a property in Dubai?',
      answer: `<p class="text-muted mb-4 fw-bold">Once you find your new rental property, you will need the documents listed below:</p>
      <ol class="text-muted mb-4">
                        <li>Tenancy contract </li>
                        <li>Cheque</li>
                    </ol>`,
      open: false
    },
    {
      question: 'Do I need a move-in permit?',
      answer: `<p class="text-muted mb-4">Some communities and apartments will require move-in permit to ensure that the movers can access the road and common areas easily to reach your home. In some locations move-in permit is mandatory.</p>`,
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
