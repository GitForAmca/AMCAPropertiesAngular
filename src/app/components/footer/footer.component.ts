import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddUserSubscription } from '../../model/class/AddUserSubscription';
import { EnquiryService } from '../../service/enquiry.service';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  email: string = 'info@amcaproperties.com';
  subscribeForm: FormGroup;
  constructor(
    private subscribeService: EnquiryService,
    private fb: FormBuilder,
  ) {
    this.subscribeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  isSubscribed = false;
  subscribeFormobj: AddUserSubscription = new AddUserSubscription();

  /**
   *
   */
  get name(): AbstractControl {
    return this.subscribeForm.get('name')!;
  }
  get emailD(): AbstractControl {
    return this.subscribeForm.get('email')!;
  }
  onSave() {
    this.subscribeFormobj = { ...this.subscribeForm.value };
    this.subscribeService
      .AddSubscriptionLead(this.subscribeFormobj)
      .subscribe((result: any) => {
        if (result) {
          // this.subscribeForm.reset();
          this.isSubscribed = true;
          setTimeout(() => (this.isSubscribed = false), 3000);

          const emailPayload = {
            fromMailId: 'notification@amcaproperties.com',
            fromEmailPassword: 'Notip98523',
            toMailId: 'notification@amcaproperties.com',
            subject: 'New Client Enquiry Received – AMCA Properties',
            body: `
            <p>Dear Team,</p>
             <p>
         This automated email is issued to formally notify you that a new client enquiry has been received. 
        </br>
          Kindly review the request and take the necessary follow-up actions accordingly.
        </p>
            <p>
              <strong>Name:</strong> ${this.subscribeFormobj.name}<br/>
              <strong>Email:</strong> ${this.subscribeFormobj.email}<br/>
            </p>
            <p>Regards,<br/>
            AMCA Properties</p>
          `,
            serverName: 'smtp.office365.com',
            portNo: 587,
            ssl: true,
          };

          this.subscribeService.EmailEnquiry(emailPayload).subscribe(() => {
            this.subscribeForm.reset();
            this.isSubscribed = true;
            setTimeout(() => (this.isSubscribed = false), 3000);
          });
        }
      });
  }
}
