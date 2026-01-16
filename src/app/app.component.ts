import {
  Component,
  inject,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter, map, mergeMap } from 'rxjs';
import { MetaService } from './service/meta.service';
import { ContactusenquiryformComponent } from './reusableComponent/contactusenquiryform/contactusenquiryform.component';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MessagepopupComponent } from './reusableComponent/messagepopup/messagepopup.component';
import { CanonicalServiceService } from './service/canonical-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ContactusenquiryformComponent,
    CommonModule,
    MessagepopupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('messagepopup') messagepopup: any;

  headingText = '';
  messagePoppup = '';
  IsSuccess = false;
  document = inject(DOCUMENT);

  handleEnquiry(event: { success: boolean; message: string }) {
    // Close the enquiry modal
    this.isModalOpen = false;

    // Set message popup content
    this.IsSuccess = event.success;
    this.headingText = event.success ? 'Success' : 'Error';
    this.messagePoppup = event.message;

    // Open message popup safely in parent
    setTimeout(() => this.messagepopup.open(), 0);
  }
  isModalOpen = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaService: MetaService,
    private canonicalService: CanonicalServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        if (data['title'] && data['description']) {
          this.metaService.setMeta(data['title'], data['description']);
        }

        let canonicalUrl = data['canonical']
          ? data['canonical']
          : 'https://amcaproperties.com' + this.router.url;

        let link: HTMLLinkElement =
          this.document.querySelector("link[rel='canonical']") ||
          this.document.createElement('link');

        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', canonicalUrl);

        this.document.head.appendChild(link);
      });
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isShown = localStorage.getItem('EnquiryForm');
      if (!isShown) {
        this.isModalOpen = true;
        localStorage.setItem('EnquiryForm', 'true');
      }
    }
  }
  close() {
    this.isModalOpen = false;
  }
}
