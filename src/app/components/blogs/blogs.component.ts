import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import Splide from '@splidejs/splide';
import { Blogs } from '../../model/class/Blogs';
import { IBlogs } from '../../model/interface/IBlogs';
import { BlogsService } from '../../service/blogs.service';
import { TextlimitPipe } from '../../pipe/textlimit.pipe';
import { Router } from '@angular/router';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [TextlimitPipe, SkeletonloaderComponent, NgIf, CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  @ViewChild('blogsCarousal') blogsCarousal!: ElementRef;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private blogsservice: BlogsService,
    private routerblogs: Router
  ) {}

  IsLoaded = true;
  ngOnInit(): void {
    this.getBlogs();
  }

  blogsobj: Blogs = new Blogs();
  blogsInterface: IBlogs[] = [];
  skeletonArray = Array(3);

  getBlogs() {
    this.blogsservice.GetBlogs(this.blogsobj).subscribe((result: any) => {
      this.blogsInterface = result;
      this.IsLoaded = false;
      setTimeout(() => {
        if (this.blogsCarousal) {
          this.InitSplit();
        }
      });
    });
  }

  InitSplit() {
    if (isPlatformBrowser(this.platformId)) {
      new Splide('#blogs-carousal', {
        type: 'slide',
        perPage: 3,
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
  GoToBlogsPage(blogURL: string) {
    this.routerblogs.navigate([`/blogs/${blogURL}`]);
  }
}
