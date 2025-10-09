import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submitted-cv-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submitted-cv-popup.component.html',
  styleUrl: './submitted-cv-popup.component.scss',
})
export class SubmittedCvPopupComponent {
  IsModalOpen = false;

  @Input() headingpopup: string = '';
  @Input() textpopup: string = '';
  @Input() isSubmitted = false;

  open() {
    document.body.style.overflow = 'hidden';
    this.IsModalOpen = true;
  }
  CloseModal() {
    this.IsModalOpen = false;
    document.body.style.overflow = 'auto';
  }
}
