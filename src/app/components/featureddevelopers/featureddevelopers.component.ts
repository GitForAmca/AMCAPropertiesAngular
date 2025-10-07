import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import Splide from '@splidejs/splide';
import { IActiveDeveloper } from '../../model/interface/IActiveDeveloper';
import { ActiveDeveloper } from '../../model/class/ActiveDeveloper';
import { DevelopersService } from '../../service/developers.service';
import { Router, RouterLink } from '@angular/router';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';

@Component({
  selector: 'app-featureddevelopers',
  standalone: true,
  imports: [RouterLink, SkeletonloaderComponent, NgIf, CommonModule],
  templateUrl: './featureddevelopers.component.html',
  styleUrl: './featureddevelopers.component.scss',
})
export class FeatureddevelopersComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private developersList: DevelopersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.GetAtiveDevelopersList();
  }

  activeDeveloper: IActiveDeveloper[] = [];
  activeDeveloperobj: ActiveDeveloper = new ActiveDeveloper();
  IsLoaded: boolean = true;
  skeletonArray = Array(3);

  GetAtiveDevelopersList() {
    this.developersList
      .GetActiveDevelopers(this.activeDeveloperobj)
      .subscribe((result: any) => {
        this.activeDeveloper = result;
        this.IsLoaded = false;

        setTimeout(() => {
          this.initSplide();
        }, 0);
      });
  }

  FilterPropertiesByDeveloper(developerId: number) {
    this.router.navigate(['/property-list'], { queryParams: { developerId } });
  }

  initSplide() {
    if (isPlatformBrowser(this.platformId)) {
      new Splide('#featured-developers-carousal', {
        type: 'slide',
        perPage: 4,
        gap: '1rem',
        autoplay: false,
        pagination: false,
        arrows: true,
        breakpoints: {
          1024: {
            perPage: 2,
          },
          640: {
            perPage: 2,
            arrows: false,
            pagination: true,
          },
        },
      }).mount();
    }
  }
}
