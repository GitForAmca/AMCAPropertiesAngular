import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  http = inject(HttpClient);

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
  get countryCode(): AbstractControl {
    return this.cvForm.get('countryCode')!;
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
  uploadedFileName: string = '';
  uploadedFileUrl: string = '';

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
            countryCode: uae.countryISDCode,
          });
        }
      });
  }
  get fileStatusText(): string {
    return this.uploadedFileName
      ? `Selected file: ${this.uploadedFileName}`
      : 'Click or drag a file to this area to upload';
  }
  onDragOver(event: DragEvent) {
    event.preventDefault(); // ✅ prevents default browser behavior
  }

  onDrop(event: DragEvent) {
    event.preventDefault(); // ✅ required for drop to work properly

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  processFile(file: File) {
    this.uploadedFileName = file.name;
    // Upload logic goes here
  }

  triggerFileSelect() {
    if (this.fileInputRef?.nativeElement) {
      // Reset kar rahe hain taaki same file select karne par bhi change event fire ho
      this.fileInputRef.nativeElement.value = '';
      // File dialog open karo
      this.fileInputRef.nativeElement.click();
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.uploadedFileName = file.name;
    const formData = new FormData();
    formData.append('file', file);
    this.cvUpload.markAsTouched();
    this.cvForm.get('cvUpload')?.updateValueAndValidity();
    this.http
      .post<any>('https://localhost:7038/api/SubmitCareerCV', formData)
      .subscribe({
        next: (res) => {
          if (res && res.url) {
            this.cvUpload.setValue(res.url);
          } else {
            this.uploadedFileName = '';
          }
          this.cvUpload.markAsTouched();
          this.cvUpload.updateValueAndValidity();
        },

        error: (err) => {
          console.error('File upload failed:', err);
          this.cvUpload.setValue('');
          this.uploadedFileName = '';
        },
      });
  }

  onSave() {
    if (this.cvForm.invalid) {
      this.cvForm.markAllAsTouched();
      return;
    }

    const payload = {
      Name: this.cvForm.get('name')?.value,
      Email: this.cvForm.get('email')?.value,
      CountryCode: this.cvForm.get('countryCode')?.value,
      MobileNo: this.cvForm.get('mobileNo')?.value,
      Supporting: this.cvForm.get('cvUpload')?.value,
    };

    this.submitCvService.AddCareersCvLead(payload).subscribe({
      next: (result: any) => {
        if (result) {
          // Reset form (exclude file input)
          const countryCode = this.cvForm.get('countryCode')?.value;
          this.cvForm.reset({
            countryCode: countryCode,
          });
          // Reset file name
          setTimeout(() => {
            this.uploadedFileName = '';
          }, 1000);
          const uae = this.countrylisinterface.find((c) => c.countryID === 221);
          if (uae) {
            this.cvForm.patchValue({
              countryCode: uae.countryISDCode,
            });
          }
          // Success message logic
          this.isSubmitted = true;
          this.headingText = 'Success';
          this.messagePoppup = "Thanks, we've received your request.";
          this.messagepopup.open();
          this.isModalOpen = false;
        }
      },
      error: (err) => {
        console.error('API Error:', err);
        this.isSubmitted = false;
        this.headingText = 'Error';
        this.messagePoppup = 'Something went wrong';
        this.messagepopup.open();
        this.isModalOpen = false;
      },
    });
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
