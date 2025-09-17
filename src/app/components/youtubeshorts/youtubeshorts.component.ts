import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeshortsService } from '../../service/youtubeshorts.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-youtubeshorts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './youtubeshorts.component.html',
  styleUrl: './youtubeshorts.component.scss'
})
export class YoutubeshortsComponent {
  
  shorts : any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, 
  private youtubehortsservice: YoutubeshortsService,
    private sanitizer: DomSanitizer) 
  {}

  ngOnInit(): void {
    this.youtubehortsservice.getShorts().subscribe((res: any) => {
      this.shorts = res.items.map((item: any) => ({
        ...item,
        safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${item.id.videoId}`
        )
      }));
      setTimeout(() => {
        this.InitSplit();
      }, 0);
    });
  }
  InitSplit() {
    if (isPlatformBrowser(this.platformId)) {
      new Splide('#shorts-carousal', {
        type: 'slide',
        perPage: 4,
        gap: '1rem',
        autoplay: false,
        pagination: false,
        arrows: true,
        breakpoints: {
          1024: { 
            perPage: 2 
          },
          640: { 
            perPage: 1 ,
            arrows: false,
            pagination: true
          },
        },
      }).mount();
    }
  }
}
