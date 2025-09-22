import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { SubscribeFormService } from '../../subscribe-form.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
   email : string = "info@amcaproperties.com"
    subscribeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email])
  })
 isSubscribed = false;
  /**
   *
   */
  constructor(private subscribe: SubscribeFormService) {}
  formValue: any;
   onSave(){
    // this.subscribe.saveSubscription(this.subscribeForm.value).subscribe((result)=>{
    //   if(result)  {
    //   alert('Subscription successful!');
    //   console.log(result)
    //   console.log(this.subscribeForm.get('name')?.value)
    //   console.log(this.subscribeForm.value.email)
    //   this.subscribeForm.reset();
    //   this.isSubscribed = true;
    //   // Hide the message after 3 seconds
    //   setTimeout(() => this.isSubscribed = false, 3000);
    // }
    // })
  }
}

