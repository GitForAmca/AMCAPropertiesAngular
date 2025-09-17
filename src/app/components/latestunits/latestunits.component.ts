import { Component, AfterViewInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Splide from '@splidejs/splide';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IUnitDetails } from '../../model/interface/IUnitDetails';
import { UnitDetails } from '../../model/class/UnitDetails';
import { IUnitImages } from '../../model/interface/IUnitImages';
import { UnitImages } from '../../model/class/UnitImages';
import { UnitdetailsService } from '../../service/unitdetails.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { EnquiryformComponent } from '../../reusableComponent/enquiryform/enquiryform.component';

@Component({
  selector: 'app-latestunits',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NgSelectModule, EnquiryformComponent],
  templateUrl: './latestunits.component.html',
  styleUrl: './latestunits.component.scss'
})
export class LatestunitsComponent { 

  
  @ViewChild('enquiryform') enquiryform!: EnquiryformComponent;

  ngOnInit(){
    this.GetUnitDetails();
  }


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private unitdetailsservice : UnitdetailsService,
    private router : Router
  ) {}

  unitDetails : IUnitDetails[] = [];
  unitDetailsobj : UnitDetails = new UnitDetails();
  unitImages : IUnitImages[] = [];
  unitImagesobj : UnitImages = new UnitImages();

  unitImagesMap: { [unitId: number]: IUnitImages[] } = {};

  GetUnitDetails() {
    this.unitDetailsobj.pageSize = 10;
    this.unitDetailsobj.pageNumber = 1;
    this.unitdetailsservice.GetUnitDetailsService(this.unitDetailsobj).subscribe((result: any) => {
      this.unitDetails = result;
        setTimeout(() => {
          this.initSplideMain();
        }, 0);
    });
  }

  GoToPropertyDetails(unitId: number, titlePage: string) {
    this.router.navigate([`/property/${titlePage}`, unitId]);
  } 

  initSplideMain() {
    if (isPlatformBrowser(this.platformId)) {
      new Splide('#latest-project-carousel', {
        type: 'slide',
        perPage: 3,
        gap: '1rem',
        autoplay: false,
        pagination: false,
        arrows: true,
        breakpoints: {
          1024: { 
            perPage: 2 
          },
          640: { 
            perPage: 1,
            pagination: true,
            arrows: false
          },
        },
      }).mount();
    }
  }
  callSeller(call : string, event: MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    window.location.href = `tel:` + call;
  }
  whtsappSeller(whatspp : string, event : MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    const formattedPhone = whatspp.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  }
  mailSeller(mail : string, event : MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    window.location.href = `mailTo:` + mail;
  }
}
