import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdownselector',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dropdownselector.component.html',
  styleUrl: './dropdownselector.component.scss'
})
export class DropdownselectorComponent {
  @Input() options: any[] = [];
  @Input() selectedValue: any;
  @Output() selectedValueChange = new EventEmitter<any>();
  @Input() label: string = '';
}
