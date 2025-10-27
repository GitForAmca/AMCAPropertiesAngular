import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class CanonicalServiceService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta
  ) {}

  setCanonicalURL(url?: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Browser: dynamically create canonical tag
      const existingLink = document.querySelector("link[rel='canonical']");
      if (existingLink) existingLink.remove();

      const link: HTMLLinkElement = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url ?? window.location.href);
      document.head.appendChild(link);
    } else {
      // Server: use Angular Meta service
      this.meta.updateTag(
        { rel: 'canonical', href: url ?? '' },
        "link[rel='canonical']"
      );
    }
  }
}
