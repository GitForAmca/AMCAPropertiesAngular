import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountryList } from '../../model/class/CountryList';
import { ICountryList } from '../../model/interface/ICountryList';
import { DropdownsService } from '../../service/dropdowns.service';
import { AddContactUs } from '../../model/class/AddContactUs';
import { clsGeneral } from '../../model/class/clsGeneral';
import { EnquiryService } from '../../service/enquiry.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagepopupComponent } from '../messagepopup/messagepopup.component';
import { AddEnquiryForm } from '../../model/class/AddEnquiryForm';
import { AddEnquiryFormProjects } from '../../model/class/AddEnquiryFormProjects';

@Component({
  selector: 'app-enquiryform',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormsModule, CommonModule, NgSelectModule, MessagepopupComponent],
  templateUrl: './enquiryform.component.html',
  styleUrl: './enquiryform.component.scss'
})
export class EnquiryformComponent {

  @ViewChild('messagepopup') messagepopup!: MessagepopupComponent;
  contactForm: FormGroup;
  constructor(
    private dropdownservice: DropdownsService,
    private enquiryservice: EnquiryService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      countryCode: [0, [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(6)
      ]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [
        Validators.required,
        clsGeneral.minWords(10),
        clsGeneral.noSpecialCharOrUrl()
      ]]
    });
  }

  get name(): AbstractControl { return this.contactForm.get('name')!; }
  get phone(): AbstractControl { return this.contactForm.get('phone')!; }
  get email(): AbstractControl { return this.contactForm.get('email')!; }
  get message(): AbstractControl { return this.contactForm.get('message')!; }


  ngOnInit() {
    this.GetCountryList();
  }

  projectId: number = 0;
  headingText: string = "";
  messagePoppup: string = "";
  IsSuccess = false;
  contactEmail: string = "info@amcaproperties.com";
  countrylistobj: CountryList = new CountryList();
  countrylisinterface: ICountryList[] = [];
  enquiryobj: AddEnquiryFormProjects = new AddEnquiryFormProjects();

  submitEnquiry() {
    this.enquiryobj.projectId = this.projectId;
    this.enquiryobj = { ...this.enquiryobj, ...this.contactForm.value }
    this.enquiryservice.AddEnquiryProjectsLead(this.enquiryobj).subscribe((result: any) => {
      if (result.result == 1) {
        const countryCode = this.contactForm.get('countryCode')?.value;
        this.IsSuccess = true;
        this.headingText = "Success";
        this.messagePoppup = "Thanks, we've received your request. The agent will contact you soon to confirm.";
        this.messagepopup.open();
        this.isModalOpen = false;
        this.contactForm.reset({
          countryCode: countryCode
        });
      }
      else {
        this.IsSuccess = false;
        this.headingText = "Error";
        this.messagePoppup = "Something went wrong";
        this.messagepopup.open();
        this.isModalOpen = false;
      }
    })
  }

  GetCountryList() {
    this.dropdownservice.GetCountryList(this.countrylistobj).subscribe((result: any) => {

      this.countrylisinterface = result.map((country: any) => ({
        ...country,
        flag: `https://flagcdn.com/16x12/${country.countryISOCode.toLowerCase()}.png`
      }));
      // Set UAE as default
      const uae = this.countrylisinterface.find(c => c.countryID === 221);
      if (uae) {
        this.contactForm.patchValue({
          countryCode: uae.countryID
        });
      }
    });
  }

  isModalOpen = false;
  open(unitid : number) {
    this.projectId = unitid;
    this.isModalOpen = true;
  }

  close() {
    this.isModalOpen = false;
  }
}
