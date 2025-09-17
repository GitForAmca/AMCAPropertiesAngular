import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Splide from '@splidejs/splide';
import { FormsModule } from '@angular/forms';
import { AreaguideService } from '../../service/areaguide.service';
import { IAreaGuide } from '../../model/interface/IAreaGuide';
import { AreaGuide } from '../../model/class/AreaGuide';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-areaguidehighlights',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './areaguidehighlights.component.html',
  styleUrl: './areaguidehighlights.component.scss'
})
export class AreaguidehighlightsComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private areaguideservice : AreaguideService,
    private router : Router
  ){}

  ngOnInit(){
    this.GetAreaGuide();
  }

  AreaGuideInterface : IAreaGuide[] = [];
  AreaGuideObj : AreaGuide = new AreaGuide();


  GetAreaGuide(){
    this.areaguideservice.GetAreaGuide(this.AreaGuideObj).subscribe((result : any) =>{
      this.AreaGuideInterface = result;
      setTimeout(() => {
        this.initSplideMain();
      }, 0);
    })
  }
  initSplideMain() {
    if (isPlatformBrowser(this.platformId)) {
      new Splide('#area-guide-carousel', {
        type: 'slide',
        perPage: 2,
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
}
