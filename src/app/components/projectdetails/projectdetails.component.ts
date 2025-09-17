import { CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectDetails } from '../../model/class/ProjectDetails';
import { IProjectDetails } from '../../model/interface/IProjectDetails';
import { ProjectDetailsList } from '../../model/class/ProjectDetailsList';
import { IProjectDetailsList } from '../../model/interface/IProjectDetailsList';
import { ProjectAmenities } from '../../model/class/ProjectAmenities';
import { IProjectAmenities } from '../../model/interface/IProjectAmenities';
import { IProjectImages } from '../../model/interface/IProjectImages';
import { ProjectImages } from '../../model/class/ProjectImages';
import { ActivatedRoute } from '@angular/router';
import { ProjectdetailsService } from '../../service/projectdetails.service';
import Splide from '@splidejs/splide';
import { IPlacesNearByProject } from '../../model/interface/IPlacesNearByProject';
import { PlacesNearByProject } from '../../model/class/PlacesNearByProject';
import { MortgagecalculatorComponent } from "../../reusableComponent/mortgagecalculator/mortgagecalculator.component";

@Component({
  selector: 'app-projectdetails',
  standalone: true,
  imports: [CommonModule, DecimalPipe, MortgagecalculatorComponent],
  templateUrl: './projectdetails.component.html',
  styleUrl: './projectdetails.component.scss'
})
export class ProjectdetailsComponent {
    projectId!: number;
    unitImagesCount!: number;
    unitPurpose : string = "";
    unitStatus : string = "";
    unitPrice! : number;
    unitTitle : string = "";
    unitAddress : string = "";
    unitBedroom : string = "";
    unitBathroom : string = "";
    unitSqFeet! : number;
    unitDescription : string = "";
    unitbroucherDocument : string = "";
    unitVideoPath : string = "";
    firstUnitImagePath : string = "";
    secondUnitImagePath : string = "";
    thirdUnitImagePath : string = "";
    unitMapPath! : SafeResourceUrl;
    unitContactSellerName : string = "";
    unitContactSellerDesignation : string = "";
    unitContactSellerEmail : string = "";
    unitContactSellerPhone : string = "";
    unitContactSellerAvatar : string = "";
    isPlaying = false;

    unitDetailsobj : ProjectDetails = new ProjectDetails();
    unitDetails : IProjectDetails [] = [];

    unitDetailsListobj : ProjectDetailsList = new ProjectDetailsList();
    unitDetailsList : IProjectDetailsList [] = [];

    unitAmenitiesListobj : ProjectAmenities = new ProjectAmenities();
    unitAmenitiesList : IProjectAmenities [] = [];

    unitVideos : IProjectImages[] = [];
    unitVideosobj : ProjectImages = new ProjectImages();

    unitImages : IProjectImages[] = [];
    unitImagesobj : ProjectImages = new ProjectImages();

    projectPlacesNearBy : IPlacesNearByProject[] = [];
    projectPlacesNearByobj : PlacesNearByProject = new PlacesNearByProject();


    constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private route: ActivatedRoute,
      private unitdetailsservice : ProjectdetailsService,
      private sanitizer: DomSanitizer) {}

    ngOnInit(){
      debugger
      this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
      this.GetUnitDetails();
    }

    GetUnitDetails(){
      this.unitDetailsobj.projectId = this.projectId;
      this.unitDetailsListobj.projectId = this.projectId;
      this.unitAmenitiesListobj.projectId = this.projectId;
      this.unitVideosobj.projectId = this.projectId;
      this.unitImagesobj.projectId = this.projectId;
      this.projectPlacesNearByobj.autoId = this.projectId;
      this.unitVideosobj.pathType = "Video";
      this.unitImagesobj.pathType = "Image";
      this.unitdetailsservice.GetProjectDetailsService(this.unitDetailsobj).subscribe((result : any) => {
        this.unitDetails = result;
        this.unitStatus = this.unitDetails[0].status;
        this.unitPrice = this.unitDetails[0].startingPrice;
        this.unitTitle = this.unitDetails[0].projectTitle;
        this.unitAddress = this.unitDetails[0].area;
        this.unitBedroom = this.unitDetails[0].projectBeds;
        this.unitSqFeet = this.unitDetails[0].propertySize;
        this.unitDescription = this.unitDetails[0].projectDescription;
        this.unitbroucherDocument = this.unitDetails[0].broucherDocument;

        this.unitContactSellerName = this.unitDetails[0].contactSellerName;
        this.unitContactSellerDesignation = this.unitDetails[0].contactSellerDesignation;
        this.unitContactSellerEmail = this.unitDetails[0].contactSellerEmail;
        this.unitContactSellerPhone = this.unitDetails[0].countryCodeContactSeller + this.unitDetails[0].contactSellerPhone;
        this.unitContactSellerAvatar = this.unitDetails[0].contactSellerAvatar;


        const mapUrl = this.unitDetails[0]?.mapView;
        if(mapUrl && mapUrl.trim().toLowerCase() !== 'null'){
          this.unitMapPath = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
        }
        else{
          this.unitMapPath = "";
        }

        //Get Unit Details List
        this.unitdetailsservice.GetProjectDetailsListService(this.unitDetailsListobj).subscribe((result : any) => {
          this.unitDetailsList = result;

        });

        //Get Amenities List
        this.unitdetailsservice.GetProjectAmenitiesService(this.unitAmenitiesListobj).subscribe((result : any) => {
          this.unitAmenitiesList = result;
        });

        //Get Places Near By
        this.unitdetailsservice.GetProjectPlacesNearBy(this.projectPlacesNearByobj).subscribe((result : any) => {
          this.projectPlacesNearBy = result;
        });

        //Get Video
        this.unitdetailsservice.GetProjectImagesService(this.unitVideosobj).subscribe((result : any) => {
          this.unitVideos = result;
          this.unitVideoPath = this.unitVideos[0].path;
        });

        //Get Images
        this.unitdetailsservice.GetProjectImagesService(this.unitImagesobj).subscribe((result : any) => {
          this.unitImages = result;
          this.firstUnitImagePath = this.unitImages[0].path;
          this.secondUnitImagePath = this.unitImages[1].path;
          this.thirdUnitImagePath = this.unitImages[2].path;
          this.unitImagesCount = this.unitImages.length;
          setTimeout(() => {
            this.initSplide();
          }, 0);
        });
      })
    }
    playVideo(video: HTMLVideoElement, event: Event): void {
      video.play();
      this.isPlaying = true;
    }
    
    initSplide() {
      if (isPlatformBrowser(this.platformId)) {
        const modal = document.getElementById('splide-modal')!;
        const closeBtn = document.querySelector('.close-modal')!;
        const thumbnails = document.querySelectorAll('.thumbnail');

        const main = new Splide('#main-splide', {
          type: 'fade',
          heightRatio: 0.7,
          arrows: true,
          pagination: false,
          cover: true,
        });

        const thumbs = new Splide('#thumb-splide', {
          fixedWidth: 100,
          height: 100,
          gap: 10,
          rewind: true,
          pagination: false,
          isNavigation: true,
          focus: 'center',
          breakpoints: {
            600: {
              fixedWidth: 66,
              height: 66,
            },
          },
        });

        main.sync(thumbs);
        main.mount();
        thumbs.mount();

        thumbnails.forEach((thumb, index) => {
          thumb.addEventListener('click', () => {
            modal.style.display = 'flex';
            main.go(index);
          });
        });

        closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
        });

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            modal.style.display = 'none';
          }
        });
      }
    }
    OnImageLoad(event : Event){
      const img = event.target as HTMLImageElement;
      img.classList.add("loaded");
    }
}
