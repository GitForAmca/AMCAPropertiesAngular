import { Component } from '@angular/core';
import { AreaguideService } from '../../service/areaguide.service';
import { Router, RouterLink } from '@angular/router';
import { IAreaGuide } from '../../model/interface/IAreaGuide';
import { AreaGuide } from '../../model/class/AreaGuide';
import { CommonModule } from '@angular/common';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-arealist',
  standalone: true,
  imports: [CommonModule, RouterLink, SkeletonloaderComponent],
  templateUrl: './arealist.component.html',
  styleUrl: './arealist.component.scss',
})
export class ArealistComponent {
  constructor(
    private areaguideservice: AreaguideService,
    private router: Router
  ) {}

  ngOnInit() {
    this.GetAreaGuide();
  }

  AreaGuideInterface: IAreaGuide[] = [];
  AreaGuideObj: AreaGuide = new AreaGuide();
  skeletonArray = Array(3);
  IsLoaded: boolean = false;

  GetAreaGuide() {
    this.areaguideservice
      .GetAreaGuide(this.AreaGuideObj)
      .subscribe((result: any) => {
        this.AreaGuideInterface = result;
        this.IsLoaded = true;
      });
  }

  FilterPropertiesByArea(area: number) {
    this.router.navigate(['/property-list'], { queryParams: { area } });
  }
}
