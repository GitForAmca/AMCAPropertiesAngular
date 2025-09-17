import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIBaseURL } from '../model/class/APIBaseURL';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DropdownsService {

  http = inject(HttpClient);
  constructor() { }
  

  private baseUrl = environment.apiUrl;


  GetPropertiesPurpose(propertyobj : any){
    return this.http.post(`${this.baseUrl}api/GetPurposeList`, propertyobj);
  }
  GetAvailablePropertiesArea(propertyobj : any){
    return this.http.post(`${this.baseUrl}api/GetPropertiesAreaList`, propertyobj);
  }
  GetUnitType(propertyobj : any){
    return this.http.post(`${this.baseUrl}api/GetUnitTypeList`, propertyobj);
  }
  GetPropertyBedroom(propertyobj : any){
    return this.http.post(`${this.baseUrl}api/GetPropertyBedroomList`, propertyobj);
  }
  GetPropertyBathroom(propertyobj : any){
    return this.http.post(`${this.baseUrl}api/GetPropertyBathroomList`, propertyobj);
  }
  GetPropertyStatus(propertyobj : any){
    return this.http.post(`${this.baseUrl}api/GetPropertyStatusList`, propertyobj);
  }
  GetBlogCategoryList(propertyobj : any){
    return this.http.post(`${this.baseUrl}api/BlogCategoryList`, propertyobj);
  }
  GetCountryList(propertyobj : any){
    return this.http.post(`${this.baseUrl}api/GetCountryList`, propertyobj);
  }
  GetActiveProjectList(propertyobj : any){
    return this.http.post(`${this.baseUrl}api/GetActiveProjectList`, propertyobj);
  }
  GetProjectCompletionYearList(propertyobj : any){
    return this.http.post(`${this.baseUrl}api/GetProjectCompletionYearList`, propertyobj);
  }
}
