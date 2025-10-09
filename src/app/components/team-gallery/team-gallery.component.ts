import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-team-gallery',
  standalone: true,
  imports: [],
  templateUrl: './team-gallery.component.html',
  styleUrl: './team-gallery.component.scss',
})
export class TeamGalleryComponent {
  @ViewChild('scroller', { static: false })
  scroller!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    setTimeout(() => {
      this.initSplideTeamGallery();
    }, 1000);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  // team gallery

  initSplideTeamGallery() {
    if (isPlatformBrowser(this.platformId)) {
      new Splide('#team-gallery-carousel', {
        type: 'slide',
        perPage: 1,
        gap: '1rem',
        autoplay: false,
        pagination: false,
        arrows: true,
        breakpoints: {
          1024: { perPage: 2 },
          640: { perPage: 1, pagination: true, arrows: false },
        },
      }).mount();
    }
  }
}
