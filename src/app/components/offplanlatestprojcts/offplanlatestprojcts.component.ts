import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import Splide from '@splidejs/splide';
import { ProjectDetails } from '../../model/class/ProjectDetails';
import { ProjectImages } from '../../model/class/ProjectImages';
import { IProjectDetails } from '../../model/interface/IProjectDetails';
import { IProjectImages } from '../../model/interface/IProjectImages';
import { EnquiryformComponent } from '../../reusableComponent/enquiryform/enquiryform.component';
import { ProjectdetailsService } from '../../service/projectdetails.service';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offplanlatestprojcts',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    EnquiryformComponent,
  ],
  templateUrl: './offplanlatestprojcts.component.html',
  styleUrl: './offplanlatestprojcts.component.scss',
})
export class OffplanlatestprojctsComponent {
  @ViewChild('enquiryform') enquiryform!: EnquiryformComponent;

  ngOnInit() {
    this.GetProjectDetails();
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private projectdetailsservice: ProjectdetailsService,
    public router: Router
  ) {}

  projectDetails: IProjectDetails[] = [];
  projectDetailsobj: ProjectDetails = new ProjectDetails();
  projectImages: IProjectImages[] = [];
  projectImagesobj: ProjectImages = new ProjectImages();

  projectImagesMap: { [projectId: number]: IProjectImages[] } = {};
  GetProjectDetails() {
    this.projectDetailsobj.pageSize = 10;
    this.projectDetailsobj.pageNumber = 1;
    this.projectDetailsobj.status = 1;
    this.projectdetailsservice
      .GetProjectDetailsService(this.projectDetailsobj)
      .subscribe((result: any) => {
        this.projectDetails = result;
        setTimeout(() => {
          this.initSplideMain();
        }, 0);
      });
  }

  GoToProjectDetails(projectId: number, pageURL: string) {
    this.router.navigate([`/project/${pageURL}`, projectId]);
  }

  initSplideMain() {
    if (isPlatformBrowser(this.platformId)) {
      new Splide('#latest-offplan-project-carousel', {
        type: 'slide',
        perPage: 3,
        gap: '1rem',
        autoplay: false,
        pagination: false,
        arrows: true,
        breakpoints: {
          1024: {
            perPage: 2,
          },
          640: {
            perPage: 1,
            pagination: true,
            arrows: false,
          },
        },
      }).mount();
    }
  }
  callSeller(call: string, event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    window.location.href = `tel:` + call;
  }
  whtsappSeller(whatspp: string, event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const formattedPhone = whatspp.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  }
  mailSeller(mail: string, event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    window.location.href = `mailTo:` + mail;
  }
}
