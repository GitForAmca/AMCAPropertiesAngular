import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  
  http = inject(HttpClient);
  constructor() { }

  private baseUrl = environment.apiUrl;

  GetBlogs(obj : any){
    return this.http.post(`${this.baseUrl}api/GetBlogs`, obj);
  }
}