import { Component } from '@angular/core';
import { DevelopersService } from '../../service/developers.service';
import { Router, RouterLink } from '@angular/router';
import { IActiveDeveloper } from '../../model/interface/IActiveDeveloper';
import { ActiveDeveloper } from '../../model/class/ActiveDeveloper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.scss'
})
export class DevelopersComponent {


  ngOnInit() : void {
    this.GetAtiveDevelopersList();
  }

  constructor(private developersList : DevelopersService, private router : Router) {}

  activeDeveloper : IActiveDeveloper [] = [];
  activeDeveloperobj : ActiveDeveloper = new ActiveDeveloper();

  GetAtiveDevelopersList() {
    this.developersList.GetActiveDevelopers(this.activeDeveloperobj).subscribe((result: any) => {
      this.activeDeveloper = result;
    });
  }
 
  FilterPropertiesByDeveloper(developerId : number){
    this.router.navigate(['/property-list'], { queryParams: { developerId } });
  }

} 
