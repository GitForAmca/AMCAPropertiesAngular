import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { UnitDetails } from '../../model/class/UnitDetails';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(private router : Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.mobileMenuOpen = false;
        for (const key in this.submenuOpen) {
          this.submenuOpen[key] = false;
        }
      }
    });
  }
  emailText = "info@amcaproperties.com"
  mobileMenuOpen = false;
  submenuOpen: { [key: string]: boolean } = {
    buy: false,
    rent: false,
    offplan: false,
    services: false
  };
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (!this.mobileMenuOpen) {
      for (const key in this.submenuOpen) {
        this.submenuOpen[key] = false;
      }
    }
  }

  toggleSubmenu(menu: string, event: Event) {
    event.stopPropagation(); // Stop bubbling if needed
    this.submenuOpen[menu] = !this.submenuOpen[menu];
    
    // Optional: close other submenus
    for (const k in this.submenuOpen) {
      if (k !== menu) this.submenuOpen[k] = false;
    };
  }

  UnitListObj : UnitDetails = new UnitDetails();

  GetPropertyList(purpose : number, type : number, status : number){
    debugger
    this.UnitListObj.purpose = purpose;
    this.UnitListObj.unitType = type;
    this.UnitListObj.status = status;

    this.router.navigate(['/property-list'], {
    queryParams: {
        unitType: this.UnitListObj.unitType,
        purpose: this.UnitListObj.purpose,
        status: this.UnitListObj.status
      }
    });

  }
  getBlogscategorywise(blogCategoryId : number){
    this.router.navigate([`/blogs/`, blogCategoryId]);
  }
}
