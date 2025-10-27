import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  HostListener,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import Splide from '@splidejs/splide';
import { IUnitDetails } from '../../model/interface/IUnitDetails';
import { UnitDetails } from '../../model/class/UnitDetails';
import { UnitdetailsService } from '../../service/unitdetails.service';
import { IUnitImages } from '../../model/interface/IUnitImages';
import { UnitImages } from '../../model/class/UnitImages';
import {
  RouterLink,
  RouterModule,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { IPropertyArea } from '../../model/interface/IPropertyArea';
import { IUnitType } from '../../model/interface/IUnitType';
import { IBaths } from '../../model/interface/IBaths';
import { IBeds } from '../../model/interface/IBeds';
import { PropertyArea } from '../../model/class/PropertyArea';
import { UnitType } from '../../model/class/UnitType';
import { Baths } from '../../model/class/Baths';
import { Beds } from '../../model/class/Beds';
import { DropdownsService } from '../../service/dropdowns.service';
import { IPropertyPurpose } from '../../model/interface/IPropertyPurpose';
import { PropertyPurpose } from '../../model/class/PropertyPurpose';
import { PropertyStatus } from '../../model/class/PropertyStatus';
import { IPropertyStatus } from '../../model/interface/IPropertyStatus';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';

@Component({
  selector: 'app-propertieslist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SkeletonloaderComponent],
  providers: [DatePipe, DecimalPipe],
  templateUrl: './propertieslist.component.html',
  styleUrl: './propertieslist.component.scss',
})
export class PropertieslistComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private unitdetailsservice: UnitdetailsService,
    private datePipe: DatePipe,
    public router: Router,
    private route: ActivatedRoute,
    private dropdowns: DropdownsService
  ) {}

  @Input() purpose: number = 0;
  @Input() type: number = 0;
  @Input() status: number = 0;
  @Input() pageheading: string = '';
  @Input() navmenu: string = '';
  @Input() developerurl: string = '';
  @Input() areaurl: string = '';

  ngOnInit(): void {
    debugger;
    this.unitDetailsobj.purpose = this.purpose || 0;
    this.unitDetailsobj.unitType = this.type || 0;
    this.unitDetailsobj.status = this.status || 0;
    this.unitDetailsobj.developerURL = this.developerurl || '';
    this.unitDetailsobj.areaURL = this.areaurl || '';

    this.pageheading = this.pageheading || '';
    this.navmenu = this.navmenu || '';

    this.GetPurposeDropdown();
    this.GetAreaDropdown();
    this.GetUnitTypeDropdown();
    this.GetBedsDropdown();
    this.GetBathsDropdown();
    this.GetPropertyStatusDropdown();

    this.route.queryParams.subscribe((params) => {
      debugger;
      this.unitDetailsobj.unitId = params['unitId'] ? +params['unitId'] : 0;
      this.unitDetailsobj.priceFrom = params['priceFrom']
        ? +params['priceFrom']
        : 0;
      this.unitDetailsobj.priceTo = params['priceTo'] ? +params['priceTo'] : 0;

      this.unitDetailsobj.beds = params['beds']
        ? params['beds'].split(',').map(Number)
        : [];

      this.unitDetailsobj.bathroom = params['bathroom']
        ? params['bathroom'].split(',').map(Number)
        : [];

      // Purpose, Type & Status can still come from query if present
      if (params['purpose']) {
        this.unitDetailsobj.purpose = +params['purpose'];
      }
      if (params['status']) {
        this.unitDetailsobj.status = +params['status'];
      }
      if (params['unitType']) {
        this.unitDetailsobj.unitType = +params['unitType'];
      }
      if (params['developersId']) {
        this.unitDetailsobj.developersId = +params['developersId'];
      }
      if (params['area']) {
        this.unitDetailsobj.area = +params['area'];
      }

      this.selectedStatus = this.unitDetailsobj.status;
      this.GetpropertyStatusList(this.selectedStatus);

      this.GetUnitDetails(1);
    });
  }

  bedsBathsDropdownOpen = false;
  priceDropdownOpen = false;
  propertyListCount: number = 0;
  selectedStatus: number = 0;

  propertyPurpose: IPropertyPurpose[] = [];
  propertyArea: IPropertyArea[] = [];
  propertyUnit: IUnitType[] = [];
  propertyBath: IBaths[] = [];
  propertyBed: IBeds[] = [];
  propertyStatus: IPropertyStatus[] = [];

  propertyPurposeobj: PropertyPurpose = new PropertyPurpose();
  propertyAreaobj: PropertyArea = new PropertyArea();
  propertyUnitobj: UnitType = new UnitType();
  propertyBathobj: Baths = new Baths();
  propertyBedobj: Beds = new Beds();
  propertyStatusobj: PropertyStatus = new PropertyStatus();
  unitDetails: IUnitDetails[] = [];
  unitDetailsobj: UnitDetails = new UnitDetails();
  unitImages: IUnitImages[] = [];
  unitImagesobj: UnitImages = new UnitImages();

  unitImagesMap: { [unitId: number]: IUnitImages[] } = {};
  unitImageCountMap: { [unitId: number]: number } = {};
  skeletonArray = Array(3);
  GetPurposeDropdown() {
    const removeId = [3];
    this.dropdowns
      .GetPropertiesPurpose(this.propertyPurposeobj)
      .subscribe((result: any) => {
        this.propertyPurpose = this.propertyPurpose.filter(
          (item: any) => !removeId.includes(item.autoId)
        );
        this.propertyPurpose = result;
      });
  }

  GetAreaDropdown() {
    this.propertyAreaobj.areaType = 'Units';
    this.dropdowns
      .GetAvailablePropertiesArea(this.propertyAreaobj)
      .subscribe((result: any) => {
        this.propertyArea = result;
        const selectedArea = this.propertyArea.find(
          (a) => a.autoId === this.unitDetailsobj.area
        );
        this.searchText = selectedArea ? selectedArea.area : '';
      });
  }
  GetUnitTypeDropdown() {
    this.dropdowns
      .GetUnitType(this.propertyUnitobj)
      .subscribe((result: any) => {
        this.propertyUnit = result;
      });
  }
  GetBedsDropdown() {
    this.dropdowns
      .GetPropertyBedroom(this.propertyBedobj)
      .subscribe((result: any) => {
        this.propertyBed = result;
      });
  }
  GetBathsDropdown() {
    this.dropdowns
      .GetPropertyBathroom(this.propertyBathobj)
      .subscribe((result: any) => {
        this.propertyBath = result;
      });
  }
  GetPropertyStatusDropdown() {
    this.dropdowns
      .GetPropertyStatus(this.propertyStatusobj)
      .subscribe((result: any) => {
        this.propertyStatus = result;
      });
  }

  isLoading: boolean = true;
  currentPage: number = 1;
  pageSize: number = 5;
  pagesToShow: number = 5; // show 5 page buttons at a time
  totalPages: number[] = [];
  displayPages: number[] = []; // pages currently visible in pagination
  GetUnitDetails(page: number) {
    if (page < 1) return;

    this.unitDetailsobj.pageSize = this.pageSize;
    this.unitDetailsobj.pageNumber = page;
    this.isLoading = true;

    this.unitdetailsservice
      .GetUnitDetailsService(this.unitDetailsobj)
      .subscribe((result: any) => {
        this.unitDetails = result;

        this.propertyListCount =
          this.unitDetails && this.unitDetails.length > 0
            ? this.unitDetails[0].totalRecord
            : 0;

        this.currentPage = page;

        const pages = Math.ceil(this.propertyListCount / this.pageSize);
        this.totalPages = Array(pages)
          .fill(0)
          .map((x, i) => i + 1);

        this.updateDisplayPages();

        // Fetch images for each unit
        this.unitDetails.forEach((unit) => {
          this.unitImagesobj.unitId = unit.autoId;
          this.unitImagesobj.pathType = 'Image';
          this.unitdetailsservice
            .GetUnitImagesService(this.unitImagesobj)
            .subscribe((result: any) => {
              this.unitImagesMap[unit.autoId] = result;
              this.unitImageCountMap[unit.autoId] = result.length;
              setTimeout(() => {
                this.initSplide(unit.autoId);
              }, 0);
            });
        });

        this.isLoading = false;
      });
  }
  // Update visible pages based on currentPage
  updateDisplayPages() {
    const blockIndex = Math.floor((this.currentPage - 1) / this.pagesToShow);
    const startPage = blockIndex * this.pagesToShow + 1;
    let endPage = startPage + this.pagesToShow - 1;
    if (endPage > this.totalPages.length) endPage = this.totalPages.length;

    this.displayPages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.displayPages.push(i);
    }
  }

  // Click handler for a page
  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages.length) return;
    this.GetUnitDetails(page);
  }
  initSplide(unitId: number) {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        type: 'slide',
        perPage: 1,
        gap: '1rem',
        autoplay: false,
        pagination: false,
        arrows: true,
        breakpoints: {
          1024: { perPage: 1 },
          640: { perPage: 1 },
        },
      };
      const elId = `#properties-list-carousal${unitId}`;
      const el = document.querySelector(elId);
      if (el) {
        new Splide(elId, options).mount();
      }
    }
  }
  GoToPropertyDetails(unitId: number, url: string) {
    this.router.navigate([`/property/${url}`, unitId]);
  }
  GetpropertyStatusList(id: number) {
    this.isLoading = true;
    this.unitDetailsobj.status = id;
    this.selectedStatus = id;
    this.unitDetailsobj.pageNumber = 1;
    this.GetUnitDetails(1);
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

  getTimeElapsed(createdOn: string | Date): { text: string; isAgo: boolean } {
    const nowUtc = new Date();
    const now = new Date(nowUtc.getTime() + 4 * 60 * 60 * 1000); // UAE time

    const createdUtc = new Date(createdOn);
    const created = new Date(createdUtc.getTime() + 4 * 60 * 60 * 1000);

    const diffMs = now.getTime() - created.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths =
      now.getMonth() -
      created.getMonth() +
      12 * (now.getFullYear() - created.getFullYear());

    if (diffMonths >= 1) {
      const day = created.getDate().toString().padStart(2, '0');
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const month = monthNames[created.getMonth()];
      const year = created.getFullYear();
      return { text: `${day}-${month}-${year}`, isAgo: false };
    } else if (diffDays >= 1) {
      return {
        text: `${diffDays} day${diffDays !== 1 ? 's' : ''}`,
        isAgo: true,
      };
    } else if (diffHours >= 1) {
      return {
        text: `${diffHours} hour${diffHours !== 1 ? 's' : ''}`,
        isAgo: true,
      };
    } else {
      return {
        text: `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`,
        isAgo: true,
      };
    }
  }

  toggleDropdown(type: string) {
    if (type === 'bedsBaths') {
      this.bedsBathsDropdownOpen = !this.bedsBathsDropdownOpen;
      this.priceDropdownOpen = false;
    } else if (type === 'price') {
      this.priceDropdownOpen = !this.priceDropdownOpen;
      this.bedsBathsDropdownOpen = false;
    }
  }

  // Toggle bed
  selectBed(id: number) {
    const index = this.unitDetailsobj.beds.indexOf(id);
    if (index > -1) {
      this.unitDetailsobj.beds.splice(index, 1);
    } else {
      this.unitDetailsobj.beds.push(id);
    }
  }

  // Select / toggle bath
  selectBath(id: number) {
    const index = this.unitDetailsobj.bathroom.indexOf(id);
    if (index > -1) {
      this.unitDetailsobj.bathroom.splice(index, 1);
    } else {
      this.unitDetailsobj.bathroom.push(id);
    }
  }

  // Reset both
  resetBedsBaths() {
    this.unitDetailsobj.beds = [];
    this.unitDetailsobj.bathroom = [];
  }

  // Utility to show selected text comma-separated
  get selectedBedsText(): string {
    return this.unitDetailsobj.beds.length
      ? this.unitDetailsobj.beds
          .map((id) => this.propertyBed.find((b) => b.autoId === id)?.type)
          .filter(Boolean)
          .join(', ')
      : '';
  }

  get selectedBathsText(): string {
    return this.unitDetailsobj.bathroom.length
      ? this.unitDetailsobj.bathroom
          .map((id) => this.propertyBath.find((b) => b.autoId === id)?.bathroom)
          .filter(Boolean)
          .join(', ')
      : '';
  }

  search() {
    this.unitDetailsobj.pageNumber = 1;
    if (
      this.unitDetailsobj.priceTo == null ||
      this.unitDetailsobj.priceTo == 0
    ) {
      this.unitDetailsobj.priceTo = this.unitDetailsobj.priceFrom;
    }
    if (
      this.unitDetailsobj.priceTo != null ||
      this.unitDetailsobj.priceTo != 0
    ) {
      if (this.unitDetailsobj.priceTo < this.unitDetailsobj.priceFrom) {
        this.unitDetailsobj.priceTo = this.unitDetailsobj.priceFrom;
      }
    }

    this.unitDetailsobj.unitId = 0;
    this.unitDetailsobj.developersId = 0;

    this.router.navigate(['/property-list'], {
      queryParams: {
        unitId: this.unitDetailsobj.unitId,
        area: this.unitDetailsobj.area,
        developersId: this.unitDetailsobj.developersId,
        unitType: this.unitDetailsobj.unitType,
        priceFrom: this.unitDetailsobj.priceFrom,
        priceTo: this.unitDetailsobj.priceTo,
        beds: this.unitDetailsobj.beds.length
          ? this.unitDetailsobj.beds.join(',')
          : '',
        bathroom: this.unitDetailsobj.bathroom.length
          ? this.unitDetailsobj.bathroom.join(',')
          : '',
        purpose: this.unitDetailsobj.purpose,
      },
    });
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: any) {
    const clickedInside = targetElement.closest('.dropdown');
    if (!clickedInside) {
      this.bedsBathsDropdownOpen = false;
      this.priceDropdownOpen = false;
      if (
        this.unitDetailsobj.priceTo == null ||
        this.unitDetailsobj.priceTo == 0
      ) {
        this.unitDetailsobj.priceTo = this.unitDetailsobj.priceFrom;
      }
      if (
        this.unitDetailsobj.priceTo != null ||
        this.unitDetailsobj.priceTo != 0
      ) {
        if (this.unitDetailsobj.priceTo < this.unitDetailsobj.priceFrom) {
          this.unitDetailsobj.priceTo = this.unitDetailsobj.priceFrom;
        }
      }
    }
  }

  filteredAreas = [...this.propertyArea];
  searchText = '';
  showDropdown = false;

  onSearchArea() {
    const text = this.searchText.toLowerCase();
    this.filteredAreas = this.propertyArea.filter((a) =>
      a.area.toLowerCase().includes(text)
    );
    this.showDropdown =
      this.filteredAreas.length > 0 && this.searchText.length > 0;
  }

  selectArea(area: any) {
    this.unitDetailsobj.area = area.autoId;
    this.searchText = area.area;
    this.showDropdown = false;
  }

  onBlur() {
    setTimeout(() => (this.showDropdown = false), 150);
  }
}
