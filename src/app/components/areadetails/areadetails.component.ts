import { Component, Input } from '@angular/core';
import { AreaguideService } from '../../service/areaguide.service';
import { ActivatedRoute } from '@angular/router';
import { AreaGuide } from '../../model/class/AreaGuide';
import { IAreaGuide } from '../../model/interface/IAreaGuide';
import { ProjectlistComponent } from "../projectlist/projectlist.component";

@Component({
  selector: 'app-areadetails',
  standalone: true,
  imports: [ProjectlistComponent],
  templateUrl: './areadetails.component.html',
  styleUrl: './areadetails.component.scss'
})
export class AreadetailsComponent {

  @Input() AreaURL : string = "";
  @Input() StatusId : number = 1;

  PageTitle : string = "";
  PageDescription : string = "";

  areaguideobj : AreaGuide = new AreaGuide();
  areaguideinterface : IAreaGuide [] = [];

  constructor(
    private areaguideservice : AreaguideService,
    private route : ActivatedRoute
  )
  {}

  ngOnInit() : void{
    this.AreaURL = this.route.snapshot.paramMap.get('URL')!;
    this.areaguideobj.url = this.AreaURL;

    this.loadAreaGuide();
  }
  private loadAreaGuide(){
    this.areaguideservice.GetAreaGuide(this.areaguideobj).subscribe((result : any) =>{
      debugger
      this.areaguideinterface = result;
      this.PageTitle = this.areaguideinterface[0].area;
      this.PageDescription = this.areaguideinterface[0].areaDescription;
    })
  }


}
