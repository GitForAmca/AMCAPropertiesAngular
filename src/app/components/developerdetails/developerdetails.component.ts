import { Component, Input } from '@angular/core';
import { PropertieslistComponent } from "../propertieslist/propertieslist.component";
import { DevelopersService } from '../../service/developers.service';
import { ActivatedRoute } from '@angular/router';
import { Developers } from '../../model/class/Developer';
import { IDeveloper } from '../../model/interface/IDeveloper';
import { IActiveDeveloper } from '../../model/interface/IActiveDeveloper';
import { ActiveDeveloper } from '../../model/class/ActiveDeveloper';
import { ProjectlistComponent } from "../projectlist/projectlist.component";

@Component({
  selector: 'app-developerdetails',
  standalone: true,
  imports: [ProjectlistComponent],
  templateUrl: './developerdetails.component.html',
  styleUrl: './developerdetails.component.scss'
})
export class DeveloperdetailsComponent {
  @Input() url : string = "";
  @Input() StatusId : number = 1;

  PageTitle : string = "";
  PageDescription : string = "";
  
    constructor(
      private developerservice : DevelopersService,
      private route : ActivatedRoute
    )
    {}
  
    ngOnInit() : void{
      debugger
      this.url = this.route.snapshot.paramMap.get('URL')!;
      this.activeDeveloperobj.url = this.url;

  
      this.developerservice.GetActiveDevelopers(this.activeDeveloperobj).subscribe((result : any) =>{
        this.activeDeveloper = result;
        this.PageTitle = this.activeDeveloper[0].developersName;
        this.PageDescription = this.activeDeveloper[0].description;
      })
    }
  
    activeDeveloper : IActiveDeveloper [] = [];
    activeDeveloperobj : ActiveDeveloper = new ActiveDeveloper();


}
