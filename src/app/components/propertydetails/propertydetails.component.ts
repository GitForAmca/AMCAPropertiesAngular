import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
import Splide from '@splidejs/splide';
import { ActivatedRoute } from '@angular/router';
import { UnitdetailsService } from '../../service/unitdetails.service';
import { UnitDetails } from '../../model/class/UnitDetails';
import { IUnitDetails } from '../../model/interface/IUnitDetails';
import { UnitDetailsList } from '../../model/class/UnitDetailsList';
import { IUnitDetailsList } from '../../model/interface/IUnitDetailsList';
import { UnitAmenities } from '../../model/class/UnitAmenities';
import { IUnitAmenities } from '../../model/interface/IUnitAmenities';
import { IUnitImages } from '../../model/interface/IUnitImages';
import { UnitImages } from '../../model/class/UnitImages';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IPlacesNearByUnit } from '../../model/interface/IPlacesNearByUnit';
import { PlacesNearByUnit } from '../../model/class/PlacesNearByUnit';
import { MortgagecalculatorComponent } from '../../reusableComponent/mortgagecalculator/mortgagecalculator.component';

@Component({
  selector: 'app-propertydetails',
  standalone: true,
  imports: [CommonModule, DecimalPipe, MortgagecalculatorComponent],
  templateUrl: './propertydetails.component.html',
  styleUrl: './propertydetails.component.scss',
})
export class PropertydetailsComponent {
  unitId!: number;
  unitPageURL?: string;
  unitImagesCount!: number;
  unitPurpose: string = '';
  unitStatus: string = '';
  unitPrice!: number;
  unitTitle: string = '';
  unitAddress: string = '';
  unitBedroom: string = '';
  unitBathroom: string = '';
  unitSqFeet: string = '';
  unitDescription: string = '';
  unitbroucherDocument: string = '';
  unitVideoPath: string = '';
  firstUnitImagePath: string = '';
  secondUnitImagePath: string = '';
  thirdUnitImagePath: string = '';
  unitMapPath!: SafeResourceUrl;
  unitContactSellerName: string = '';
  unitContactSellerDesignation: string = '';
  unitContactSellerEmail: string = '';
  unitContactSellerPhone: string = '';
  unitContactSellerAvatar: string = '';
  isPlaying = false;

  unitDetailsobj: UnitDetails = new UnitDetails();
  unitDetails: IUnitDetails[] = [];

  unitDetailsListobj: UnitDetailsList = new UnitDetailsList();
  unitDetailsList: IUnitDetailsList[] = [];

  unitAmenitiesListobj: UnitAmenities = new UnitAmenities();
  unitAmenitiesList: IUnitAmenities[] = [];

  unitVideos: IUnitImages[] = [];
  unitVideosobj: UnitImages = new UnitImages();

  unitImages: IUnitImages[] = [];
  unitImagesobj: UnitImages = new UnitImages();

  unitPlacesNearBy: IPlacesNearByUnit[] = [];
  unitPlacesNearByobj: PlacesNearByUnit = new PlacesNearByUnit();
  showCard = false;

  toggleCard() {
    this.showCard = !this.showCard;
  }
  isDesktop(): boolean {
    return window.innerWidth >= 768;
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private unitdetailsservice: UnitdetailsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    debugger;
    this.unitPageURL = this.route.snapshot.paramMap.get('pageURL')!;
    this.unitDetailsobj.unitPageURL = this.unitPageURL;

    this.unitdetailsservice
      .GetUnitDetailsService(this.unitDetailsobj)
      .subscribe((res: any) => {
        const firstKey = Object.keys(res)[0];
        const firstItem = res[firstKey];
        this.unitId = firstItem?.autoId ?? 0;
        this.GetUnitDetails();
      });
    debugger;
  }

  GetUnitDetails() {
    this.unitDetailsobj.unitId = this.unitId;
    this.unitDetailsListobj.unitId = this.unitId;
    this.unitAmenitiesListobj.unitId = this.unitId;
    this.unitPlacesNearByobj.autoId = this.unitId;
    this.unitVideosobj.unitId = this.unitId;
    this.unitImagesobj.unitId = this.unitId;
    this.unitVideosobj.pathType = 'Video';
    this.unitImagesobj.pathType = 'Image';
    this.unitdetailsservice
      .GetUnitDetailsService(this.unitDetailsobj)
      .subscribe((result: any) => {
        this.unitDetails = result;
        this.unitPurpose = this.unitDetails[0].purposeName;
        this.unitStatus = this.unitDetails[0].status;
        this.unitPrice = this.unitDetails[0].price;
        this.unitTitle = this.unitDetails[0].unitTitle;
        this.unitAddress = this.unitDetails[0].area;
        this.unitBedroom = this.unitDetails[0].bedroomType;
        this.unitBathroom = this.unitDetails[0].bathroomType;
        this.unitSqFeet = this.unitDetails[0].unitSize;
        this.unitDescription = this.unitDetails[0].unitDescription;
        this.unitbroucherDocument = this.unitDetails[0].broucherDocument;

        this.unitContactSellerName = this.unitDetails[0].contactSellerName;
        this.unitContactSellerDesignation =
          this.unitDetails[0].contactSellerDesignation;
        this.unitContactSellerEmail = this.unitDetails[0].contactSellerEmail;
        this.unitContactSellerPhone =
          this.unitDetails[0].countryCodeContactSeller +
          this.unitDetails[0].contactSellerPhone;
        this.unitContactSellerAvatar = this.unitDetails[0].contactSellerAvatar;

        const mapUrl = this.unitDetails[0]?.mapView;
        if (mapUrl && mapUrl.trim().toLowerCase() !== 'null') {
          this.unitMapPath =
            this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
        } else {
          this.unitMapPath = '';
        }

        //Get Unit Details List
        this.unitdetailsservice
          .GetUnitDetailsListService(this.unitDetailsListobj)
          .subscribe((result: any) => {
            this.unitDetailsList = result;
          });

        //Get Amenities List
        this.unitdetailsservice
          .GetUnitAmenitiesService(this.unitAmenitiesListobj)
          .subscribe((result: any) => {
            this.unitAmenitiesList = result;
          });

        //Get Places Near By
        this.unitdetailsservice
          .GetUnitPlacesNearBy(this.unitPlacesNearByobj)
          .subscribe((result: any) => {
            this.unitPlacesNearBy = result;
          });

        //Get Video
        this.unitdetailsservice
          .GetUnitImagesService(this.unitVideosobj)
          .subscribe((result: any) => {
            this.unitVideos = result;
            this.unitVideoPath = this.unitVideos[0].path;
          });

        //Get Images
        this.unitdetailsservice
          .GetUnitImagesService(this.unitImagesobj)
          .subscribe((result: any) => {
            this.unitImages = result;
            this.firstUnitImagePath = this.unitImages[0].path;
            this.secondUnitImagePath = this.unitImages[1].path;
            this.thirdUnitImagePath = this.unitImages[2].path;
            this.unitImagesCount = this.unitImages.length;
            setTimeout(() => {
              this.initSplide();
            }, 0);
          });
      });
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
  OnImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }
}
