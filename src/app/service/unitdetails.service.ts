import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitdetailsService {
  http = inject(HttpClient);
  constructor() { }

  private baseUrl = environment.apiUrl;

  GetUnitDetailsService(obj : any){
    const payload = {
      ...obj, // spread all existing properties
      beds: obj.beds.join(','),
      bathroom: obj.bathroom.join(',')
    };
    return this.http.post(`${this.baseUrl}api/GetUnitDetails`, payload);
  }
  GetUnitDetailsListService(obj : any){
    return this.http.post(`${this.baseUrl}api/GetUnitDetailsList`, obj);
  }
  GetUnitImagesService(obj : any){
    return this.http.post(`${this.baseUrl}api/GetUnitImages`, obj);
  }
  GetUnitAmenitiesService(obj : any){
    return this.http.post(`${this.baseUrl}api/GetUnitAmenitiesList`, obj);
  }
  GetUnitDetailsServiceLatesProject(obj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}api/GetUnitDetails`, obj);
  }
  GetUnitPlacesNearBy(obj: any){
    return this.http.post(`${this.baseUrl}api/GetUnitPlacesNearByList`, obj);
  }
}
