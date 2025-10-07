import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlogsService } from '../../service/blogs.service';
import { Router } from '@angular/router';
import { Blogs } from '../../model/class/Blogs';
import { IBlogs } from '../../model/interface/IBlogs';
import { BlogCategory } from '../../model/class/BlogCategory';
import { IBlogCategory } from '../../model/interface/IBlogCategory';
import { DropdownsService } from '../../service/dropdowns.service';
import { FormsModule } from '@angular/forms';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';

@Component({
  selector: 'app-blogslist',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonloaderComponent],
  templateUrl: './blogslist.component.html',
  styleUrl: './blogslist.component.scss',
})
export class BlogslistComponent {
  constructor(
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
    });
  }
  getBlogsCategory() {
    this.dropdownservice
      .GetBlogCategoryList(this.blogsCategoryobj)
      .subscribe((result: any) => {
        this.blogsCategoryInterface = result;
      });
  }
  GoToBlogsPage(blogId: number, blogURL: string) {
    this.routerblogs.navigate([`/blogs/${blogURL}`, blogId]);
  }
  GetBlogsCategoryWise(autoId: number) {
    debugger;
    this.blogsobj.categoryId = autoId;
    this.getBlogs();
  }
}
