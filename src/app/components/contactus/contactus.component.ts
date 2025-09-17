import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactusenquiryformComponent } from "../../reusableComponent/contactusenquiryform/contactusenquiryform.component";
import { MessagepopupComponent } from "../../reusableComponent/messagepopup/messagepopup.component";

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgSelectModule, ContactusenquiryformComponent, MessagepopupComponent],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {
  @ViewChild('messagepopup') messagepopup: any;
  contactEmail : string = "info@amcaproperties.com";
  headingText = '';
  messagePoppup = '';
  IsSuccess = false;

  handleEnquiry(event: { success: boolean, message: string }) {
    // Set message popup content
    this.IsSuccess = event.success;
    this.headingText = event.success ? 'Success' : 'Error';
    this.messagePoppup = event.message;

    // Open message popup safely in parent
    setTimeout(() => this.messagepopup.open(), 0);
  }
}