import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';
import { ProjectdetailsService } from '../../service/projectdetails.service';
import Splide from '@splidejs/splide';
import { DropdownsService } from '../../service/dropdowns.service';
import { IPropertyPurpose } from '../../model/interface/IPropertyPurpose';
import { IPropertyArea } from '../../model/interface/IPropertyArea';
import { IUnitType } from '../../model/interface/IUnitType';
import { IBaths } from '../../model/interface/IBaths';
import { IBeds } from '../../model/interface/IBeds';
import { IPropertyStatus } from '../../model/interface/IPropertyStatus';
import { PropertyPurpose } from '../../model/class/PropertyPurpose';
import { PropertyArea } from '../../model/class/PropertyArea';
import { UnitType } from '../../model/class/UnitType';
import { Baths } from '../../model/class/Baths';
import { Beds } from '../../model/class/Beds';
import { PropertyStatus } from '../../model/class/PropertyStatus';
import { IUnitImages } from '../../model/interface/IUnitImages';
import { ProjectDetails } from '../../model/class/ProjectDetails';
import { IProjectDetails } from '../../model/interface/IProjectDetails';
import { ProjectImages } from '../../model/class/ProjectImages';
import { IProjectImages } from '../../model/interface/IProjectImages';
import { ActiveDeveloper } from '../../model/class/ActiveDeveloper';
import { IActiveDeveloper } from '../../model/interface/IActiveDeveloper';
import { DevelopersService } from '../../service/developers.service';
import { IProjectCompletionYearList } from '../../model/interface/IProjectCompletionYearList';
import { IActiveProjectList } from '../../model/interface/IActiveProjectList';
import { ActiveProjectList } from '../../model/class/ActiveProjectList';
import { ProjectCompletionYearList } from '../../model/class/ProjectCompletionYearList';

@Component({
  selector: 'app-projectlist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SkeletonloaderComponent],
  templateUrl: './projectlist.component.html',
  styleUrl: './projectlist.component.scss'
})
export class ProjectlistComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private projectdetailsservice : ProjectdetailsService,
    public router: Router,
    private route: ActivatedRoute, 
    private dropdowns : DropdownsService,
    private activedeveloper : DevelopersService) {}


  @Input() projectType : number = 0;
  @Input() status : number = 0;
  @Input() pageheading : string = "";
  @Input() developerurl : string = "";
  @Input() areaurl : string = "";  
  
  ngOnInit(): void {
    debugger
    this.projectDetailsobj.projectType = this.projectType || 0;
    this.projectDetailsobj.status = this.status || 0;
    this.projectDetailsobj.developerURL = this.developerurl || "";
    this.projectDetailsobj.areaURL = this.areaurl || "";

    this.pageheading = this.pageheading || "Project List";

    this.GetPurposeDropdown();
    this.GetAreaDropdown();
    this.GetUnitTypeDropdown();
    this.GetBedsDropdown();
    this.GetBathsDropdown();
    this.GetPropertyStatusDropdown();
    this.GetActiveDeveloperDropdown();
    this.GetActiveProjectDropdown();
    this.GetProjectCompletionDropdown();

    this.route.queryParams.subscribe(params => {
      debugger
      this.projectDetailsobj.projectId       = params['projectId']       ? +params['projectId'] : 0;
      this.projectDetailsobj.priceFrom    = params['priceFrom']    ? +params['priceFrom'] : 0;
      this.projectDetailsobj.priceTo      = params['priceTo']      ? +params['priceTo'] : 0;

      this.projectDetailsobj.beds = params['beds'] ? params['beds'].split(',').map(Number): [];


      // Type & Status can still come from query if present
      
      if (params['status']) {
        this.projectDetailsobj.status = +params['status'];
      }
      if (params['projectType']) {
        this.projectDetailsobj.projectType = +params['projectType'];
      }
      if (params['developersId']) {
        this.projectDetailsobj.developersId = +params['developersId'];
      }
      if (params['area']) {
        this.projectDetailsobj.area = +params['area'];
      }


      this.GetProjectDetails(1);
    });
  }

  bedsBathsDropdownOpen = false;
    priceDropdownOpen = false;
    propertyListCount : number = 0;
  
    propertyPurpose : IPropertyPurpose[] = [];
    propertyArea : IPropertyArea[] = [];
    propertyUnit : IUnitType[] = [];
    propertyBath : IBaths[] = [];
    propertyBed : IBeds[] = [];
    propertyStatus : IPropertyStatus[] = [];
    projectDeveloperList : IActiveDeveloper [] = [];
    projectDetails : IProjectDetails[] = [];
    projectImages : IProjectImages[] = [];
    completionyearlist : IProjectCompletionYearList[] = [];
    activeproject : IActiveProjectList[] = [];
    
    propertyPurposeobj : PropertyPurpose = new PropertyPurpose();
    propertyAreaobj : PropertyArea = new PropertyArea();
    propertyUnitobj : UnitType = new UnitType();
    propertyBathobj : Baths = new Baths();
    propertyBedobj : Beds = new Beds();
    projectDeveloperListobj : ActiveDeveloper = new ActiveDeveloper();
    propertyStatusobj : PropertyStatus = new PropertyStatus();
    projectDetailsobj : ProjectDetails = new ProjectDetails();
    projectImagesobj : ProjectImages = new ProjectImages();
    activeprojectobj : ActiveProjectList = new ActiveProjectList();
    completionyearlistobj : ProjectCompletionYearList = new ProjectCompletionYearList();
  
    unitImagesMap: { [unitId: number]: IUnitImages[] } = {};
    unitImageCountMap: { [unitId: number]: number } = {};

  GetPurposeDropdown(){
    this.dropdowns.GetPropertiesPurpose(this.propertyPurposeobj).subscribe((result:any) => {
      this.propertyPurpose = result;
    })
  }

  GetAreaDropdown(){
    this.propertyAreaobj.areaType = "Projects";
    this.dropdowns.GetAvailablePropertiesArea(this.propertyAreaobj).subscribe((result:any) => {
      this.propertyArea = result;
      const selectedArea = this.propertyArea.find(a => a.autoId === this.projectDetailsobj.area);
      this.searchText = selectedArea ? selectedArea.area : '';
    })
  }
  GetUnitTypeDropdown(){
    this.dropdowns.GetUnitType(this.propertyUnitobj).subscribe((result:any) => {
      this.propertyUnit = result;
    })
  }
  GetBedsDropdown(){
    this.dropdowns.GetPropertyBedroom(this.propertyBedobj).subscribe((result:any) => {
      this.propertyBed = result;
    })
  }
  GetBathsDropdown(){
    this.dropdowns.GetPropertyBathroom(this.propertyBathobj).subscribe((result:any) => {
      this.propertyBath = result;
    })
  }
  GetPropertyStatusDropdown(){
    this.dropdowns.GetPropertyStatus(this.propertyStatusobj).subscribe((result:any) => {
      this.propertyStatus = result;
    })
  }
  GetActiveDeveloperDropdown(){
    this.activedeveloper.GetActiveDevelopers(this.projectDeveloperListobj).subscribe((result:any) => {
      this.projectDeveloperList = result;
    })
  }
  GetActiveProjectDropdown(){
    this.dropdowns.GetActiveProjectList(this.activeprojectobj).subscribe((result:any) => {
      this.activeproject = result;
    })
  }
  GetProjectCompletionDropdown(){
    this.dropdowns.GetProjectCompletionYearList(this.completionyearlistobj).subscribe((result:any) => {
      this.completionyearlist = result;
    })
  }
  isLoading : boolean = true;
  currentPage: number = 1;
  pageSize: number = 5;
  pagesToShow: number = 5;  // show 5 page buttons at a time
  totalPages : number[] = [];
  displayPages: number[] = [];  // pages currently visible in pagination
  GetProjectDetails(page: number) {
    if (page < 1) return;

    this.projectDetailsobj.pageSize = this.pageSize;
    this.projectDetailsobj.pageNumber = page;
    this.isLoading = true;

    this.projectdetailsservice.GetProjectDetailsService(this.projectDetailsobj).subscribe((result: any) => {
      this.projectDetails = result;

      this.propertyListCount = (this.projectDetails && this.projectDetails.length > 0) 
                            ? this.projectDetails[0].totalRecord 
                            : 0;

      this.currentPage = page;

      const pages = Math.ceil(this.propertyListCount / this.pageSize);
      this.totalPages = Array(pages).fill(0).map((x, i) => i + 1);

      this.updateDisplayPages();

      // Fetch images for each unit
      this.projectDetails.forEach(unit => {
        this.projectImagesobj.projectId = unit.projectId;
        this.projectImagesobj.pathType = "Image";
        this.projectdetailsservice.GetProjectImagesService(this.projectImagesobj).subscribe((result: any) => {
          this.unitImagesMap[unit.projectId] = result;
          this.unitImageCountMap[unit.projectId] = result.length;
          setTimeout(() => {
            this.initSplide(unit.projectId);
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
    this.GetProjectDetails(page);
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
  GoToProjectDetails(projectId: number, pageURL: string) {
    this.router.navigate([`/project/${pageURL}`, projectId]);
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

  getTimeElapsed(createdOn: string | Date): { text: string, isAgo: boolean } {
    const nowUtc = new Date();
    const now = new Date(nowUtc.getTime() + 4 * 60 * 60 * 1000); // UAE time

    const createdUtc = new Date(createdOn);
    const created = new Date(createdUtc.getTime() + 4 * 60 * 60 * 1000);

    const diffMs = now.getTime() - created.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = now.getMonth() - created.getMonth() + 12 * (now.getFullYear() - created.getFullYear());

    if (diffMonths >= 1) {
      const day = created.getDate().toString().padStart(2, '0');
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const month = monthNames[created.getMonth()];
      const year = created.getFullYear();
      return { text: `${day}-${month}-${year}`, isAgo: false };
    } 
    else if (diffDays >= 1) {
      return { text: `${diffDays} day${diffDays !== 1 ? 's' : ''}`, isAgo: true };
    } 
    else if (diffHours >= 1) {
      return { text: `${diffHours} hour${diffHours !== 1 ? 's' : ''}`, isAgo: true };
    } 
    else {
      return { text: `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`, isAgo: true };
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
    const index = this.projectDetailsobj.beds.indexOf(id);
    if (index > -1) {
      this.projectDetailsobj.beds.splice(index, 1);
    } else {
      this.projectDetailsobj.beds.push(id);
    }
  }
  // Reset both
  resetBedsBaths() {
    this.projectDetailsobj.beds = [];
  }

  // Utility to show selected text comma-separated
  get selectedBedsText(): string {
    return this.projectDetailsobj.beds.length
      ? this.projectDetailsobj.beds
          .map(id => this.propertyBed.find(b => b.autoId === id)?.type)
          .filter(Boolean)
          .join(', ')
      : '';
  }
  
  search(){ 
    this.projectDetailsobj.pageNumber = 1;
    if(this.projectDetailsobj.priceTo == null || this.projectDetailsobj.priceTo == 0){
        this.projectDetailsobj.priceTo = this.projectDetailsobj.priceFrom;
    }
    if(this.projectDetailsobj.priceTo != null || this.projectDetailsobj.priceTo != 0){
      if(this.projectDetailsobj.priceTo < this.projectDetailsobj.priceFrom){
        this.projectDetailsobj.priceTo = this.projectDetailsobj.priceFrom;
      }
    }


    this.router.navigate(['/project-list'], {
    queryParams: {
        area: this.projectDetailsobj.area,
        developersId: this.projectDetailsobj.developersId,
        projectId: this.projectDetailsobj.projectId,
        projectType: this.projectDetailsobj.projectType,
        completionyear: this.projectDetailsobj.completionYear,
        priceFrom: this.projectDetailsobj.priceFrom,
        priceTo: this.projectDetailsobj.priceTo,
        beds: this.projectDetailsobj.beds.length ? this.projectDetailsobj.beds.join(',') : ''
      }
    });
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: any) {
    const clickedInside = targetElement.closest('.dropdown');
    if (!clickedInside) {
      this.bedsBathsDropdownOpen = false;
      this.priceDropdownOpen = false;
      if(this.projectDetailsobj.priceTo == null || this.projectDetailsobj.priceTo == 0){
        this.projectDetailsobj.priceTo = this.projectDetailsobj.priceFrom;
      }
      if(this.projectDetailsobj.priceTo != null || this.projectDetailsobj.priceTo != 0){
        if(this.projectDetailsobj.priceTo < this.projectDetailsobj.priceFrom){
          this.projectDetailsobj.priceTo = this.projectDetailsobj.priceFrom;
        }
      }
    }
  }

  filteredAreas = [...this.propertyArea];
  searchText = '';
  showDropdown = false;

  onSearchArea() {
    const text = this.searchText.toLowerCase();
    this.filteredAreas = this.propertyArea.filter(a =>
      a.area.toLowerCase().includes(text)
    );
    this.showDropdown = this.filteredAreas.length > 0 && this.searchText.length > 0;
  }

  selectArea(area: any) {
    this.projectDetailsobj.area = area.autoId;
    this.searchText = area.area;
    this.showDropdown = false;
  }

  onBlur() {
    setTimeout(() => this.showDropdown = false, 150);
  }
}
