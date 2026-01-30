import {
  Component,
  EventEmitter,
  Output,
  output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { AddContactUs } from '../../model/class/AddContactUs';
import { clsGeneral } from '../../model/class/clsGeneral';
import { CountryList } from '../../model/class/CountryList';
import { ICountryList } from '../../model/interface/ICountryList';
import { DropdownsService } from '../../service/dropdowns.service';
import { EnquiryService } from '../../service/enquiry.service';
import { MessagepopupComponent } from '../messagepopup/messagepopup.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-contactusenquiryform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './contactusenquiryform.component.html',
  styleUrl: './contactusenquiryform.component.scss',
})
export class ContactusenquiryformComponent {
  @ViewChild('messagepopup') messagepopup!: MessagepopupComponent;

  @Output() enquirySubmitted = new EventEmitter<{
    success: boolean;
    message: string;
  }>();

  contactForm: FormGroup;
  constructor(
    private dropdownservice: DropdownsService,
    private enquiryservice: EnquiryService,
    private fb: FormBuilder,
  ) {
    this.contactForm = this.fb.group({
      countryCode: [0, [Validators.required]],
      name: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(6),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      message: [
        '',
        [
          Validators.required,
          clsGeneral.minWords(10),
          clsGeneral.noSpecialCharOrUrl(),
        ],
      ],
    });
  }

  get name(): AbstractControl {
    return this.contactForm.get('name')!;
  }
  get phone(): AbstractControl {
    return this.contactForm.get('phone')!;
  }
  get email(): AbstractControl {
    return this.contactForm.get('email')!;
  }
  get message(): AbstractControl {
    return this.contactForm.get('message')!;
  }

  ngOnInit() {
    this.GetCountryList();
  }

  headingText: string = '';
  messagePoppup: string = '';
  IsSuccess = false;
  contactEmail: string = 'info@amcaproperties.com';
  countrylistobj: CountryList = new CountryList();
  countrylisinterface: ICountryList[] = [];
  enquirycontactusobj: AddContactUs = new AddContactUs();

  submitEnquiry() {
    debugger;
    this.enquirycontactusobj = {
      ...this.enquirycontactusobj,
      ...this.contactForm.value,
    };
    this.enquiryservice
      .AddContactUsLead(this.enquirycontactusobj)
      .subscribe((result: any) => {
        debugger;
        if (result.result == 1) {
          const countryCode = this.contactForm.get('countryCode')?.value;
          this.IsSuccess = true;
          this.headingText = 'Success';

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
          <p></br>  
          Name: ${this.enquirycontactusobj.name}</br> 
          Email: ${this.enquirycontactusobj.email}</br> 
          Phone: ${this.enquirycontactusobj.countryCode} ${this.enquirycontactusobj.phone}</br> 
          Message: ${this.enquirycontactusobj.message}
          </br>
          </br>
          Best regards, </br>
           AMCA Properties
          
          </p> `,
            serverName: 'smtp.office365.com',
            portNo: 587,
            ssl: true,
          };
          this.enquiryservice.EmailEnquiry(emailPayload).subscribe((res) => {
            return res;
          });

          this.enquirySubmitted.emit({
            success: true,
            message:
              "Thanks, we've received your request. The agent will contact you soon to confirm.",
          });
          this.contactForm.reset({
            countryCode: countryCode,
          });
        } else {
          this.IsSuccess = false;
          this.headingText = 'Error';
          this.enquirySubmitted.emit({
            success: false,
            message: 'Something went wrong',
          });
        }
      });
  }

  GetCountryList() {
    this.dropdownservice
      .GetCountryList(this.countrylistobj)
      .subscribe((result: any) => {
        this.countrylisinterface = result.map((country: any) => ({
          ...country,
          flag: `https://flagcdn.com/16x12/${country.countryISOCode.toLowerCase()}.png`,
        }));
        const uae = this.countrylisinterface.find((c) => c.countryID === 221);
        if (uae) {
          this.contactForm.patchValue({
            countryCode: uae.countryISDCode,
          });
        }
      });
  }
}
