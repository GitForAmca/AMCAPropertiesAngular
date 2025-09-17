
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaguideService {
  http = inject(HttpClient);
  constructor() { }
  
  private baseUrl = environment.apiUrl;

  GetAreaGuide(obj : any){
      return this.http.post(`${this.baseUrl}api/GetAreaGuideList`, obj);
  }
}