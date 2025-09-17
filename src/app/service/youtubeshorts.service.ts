import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeshortsService {

  private apiKey = 'AIzaSyCKZZbDMWj9SbYEhtmKeOyErJxL0IuCtcI';
  private channelId = 'UCkahiEDF2w78hQQZ-Tfilxw';
  private apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.channelId}&maxResults=10&order=date&type=video&videoDuration=short&key=${this.apiKey}`;

  http = inject(HttpClient);
  constructor() { }
  
  getShorts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}