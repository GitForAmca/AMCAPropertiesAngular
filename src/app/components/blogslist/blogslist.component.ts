import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BlogsService } from '../../service/blogs.service';
import { Router } from '@angular/router';
import { Blogs } from '../../model/class/Blogs';
import { IBlogs } from '../../model/interface/IBlogs';
import { BlogCategory } from '../../model/class/BlogCategory';
import { IBlogCategory } from '../../model/interface/IBlogCategory';
import { DropdownsService } from '../../service/dropdowns.service';
import { FormsModule } from '@angular/forms';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-blogslist',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonloaderComponent],
  templateUrl: './blogslist.component.html',
  styleUrl: './blogslist.component.scss',
})
export class BlogslistComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private blogsservice: BlogsService,
    private dropdownservice: DropdownsService,
    private routerblogs: Router
  ) {}

  IsLoaded = true;

  Selectedcategory: number = 0;

  blogsCategoryobj: BlogCategory = new BlogCategory();
  blogsCategoryInterface: IBlogCategory[] = [];

  blogsobj: Blogs = new Blogs();
  blogsInterface: IBlogs[] = [];
  skeletonArray = Array(3);
  ngOnInit(): void {
    this.getBlogs();
    this.getBlogsCategory();
  }

  getBlogs() {
    this.blogsservice.GetBlogs(this.blogsobj).subscribe((result: any) => {
      this.blogsInterface = result;
      this.IsLoaded = false;

      setTimeout(() => {
        this.initSplide();
      }, 0);
    });
  }
  getBlogsCategory() {
    this.dropdownservice
      .GetBlogCategoryList(this.blogsCategoryobj)
      .subscribe((result: any) => {
        this.blogsCategoryInterface = result;
      });
  }
  GoToBlogsPage(blogURL: string) {
    this.routerblogs.navigate([`/blogs/${blogURL}`]);
  }
  GetBlogsCategoryWise(autoId: number) {
    this.blogsobj.categoryId = autoId;
    this.getBlogs();
  }

  initSplide() {
    if (isPlatformBrowser(this.platformId)) {
      new Splide('#blog-list-carousal', {
        type: 'slide',
        perPage: 3,
        gap: '1rem',
        autoplay: false,
        pagination: true,
        arrows: true,
        breakpoints: {
          1024: {
            perPage: 2,
          },
          640: {
            perPage: 2,
            arrows: false,
            pagination: true,
          },
        },
      }).mount();
    }
  }
}
