import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EnquiryService {
  http = inject(HttpClient);
  constructor() {}

  private baseUrl = environment.apiUrl;

  AddContactUsLead(obj: any) {
    return this.http.post(`${this.baseUrl}api/AddContactUsLead`, obj);
  }
  AddEnquiryLead(obj: any) {
    return this.http.post(`${this.baseUrl}api/AddEnquiryLead`, obj);
  }
  AddEnquiryProjectsLead(obj: any) {
    return this.http.post(`${this.baseUrl}api/AddEnquiryLeadProjects`, obj);
  }
  AddSubscriptionLead(obj: any) {
    return this.http.post(`${this.baseUrl}api/InsertSubscriberDetail`, obj);
  }
  AddCareersCvLead(payload: any) {
    return this.http.post(`${this.baseUrl}api/SubmitCareersCV`, payload);
  }
  AdduploadCV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}api/UploadCareerCV`, formData);
  }
}
