import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeshortsService } from '../../service/youtubeshorts.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Splide from '@splidejs/splide';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';

@Component({
  selector: 'app-youtubeshorts',
  standalone: true,
  imports: [CommonModule, SkeletonloaderComponent],
  templateUrl: './youtubeshorts.component.html',
  styleUrls: ['./youtubeshorts.component.scss'],
})
export class YoutubeshortsComponent implements AfterViewInit {
  @ViewChild('youtubeSection', { static: false }) youtubeSection!: ElementRef;
  shorts: any[] = [];
  hasLoaded: boolean = false;
  skeletonArray = Array(4);
  isLoading = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private youtubehortsservice: YoutubeshortsService,
    private sanitizer: DomSanitizer
  ) {}

  //  Run only after the view (DOM) is initialized
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Check if the section is visible in the viewport
            if (entry.isIntersecting && !this.hasLoaded) {
              this.hasLoaded = true;
              this.loadShorts(); //  Fetch YouTube data
              observer.unobserve(entry.target); // Stop observing after first trigger
            }
          });
        },
        {
          threshold: 0.2, // Trigger when 20% of the section is visible
        }
      );

      // Start observing the section
      observer.observe(this.youtubeSection.nativeElement);
    }
  }

  // Fetch YouTube shorts only when visible
  loadShorts(): void {
    this.isLoading = true; // show loader
    this.youtubehortsservice.getShorts().subscribe({
      next: (res: any) => {
        this.shorts = res.items.map((item: any) => ({
          ...item,
          safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${item.id.videoId}`
          ),
        }));
      },
      error: (err) => {
        console.error(err);
        this.shorts = [];
      },
      complete: () => {
        this.isLoading = false;
        this.hasLoaded = true;
        setTimeout(() => this.InitSplit(), 0); // init carousel
      },
    });
  }

  // Initialize Splide carousel
  InitSplit(): void {
    if (isPlatformBrowser(this.platformId)) {
      new Splide('#shorts-carousel', {
        type: 'slide',
        perPage: 4,
        gap: '1rem',
        autoplay: false,
        pagination: false,
        arrows: true,
        breakpoints: {
          1024: {
            perPage: 2,
          },
          640: {
            perPage: 1,
            arrows: false,
            pagination: true,
          },
        },
      }).mount();
    }
  }
}
