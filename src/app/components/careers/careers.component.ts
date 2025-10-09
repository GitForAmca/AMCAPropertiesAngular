import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TeamGalleryComponent } from '../team-gallery/team-gallery.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CareerCvFormComponent } from '../career-cv-form/career-cv-form.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [
    CommonModule,
    TeamGalleryComponent,
    ReactiveFormsModule,
    CareerCvFormComponent,
    RouterModule,
  ],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss',
})
export class CareersComponent {
  faqs = [
    {
      question: 'How do I apply for a position at AMCA Properties?',
      answer: `<p class="text-muted mb-4">
                       All job vacancies will be updated on our website. When sending your CV, also attach your cover letter and add a professional photo.
                    </p>`,
      open: false,
    },
    {
      question: 'What are your requirements for Real Estate Agents?  ',
      answer: `<p class="text-muted mb-4">
                       The requirements for Real Estate Agents are:
                    </p>
      <ul class="text-muted mb-4">
                        <li>2 to 3 years of experience in sales</li>
                        <li>Bachelor’s degree</li>
                        <li>UAE Valid Driver’s License  </li>
                        <li>RERA Card (preferred but not required)</li>
                    </ul>`,
      open: false,
    },

    {
      question: 'What are the benefits that you offer to your sales agents?',
      answer: `<ul class="text-muted mb-4">
      
                        <li>An attractive commission</li>
                        <li>1-month training and integration program with our best agents</li>
                        <li>An advanced lead generation system</li>
                         <li>Access to many quality leads and listings</li>
                        <li>Exceptional social media development program</li>
                        <li>Employment Visa and Health Insurance</li>
                        <li>RERA Training and Card</li>
      </ul>`,
      open: false,
    },

    {
      question: 'Is AMCA Properties recruiting now?',
      answer: `<p class="text-muted mb-4">Yes. We are always looking for dynamic and passionate candidates who will contribute to the continuous growth of our company.</p>`,
      open: false,
    },
    {
      question: 'Will training be given when I first join?',
      answer: `<p class="text-muted mb-4">Our team will provide 2-month training and integration program with our best agents. The training process will make sure that your knowledge is linked to the strategy of the company</p>`,
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
