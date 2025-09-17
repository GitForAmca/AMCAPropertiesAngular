import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      new Splide('#testimonials-carousal', {
        type: 'slide',
        perPage: 2,
        gap: '1rem',
        autoplay: false,
        pagination: true,
        arrows: false,
        breakpoints: {
          1024: { 
            perPage: 2 
          },
          640: { 
            perPage: 1
          },
        },
      }).mount();
    }
  }
}
