import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  emailText = 'info@amcaproperties.com';
  contactNoText = '+971 58 507 1024';
}
