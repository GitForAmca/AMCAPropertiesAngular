import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  http = inject(HttpClient);
  constructor() { }
  
  private baseUrl = environment.apiUrl;
  
  GetActiveDevelopers(obj : any){
    return this.http.post(`${this.baseUrl}api/GetActiveDevelopers`, obj);
  }
  GetDevelopers(obj : any){
    return this.http.post(`${this.baseUrl}api/GetAllDevelopers`, obj);
  }
}
