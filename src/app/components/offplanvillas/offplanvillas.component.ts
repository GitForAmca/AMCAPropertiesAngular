import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PropertieslistComponent } from "../propertieslist/propertieslist.component";

@Component({
  selector: 'app-offplanvillas',
  standalone: true,
  imports: [CommonModule, PropertieslistComponent],
  templateUrl: './offplanvillas.component.html',
  styleUrl: './offplanvillas.component.scss'
})
export class OffplanvillasComponent {
  faqs = [
    {
      question: 'What are off-plan villas?',
      answer: `<p class="text-muted mb-4">
                        Off-plan villas are properties that are not yet constructed but are sold based on blueprints, project plans and 3D renders.
                    </p>`,
      open: false
    },
    {
      question: 'Why choose AMCA Properties for off-plan villas in Dubai?',
      answer: `<p class="text-muted mb-4">AMCA Properties is one of the most trusted agencies in Dubai. We provide developers who are known for delivering high-quality communities, well-timed projects, and excellent capital value. Their villa projects are ideal for both investors and end-users.</p>`,
      open: false
    },
    {
      question: 'What are the key factors in choosing off-plan villas?',
      answer: `<p class="text-muted mb-4">Selecting the right off plan villas in Dubai is not a small task,
       the factors listed below play an important role in your decision making:</p>
       
        <ul class="text-muted mb-4">
                        <li>Location Considerations</li>
                        <li>Villa Specifications and Amenities</li>
                        <li>Understanding Payment Plans</li>
                        <li>Legal Aspects of Off Plan Purchases</li>
                        <li>Financing Options</li>
                    </ul>
       `,
      open: false
    },
    {
      question: 'What are the benefits of purchasing off plan villas?',
      answer: `<p class="text-muted mb-4">
                        Off plan villas often come to discussions because of their attractive attributes. Buying off plan also has many benefits. Buyers are required to invest in small deposits. They will not only invest less but also gain when property rises. They also have the opportunity for customization.
                    </p>`,
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
