import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PropertieslistComponent } from '../propertieslist/propertieslist.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-apartmentsforsale',
  standalone: true,
  imports: [CommonModule, PropertieslistComponent, RouterLink],
  templateUrl: './apartmentsforsale.component.html',
  styleUrl: './apartmentsforsale.component.scss',
})
export class ApartmentsforsaleComponent {
  constructor() {}

  faqs = [
    {
      question:
        'What is the difference between buying a villa and an apartment in Dubai?',
      answer: `<p class="text-muted mb-4">
                        <strong>Villas</strong> offer more space and privacy, and they also come with private gardens and pools. Villas have higher maintenance costs compared to apartments
                    </p>
                    <p class="text-muted mb-4"><strong>Apartments</strong> come with shared facilities like pools, gyms, and security services. The maintenance cost is less in apartments.</p>`,
      open: false,
    },
    {
      question: 'What are the popular areas for buying apartments in Dubai?',
      answer: `<p class="text-muted mb-4"><strong>Here are some of the most popular areas to buy apartments in Dubai:</strong></p>
                    <ul class="text-muted mb-4">
                        <li>Downtown Dubai</li>
                        <li>Palm Jumeirah</li>
                        <li>Jumeirah Village Circle</li>
                        <li>Dubai Marina</li>
                    </ul>`,
      open: false,
    },
    {
      question: 'What are the types of apartments for sale in Dubai?',
      answer: `<ul class="text-muted mb-4 custom-list" style="list-style-type: disc; padding-left: 20px;">
    <li>Studio apartment</li>
    <li>1-bedroom apartment</li>
    <li>2-bedroom apartment</li>
    <li>3-bedroom apartment</li>
    <li>Luxury apartment</li>
</ul>`,
      open: false,
    },
    {
      question:
        'What is the property cost involved while buying an apartment in Dubai?',
      answer: `<p class="text-muted mb-4"><strong>Before buying an apartment in Dubai, you need to know about ownership cost before purchase cost:</strong></p>
                    <ul class="text-muted mb-4">
                        <li>Minimum Down Payment must be 20-25% of property price.</li>
                        <li>Dubai Land Department (DLD) Fee must be 4% of property value.</li>
                        <li>Agency Fee must be 2% of property price.</li>
                        <li>Annual fees will be set by square footage and amenities.</li>
                    </ul>`,
      open: false,
    },
    {
      question: 'Why should you buy an apartment in Dubai?',
      answer: `<p class="text-muted mb-4">Dubai has emerged as a global investment destination for many reasons. With its tax-free policies, strong rental yields and luxurious lifestyle Dubai has become the perfect city for great experience and comfortable housing. </p>`,
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
