import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class clsGeneral {

  // Validator to block special characters and URLs
  static noSpecialCharOrUrl(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      
      // Regex to detect URLs
      const urlPattern = /(https?:\/\/[^\s]+)/g;
      // Regex to detect special characters (allow letters, numbers, spaces, basic punctuation)
      const specialCharPattern = /[^a-zA-Z0-9.,!?()'" \n\r]/g;

      if (urlPattern.test(value) || specialCharPattern.test(value)) {
        return { invalidContent: true };
      }

      return null;
    };
  }

  // Example: min words validator
  static minWords(minWords: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const words = value.trim().split(/\s+/).filter((w: string) => w.length > 0);
      return words.length >= minWords ? null : { minWords: true };
    };
  }

}
