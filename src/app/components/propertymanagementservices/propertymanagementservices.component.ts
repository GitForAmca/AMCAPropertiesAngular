import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-propertymanagementservices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './propertymanagementservices.component.html',
  styleUrl: './propertymanagementservices.component.scss',
})
export class PropertymanagementservicesComponent {
  faqs = [
    {
      question: 'How much does property management cost in Dubai?',
      answer: `<p class="text-muted mb-4 text-start">
                       Property management in Dubai costs between 5% to 8% of the annual rent. Some property management companies also charge extra for maintenance or tenant placement services. 
                    </p>`,
      open: false,
    },
    {
      question: 'How much do property managers make in Dubai?',
      answer: `<p class="text-muted mb-4 text-start">
                       Property managers in Dubai make AED 8,000 to AED 15,000 per month, depending on their experience and the company they work for. 
                    </p>`,
      open: false,
    },

    {
      question: 'How does property management work in Dubai?',
      answer: `
      <p class="text-muted mb-4 text-start"> Property management company takes care of a property on behalf of the landlord. This includes finding tenants, screening, collecting rent, maintenance, and making sure all legal rules set by DLD and RERA certifications are followed. </p>`,
      open: false,
    },

    {
      question: 'How much do property agents earn in Dubai?',
      answer: `<p class="text-muted mb-4 text-start">Property agents in Dubai usually work on commission. They earn 2% of the property sale value or a share of the rental fee. Their monthly income can vary widely, from AED 10,000 to over AED 50,000, depending on deals closed.</p>`,
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
