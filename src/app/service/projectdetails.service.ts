import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectdetailsService {
  http = inject(HttpClient);
  constructor() { }

  private baseUrl = environment.apiUrl;

  GetProjectDetailsService(obj : any){
    const payload = {
      ...obj, // spread all existing properties
      beds: obj.beds.join(',')
    };
    return this.http.post(`${this.baseUrl}api/GetPropertyProjectDetails`, payload);
  }


  GetProjectDetailsListService(obj : any){
    return this.http.post(`${this.baseUrl}api/GetProjectDetailsList`, obj);
  }
  GetProjectImagesService(obj : any){
    return this.http.post(`${this.baseUrl}api/GetProjectImages`, obj);
  }
  GetProjectAmenitiesService(obj : any){
    return this.http.post(`${this.baseUrl}api/GetProjectAmenitiesList`, obj);
  }
  GetProjectPlacesNearBy(obj: any){
    return this.http.post(`${this.baseUrl}api/GetProjectPlacesNearByList`, obj);
  }
}