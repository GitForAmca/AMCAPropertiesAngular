import { Component, ViewChild } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { DropdownsService } from '../../service/dropdowns.service';
import { CountryList } from '../../model/class/CountryList';
import { ICountryList } from '../../model/interface/ICountryList';
import { AddCvCareers } from '../../model/class/AddCvCareers';
import { EnquiryService } from '../../service/enquiry.service';
import { SubmittedCvPopupComponent } from '../submitted-cv-popup/submitted-cv-popup.component';
@Component({
  selector: 'app-career-cv-form',
  standalone: true,
  imports: [
    NgSelectComponent,
    ReactiveFormsModule,
    CommonModule,
    SubmittedCvPopupComponent,
    NgSelectModule,
  ],
  templateUrl: './career-cv-form.component.html',
  styleUrl: './career-cv-form.component.scss',
})
export class CareerCvFormComponent {
  @ViewChild('messagepopup') messagepopup!: SubmittedCvPopupComponent;

  cvForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dropdownservice: DropdownsService,
    private submitCvService: EnquiryService
  ) {
    this.cvForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],

      countryCode: [0, [Validators.required]],
      mobileNo: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      cvUpload: ['', Validators.required],
    });
  }
  isSubmitted = false;
  submitCvFormObj: AddCvCareers = new AddCvCareers();
  ngOnInit() {
    this.GetCountryList();
  }
  get name(): AbstractControl {
    return this.cvForm.get('name')!;
  }
  get email(): AbstractControl {
    return this.cvForm.get('email')!;
  }
  get mobileNo(): AbstractControl {
    return this.cvForm.get('mobileNo')!;
  }
  get cvUpload(): AbstractControl {
    return this.cvForm.get('cvUpload')!;
  }

  countrylistobj: CountryList = new CountryList();
  countrylisinterface: ICountryList[] = [];
  addCvCareersPageObj: AddCvCareers = new AddCvCareers();
  selectedISDCode: string = '';
  headingText: string = '';
  messagePoppup: string = '';
  isModalOpen: boolean = true;

  GetCountryList() {
    this.dropdownservice
      .GetCountryList(this.countrylistobj)
      .subscribe((result: any) => {
        this.countrylisinterface = result.map((country: any) => ({
          ...country,
          flag: `https://flagcdn.com/16x12/${country.countryISOCode.toLowerCase()}.png`,
        }));
        // Set UAE as default
        const uae = this.countrylisinterface.find((c) => c.countryID === 221);
        if (uae) {
          this.cvForm.patchValue({
            countryCode: uae.countryID,
          });
        }
      });
  }

  onSave() {
    this.submitCvFormObj = { ...this.cvForm.value };
    this.submitCvService
      .AddCareersCvLead(this.submitCvFormObj)
      .subscribe((result: any) => {
        if (result) {
          const countryCode = this.cvForm.get('countryCode')?.value;
          this.cvForm.reset();
          this.isSubmitted = true;
          this.headingText = 'Success';
          this.messagePoppup =
            "Thanks, we've received your request. The agent will contact you soon to confirm.";
          this.messagepopup.open();
          this.isModalOpen = false;
          this.cvForm.reset({
            countryCode: countryCode,
          });
          console.log(result);
          alert('successful sumbitted');
        } else {
          this.isSubmitted = false;
          this.headingText = 'Error';
          this.messagePoppup = 'Something went wrong';
          this.messagepopup.open();
          this.isModalOpen = false;
        }
      });
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
