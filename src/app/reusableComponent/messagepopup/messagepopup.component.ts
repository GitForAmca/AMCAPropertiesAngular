import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messagepopup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messagepopup.component.html',
  styleUrl: './messagepopup.component.scss'
})
export class MessagepopupComponent {
  IsModalOpen = false;

  @Input() headingpopup : string = "";
  @Input() textpopup : string = "";
  @Input() IsSuccesspopup = false;

  open(){
    document.body.style.overflow = 'hidden';
    this.IsModalOpen = true;
  }
  CloseModal() {
    this.IsModalOpen = false;
    document.body.style.overflow = 'auto';
  }
}
