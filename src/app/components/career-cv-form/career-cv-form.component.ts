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
import { MessagepopupComponent } from '../../reusableComponent/messagepopup/messagepopup.component';
import { privateDecrypt } from 'crypto';
@Component({
  selector: 'app-career-cv-form',
  standalone: true,
  imports: [
    NgSelectComponent,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    MessagepopupComponent,
  ],
  templateUrl: './career-cv-form.component.html',
  styleUrl: './career-cv-form.component.scss',
})
export class CareerCvFormComponent {
  @ViewChild('messagepopup') messagepopup!: MessagepopupComponent;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  http = inject(HttpClient);

  cvForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dropdownservice: DropdownsService,
    private submitCvService: EnquiryService,
    private fileUploadService: EnquiryService
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
          Validators.minLength(4),
          Validators.maxLength(17),
        ],
      ],
      cvUpload: [null, Validators.required],
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
  IsSuccess: boolean = false;
  loading: boolean = false;
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

  onDragOver(event: DragEvent) {
    event.preventDefault(); //  prevents default browser behavior
  }

  onDrop(event: DragEvent) {
    event.preventDefault(); // required for drop to work properly

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

  onFileChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const file = inputEl.files?.[0];

    this.cvUpload.markAsTouched(); // ✅ always mark as touched
    this.cvUpload.updateValueAndValidity();

    if (!file) {
      // If user cancels the dialog
      return;
    }

    this.uploadedFileName = file.name;
    this.cvUpload.setValue(file);
  }

  onSave() {
    if (this.cvForm.invalid) {
      this.cvForm.markAllAsTouched();
      return;
    }

    const inputEl = this.fileInputRef.nativeElement;
    if (!inputEl.files || inputEl.files.length === 0) {
      console.warn('No file selected to upload');
      return;
    }

    const file = inputEl.files[0];

    const formData = new FormData();
    formData.append('file', file);

    this.fileUploadService.AdduploadCV(file).subscribe({
      next: (uploadRes) => {
        if (!uploadRes || !uploadRes.url) {
          console.warn('Upload failed: No URL returned.');
          this.cvUpload.setValue(null);
          this.uploadedFileName = '';
          this.cvUpload.markAsTouched();
          this.cvUpload.updateValueAndValidity();
          return;
        }

        // Set form control with the uploaded file URL
        //this.cvUpload.setValue(uploadRes.url);   error12345

        // Clear file input UI safely by resetting its value to empty string
        inputEl.value = '';
        this.uploadedFileName = '';

        // Simulate a network request or some async operation
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
        const payload = {
          Name: this.cvForm.get('name')?.value,
          Email: this.cvForm.get('email')?.value,
          CountryCode: this.cvForm.get('countryCode')?.value,
          MobileNo: this.cvForm.get('mobileNo')?.value,
          Supporting: uploadRes.url,
        };
        if (uploadRes.result === 1 && uploadRes.url) {
          this.submitCvService.AddCareersCvLead(payload).subscribe({
            next: (res) => {
              // Reset form but keep countryCode
              const countryCode = this.cvForm.get('countryCode')?.value;
              this.cvForm.reset({ countryCode: countryCode });

              // Clear filename display after 1 sec
              setTimeout(() => {
                this.uploadedFileName = '';
              }, 0);

              // Patch UAE ISD code again
              const uae = this.countrylisinterface.find(
                (c) => c.countryID === 221
              );
              if (uae) {
                this.cvForm.patchValue({ countryCode: uae.countryISDCode });
              }

              // Show success popup

              this.IsSuccess = true;
              this.headingText = 'Success';
              this.messagePoppup =
                "Thanks, we've received your request. The agent will contact you soon to confirm.";
              this.messagepopup.open();
              this.isModalOpen = false;
            },
            error: (err) => {
              console.error('AddCareersCvLead API Error:', err);
              this.IsSuccess = false;
              this.headingText = 'Error';
              this.messagePoppup =
                'Something went wrong while submitting your request.';
              this.messagepopup.open();
              this.isModalOpen = false;
            },
          });
        }
      },
      error: (uploadErr) => {
        console.error('Upload failed:', uploadErr);
        this.cvUpload.setValue(null);
        this.cvUpload.markAsTouched();
        this.cvUpload.updateValueAndValidity();

        this.isSubmitted = false;
        this.headingText = 'Error';
        this.messagePoppup = 'File upload failed. Please try again.';
        this.messagepopup.open();
        this.isModalOpen = false;
      },
    });
  }

  clearFileInput() {
    this.fileInputRef.nativeElement.value = ''; // resets file input
    this.uploadedFileName = '';
    this.cvUpload.setValue('');
    this.cvUpload.markAsTouched();
    this.cvUpload.updateValueAndValidity();
  }
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
