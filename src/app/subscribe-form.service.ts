import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscribeFormService {
  // https://localhost:7038/api/InsertSubscriberDetail
_url = "";
  constructor(private http: HttpClient) { }
  saveSubscription(data: any){
    return this.http.post(this._url,data)
  }
}
