import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, RouterLink,ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
   email : string = "info@amcaproperties.com"

    subscribeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
   
      email: new FormControl('', [Validators.required, Validators.email])
  })
  formValue: any;
  onSave(){
    this.formValue = this.subscribeForm.value;
  }
}

