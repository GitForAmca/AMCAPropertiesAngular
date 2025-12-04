import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { BlogsService } from '../../service/blogs.service';
import { Router, RouterLink } from '@angular/router';
import { Blogs } from '../../model/class/Blogs';
import { IBlogs } from '../../model/interface/IBlogs';
import { BlogCategory } from '../../model/class/BlogCategory';
import { IBlogCategory } from '../../model/interface/IBlogCategory';
import { DropdownsService } from '../../service/dropdowns.service';
import { FormsModule } from '@angular/forms';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';
import { StripHtmlPipe } from '../../pipe/strip-html.pipe';

@Component({
  selector: 'app-blogslist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SkeletonloaderComponent,
    StripHtmlPipe,
    RouterLink,
  ],
  templateUrl: './blogslist.component.html',
  styleUrls: ['./blogslist.component.scss'],
})
export class BlogslistComponent implements OnInit, AfterViewChecked {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private blogsservice: BlogsService,
    private dropdownservice: DropdownsService,
    private routerblogs: Router
  ) {}
  IsLoaded = false;
  Selectedcategory: number = 0;
  blogsCategoryobj: BlogCategory = new BlogCategory();
  blogsCategoryInterface: IBlogCategory[] = [];
  blogsobj: Blogs = new Blogs();
  blogsInterface: IBlogs[] = [];
  skeletonArray = Array(6);
  paginatedBlogs: any[] = [];
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;
  displayPages: number[] = [];

  ngOnInit(): void {
    this.getBlogs();
    this.getBlogsCategory();
  }

  ngAfterViewChecked() {}

  getBlogs() {
    this.blogsservice.GetBlogs(this.blogsobj).subscribe((result: any) => {
      this.blogsInterface = result || [];
      this.currentPage = 1;
      this.updatePagination();
      this.IsLoaded = true;
    });
  }

  getBlogsCategory() {
    this.dropdownservice
      .GetBlogCategoryList(this.blogsCategoryobj)
      .subscribe((result: any) => {
        this.blogsCategoryInterface = result || [];
      });
  }

  GoToBlogsPage(blogURL: string) {
    this.routerblogs.navigate([`/blogs/${blogURL}`]);
  }

  GetBlogsCategoryWise(autoId: number) {
    this.blogsobj.categoryId = autoId;
    this.currentPage = 1;
    this.getBlogs();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.blogsInterface.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedBlogs = this.blogsInterface.slice(start, end);
    this.displayPages = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
