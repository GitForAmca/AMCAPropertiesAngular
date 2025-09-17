import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, ElementRef,HostListener  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownsService } from '../../service/dropdowns.service';
import { IPropertyArea } from '../../model/interface/IPropertyArea';
import { PropertyArea } from '../../model/class/PropertyArea';
import { IPropertyPurpose } from '../../model/interface/IPropertyPurpose';
import { IUnitType } from '../../model/interface/IUnitType';
import { IBaths } from '../../model/interface/IBaths';
import { IBeds } from '../../model/interface/IBeds';
import { PropertyPurpose } from '../../model/class/PropertyPurpose';
import { UnitType } from '../../model/class/UnitType';
import { Baths } from '../../model/class/Baths';
import { Beds } from '../../model/class/Beds';
import { UnitDetails } from '../../model/class/UnitDetails';
import { ProjectDetails } from '../../model/class/ProjectDetails';
import { DropdownselectorComponent } from "../../reusableComponent/dropdownselector/dropdownselector.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownselectorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('promoVideo') promoVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.promoVideo.nativeElement as HTMLVideoElement;
    video.muted = true;
    // video.play().catch(() => {
    //   // fallback if autoplay fails
    //   console.log('Autoplay blocked, waiting for user interaction');
    //   document.body.addEventListener('touchstart', () => video.play(), { once: true });
    // });
  } 

  ngOnInit(): void{
    this.GetPurposeDropdown();
    this.GetAreaDropdown();
    this.GetUnitTypeDropdown();
    this.GetBedsDropdown();
    this.GetBathsDropdown();
    this.unitDetailsobj.purpose = 1;
  }
  constructor(public router: Router, private dropdowns : DropdownsService) {
    
  }

  labelBedsBaths : string = "Beds & Baths";
  IsBathroom : boolean = true;
  
  activeTab: number = 1;
  propertyPurpose : IPropertyPurpose[] = [];
  propertyArea : IPropertyArea[] = [];
  propertyUnit : IUnitType[] = [];
  propertyBath : IBaths[] = [];
  propertyBed : IBeds[] = [];
  propertyPurposeobj : PropertyPurpose = new PropertyPurpose();
  propertyAreaobj : PropertyArea = new PropertyArea();
  propertyUnitobj : UnitType = new UnitType();
  propertyBathobj : Baths = new Baths();
  propertyBedobj : Beds = new Beds();
  unitDetailsobj : UnitDetails = new UnitDetails();
  projectDetailsobj : ProjectDetails = new ProjectDetails();


  setTab(tabId: number) {
    this.activeTab = tabId;
    this.unitDetailsobj.purpose = this.activeTab;
    if(tabId == 3){
      this.labelBedsBaths = "Bedroom";
      this.IsBathroom = false;
      this.activeTab = 3;
    }
    else{
      this.labelBedsBaths = "Beds & Baths";
      this.IsBathroom = true;
      this.activeTab = this.activeTab;
    }
    this.GetAreaDropdown();
  }
  // Call API
  GetPurposeDropdown(){
    this.dropdowns.GetPropertiesPurpose(this.propertyPurposeobj).subscribe((result:any) => {
      this.propertyPurpose = result;
    })
  }
  GetAreaDropdown(){
    if(this.activeTab == 3){
      this.propertyAreaobj.areaType = "Projects"
    }
    else{
      this.propertyAreaobj.areaType = "Units"
    }
    this.dropdowns.GetAvailablePropertiesArea(this.propertyAreaobj).subscribe((result:any) => {
      this.propertyArea = result;
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
  search(){ 
    if(this.activeTab == 3){
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
          projectType: this.projectDetailsobj.projectType,
          priceFrom: this.projectDetailsobj.priceFrom,
          status: 1,
          priceTo: this.projectDetailsobj.priceTo,
          beds: this.projectDetailsobj.beds.length ? this.projectDetailsobj.beds.join(',') : ''
        }
      });
    }
    else{
      if(this.unitDetailsobj.priceTo == null || this.unitDetailsobj.priceTo == 0){
        this.unitDetailsobj.priceTo = this.unitDetailsobj.priceFrom;
      }
      if(this.unitDetailsobj.priceTo != null || this.unitDetailsobj.priceTo != 0){
        if(this.unitDetailsobj.priceTo < this.unitDetailsobj.priceFrom){
          this.unitDetailsobj.priceTo = this.unitDetailsobj.priceFrom;
        }
      }

      this.router.navigate(['/property-list'], {
      queryParams: {
          area: this.unitDetailsobj.area,
          unitType: this.unitDetailsobj.unitType,
          priceFrom: this.unitDetailsobj.priceFrom,
          priceTo: this.unitDetailsobj.priceTo,
          beds: this.unitDetailsobj.beds.length ? this.unitDetailsobj.beds.join(',') : '',
          bathroom: this.unitDetailsobj.bathroom.length ? this.unitDetailsobj.bathroom.join(',') : '',
          purpose: this.unitDetailsobj.purpose
        }
      });
    }
  }


  bedsBathsDropdownOpen = false;
  priceDropdownOpen = false;

  toggleDropdown(type: string) {
    if (type === 'bedsBaths') {
      this.bedsBathsDropdownOpen = !this.bedsBathsDropdownOpen;
      this.priceDropdownOpen = false;
    } else if (type === 'price') {
      this.priceDropdownOpen = !this.priceDropdownOpen;
      this.bedsBathsDropdownOpen = false;
    }
  }
  get activeDetailsObj() {
    return this.activeTab === 3 ? this.projectDetailsobj : this.unitDetailsobj;
  }

  // Toggle bed
  selectBed(id: number) {
    if (this.activeTab === 3) {
      const index = this.projectDetailsobj.beds.indexOf(id);
      if (index > -1) {
        this.projectDetailsobj.beds.splice(index, 1);
      } else {
        this.projectDetailsobj.beds.push(id);
      }
    } else {
      const index = this.unitDetailsobj.beds.indexOf(id);
      if (index > -1) {
        this.unitDetailsobj.beds.splice(index, 1);
      } else {
        this.unitDetailsobj.beds.push(id);
      }
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
    if (this.activeTab === 3) {
      this.projectDetailsobj.beds = [];
    } else {
      this.unitDetailsobj.beds = [];
      this.unitDetailsobj.bathroom = [];
    }
  }

  // Selected beds text
  get selectedBedsText(): string {
    const beds = this.activeTab === 3 ? this.projectDetailsobj.beds : this.unitDetailsobj.beds;
    return beds.length
      ? beds
          .map(id => this.propertyBed.find(b => b.autoId === id)?.type)
          .filter(Boolean)
          .join(', ')
      : '';
  }

  get selectedBathsText(): string {
    return this.unitDetailsobj.bathroom.length
      ? this.unitDetailsobj.bathroom
          .map(id => this.propertyBath.find(b => b.autoId === id)?.bathroom)
          .filter(Boolean)
          .join(', ')
      : '';
  }

  @HostListener('document:click', ['$event.target'])
    onClick(targetElement: any) {
      const clickedInside = targetElement.closest('.dropdown');
      if (!clickedInside) {
        this.bedsBathsDropdownOpen = false;
        this.priceDropdownOpen = false;

        if (this.activeTab === 3) {
          // --- projectDetails case ---
          if (this.projectDetailsobj.priceTo == null || this.projectDetailsobj.priceTo == 0) {
            this.projectDetailsobj.priceTo = this.projectDetailsobj.priceFrom;
          }
          if (this.projectDetailsobj.priceTo && this.projectDetailsobj.priceTo < this.projectDetailsobj.priceFrom) {
            this.projectDetailsobj.priceTo = this.projectDetailsobj.priceFrom;
          }
        } else {
          // --- unitDetails case ---
          if (this.unitDetailsobj.priceTo == null || this.unitDetailsobj.priceTo == 0) {
            this.unitDetailsobj.priceTo = this.unitDetailsobj.priceFrom;
          }
          if (this.unitDetailsobj.priceTo && this.unitDetailsobj.priceTo < this.unitDetailsobj.priceFrom) {
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
    this.filteredAreas = this.propertyArea.filter(a =>
      a.area.toLowerCase().includes(text)
    );
    this.showDropdown = this.filteredAreas.length > 0 && this.searchText.length > 0;
  }

  selectArea(area: any) {
    this.projectDetailsobj.area = area.autoId;
    this.unitDetailsobj.area = area.autoId;
    this.searchText = area.area;
    this.showDropdown = false;
  }

  onBlur() {
    setTimeout(() => this.showDropdown = false, 150);
  }
}
